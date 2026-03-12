"use client";

import { useEffect, useState } from "react";

type ProductCategory =
  | "guitar"
  | "piano"
  | "drums"
  | "microphone"
  | "audio-interface"
  | "studio"
  | "accessory";

type ProductCondition = "new" | "used";

type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  price: number;
  inventory: number;
  condition: ProductCondition;
  rating: number;
  createdAt: string;
};

type PaginatedProducts = {
  items: Product[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

const API_BASE_URL = process.env.NODE_API_BASE_URL ?? "http://localhost:3001";
const knownTerms = [
  "guitar",
  "piano",
  "drums",
  "microphone",
  "audio-interface",
  "accessory",
  "studio",
  "Fender",
  "Gibson",
  "Yamaha",
  "Roland",
  "Shure",
  "Focusrite",
  "Universal Audio",
  "Audio-Technica",
];

export default function ProductCatalogPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState("");
    const [search, setSearch] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    // const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        async function loadProducts() {
            try{
                setLoading(true);
                setError(null);

                const searchParams = new URLSearchParams();

                if (search.trim()) {
                    searchParams.set("search", search.trim());
                }

                const url = `${API_BASE_URL}/api/products${
                    searchParams.toString() ? `?${searchParams.toString()}` : ""
                }`;
                
                const response = await fetch(url, {cache: "no-store"});
    
                if (!response.ok) {
                    const body = await response.json().catch(() => null);
                    throw new Error(body?.error?.message ?? "Failed to load products.");
                }
    
                const data: PaginatedProducts = await response.json();
                setProducts(data.items);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong.");
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, [search]);

    function getSuggestions(input: string) {
        const query = input.trim().toLowerCase();

        if (!query) return [];

        return knownTerms
            .filter((term) => term.toLowerCase().includes(query))
            .slice(0, 5);
    }

    function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSearch(searchValue.trim());
    }

    const suggestions = getSuggestions(searchValue);

    return (
        <main className="min-h-screen bg-white text-slate-900">
            <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <h1 className="text-4xl font-semibold tracking-tight">Product Catalog API</h1>
                <p className="mt-4 max-w-2xl text-slate-600">
                    Interactive Node.js Product API demo
                </p>
            </section>
            <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

                <h2 className="text-3xl font-semibold tracking-tight">Products</h2>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        setSearch(searchValue.trim());
                        setIsSearchFocused(false);
                    }}
                    className="mt-8 max-w-md"
                >
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-slate-700">
                            Search products
                        </span>

                        <div className="relative">
                        <div className="flex gap-2">
                            <input
                                value={searchValue}
                                onChange={(event) => setSearchValue(event.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => {
                                    setTimeout(() => setIsSearchFocused(false), 150);
                                }}
                                placeholder="Search by name, category, or brand"
                                className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                            />
                            <button
                                type="submit"
                                className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white"
                            >
                                Search
                            </button>
                        </div>
                        {isSearchFocused && suggestions.length > 0 && (
                            <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 max-h-64 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
                                {suggestions.map((suggestion) => (
                                    <button
                                        key={suggestion}
                                        type="button"
                                        onMouseDown={() => {
                                            setSearchValue(suggestion);
                                            setSearch(suggestion);
                                            setIsSearchFocused(false);
                                        }}
                                        className="block w-full border-b border-slate-100 px-4 py-3 text-left text-sm text-slate-700 transition last:border-b-0 hover:bg-slate-50 hover:text-slate-950"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        )}
                        </div>
                    </label>
                </form>
                {loading ? (
                    <div className="mt-10 rounded-3xl border border-dashed border-slate-300 px-6 py-12 text-center text-slate-500">
                        Loading products...
                    </div>
                ) : error ? (
                    <div className="mt-10 rounded-3xl border border-red-200 bg-red-50 px-6 py-4 text-red-700">
                        {error}
                    </div>
                ) : null}
                {!loading && !error && products.length === 0 ? (
                    <div className="mt-10 rounded-3xl border border-dashed border-slate-300 px-6 py-12 text-center text-slate-500">
                        No products found.
                    </div>
                    ) : null}

                {!loading && !error && products.length > 0 && (
                <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {products.map((product) => (
                        <article
                            key={product.id}
                            className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                        >
                            <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                                    {product.brand}
                                </p>
                                <h2 className="mt-2 text-lg font-semibold text-slate-950">
                                    {product.name}
                                </h2>
                            </div>

                            <span className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-700">
                                {product.condition}
                            </span>
                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                                    <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Category</p>
                                    <p className="mt-2 font-medium text-slate-900">{product.category}</p>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                                    <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Rating</p>
                                    <p className="mt-2 font-medium text-slate-900">{product.rating.toFixed(1)}</p>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                                    <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Price</p>
                                    <p className="mt-2 font-medium text-slate-900">${product.price.toFixed(2)}</p>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                                    <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Inventory</p>
                                    <p className="mt-2 font-medium text-slate-900">{product.inventory}</p>
                                </div>
                            </div>
                        </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
