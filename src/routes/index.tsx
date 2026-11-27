import { createFileRoute } from "@tanstack/react-router";
import { getExperiences } from "#/data/experience";
import { getNotes } from "#/data/note";
import { getProjects } from "#/data/project";
import { HomeScreen } from "#/screens/HomeScreen";

export const Route = createFileRoute("/")({
	component: App,
	head: () => ({
		links: [
			{
				rel: "preload",
				as: "image",
				href: "/hero.avif",
				fetchPriority: "high",
			},
		],
	}),
	loader: async () => ({
		notes: await getNotes(),
		projects: await getProjects(),
		experiences: await getExperiences(),
	}),
});

function App() {
	const { notes, projects, experiences } = Route.useLoaderData();
	return (
		<HomeScreen notes={notes} projects={projects} experiences={experiences} />
	);
}
