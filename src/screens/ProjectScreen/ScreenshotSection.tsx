import type { Project } from "#/data/project";

export type ScreenshotSection = {
	screenshots: Project["screenshots"];
};

export function ScreenshotSection({ screenshots }: ScreenshotSection) {
	return (
		<div className="flex mt-12 mb-5 gap-8">
			<div className="flex-1">
				<div className="max-w-lg flex flex-col gap-3">
					<h1 className="font-bold text-2xl">SCREENSHOTS</h1>
					<div className="border mb-5"></div>
				</div>

				<div className="flex flex-wrap gap-5">
					{screenshots.map(({ url, caption }) => (
						<div key={caption} className="flex flex-col gap-2">
							<img
								className="rounded-lg w-full max-w-full lg:max-w-xs"
								src={url}
								alt={caption}
							/>
							<p className="text-md">{caption}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
