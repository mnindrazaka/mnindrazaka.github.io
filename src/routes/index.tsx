import { createFileRoute, Link } from "@tanstack/react-router";
import { Hand, Mail } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import { LinkedinIcon } from "#/components/icons/lucide-linkedin";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Skeleton } from "#/components/ui/skeleton";

export const Route = createFileRoute("/")({
	component: App,
});

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

type Experience = {
	id: number;
	start: number;
	end?: number;
	role: string;
	company: string;
	description: string;
};

const experiences: Experience[] = [
	{
		id: 1,
		start: 2025,
		end: 2026,
		role: "Fullstack Engineer",
		company: "ADPList",
		description:
			"Developed ADPList mentoring platform across frontend and backend. Migrated backend services from Django on EC2 to Node.js serverless functions.",
	},
	{
		id: 2,
		start: 2023,
		end: 2024,
		role: "Lead Frontend Engineer",
		company: "KarirLab",
		description:
			"Led a frontend team building recruitment products, including resume builder, job application tracking, candidate filtering, and payment subscriptions. Contributed to technical planning, architecture decisions, and cross-team delivery",
	},
	{
		id: 3,
		start: 2021,
		end: 2023,
		role: "Frontend Engineer",
		company: "Ruangguru",
		description:
			"Developed Skill Academy, an online course platform, optimizing web performance and SEO. Built a cross-platform design system enabling code sharing between web and mobile applications",
	},
	{
		id: 4,
		start: 2020,
		role: "Frontend Engineer",
		company: "Feedloop",
		description:
			"Built Kanvas, a no-code platform for creating microsites. Developed a drag-and-drop visual editor using HTML Canvas, enabling users to create campaigns without engineering assistance",
	},
];

type Project = {
	title: string;
	slug: string;
	year: number;
	description: string;
	imageUrl: string;
};

const projects: Project[] = [
	{
		title: "Point of Sale System",
		slug: "pos",
		year: 2024,
		description:
			"A point of sale system designed for coffee shop, help business owner managing sales, inventory, expenses, and statistics",
		imageUrl:
			"https://images.unsplash.com/photo-1728044849291-69f90d443aea?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
	},
	{
		title: "Board Game Play Time Tracker",
		slug: "bg-time-tracker",
		year: 2025,
		description:
			"RFID based system to track customer play time and convert it to price",
		imageUrl:
			"https://images.unsplash.com/photo-1763875018525-1d39fe1a4354?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
	},
	{
		title: "Inventory Management System",
		slug: "inventory",
		year: 2026,
		description:
			"A system to manage and track the stock of raw material in coffee shop",
		imageUrl:
			"https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2372&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
	},
	{
		title: "Table Ordering System",
		slug: "table-ordering",
		year: 2026,
		description:
			"A web based application that allow customer to order menu without leaving their table. Fully integrated with the POS system. Increase sales for the coffee shop",
		imageUrl:
			"https://images.unsplash.com/photo-1709719263375-a8642532161d?q=80&w=2216&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
	},
];

type Article = {
	guid: string;
	author: string;
	content: string;
	description: string;
	link: string;
	pubDate: string;
	thumbnail: string;
	title: string;
};

