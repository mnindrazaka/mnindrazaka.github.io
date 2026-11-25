import { Mail } from "lucide-react";
import { motion } from "motion/react";
import { LinkedinIcon } from "#/components/icons/lucide-linkedin";
import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";

export function ContactSection() {
	return (
		<div className="flex justify-center mt-20 m-auto container">
			<Card className="w-full">
				<CardContent>
					<div className="flex p-4 gap-8 items-center">
						<div className="flex flex-col justify-center items-start gap-5 border-indigo-500">
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, ease: "easeOut" }}
								viewport={{ once: true }}
								className="text-yellow-500 text-2xl"
							>
								Contact
							</motion.p>
							<h1 className="text-5xl font-bold">Let's Talk</h1>
							<p className="text-2xl max-w-sm">
								Got a good opportunity ? Have something to build ? Lets talk
								about it
							</p>
							<div className="flex flex-col sm:flex-row gap-5">
								<Button>
									<Mail />
									mnindrazaka@gmail.com
								</Button>

								<Button>
									<LinkedinIcon />
									mnindrazaka
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
