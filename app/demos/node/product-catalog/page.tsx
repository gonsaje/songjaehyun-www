"use client";

import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "@/lib/config";

type ProductCategory =
	| "guitar"
	| "piano"
	| "drums"
	| "microphone"
	| "audio-interface"
	| "studio"
	| "accessory";

type ProductCondition = "new" | "used";
type SortBy = "name" | "price" | "rating";
type SortOrder = "asc" | "desc";

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
	filters: {
		brands: string[];
		categories: ProductCategory[];
		conditions: ProductCondition[];
	};
};

const sortOptions: SortBy[] = ["name", "price", "rating"];

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

	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(4);
	const [total, setTotal] = useState(0);
	const [totalPages, setTotalPages] = useState(1);

	const [searchValue, setSearchValue] = useState("");
	const [search, setSearch] = useState("");
	const [isSearchFocused, setIsSearchFocused] = useState(false);

	const [sortBy, setSortBy] = useState<SortBy>("name");
	const [order, setOrder] = useState<SortOrder>("asc");

	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [selectedCondition, setSelectedCondition] = useState<string>("");
	const [selectedBrand, setSelectedBrand] = useState<string>("");

	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const queryParams = useMemo(() => {
		const searchParams = new URLSearchParams();

		if (search.trim()) {
			searchParams.set("search", search.trim());
		}

		if (selectedCategory) {
			searchParams.set("category", selectedCategory);
		}

		if (selectedCondition) {
			searchParams.set("condition", selectedCondition);
		}

		if (selectedBrand) {
			searchParams.set("brand", selectedBrand);
		}

		searchParams.set("sortBy", sortBy);
		searchParams.set("order", order);
		searchParams.set("page", String(page));
		searchParams.set("pageSize", String(pageSize));

		return searchParams.toString();
	}, [
		search,
		selectedCategory,
		selectedCondition,
		selectedBrand,
		sortBy,
		order,
		page,
		pageSize,
	]);

	async function loadProducts() {
		try {
			setLoading(true);
			setError(null);

			const url = `${API_BASE_URL}/api/products${queryParams ? `?${queryParams}` : ""}`;

			const response = await fetch(url, { cache: "no-store" });

			if (!response.ok) {
				const body = await response.json().catch(() => null);
				throw new Error(body?.error?.message ?? "Failed to load products.");
			}

			const data: PaginatedProducts = await response.json();

			setProducts(data.items);
			setPage(data.page);
			setPageSize(data.pageSize);
			setTotal(data.total);
			setTotalPages(data.totalPages);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong.");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		loadProducts();
	}, [queryParams]);

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
		setPage(1);
		setIsSearchFocused(false);
	}

	function handleResetFilters() {
		setSearchValue("");
		setSearch("");
		setSelectedCategory("");
		setSelectedCondition("");
		setSelectedBrand("");
		setSortBy("name");
		setOrder("asc");
		setPage(1);
		setIsSearchFocused(false);
	}

	const categoryOptions = useMemo(() => {
		return [...new Set(products.map((product) => product.category))].sort();
	}, [products]);

	const conditionOptions = useMemo(() => {
		return [...new Set(products.map((product) => product.condition))].sort();
	}, [products]);

	const brandOptions = useMemo(() => {
		return [...new Set(products.map((product) => product.brand))].sort();
	}, [products]);

	function getPillClass(isActive: boolean) {
		return [
			"rounded-full border px-3 py-2 text-sm font-medium transition",
			isActive
				? "border-slate-900 bg-slate-900 text-white"
				: "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:text-slate-950",
		].join(" ");
	}

	const suggestions = getSuggestions(searchValue);

	return (
		<main className="min-h-screen bg-white text-slate-900">
			<section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
				<div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
					<div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
							Node Backend Demo
						</p>

						<h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
							Product Catalog API
						</h1>

						<p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
							A product-style Fastify API demo showing filtering, pagination,
							inventory mutation, and request-driven UI behavior against a
							Node.js backend.
						</p>
						<a
							href="#developer-notes"
							className="mt-6 inline-flex items-center text-sm font-medium text-slate-900 transition hover:text-slate-600"
						>
							View developer notes ↓
						</a>

						<div className="mt-8 grid gap-4 sm:grid-cols-3">
							<div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
								<p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
									Resource
								</p>
								<p className="mt-2 text-lg font-semibold text-slate-950">
									/api/products
								</p>
							</div>

							<div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
								<p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
									Filters
								</p>
								<p className="mt-2 text-lg font-semibold text-slate-950">
									Category · Brand · Condition
								</p>
							</div>

							<div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
								<p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
									Writes
								</p>
								<p className="mt-2 text-lg font-semibold text-slate-950">
									Create · Inventory Patch
								</p>
							</div>
						</div>
					</div>

					<aside className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm space-y-6">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
								API Base URL
							</p>
							<code className="mt-3 block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800">
								{API_BASE_URL}
							</code>
						</div>

						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
								Framework
							</p>
							<code className="mt-3 block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800">
								Fastify · TypeScript
							</code>
						</div>

						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
								Current Request
							</p>
							<code className="mt-3 block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800">
								GET /api/products?{queryParams}
							</code>
						</div>
					</aside>
				</div>
				{/* Search and Filter Section */}
				<div className="mt-8 grid gap-8 xl:grid-cols-[40%_60%]">
					<section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
						<div className="flex items-center justify-between gap-4">
							<div>
								<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
									Query Controls
								</p>
								<h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
									Filter and fetch products
								</h2>
							</div>

							<button
								type="button"
								onClick={handleResetFilters}
								className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
							>
								Reset all
							</button>
						</div>

						<form onSubmit={handleSearchSubmit} className="mt-8">
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

										{searchValue && (
											<button
												type="button"
												onClick={() => {
													setSearchValue("");
													setSearch("");
													setPage(1);
													setIsSearchFocused(false);
												}}
												className="rounded-2xl bg-zinc-200 px-4 py-3 text-sm font-medium text-black"
											>
												Clear
											</button>
										)}
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
														setPage(1);
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

						<div className="mt-8 grid gap-4 sm:grid-cols-2">
							<label className="flex flex-col gap-2">
								<span className="text-sm font-medium text-slate-700">
									Sort by
								</span>
								<select
									value={sortBy}
									onChange={(event) => {
										setSortBy(event.target.value as SortBy);
										setPage(1);
									}}
									className="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500"
								>
									{sortOptions.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							</label>

							<label className="flex flex-col gap-2">
								<span className="text-sm font-medium text-slate-700">
									Order
								</span>
								<select
									value={order}
									onChange={(event) => {
										setOrder(event.target.value as SortOrder);
										setPage(1);
									}}
									className="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500"
								>
									<option value="asc">asc</option>
									<option value="desc">desc</option>
								</select>
							</label>
						</div>

						<div className="mt-8 space-y-6">
							<div>
								<p className="text-sm font-medium text-slate-700">Category</p>
								<div className="mt-3 flex flex-wrap gap-2">
									<button
										type="button"
										onClick={() => {
											setSelectedCategory("");
											setPage(1);
										}}
										className={getPillClass(selectedCategory === "")}
									>
										All
									</button>

									{categoryOptions.map((category) => (
										<button
											key={category}
											type="button"
											onClick={() => {
												setSelectedCategory(category);
												setPage(1);
											}}
											className={getPillClass(selectedCategory === category)}
										>
											{category}
										</button>
									))}
								</div>
							</div>

							<div>
								<p className="text-sm font-medium text-slate-700">Condition</p>
								<div className="mt-3 flex flex-wrap gap-2">
									<button
										type="button"
										onClick={() => {
											setSelectedCondition("");
											setPage(1);
										}}
										className={getPillClass(selectedCondition === "")}
									>
										All
									</button>

									{conditionOptions.map((condition) => (
										<button
											key={condition}
											type="button"
											onClick={() => {
												setSelectedCondition(condition);
												setPage(1);
											}}
											className={getPillClass(selectedCondition === condition)}
										>
											{condition}
										</button>
									))}
								</div>
							</div>

							<div>
								<p className="text-sm font-medium text-slate-700">Brand</p>
								<div className="mt-3 flex flex-wrap gap-2">
									<button
										type="button"
										onClick={() => {
											setSelectedBrand("");
											setPage(1);
										}}
										className={getPillClass(selectedBrand === "")}
									>
										All
									</button>

									{brandOptions.map((brand) => (
										<button
											key={brand}
											type="button"
											onClick={() => {
												setSelectedBrand(brand);
												setPage(1);
											}}
											className={getPillClass(selectedBrand === brand)}
										>
											{brand}
										</button>
									))}
								</div>
							</div>
						</div>
					</section>
					{/* Product Inventory Section */}
					<section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
						<div className="flex flex-wrap items-center justify-between gap-4">
							<h2 className="text-3xl font-semibold tracking-tight">
								Products
							</h2>

							<div className="flex items-center gap-3 text-sm text-slate-600">
								<span>{total} total</span>

								<label className="flex items-center gap-2">
									<span>Page size</span>
									<select
										value={pageSize}
										onChange={(event) => {
											setPageSize(Number(event.target.value));
											setPage(1);
										}}
										className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none"
									>
										<option value={4}>4</option>
										<option value={8}>8</option>
										<option value={12}>12</option>
									</select>
								</label>
							</div>
						</div>

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
							<div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
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
												<p className="text-xs uppercase tracking-[0.12em] text-slate-500">
													Category
												</p>
												<p className="mt-2 font-medium text-slate-900">
													{product.category}
												</p>
											</div>

											<div className="rounded-2xl border border-slate-200 bg-white p-3">
												<p className="text-xs uppercase tracking-[0.12em] text-slate-500">
													Rating
												</p>
												<p className="mt-2 font-medium text-slate-900">
													{product.rating.toFixed(1)}
												</p>
											</div>

											<div className="rounded-2xl border border-slate-200 bg-white p-3">
												<p className="text-xs uppercase tracking-[0.12em] text-slate-500">
													Price
												</p>
												<p className="mt-2 font-medium text-slate-900">
													${product.price.toFixed(2)}
												</p>
											</div>

											<div className="rounded-2xl border border-slate-200 bg-white p-3">
												<p className="text-xs uppercase tracking-[0.12em] text-slate-500">
													Inventory
												</p>
												<p className="mt-2 font-medium text-slate-900">
													{product.inventory}
												</p>
											</div>
										</div>
									</article>
								))}
							</div>
						)}

						<div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
							<p className="text-sm text-slate-600">
								Page {page} of {totalPages}
							</p>

							<div className="flex items-center gap-3">
								<button
									type="button"
									disabled={page <= 1 || loading}
									onClick={() => setPage((current) => Math.max(1, current - 1))}
									className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition enabled:hover:border-slate-400 enabled:hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
								>
									Previous
								</button>

								<button
									type="button"
									disabled={page >= totalPages || loading}
									onClick={() =>
										setPage((current) => Math.min(totalPages, current + 1))
									}
									className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition enabled:hover:border-slate-400 enabled:hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
								>
									Next
								</button>
							</div>
						</div>
					</section>
					<section
						id="developer-notes"
						className="xl:col-span-2 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm"
					>
						<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
							Developer Notes
						</p>

						<h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
							Product Search API Demo
						</h2>

						<p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
							This page demonstrates a backend-driven product search system
							designed to highlight API query design, filtering strategies,
							fuzzy matching, and pagination mechanics. The UI acts as a thin
							client that constructs query parameters and delegates most data
							logic to the backend service.
						</p>

						<div className="mt-6 grid gap-4 sm:grid-cols-2">
							<a
								href="https://github.com/gonsaje/songjaehyun-www/blob/main/app/demos/node/product-catalog/page.tsx"
								target="_blank"
								rel="noopener noreferrer"
								className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white"
							>
								<p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
									Frontend
								</p>

								<p className="mt-2 text-lg font-semibold text-slate-950">
									UI Repository
								</p>

								<p className="mt-1 text-sm text-slate-600">
									React + TypeScript + Tailwind
								</p>
							</a>

							<a
								href="https://github.com/gonsaje/songjaehyun-node-api/tree/main/src/modules/products"
								target="_blank"
								rel="noopener noreferrer"
								className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white"
							>
								<p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
									Backend
								</p>

								<p className="mt-2 text-lg font-semibold text-slate-950">
									API Repository
								</p>

								<p className="mt-1 text-sm text-slate-600">Node.js + Fastify</p>
							</a>
						</div>

						<div className="mt-10 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
							{/* Architecture */}
							<div>
								<h3 className="text-lg font-semibold text-slate-950">
									Architecture
								</h3>

								<ul className="mt-3 space-y-2 text-sm text-slate-600 leading-relaxed">
									<li>
										React + TypeScript frontend responsible for query
										construction and UI state management.
									</li>

									<li>
										Node.js API service handles filtering, sorting, pagination,
										and fuzzy matching logic.
									</li>

									<li>
										Stateless request model where all query state is encoded in
										URL query parameters.
									</li>

									<li>
										The UI re-fetches data whenever query parameters change,
										allowing the backend to remain the source of truth.
									</li>
								</ul>
							</div>

							{/* Functionalities */}
							<div>
								<h3 className="text-lg font-semibold text-slate-950">
									Core Functionality
								</h3>

								<ul className="mt-3 space-y-2 text-sm text-slate-600 leading-relaxed">
									<li>Search products by name, brand, or category.</li>

									<li>
										Dynamic filtering using category, brand, and condition
										selectors.
									</li>

									<li>
										Sorting by multiple attributes (name, price, rating,
										inventory).
									</li>

									<li>Ascending or descending ordering.</li>

									<li>Server-side pagination with configurable page size.</li>

									<li>
										Search suggestions generated from known product terms.
									</li>
								</ul>
							</div>

							{/* Algorithms */}
							<div>
								<h3 className="text-lg font-semibold text-slate-950">
									Algorithms
								</h3>

								<ul className="mt-3 space-y-2 text-sm text-slate-600 leading-relaxed">
									<li>
										Fuzzy search implemented using the{" "}
										<span className="font-medium text-slate-900">
											Levenshtein distance
										</span>{" "}
										algorithm.
									</li>

									<li>
										This allows approximate matching when user input contains
										typos or partial strings.
									</li>

									<li>
										Example: searching for <code>fendr</code> still matches{" "}
										<code>Fender</code>.
									</li>

									<li>
										Candidate results are scored by edit distance and filtered
										using a similarity threshold.
									</li>
								</ul>
							</div>

							{/* Improvements */}
							<div>
								<h3 className="text-lg font-semibold text-slate-950">
									Areas for Improvement
								</h3>

								<ul className="mt-3 space-y-2 text-sm text-slate-600 leading-relaxed">
									<li>
										Filter metadata is currently generated from the current page
										results. A production system would return filter dimensions
										from the backend.
									</li>

									<li>
										Search ranking could incorporate weighted scoring across
										multiple fields.
									</li>

									<li>
										Fuzzy matching could be optimized using a precomputed index
										or trigram-based search.
									</li>

									<li>
										Query caching could reduce redundant API calls when
										navigating between pages.
									</li>
								</ul>
							</div>

							{/* System Design */}
							<div>
								<h3 className="text-lg font-semibold text-slate-950">
									System Design Notes
								</h3>

								<ul className="mt-3 space-y-2 text-sm text-slate-600 leading-relaxed">
									<li>
										Query parameters represent the full state of the request,
										enabling shareable URLs.
									</li>

									<li>
										The frontend uses memoized query parameter construction to
										avoid unnecessary renders.
									</li>

									<li>
										Pagination metadata returned from the API controls
										navigation state in the UI.
									</li>
								</ul>
							</div>
						</div>
					</section>
				</div>
			</section>
		</main>
	);
}
