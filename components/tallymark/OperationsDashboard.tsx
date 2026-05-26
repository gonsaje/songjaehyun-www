import { DashboardTab } from "@/lib/tallymark/types";

export default function OperationsDashboard({
	activeTab,
	onTabChange,
	funds,
	investors,
}: {
	activeTab: DashboardTab;
	onTabChange: (tab: DashboardTab) => void;
	funds: React.ReactNode;
	investors: React.ReactNode;
}) {
	return (
		<section className="rounded-lg border border-slate-200 bg-white">
			<div className="flex flex-col gap-3 border-b border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
				<h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
					Review Dashboard
				</h2>
				<div className="flex gap-2 rounded-lg bg-slate-100 p-1">
					{(["funds", "investors"] as DashboardTab[]).map((tab) => (
						<button
							key={tab}
							type="button"
							onClick={() => onTabChange(tab)}
							className={[
								"rounded-md px-4 py-2 text-sm font-semibold capitalize transition",
								activeTab === tab
									? "bg-white text-slate-950 shadow-sm"
									: "text-slate-600 hover:text-slate-950",
							].join(" ")}
						>
							{tab}
						</button>
					))}
				</div>
			</div>
			<div>{activeTab === "funds" ? funds : investors}</div>
		</section>
	);
}


