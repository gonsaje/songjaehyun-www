import { Suspense } from "react";
import TallymarkDemoClient from "@/components/tallymark/TallymarkDemoClient";

export default function TallymarkDemoPage() {
	
	return (
		<Suspense fallback={
			<main className="min-h-screen bg-slate-100 px-6 py-8 text-slate-950">
			<div className="mx-auto max-w-[1500px] rounded-xl border border-slate-200 bg-white p-6">
				Loading Tallymark...
			</div>
			</main>
		}>
			<TallymarkDemoClient></TallymarkDemoClient>
		</Suspense>
	);
}

