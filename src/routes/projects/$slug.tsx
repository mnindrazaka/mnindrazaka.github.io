import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { getProjectBySlug } from "#/data/project";

export const Route = createFileRoute("/projects/$slug")({
	component: RouteComponent,
	loader: async ({ params }) => ({
		project: await getProjectBySlug(params.slug),
	}),
});

function RouteComponent() {
	const { project } = Route.useLoaderData();
	return (
		<div className="flex flex-col justify-center pt-10 p-4">
			<div className="flex flex-col sm:flex-row min-h-screen gap-12">
				<div
					className={`flex-1 p-4 bg-cover bg-center rounded-lg`}
					style={{ backgroundImage: `url('${project.imageUrl}')` }}
				></div>

				<div className="flex-1 flex flex-col gap-2 bg-background">
					<Link to="/" className="flex gap-2 items-center" href="/">
						<ArrowLeft size="20px" />
						<p>Back to Home</p>
					</Link>
					<motion.h2
						className="text-2xl text-yellow-500 flex items-center gap-2"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, ease: "easeOut" }}
						viewport={{ once: true }}
					>
						{project.year}
					</motion.h2>
					<motion.h1
						className="text-5xl font-bold max-w-lg"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, ease: "easeOut" }}
						viewport={{ once: true }}
					>
						{project.title}
					</motion.h1>
					<motion.p
						className="text-xl max-w-md"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, ease: "easeOut" }}
						viewport={{ once: true }}
					>
						{project.description}
					</motion.p>
					<div className="flex flex-col self-stretch sm:flex-row gap-3 mt-5 mb-5">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							viewport={{ once: true }}
						>
							<Button>View Code</Button>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							viewport={{ once: true }}
						>
							<Button variant="secondary">View Live Demo</Button>
						</motion.div>
					</div>

					<div className="max-w-lg flex flex-col gap-3">
						<h1 className="font-bold text-2xl">PROBLEM</h1>
						<div className="border"></div>
						<p className="text-lg">{project.problem}</p>
					</div>

					<div className="max-w-lg flex flex-col gap-3">
						<h1 className="font-bold text-2xl">SOLUTION</h1>
						<div className="border"></div>

						<p className="text-lg">{project.solution}</p>
					</div>

					<div className="max-w-lg flex flex-col gap-3">
						<h1 className="font-bold text-2xl">OUTCOME</h1>
						<div className="border"></div>
						<p className="text-lg">{project.outcome}</p>
					</div>
				</div>
			</div>

			<div className="max-w-lg flex flex-col gap-3 mt-12 mb-5">
				<h1 className="font-bold text-2xl">PLATFORM</h1>
				<div className="border"></div>
			</div>

			<div className="flex flex-col lg:flex-row gap-3">
				{project.platforms.map((platform) => (
					<Badge key={platform}>{platform}</Badge>
				))}
			</div>

			<div className="max-w-lg flex flex-col gap-3 mt-12 mb-5">
				<h1 className="font-bold text-2xl">TECH STACK</h1>
				<div className="border"></div>
			</div>

			<div className="flex flex-col lg:flex-row gap-3">
				{project.techStacks.map((techStack) => (
					<Badge key={techStack}>{techStack}</Badge>
				))}
			</div>

			<div className="max-w-lg flex flex-col gap-3 mt-12 mb-5">
				<h1 className="font-bold text-2xl">SCREENSHOT</h1>
				<div className="border"></div>
			</div>

			<div className="flex flex-col lg:flex-row gap-5">
				<img
					className="rounded-lg w-full max-w-full lg:max-w-xs"
					src="https://picsum.photos/300/200"
					alt=""
				/>
				<img
					className="rounded-lg w-full max-w-full lg:max-w-xs"
					src="https://picsum.photos/300/200"
					alt=""
				/>
				<img
					className="rounded-lg w-full max-w-full lg:max-w-xs"
					src="https://picsum.photos/300/200"
					alt=""
				/>
			</div>
		</div>
	);
}
