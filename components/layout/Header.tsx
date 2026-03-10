"use client";

import Link from "next/link";
import { useState } from "react";

const javaDemos = [
  { name: "Expiring KV Store", href: "/demos/java/expiring-kv" },
  { name: "Rate Limiter", href: "/demos/java/rate-limiter" },
];

const nodeDemos = [
  { name: "Product Catalog API", href: "/demos/node/product-catalog" },
  { name: "OpenAPI Playground", href: "/demos/node/openapi-playground" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          songjaehyun
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link href="/" className="transition hover:text-black">
            Home
          </Link>

          <Link href="/about" className="transition hover:text-black">
            About
          </Link>

          <Link href="/architecture" className="transition hover:text-black">
            Architecture
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button className="transition hover:text-black">
              Demos
            </button>

            {open && (
              <div className="absolute right-0 top-full pt-2">
                <div className="w-[420px] rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                        Java
                      </p>
                      <div className="flex flex-col gap-1">
                        {javaDemos.map((demo) => (
                          <Link
                            key={demo.href}
                            href={demo.href}
                            className="rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-black"
                          >
                            {demo.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                        Node
                      </p>
                      <div className="flex flex-col gap-1">
                        {nodeDemos.map((demo) => (
                          <Link
                            key={demo.href}
                            href={demo.href}
                            className="rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-black"
                          >
                            {demo.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-gray-100 pt-3">
                    <Link
                      href="/demos"
                      className="text-sm font-medium text-gray-900 hover:underline"
                    >
                      View all demos
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}