import {
	Item,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "#/components/ui/item";
import type { Project } from "#/data/project";

export type FeatureSectionProps = {
	features: Project["features"];
};

export function FeatureSection({ features }: FeatureSectionProps) {
	return (
		<div className="max-w-lg flex flex-col gap-3">
			<h1 className="font-bold text-3xl">Highlighted Features</h1>
			<div className="border"></div>
			<div className="flex w-full max-w-md flex-col gap-6">
				{features.map((feature) => (
					<Item
						variant="outline"
						key={feature.title}
						className="bg-neutral-900 border-neutral-900"
					>
						<ItemContent>
							<ItemTitle className="text-xl">{feature.title}</ItemTitle>
							<ItemDescription className="text-lg">
								{feature.description}
							</ItemDescription>
						</ItemContent>
					</Item>
				))}
			</div>
		</div>
	);
}
