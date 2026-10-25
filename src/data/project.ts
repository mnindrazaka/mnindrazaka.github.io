type Project = {
	title: string;
	slug: string;
	year: number;
	description: string;
	imageUrl: string;
	problem: string;
	solution: string;
	outcome: string;
	techStacks: string[];
	platforms: string[];
};

const projects: Project[] = [
	{
		title: "Point of Sale System",
		slug: "pos",
		year: 2024,
		description:
			"A point of sale system designed to help staff manage product, sales, and expenses in a coffee shop",
		imageUrl:
			"https://images.unsplash.com/photo-1602665742701-389671bc40c0?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
		problem:
			"Founded in 2023, Gatherloop Coffee Shop initially used Coda to manage customer transactions. As transaction records grew, the system became increasingly slow because it fetched all records at once and relied on client-side pagination",
		solution:
			"Built a custom POS system to manage products and customer transactions, implementing server-side pagination and filtering to improve data retrieval and handling.",
		outcome:
			"Improved system responsiveness and navigation, making transaction lookup and customer record management faster and more efficient.",
		techStacks: ["React", "React Native", "Next.js", "Typescript", "Golang"],
		platforms: ["Web", "Mobile"],
	},
	{
		title: "Board Game Play Time Tracker",
		slug: "bg-time-tracker",
		year: 2025,
		description:
			"A RFID-based ticketing system that track board game play time and calculates customer charges based on play duration",
		imageUrl:
			"https://images.unsplash.com/photo-1763875018525-1d39fe1a4354?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
		problem:
			"Game masters manually recorded customers’ play start times and calculated the total playing duration and hourly charges at checkout. This repetitive process slowed down checkout and increased operational workload.",
		solution:
			"Developed an RFID-based play time tracking system that records customers’ check-in times when they scan their tickets and automatically calculates the total play time and charges when they check out.",
		outcome:
			"Streamlined the checkout process by eliminating manual time tracking and price calculations, allowing game masters to serve customers more efficiently.",
		techStacks: ["React", "React Native", "Next.js", "Typescript", "Golang"],
		platforms: ["Web", "Mobile"],
	},
	{
		title: "Inventory Management System",
		slug: "inventory",
		year: 2026,
		description:
			"A system to manage and track stock of raw material so coffee shop staff can know when and what to purchase",
		imageUrl:
			"https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2372&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
		problem:
			"Weekly inventory checks required staff to manually inspect stock levels and determine how much of each raw material to purchase. Reviewing items one by one made the process time-consuming and inefficient.",
		solution:
			"Developed an inventory management feature within the POS system to support weekly stock checks and automatically calculate the required purchase quantities for each raw material based on current stock levels.",
		outcome:
			"Streamlined weekly inventory checks and reduced the time and manual effort required to prepare purchase lists.",
		techStacks: ["React", "React Native", "Next.js", "Typescript", "Golang"],
		platforms: ["Web", "Mobile"],
	},
	{
		title: "Table Ordering System",
		slug: "table-ordering",
		year: 2026,
		description:
			"A web based application that allow customer to order menu without leaving their table. Fully integrated with the POS system. Increase sales for the coffee shop",
		imageUrl:
			"https://images.unsplash.com/photo-1709719263375-a8642532161d?q=80&w=2216&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
		problem:
			"Gatherloop's bar is located on the first floor, while seating is available on the second floor. Customers upstairs had to go downstairs to place orders, creating friction that could discourage them from ordering additional items.",
		solution:
			"Developed a QR code-based table ordering system that allows customers to browse the menu and place orders directly from their tables. Customers receive notifications on their phones when their orders are ready for pickup at the cashier.",
		outcome:
			"Improved ordering convenience by reducing the effort required to place orders, creating a smoother customer experience and opportunities for additional sales.",
		techStacks: ["React", "Next.js", "Typescript", "Golang"],
		platforms: ["Web"],
	},
];

export const getProjects = () => Promise.resolve(projects);

export const getProjectBySlug = (slug: string): Promise<Project> =>
	new Promise((resolve, reject) => {
		const project = projects.find((project) => project.slug === slug);
		if (project) {
			resolve(project);
		} else {
			reject("Project not found");
		}
	});
