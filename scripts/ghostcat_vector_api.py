import os
from typing import Annotated

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel, Field


class VectorRequest(BaseModel):
    text: Annotated[str, Field(min_length=1, max_length=4000)]


class EmotionalVector(BaseModel):
    calm: Annotated[float, Field(ge=0, le=1)]
    tension: Annotated[float, Field(ge=0, le=1)]
    longing: Annotated[float, Field(ge=0, le=1)]
    energy: Annotated[float, Field(ge=0, le=1)]
    clarity: Annotated[float, Field(ge=0, le=1)]
    tenderness: Annotated[float, Field(ge=0, le=1)]
    solitude: Annotated[float, Field(ge=0, le=1)]
    momentum: Annotated[float, Field(ge=0, le=1)]


class VectorResponse(BaseModel):
    vector: EmotionalVector
    model: str


client = OpenAI()
model = os.getenv("GHOSTCAT_OPENAI_MODEL", "gpt-4.1-mini")

app = FastAPI(title="ghostcat vector API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("GHOSTCAT_ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(","),
    allow_methods=["POST"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/vector", response_model=VectorResponse)
def create_vector(request: VectorRequest) -> VectorResponse:
    try:
        response = client.responses.parse(
            model=model,
            input=[
                {
                    "role": "system",
                    "content": (
                        "Convert reflective journal text into an emotional vector. "
                        "Account for negation, metaphor, contrast, uncertainty, and context. "
                        "Use calm for relief, safety, steadiness, or explicitly negated anger/anxiety. "
                        "Use tension for unresolved pressure, anger, fear, anxiety, or tightness. "
                        "Use longing for missing, wanting, memory, ache, or hope. "
                        "Use energy for aliveness, speed, force, heat, or physical intensity. "
                        "Use clarity for understanding, truth, realization, or directness. "
                        "Use tenderness for warmth, care, gentleness, love, or kindness. "
                        "Use solitude for aloneness, distance, silence, night, or emptiness. "
                        "Use momentum for forward motion, persistence, finishing, or continuing. "
                        "Return calibrated values from 0 to 1."
                    ),
                },
                {"role": "user", "content": request.text},
            ],
            text_format=EmotionalVector,
        )
    except Exception as error:
        raise HTTPException(status_code=502, detail="Could not extract emotional vector") from error

    return VectorResponse(vector=response.output_parsed, model=model)
