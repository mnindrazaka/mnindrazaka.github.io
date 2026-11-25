import type { Project } from "#/data/project";

export type TechStackSection = {
	techStacks: Project["techStacks"];
};

export function TechStackSection({ techStacks }: TechStackSection) {
	return (
		<div>
			<div className="max-w-lg flex flex-col gap-3 mt-12 mb-5">
				<h1 className="font-bold text-2xl">TECH STACKS</h1>
				<div className="border"></div>
			</div>

			<div className="flex flex-wrap gap-3">
				{techStacks.map((techStack) => (
					<p
						className="bg-white text-black rounded-sm px-5 py-2"
						key={techStack}
					>
						{techStack}
					</p>
				))}
			</div>
		</div>
	);
}
