import type { Project } from "#/data/project";

export type PlatformSectionProps = {
	platforms: Project["platforms"];
};

export function PlatformSection({ platforms }: PlatformSectionProps) {
	return (
		<div>
			<div className="max-w-lg flex flex-col gap-3">
				<h1 className="font-bold text-2xl">PLATFORMS</h1>
				<div className="border mb-5"></div>
			</div>

			<div className="flex flex-wrap gap-3">
				{platforms.map((platform) => (
					<p
						className="bg-white text-black rounded-sm px-5 py-2"
						key={platform}
					>
						{platform}
					</p>
				))}
			</div>
		</div>
	);
}
