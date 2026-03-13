export const API_BASE_URL =
  typeof window !== "undefined" && window.location.hostname.includes("localhost")
    ? "http://localhost:3001"
    : "https://node-api.songjaehyun.com";

export const JAVA_API_BASE_URL =
  typeof window !== "undefined" && window.location.hostname.includes("localhost")
    ? "http://localhost:8080"
    : "https://api.songjaehyun.com";