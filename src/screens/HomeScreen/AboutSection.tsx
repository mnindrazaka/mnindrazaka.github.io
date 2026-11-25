import { motion } from "motion/react";

export function AboutSection() {
	return (
		<div className="flex justify-center mt-20">
			<div className="flex flex-col sm:flex-row p-4 gap-12 container">
				<div className="flex-1 bg-gray-950 border border-gray-800 rounded-lg">
					<motion.img
						className="w-full rounded-lg"
						src="/profile.webp"
						alt=""
						initial={{ scale: 0.9, y: 12 }}
						whileInView={{ scale: 1, y: 0 }}
						transition={{ duration: 0.4, ease: "easeOut" }}
						viewport={{ once: true }}
					/>
				</div>
				<div className="flex-2 flex flex-col justify-center items-start gap-3 bg-background">
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, ease: "easeOut" }}
						viewport={{ once: true }}
						className="text-yellow-500 text-2xl"
					>
						About
					</motion.p>

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
						className="max-w-xl text-2xl"
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
	);
}
