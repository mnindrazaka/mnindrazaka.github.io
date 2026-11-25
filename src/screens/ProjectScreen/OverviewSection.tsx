import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "#/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip";

export type OverviewSectionProps = {
	imageUrl: string;
	year: number;
	title: string;
	description: string;
	problem: string;
	solution: string;
	outcome: string;
	codeUrl: string;
	liveUrl: string;
};

export function OverviewSection({
	description,
	imageUrl,
	outcome,
	problem,
	solution,
	title,
	year,
	codeUrl,
	liveUrl,
}: OverviewSectionProps) {
	return (
		<div className="flex flex-col md:flex-row min-h-screen gap-12">
			<div
				className={`flex-1 p-4 bg-cover bg-center rounded-lg min-h-50`}
				style={{ backgroundImage: `url('${imageUrl}')` }}
			></div>

			<div className="flex-1 flex flex-col gap-8 bg-background">
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
					{year}
				</motion.h2>
				<motion.h1
					className="text-5xl font-bold max-w-lg"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, ease: "easeOut" }}
					viewport={{ once: true }}
				>
					{title}
				</motion.h1>
				<motion.p
					className="text-2xl max-w-md"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, ease: "easeOut" }}
					viewport={{ once: true }}
				>
					{description}
				</motion.p>
				<div className="flex flex-wrap gap-3 mt-5 mb-5">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, ease: "easeOut" }}
						viewport={{ once: true }}
					>
						<Button asChild size="xl">
							<a href={codeUrl}>View Code</a>
						</Button>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, ease: "easeOut" }}
						viewport={{ once: true }}
					>
						<Button variant="secondary" size="xl" asChild>
							<a href={liveUrl}>View Live Demo</a>
						</Button>
					</motion.div>
				</div>

				<div className="max-w-lg flex flex-col gap-3">
					<h1 className="font-bold text-3xl">PROBLEM</h1>
					<div className="border"></div>
					<p className="text-xl">{problem}</p>
				</div>

				<div className="max-w-lg flex flex-col gap-3">
					<h1 className="font-bold text-3xl">SOLUTION</h1>
					<div className="border"></div>

					<p className="text-xl">{solution}</p>
				</div>

				<div className="max-w-lg flex flex-col gap-3">
					<h1 className="font-bold text-3xl">OUTCOME</h1>
					<div className="border"></div>
					<p className="text-xl">{outcome}</p>
				</div>
			</div>
		</div>
	);
}
