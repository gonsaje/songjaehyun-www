export type DemoCategory = "java" | "node";

export type Demo = {
  slug: string;
  title: string;
  category: DemoCategory;
  summary: string;
  backend: string;
  tags: string[];
  status: "live" | "planned";
  href: string;
};

export const demos: Demo[] = [
  {
    slug: "expiring-kv",
    title: "Expiring KV Store",
    category: "java",
    summary:
      "TTL-based in-memory key-value store with isolated session state and request logging.",
    backend: "Java / Spring Boot",
    tags: ["Java", "State", "Algorithms"],
    status: "live",
    href: "/demos/java/expiring-kv",
  },
  {
    slug: "product-catalog",
    title: "Product Catalog API",
    category: "node",
    summary:
      "A product-style REST API with validation, typed contracts, and clean endpoint design.",
    backend: "Node.js / TypeScript",
    tags: ["Node", "TypeScript", "REST"],
    status: "live",
    href: "/demos/node/product-catalog",
  },
  {
    slug: "rate-limiter",
    title: "Rate Limiter",
    category: "java",
    summary:
      "A systems-oriented backend demo for request throttling and limiter behavior.",
    backend: "Java / Spring Boot",
    tags: ["Java", "Systems", "Concurrency"],
    status: "planned",
    href: "/demos/java",
  },
  {
    slug: "openapi-playground",
    title: "OpenAPI Playground",
    category: "node",
    summary:
      "A contract-first demo showing schemas, requests, and example API responses.",
    backend: "Node.js / TypeScript",
    tags: ["OpenAPI", "Fastify", "TypeScript"],
    status: "planned",
    href: "/demos/node",
  },
];