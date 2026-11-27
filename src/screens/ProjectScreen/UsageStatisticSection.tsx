import {
	Item,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "#/components/ui/item";
import type { Project } from "#/data/project";

export type UsageStatisticSectionProps = {
	usageStatistics: Project["usageStatistics"];
};

export function UsageStatisticSection({
	usageStatistics,
}: UsageStatisticSectionProps) {
	return (
		<div className="max-w-lg flex flex-col gap-3">
			<h1 className="font-bold text-3xl">Usage Statistics</h1>
			<div className="border"></div>
			<div className="flex w-full max-w-md flex-col gap-6">
				{usageStatistics.map(({ label, value }) => (
					<Item
						variant="outline"
						key={label}
						className="bg-neutral-900 border-neutral-900"
					>
						<ItemContent>
							<ItemTitle className="text-2xl">{value}</ItemTitle>
							<ItemDescription className="text-lg">{label}</ItemDescription>
						</ItemContent>
					</Item>
				))}
			</div>
		</div>
	);
}
