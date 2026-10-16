import { createFileRoute, Link } from "@tanstack/react-router";
import { Hand, Mail } from "lucide-react";
import { motion } from "motion/react";
import { LinkedinIcon } from "#/components/icons/lucide-linkedin";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div>
			<div className="flex flex-col sm:flex-row p-4 h-screen gap-12">
				<div className="flex-1 p-4 bg-cover bg-center rounded-lg bg-[url(https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmVydGljYWx8ZW58MHx8MHx8fDA%3D)]"></div>
				<div className="flex-1 flex flex-col justify-center items-start gap-2 bg-background">
					<Badge>
						Hi, I'm Aka <Hand />
					</Badge>
					<h1 className="text-5xl font-bold">Frontend Engineer</h1>
					<p>I turn ideas into lorem ipsum dolor sit amet</p>
					<div className="flex flex-col self-stretch sm:flex-row gap-3 mt-5">
						<Button>Contact me</Button>
						<Button variant="secondary">View my works</Button>
					</div>
				</div>
			</div>

			<div className="flex justify-center mt-10">
				<div className="container">
					<div className="flex flex-col gap-20 p-4">
						<div className="border"></div>

						<div className="flex flex-col justify-center items-start gap-2">
							<Badge>Project</Badge>
							<h1 className="text-3xl font-bold">My Recent Work</h1>
							<p>I turn ideas into lorem ipsum dolor sit amet</p>
						</div>

						<div className="flex flex-col-reverse md:flex-row gap-10 items-center">
							<div className="flex-1 flex flex-col gap-3">
								<motion.h1
									className="text-4xl md:text-5xl font-bold"
									initial={{ opacity: 0, translateY: -10, scale: 0 }}
									whileInView={{ opacity: 1, translateY: 0, scale: 1 }}
								>
									Point of Sale System
								</motion.h1>
								<motion.p
									className="max-w-md"
									initial={{ opacity: 0, translateY: -10, scale: 0 }}
									whileInView={{ opacity: 1, translateY: 0, scale: 1 }}
								>
									The personal portfol category includes websites or physic Your
									Journey Your Story The personal
								</motion.p>
								<motion.div
									initial={{ opacity: 0, translateY: -10, scale: 0 }}
									whileInView={{ opacity: 1, translateY: 0, scale: 1 }}
								>
									<Link to="/projects/$slug" params={{ slug: "pos" }}>
										<Button className="self-start mt-5">View Project</Button>
									</Link>
								</motion.div>
							</div>
							<div className="flex-2">
								<img
									className="w-full"
									src="https://framerusercontent.com/images/MaWUlkdr5YCLjzwGXBMMFb1ytA.png"
									alt=""
								/>
							</div>
						</div>

						<div className="flex flex-col md:flex-row gap-10 items-center">
							<div className="flex-2">
								<img
									className="w-full"
									src="https://framerusercontent.com/images/389EVhZc0Ue9KXVF5fuLemFbYk.png"
									alt=""
								/>
							</div>
							<div className="flex-1 flex flex-col gap-3">
								<h1 className="text-4xl md:text-5xl font-bold">
									Table Ordering System
								</h1>
								<p className="max-w-md">
									The personal portfol category includes websites or physic Your
									Journey Your Story The personal
								</p>
								<Link to="/projects/$slug" params={{ slug: "pos" }}>
									<Button className="self-start mt-5">View Project</Button>
								</Link>
							</div>
						</div>

						<div className="flex flex-col-reverse md:flex-row gap-10 items-center">
							<div className="flex-1 flex flex-col gap-3">
								<h1 className="text-4xl md:text-5xl font-bold">
									Kitchen Display System
								</h1>
								<p className="max-w-md">
									The personal portfol category includes websites or physic Your
									Journey Your Story The personal
								</p>
								<Link to="/projects/$slug" params={{ slug: "pos" }}>
									<Button className="self-start mt-5">View Project</Button>
								</Link>
							</div>
							<div className="flex-2">
								<img
									className="w-full"
									src="https://framerusercontent.com/images/cKWR5Grjkr174dH7anBPJdrIY.png?scale-down-to=2048"
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex justify-center mt-20">
				<div className="flex flex-col sm:flex-row p-4 gap-12 container">
					<div className="flex-1 bg-gray-950 border border-gray-800 rounded-lg">
						<img
							className="w-full"
							src="https://framerusercontent.com/images/YqFORO8QGMNaFi1u8DzLnYSeyM.png?width=835&height=1121"
							alt=""
						/>
					</div>
					<div className="flex-2 flex flex-col justify-center items-start gap-2 bg-background">
						<Badge>About</Badge>
						<h1 className="text-5xl font-bold">Frontend Engineer</h1>
						<p className="max-w-lg">
							I've 5 years of experience in Frontend engineering, now do
							blablabla lorem ipsum dolor sit amet
						</p>
					</div>
				</div>
			</div>

			<div className="flex justify-center mt-20">
				<div className="flex flex-col sm:flex-row p-4 gap-12 container">
					<div className="flex flex-col gap-10 p-4">
						<div className="flex flex-col justify-center items-start gap-2">
							<Badge>Experience</Badge>
							<h1 className="text-3xl font-bold">My Work Experience</h1>
							<p>I turn ideas into lorem ipsum dolor sit amet</p>
						</div>
						<div className="border"></div>

						<div className="flex flex-col md:flex-row gap-10">
							<div className="min-w-3xs">
								<p className="text-gray-400">2025 - 2026</p>
							</div>
							<div className="flex flex-col">
								<h1 className="text-3xl font-bold">Fullstack Engineer</h1>
								<a href="https://google.com" className="text-cyan-500">
									ADPList
								</a>
								<p className="mt-3">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco
									laboris nisi ut aliquip ex ea commodo consequat. Duis aute
									irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur. Excepteur sint occaecat
									cupidatat non proident, sunt in culpa qui officia deserunt
									mollit anim id est laborum.
								</p>
							</div>
						</div>

						<div className="border"></div>

						<div className="flex flex-col md:flex-row gap-10">
							<div className="min-w-3xs">
								<p className="text-gray-400">2023 - 2024</p>
							</div>
							<div className="flex flex-col">
								<h1 className="text-3xl font-bold">Lead Frontend Engineer</h1>
								<a href="https://google.com" className="text-cyan-500">
									KarirLab
								</a>
								<p className="mt-3">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco
									laboris nisi ut aliquip ex ea commodo consequat. Duis aute
									irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur. Excepteur sint occaecat
									cupidatat non proident, sunt in culpa qui officia deserunt
									mollit anim id est laborum.
								</p>
							</div>
						</div>

						<div className="border"></div>

						<div className="flex flex-col md:flex-row gap-10">
							<div className="min-w-3xs">
								<p className="text-gray-400">2021 - 2023</p>
							</div>
							<div className="flex flex-col">
								<h1 className="text-3xl font-bold">Frontend Engineer</h1>
								<a href="https://google.com" className="text-cyan-500">
									Ruangguru
								</a>
								<p className="mt-3">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco
									laboris nisi ut aliquip ex ea commodo consequat. Duis aute
									irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur. Excepteur sint occaecat
									cupidatat non proident, sunt in culpa qui officia deserunt
									mollit anim id est laborum.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex justify-center mt-20">
				<div className="flex flex-col sm:flex-row p-4 gap-12 container">
					<div className="flex flex-col gap-10 p-4">
						<div className="flex flex-col justify-center items-start gap-2">
							<Badge>Notes</Badge>
							<h1 className="text-3xl font-bold">My Learning Notes</h1>
							<p>I turn ideas into lorem ipsum dolor sit amet</p>
						</div>

						<div className="flex gap-10 flex-wrap">
							<div className="basis-[100%] sm:basis-[45%] md:basis-[29%] lg:basis-[20%]">
								<img
									src="https://picsum.photos/300/200"
									alt=""
									className="rounded-lg mb-5 w-full aspect-video max-w-full sm:max-w-xs"
								/>
								<h1 className="text-xl font-bold">Web Performance Checklist</h1>
								<p className="text-gray-400 text-sm">
									A simple checklist for checking web performance issue on 2026
								</p>
								<p className="text-xs mt-3">October 14, 2026</p>
								<Button className="mt-5">Read More</Button>
							</div>

							<div className="basis-[100%] sm:basis-[45%] md:basis-[29%] lg:basis-[20%]">
								<img
									src="https://picsum.photos/300/200"
									alt=""
									className="rounded-lg mb-5 w-full aspect-video max-w-full sm:max-w-xs"
								/>
								<h1 className="text-xl font-bold">Web Performance Checklist</h1>
								<p className="text-gray-400 text-sm">
									A simple checklist for checking web performance issue on 2026
								</p>
								<p className="text-xs mt-3">October 14, 2026</p>
								<Button className="mt-5">Read More</Button>
							</div>

							<div className="basis-[100%] sm:basis-[45%] md:basis-[29%] lg:basis-[20%]">
								<img
									src="https://picsum.photos/300/200"
									alt=""
									className="rounded-lg mb-5 w-full aspect-video max-w-full sm:max-w-xs"
								/>
								<h1 className="text-xl font-bold">Web Performance Checklist</h1>
								<p className="text-gray-400 text-sm">
									A simple checklist for checking web performance issue on 2026
								</p>
								<p className="text-xs mt-3">October 14, 2026</p>
								<Button className="mt-5">Read More</Button>
							</div>

							<div className="basis-[100%] sm:basis-[45%] md:basis-[29%] lg:basis-[20%]">
								<img
									src="https://picsum.photos/300/200"
									alt=""
									className="rounded-lg mb-5 w-full aspect-video max-w-full sm:max-w-xs"
								/>
								<h1 className="text-xl font-bold">Web Performance Checklist</h1>
								<p className="text-gray-400 text-sm">
									A simple checklist for checking web performance issue on 2026
								</p>
								<p className="text-xs mt-3">October 14, 2026</p>
								<Button className="mt-5">Read More</Button>
							</div>

							<div className="basis-[100%] sm:basis-[45%] md:basis-[29%] lg:basis-[20%]">
								<img
									src="https://picsum.photos/300/200"
									alt=""
									className="rounded-lg mb-5 w-full aspect-video max-w-full sm:max-w-xs"
								/>
								<h1 className="text-xl font-bold">Web Performance Checklist</h1>
								<p className="text-gray-400 text-sm">
									A simple checklist for checking web performance issue on 2026
								</p>
								<p className="text-xs mt-3">October 14, 2026</p>
								<Button className="mt-5">Read More</Button>
							</div>
						</div>
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
