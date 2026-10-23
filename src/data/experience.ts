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

export const getExperiences = () => Promise.resolve(experiences);
