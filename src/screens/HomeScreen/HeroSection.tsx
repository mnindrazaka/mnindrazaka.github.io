import { Hand } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "#/components/ui/button";

export function HeroSection() {
	return (
		<div className="flex flex-col md:flex-row p-8 h-screen gap-12">
			<div className="flex-1 p-4 bg-cover bg-right rounded-lg bg-[url(/hero.webp)]"></div>
			<div className="flex-1 flex flex-col justify-between items-center md:items-start gap-3 bg-background">
				<div className="flex gap-8 mt-4"></div>
				<div className="flex flex-col items-center md:items-start gap-3">
					<motion.h2
						className="text-3xl text-yellow-500 flex items-center gap-2"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, ease: "easeOut" }}
						viewport={{ once: true }}
					>
						Hey, I'm Aka <Hand />
					</motion.h2>
					<motion.h1
						className="text-center md:text-left text-5xl font-bold"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, ease: "easeOut" }}
						viewport={{ once: true }}
					>
						Frontend Engineer
					</motion.h1>
					<motion.p
						className="text-2xl max-w-md text-center md:text-left"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, ease: "easeOut" }}
						viewport={{ once: true }}
					>
						I build intuitive, high-performance experiences across web and
						mobile, and the reliable systems behind them
					</motion.p>
					<div className="flex flex-col self-stretch md:flex-row gap-3 mt-5">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							viewport={{ once: true }}
							className="flex justify-center"
						>
							<Button size="xl" className="w-full" asChild>
								<a href="#contact">Contact me</a>
							</Button>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							viewport={{ once: true }}
							className="flex justify-center"
						>
							<Button variant="secondary" size="xl" className="w-full">
								<a href="#project">View my works</a>
							</Button>
						</motion.div>
					</div>
				</div>
				<div></div>
			</div>
		</div>
	);
}