function App() {
	const [isArticleLoading, setIsArticleLoading] = useState(true);
	const [articles, setArticles] = useState<Article[]>([]);
	useEffect(() => {
		setIsArticleLoading(true);
		fetch(
			"https://api.rss2json.com/v1/api.json?rss_url=https://mnindrazaka.substack.com/feed&api_key=yo2kpldwbqueg1fnmgetuyv0czz5odjskwvxlb7g",
		)
			.then((res) => res.json())
			.then((data) => setArticles(data.items))
			.finally(() => setIsArticleLoading(false));
	}, []);

	return (
		<div>
			<div className="flex flex-col sm:flex-row p-4 h-screen gap-12">
				<div className="flex-1 p-4 bg-cover bg-center rounded-lg bg-[url(https://images.unsplash.com/photo-1759828040387-046690a60b05?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D)]"></div>
				<div className="flex-1 flex flex-col justify-center items-start gap-2 bg-background">
					<motion.h2
						className="text-2xl text-yellow-500 flex items-center gap-2"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, ease: "easeOut" }}
						viewport={{ once: true }}
					>
						Hey, I'm Aka <Hand />
					</motion.h2>
					<motion.h1
						className="text-5xl font-bold"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, ease: "easeOut" }}
						viewport={{ once: true }}
					>
						Frontend Engineer
					</motion.h1>
					<motion.p
						className="text-xl max-w-md"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, ease: "easeOut" }}
						viewport={{ once: true }}
					>
						I build intuitive, high-performance experiences across web and
						mobile, and the reliable systems behind them
					</motion.p>
					<div className="flex flex-col self-stretch sm:flex-row gap-3 mt-5">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							viewport={{ once: true }}
						>
							<Button>Contact me</Button>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							viewport={{ once: true }}
						>
							<Button variant="secondary">View my works</Button>
						</motion.div>
					</div>
				</div>
			</div>

			<div className="flex justify-center mt-10">
				<div className="container">
					<div className="flex flex-col gap-20 p-4">
						<div className="border"></div>

						<div className="flex flex-col justify-center items-start gap-2">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, ease: "easeOut" }}
								viewport={{ once: true }}
							>
								<Badge>Project</Badge>
							</motion.div>

							<motion.h1
								className="text-3xl font-bold"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, ease: "easeOut" }}
								viewport={{ once: true }}
							>
								Selected Work
							</motion.h1>
							<motion.p
								className="max-w-md text-lg"
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
									<p className="text-md text-yellow-500">{project.year}</p>
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
										className="max-w-md"
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
										<Link to="/projects/$slug" params={{ slug: "pos" }}>
											<Button className="self-start mt-5">View Project</Button>
										</Link>
									</motion.div>
								</div>
							</div>
						))}
					</div>
					<div className="flex justify-center mt-8">
						<Badge variant="outline" className="py-2 px-3 text-lg">
							More projects coming soon ...
						</Badge>
					</div>
				</div>
			</div>

			<div className="flex justify-center mt-20">
				<div className="flex flex-col sm:flex-row p-4 gap-12 container">
					<div className="flex-1 bg-gray-950 border border-gray-800 rounded-lg">
						<motion.img
							className="w-full"
							src="https://framerusercontent.com/images/YqFORO8QGMNaFi1u8DzLnYSeyM.png?width=835&height=1121"
							alt=""
							initial={{ scale: 0.9, y: 12 }}
							whileInView={{ scale: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							viewport={{ once: true }}
						/>
					</div>
					<div className="flex-2 flex flex-col justify-center items-start gap-2 bg-background">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							viewport={{ once: true }}
						>
							<Badge>About</Badge>
						</motion.div>

						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							className="text-5xl font-bold"
							viewport={{ once: true }}
						>
							Brief About Myself
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							className="max-w-lg"
							viewport={{ once: true }}
						>
							I've 5 years of experience in several startup company as Frontend
							Engineer. I enjoy building product that deliver intuitive user
							experiences, high performance, and reliability. Outside of
							engineering, I'm building a board game cafe and developing digital
							products to support its operations.
						</motion.p>
					</div>
				</div>
			</div>

			<div className="flex justify-center mt-20">
				<div className="flex flex-col sm:flex-row p-4 gap-12 container">
					<div className="flex flex-col gap-10 p-4">
						<div className="flex flex-col justify-center items-start gap-2">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, ease: "easeOut" }}
								viewport={{ once: true }}
							>
								<Badge>Experiences</Badge>
							</motion.div>

							<motion.h1
								className="text-3xl font-bold"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, ease: "easeOut" }}
								viewport={{ once: true }}
							>
								My Work Experiences
							</motion.h1>
							<motion.p
								className="max-w-lg"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, ease: "easeOut" }}
								viewport={{ once: true }}
							>
								My journey from crafting user interfaces to tackling
								performance, cross-platform development, team leadership, and
								fullstack development
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
											className="text-yellow-500"
											viewport={{ once: true }}
										>
											{experience.company}
										</motion.a>
										<motion.p
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.4, ease: "easeOut" }}
											className="mt-3"
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

			<div className="flex justify-center mt-20">
				<div className="flex flex-col sm:flex-row p-4 gap-12 container">
					<div className="flex flex-col gap-10 p-4">
						<div className="flex flex-col justify-center items-start gap-2">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, ease: "easeOut" }}
								viewport={{ once: true }}
							>
								<Badge>Notes</Badge>
							</motion.div>

							<motion.h1
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, ease: "easeOut" }}
								className="text-3xl font-bold"
								viewport={{ once: true }}
							>
								My Learning Notes
							</motion.h1>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, ease: "easeOut" }}
								className="max-w-lg"
								viewport={{ once: true }}
							>
								Short notes on things I learn, problems I solve, and lessons
								worth remembering along the way
							</motion.p>
						</div>

						{isArticleLoading ? (
							<motion.div
								key="loading"
								className="flex gap-10 flex-wrap"
								variants={staggerContainer}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.15 }}
							>
								{Array.from({ length: 4 }, (_, i) => i).map((key) => (
									<motion.div
										key={key}
										variants={fadeUp}
										className="basis-[100%] sm:basis-[45%] md:basis-[29%] lg:basis-[20%]"
									>
										<Skeleton className="w-full aspect-video rounded-lg mb-5" />
										<Skeleton className="h-6 w-3/4 mb-2" />
										<Skeleton className="h-4 w-full mb-2" />
										<Skeleton className="h-4 w-2/3" />
									</motion.div>
								))}
							</motion.div>
						) : (
							<motion.div
								key="loaded"
								className="flex gap-10 flex-wrap"
								variants={staggerContainer}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.15 }}
							>
								{articles.map((article) => (
									<motion.a
										key={article.guid}
										href={article.link}
										variants={fadeUp}
										whileHover={{ y: -3 }}
										whileTap={{ scale: 0.99 }}
										transition={{ duration: 0.2 }}
										className="basis-[100%] sm:basis-[45%] md:basis-[29%] lg:basis-[20%] flex flex-col justify-between"
										viewport={{ once: true }}
									>
										<div>
											<img
												src={article.thumbnail}
												alt=""
												className="rounded-lg mb-5 w-full aspect-video object-cover max-w-full sm:max-w-xs"
											/>
											<h1 className="text-xl font-bold">{article.title}</h1>
											<p className="text-gray-400 text-sm">
												{article.description}
											</p>
											<p className="text-xs mt-3">{article.pubDate}</p>
										</div>

										<Button className="mt-5">Read More</Button>
									</motion.a>
								))}
							</motion.div>
						)}
					</div>
				</div>
			</div>

			<div className="flex justify-center mt-20">
				<div className="flex flex-col p-4 container">
					<div className="flex flex-col justify-center items-start gap-2">
						<Badge>Contact</Badge>
						<h1 className="text-3xl font-bold">Let's Talk</h1>
						<p>Got new idea ? lets talk about it and make it real</p>
						<div className="flex gap-5">
							<Button size="icon">
								<Mail />
							</Button>

							<Button size="icon">
								<LinkedinIcon />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
