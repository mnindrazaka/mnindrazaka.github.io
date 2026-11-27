export type Project = {
	title: string;
	slug: string;
	year: number;
	client: string;
	codeUrl: string;
	liveUrl: string;
	description: string;
	imageUrl: string;
	problem: string;
	solution: string;
	outcome: string;
	techStacks: string[];
	platforms: string[];
	features: { title: string; description: string }[];
	usageStatistics: {
		label: string;
		value: string;
	}[];
	screenshots: {
		url: string;
		caption: string;
	}[];
};

const projects: Project[] = [
	{
		title: "Point of Sale System",
		slug: "pos",
		client: "Gatherloop Board Game Cafe",
		codeUrl: "https://github.com/gatherloop/gatherloop-monorepo",
		liveUrl: "https://gatherloop-pos-preview.vercel.app",
		year: 2024,
		description:
			"A point of sale system designed to help staff manage product, sales, and expenses in a coffee shop",
		imageUrl: "/pos/hero.avif",
		problem:
			"Founded in 2023, Gatherloop Coffee Shop initially used Coda to manage customer transactions. As transaction records grew, the system became increasingly slow because it fetched all records at once and relied on client-side pagination",
		solution:
			"Built a custom POS system to manage products and customer transactions, implementing server-side pagination and filtering to improve data retrieval and handling.",
		outcome:
			"Improved system responsiveness and navigation, making transaction lookup and customer record management faster and more efficient.",
		techStacks: ["React", "React Native", "Next.js", "Typescript", "Golang"],
		platforms: ["Web", "Mobile"],
		features: [
			{
				title: "Business Dashboard",
				description:
					"View key business numbers like total transactions, monthly expenses, and budgets",
			},
			{
				title: "Transactions",
				description:
					"Create transactions and filter them by pager number, table number, or payment method",
			},
			{
				title: "Print Invoice",
				description: "Connect with thermal printer and print the invoice",
			},
			{
				title: "Coupon",
				description:
					"Create percentage or fixed-amount coupons for transactions",
			},
			{ title: "Categories", description: "Organize products into categories" },
			{
				title: "Products",
				description:
					"Manage menu items and their variants, such as iced, hot, or flavors",
			},
			{
				title: "Materials",
				description: "Manage the raw materials used in each product",
			},
			{
				title: "COGS (Cost of Goods Sold)",
				description:
					"Calculate each product's cost from the raw materials it uses",
			},
			{
				title: "Expenses",
				description:
					"Record expenses by type, such as operations or stock purchases",
			},
			{
				title: "Cashier Reconciliation",
				description:
					"Compare the POS balance with the actual cash in the register",
			},
			{
				title: "Budgets",
				description: "Allocate expenses using percentage-based budgets",
			},
		],
		usageStatistics: [
			{ label: "Transactions", value: "20000+" },
			{ label: "Products", value: "200+" },
			{ label: "Materials", value: "150+" },
			{ label: "Expenses", value: "2500+" },
		],
		screenshots: [
			{ url: "/pos/dashboard.avif", caption: "Business dashboard" },
			{
				url: "/pos/transaction-create.avif",
				caption: "Create new transaction",
			},
			{ url: "/pos/transaction-list.avif", caption: "Show transaction list" },
			{
				url: "/pos/variant-update.avif",
				caption: "Product materials and cost",
			},
		],
	},
	{
		title: "Board Game Play Time Tracker",
		slug: "bg-time-tracker",
		client: "Gatherloop Board Game Cafe",
		codeUrl: "https://github.com/gatherloop/gatherloop-monorepo",
		liveUrl: "https://gatherloop-pos-preview.vercel.app",
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
		features: [
			{
				title: "Board Game Ticket Management",
				description: "Manage RFID tickets and assign labels to them",
			},
			{
				title: "Ticket Pricing Management",
				description:
					"Set flexible pricing, such as hourly, all-day pass, or hour packages",
			},
			{
				title: "Check-in and Check-out",
				description:
					"Scan a ticket to start and end play. Play time and price are calculated automatically",
			},
		],
		usageStatistics: [
			{ label: "Total Play Time Hours", value: "65000+" },
			{ label: "Board Game Transaction", value: "2500+" },
		],
		screenshots: [
			{ url: "/boardgame/ticket-list.avif", caption: "Manage ticket label" },
			{
				url: "/boardgame/ticket-pricing.avif",
				caption: "Set ticket pricing based on duration",
			},
			{
				url: "/boardgame/rental-list.avif",
				caption: "Manage playing session",
			},
			{
				url: "/boardgame/checkout.avif",
				caption: "Checkout ticket after playing",
			},
		],
	},
	{
		title: "Inventory Management System",
		slug: "inventory",
		client: "Gatherloop Board Game Cafe",
		codeUrl: "https://github.com/gatherloop/gatherloop-monorepo",
		liveUrl: "https://gatherloop-pos-preview.vercel.app",
		year: 2026,
		description:
			"A system to manage and track stock of raw material so coffee shop staff can know when and what to purchase",
		imageUrl: "/inventory/hero.avif",
		problem:
			"Weekly inventory checks required staff to manually inspect stock levels and determine how much of each raw material to purchase. Reviewing items one by one made the process time-consuming and inefficient.",
		solution:
			"Developed an inventory management feature within the POS system to support weekly stock checks and automatically calculate the required purchase quantities for each raw material based on current stock levels.",
		outcome:
			"Streamlined weekly inventory checks and reduced the time and manual effort required to prepare purchase lists.",
		techStacks: ["React", "React Native", "Next.js", "Typescript", "Golang"],
		platforms: ["Web", "Mobile"],
		features: [
			{
				title: "Supplier Management",
				description:
					"Manage suppliers and their purchase channels, such as online store, offline store, or delivery",
			},
			{
				title: "Stock Check Management",
				description:
					"Perform daily, weekly, or monthly stock checks to keep materials available",
			},
			{
				title: "Purchase List",
				description:
					"Generate a purchase list automatically from stock check results",
			},
		],
		usageStatistics: [
			{ label: "Suppliers", value: "20" },
			{ label: "Stock Check Performed", value: "50+" },
			{ label: "Purchase List Created", value: "50+" },
		],
		screenshots: [
			{
				url: "/inventory/stock-check.avif",
				caption: "Perform raw material stock check",
			},
			{
				url: "/inventory/purchase-list.avif",
				caption: "Generate purchase list based on stock check",
			},
			{ url: "/inventory/material-list.avif", caption: "Manage raw materials" },
			{
				url: "/inventory/supplier-list.avif",
				caption: "Manage suppliers",
			},
		],
	},
	{
		title: "Table Ordering System",
		slug: "table-ordering",
		client: "Gatherloop Board Game Cafe",
		codeUrl: "https://github.com/gatherloop/gatherloop-monorepo",
		liveUrl: "https://gatherloop-order-preview.vercel.app/t/W1A19QVFE3",
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
		features: [
			{
				title: "Tables Management",
				description: "Register tables and their numbers",
			},
			{
				title: "Tags",
				description:
					"Label products, such as 'Best Seller', 'New', or 'Barista's Choice', and filter by them",
			},
			{
				title: "Availability",
				description:
					"Mark products or variants as sold out, or update their stock",
			},
			{
				title: "Cash or QRIS Payment",
				description: "Pay with cash or QRIS through the DOKU payment gateway",
			},
			{
				title: "Push Notification for Barista",
				description: "Alert baristas instantly when a table places an order",
			},
			{
				title: "WhatsApp Notification",
				description:
					"Message customers on WhatsApp when their order is ready for pickup",
			},
		],
		usageStatistics: [
			{ label: "Transaction Ordered From Table", value: "892" },
			{ label: "Unique Customer Ordered", value: "382" },
			{ label: "Push Notification Sent to Barista", value: "1500+" },
			{ label: "Whatsapp Notification Sent to Customer", value: "786" },
		],
		screenshots: [
			{ url: "/table-order/menu.avif", caption: "Show available menu" },
			{ url: "/table-order/cart.avif", caption: "Show cart" },
			{
				url: "/table-order/confirmation.avif",
				caption: "Payment confirmation",
			},
			{
				url: "/table-order/payment.avif",
				caption: "Scan QR payment",
			},
		],
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
