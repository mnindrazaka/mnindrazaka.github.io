import { AppWindow, Code, CpuAi, Rocket } from "lucide-react";
import { motion } from "motion/react";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "#/components/ui/item";

const services = [
	{
		title: "Product Development",
		description:
			"Building production-ready applications from idea to deployment",
		icon: <Code />,
	},
	{
		title: "Built Design System",
		description: "Creating reusable components and scalable UI foundations",
		icon: <AppWindow />,
	},
	{
		title: "Web Performance Optimization",
		description: "Making web applications faster and efficient",
		icon: <Rocket />,
	},
	{
		title: "Built AI Feature",
		description: "Bringing intelligent capabilities into digital products",
		icon: <CpuAi />,
	},
];

export function ServiceSection() {
	return (
		<div className="flex justify-center mt-20 bg-neutral-900 py-10">
			<div className="flex flex-col p-8 gap-12 container">
				<div className="flex flex-1 flex-col justify-center gap-3">
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, ease: "easeOut" }}
						viewport={{ once: true }}
						className="text-yellow-500 text-2xl"
					>
						Services
					</motion.p>

					<motion.h1
						className="text-5xl font-bold"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, ease: "easeOut" }}
						viewport={{ once: true }}
					>
						What I Do
					</motion.h1>
					<motion.p
						className="max-w-xl text-2xl"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, ease: "easeOut" }}
						viewport={{ once: true }}
					>
						I help turn ideas into functional, scalable, and delightful digital
						experiences.
					</motion.p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
					{services.map(({ title, description, icon }) => (
						<Item
							variant="outline"
							className="p-8 flex-1 h-full flex flex-col items-start border-neutral-800 bg-neutral-800"
							key={title}
						>
							<ItemContent>
								{icon}
								<ItemTitle className="text-2xl">{title}</ItemTitle>
								<ItemDescription className="text-lg">
									{description}
								</ItemDescription>
							</ItemContent>
						</Item>
					))}
				</div>
			</div>
		</div>
	);
}
