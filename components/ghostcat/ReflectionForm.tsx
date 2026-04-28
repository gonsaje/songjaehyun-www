"use client";

import { FormEvent, useState } from "react";

type ReflectionFormProps = {
  onSubmit: (rawText: string) => void;
};

export function ReflectionForm({ onSubmit }: ReflectionFormProps) {
  const [rawText, setRawText] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = rawText.trim();

    if (!trimmed) return;

    onSubmit(trimmed);
    setRawText("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label htmlFor="reflection" className="block text-3xl font-light tracking-normal text-mist sm:text-5xl">
        what stayed?
      </label>
      <textarea
        id="reflection"
        value={rawText}
        onChange={(event) => setRawText(event.target.value)}
        placeholder="leave it here"
        rows={7}
        className="w-full resize-none rounded-[1.4rem] border border-white/10 bg-white/[0.035] px-5 py-4 text-base leading-7 text-mist outline-none transition placeholder:text-hush/55 focus:border-ember/40 focus:bg-white/[0.055] focus:shadow-[0_0_0_4px_rgba(185,144,99,0.08)]"
      />
      <div className="flex items-center justify-between gap-4">
        <p className="max-w-xs text-sm leading-6 text-hush">nothing here asks to be performed</p>
        <button
          type="submit"
          className="rounded-full border border-ember/25 bg-ember/10 px-5 py-2.5 text-sm text-mist transition hover:border-ember/45 hover:bg-ember/15 focus:outline-none focus:ring-2 focus:ring-ember/30"
        >
          keep
        </button>
      </div>
    </form>
  );
}
