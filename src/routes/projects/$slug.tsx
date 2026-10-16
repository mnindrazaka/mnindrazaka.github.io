import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "#/components/ui/button";

export const Route = createFileRoute("/projects/$slug")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex justify-center pt-10 p-4">
			<div className="container flex flex-col justify-center gap-8">
				<div className="max-w-4xl flex flex-col gap-3">
					<Link to="/" className="flex gap-2 items-center" href="/">
						<ArrowLeft size="20px" />
						<p>Back to Home</p>
					</Link>

					<h1 className="text-4xl font-bold">Point Of Sale System</h1>

					<div className="border"></div>

					<div className="flex gap-3">
						<Button size="sm">Live Project</Button>
						<Button size="sm" variant="secondary">
							View Code
						</Button>
					</div>

					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur
					</p>
				</div>

				<div className="flex flex-col lg:flex-row gap-5">
					<img
						className="rounded-lg w-full max-w-full lg:max-w-xs"
						src="https://picsum.photos/300/200"
						alt=""
					/>
					<img
						className="rounded-lg w-full max-w-full lg:max-w-xs"
						src="https://picsum.photos/300/200"
						alt=""
					/>
					<img
						className="rounded-lg w-full max-w-full lg:max-w-xs"
						src="https://picsum.photos/300/200"
						alt=""
					/>
				</div>
				<div className="max-w-4xl flex flex-col gap-3">
					<h1 className="font-bold text-2xl">Problems</h1>
					<div className="border"></div>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur
					</p>
				</div>

				<div className="max-w-4xl flex flex-col gap-3">
					<h1 className="font-bold text-2xl">Solution</h1>
					<div className="border"></div>

					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur
					</p>
				</div>

				<div className="max-w-4xl flex flex-col gap-3">
					<h1 className="font-bold text-2xl">Outcome</h1>
					<div className="border"></div>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur
					</p>
				</div>
			</div>
		</div>
	);
}
