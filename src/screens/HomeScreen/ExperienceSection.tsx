import { motion } from "motion/react";
import type { Experience } from "#/data/experience";

export type ExperienceSectionProps = {
	experiences: Experience[];
};

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
	return (
		<div className="flex justify-center mt-20">
			<div className="flex flex-col sm:flex-row p-4 gap-12 container">
				<div className="flex flex-col gap-10 p-4">
					<div className="flex flex-col justify-center items-start gap-3">
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							viewport={{ once: true }}
							className="text-yellow-500 text-2xl"
						>
							Experiences
						</motion.p>

						<motion.h1
							className="text-5xl font-bold"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							viewport={{ once: true }}
						>
							My Work Experiences
						</motion.h1>
						<motion.p
							className="max-w-xl text-2xl"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							viewport={{ once: true }}
						>
							My journey from crafting user interfaces to tackling performance,
							cross-platform development, team leadership, and fullstack
							development
						</motion.p>
					</div>

					{experiences.map((experience) => (
						<div key={experience.id} className="flex flex-col gap-5">
							<div className="border"></div>

							<div className="flex flex-col md:flex-row gap-10">
								<div className="min-w-3xs">
									<motion.p
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.4, ease: "easeOut" }}
										className="text-gray-400"
										viewport={{ once: true }}
									>
										{experience.start}{" "}
										{experience.end ? `- ${experience.end}` : null}
									</motion.p>
								</div>
								<div className="flex flex-col">
									<motion.h1
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.4, ease: "easeOut" }}
										className="text-3xl font-bold"
										viewport={{ once: true }}
									>
										{experience.role}
									</motion.h1>
									<motion.a
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.4, ease: "easeOut" }}
										href="https://google.com"
										className="text-yellow-500 text-xl"
										viewport={{ once: true }}
									>
										{experience.company}
									</motion.a>
									<motion.p
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.4, ease: "easeOut" }}
										className="mt-3 text-2xl max-w-2xl"
										viewport={{ once: true }}
									>
										{experience.description}
									</motion.p>
								</div>
							</div>
						</div>
					))}

					<div className="border"></div>
				</div>
			</div>
		</div>
	);
}
