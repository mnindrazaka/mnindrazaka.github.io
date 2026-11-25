import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import type { Project } from "#/data/project";

export type ProjectSectionProps = {
	projects: Project[];
};

export function ProjectSection({ projects }: ProjectSectionProps) {
	return (
		<div className="flex justify-center mt-10" id="project">
			<div className="container">
				<div className="flex flex-col gap-20 p-4">
					<div className="flex flex-col justify-center items-center gap-3">
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							viewport={{ once: true }}
							className="text-yellow-500 text-2xl"
						>
							Projects
						</motion.p>

						<motion.h1
							className="text-5xl font-bold text-center"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							viewport={{ once: true }}
						>
							Selected Work
						</motion.h1>
						<motion.p
							className="max-w-md text-2xl text-center"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							viewport={{ once: true }}
						>
							Showcasing my approach to build digital product for solving
							business problem
						</motion.p>
					</div>

					{projects.map((project, index) => (
						<div
							key={project.slug}
							className={`flex flex-col ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"} gap-10 items-center`}
						>
							<div className="flex-2">
								<motion.img
									initial={{ scale: 0.9, y: 12 }}
									whileInView={{ scale: 1, y: 0 }}
									transition={{ duration: 0.4, ease: "easeOut" }}
									className="w-full aspect-3/2 object-cover rounded-lg"
									src={project.imageUrl}
									alt=""
									viewport={{ once: true }}
								/>
							</div>

							<div className="flex-1 flex flex-col gap-3">
								<motion.p
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, ease: "easeOut" }}
									viewport={{ once: true }}
									className="text-2xl text-yellow-500"
								>
									{project.year}
								</motion.p>
								<motion.h1
									className="text-4xl md:text-5xl font-bold"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, ease: "easeOut" }}
									viewport={{ once: true }}
								>
									{project.title}
								</motion.h1>
								<motion.p
									className="max-w-md text-2xl"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, ease: "easeOut" }}
									viewport={{ once: true }}
								>
									{project.description}
								</motion.p>
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, ease: "easeOut" }}
									viewport={{ once: true }}
								>
									<Link to="/projects/$slug" params={{ slug: project.slug }}>
										<Button className="self-start mt-5" size="xl">
											View Project
										</Button>
									</Link>
								</motion.div>
							</div>
						</div>
					))}
				</div>
				<div className="flex justify-center mt-8">
					<Badge variant="outline" className="py-2 px-3 text-2xl">
						More projects coming soon ...
					</Badge>
				</div>
			</div>
		</div>
	);
}
