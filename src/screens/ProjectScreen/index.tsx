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
		<div className="flex flex-col justify-center pt-10 p-4 container mx-auto">
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

			<div className="flex flex-col md:flex-row gap-8">
				<FeatureSection features={project.features} />
				<UsageStatisticSection usageStatistics={project.usageStatistics} />
				<div>
					<PlatformSection platforms={project.platforms} />
					<TechStackSection techStacks={project.techStacks} />
				</div>
			</div>
		</div>
	);
}
