import { motion, type Variants } from "motion/react";
import type { Note } from "#/data/note";

const staggerContainer: Variants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.08,
		},
	},
};

const fadeUp: Variants = {
	hidden: {
		opacity: 0,
		y: 12,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

export type NoteSectionProps = {
	notes: Note[];
};

export function NoteSection({ notes }: NoteSectionProps) {
	const dateFormatter = new Intl.DateTimeFormat("en-GB", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23",
	});
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
							Notes
						</motion.p>

						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							className="text-5xl font-bold"
							viewport={{ once: true }}
						>
							My Learning Notes
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							className="max-w-xl text-2xl"
							viewport={{ once: true }}
						>
							Short notes on things I learn, problems I solve, and lessons worth
							remembering along the way
						</motion.p>
					</div>

					<motion.div
						key="loaded"
						className="flex gap-10 flex-wrap"
						variants={staggerContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.15 }}
					>
						{notes.map((note) => (
							<motion.a
								key={note.guid}
								href={note.link}
								variants={fadeUp}
								whileHover={{ y: -3 }}
								whileTap={{ scale: 0.99 }}
								transition={{ duration: 0.2 }}
								className="basis-[100%] sm:basis-[45%] md:basis-[29%] flex flex-col justify-between"
								viewport={{ once: true }}
							>
								<div className="flex flex-col gap-2">
									<img
										src={note.enclosure.link}
										alt=""
										className="rounded-lg mb-5 w-full aspect-video object-cover max-w-full sm:max-w-xs"
									/>
									<h1 className="text-2xl font-bold">{note.title}</h1>
									<p className="text-gray-400 text-lg">{note.description}</p>
									<p className="text-md mt-3">
										{dateFormatter
											.format(new Date(note.pubDate))
											.replace(",", "")}
									</p>
								</div>
							</motion.a>
						))}
					</motion.div>
				</div>
			</div>
		</div>
	);
}
