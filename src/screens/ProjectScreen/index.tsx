import type { Project } from "#/data/project";
import { FeatureSection } from "./FeatureSection";
import { OverviewSection } from "./OverviewSection";
import { PlatformSection } from "./PlatformSection";
import { ScreenshotSection } from "./ScreenshotSection";
import { TechStackSection } from "./TechStackSection";
import { UsageStatisticSection } from "./UsageStatisticSection";

type ProjectScreenProps = {
	project: Project;
};

export function ProjectScreen({ project }: ProjectScreenProps) {
	return (
		<div className="flex flex-col">
			<OverviewSection
				description={project.description}
				imageUrl={project.imageUrl}
				outcome={project.outcome}
				problem={project.problem}
				solution={project.solution}
				title={project.title}
				year={project.year}
				codeUrl={project.codeUrl}
				liveUrl={project.liveUrl}
			/>

			<div className="my-20">
				<ScreenshotSection screenshots={project.screenshots} />
			</div>

			<div className="p-8">
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 container mx-auto">
					<FeatureSection features={project.features} />
					<UsageStatisticSection usageStatistics={project.usageStatistics} />
					<div>
						<PlatformSection platforms={project.platforms} />
						<TechStackSection techStacks={project.techStacks} />
					</div>
				</div>
			</div>
		</div>
	);
}
