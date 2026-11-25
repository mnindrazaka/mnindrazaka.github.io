import { createFileRoute } from "@tanstack/react-router";
import { getProjectBySlug } from "#/data/project";
import { ProjectScreen } from "#/screens/ProjectScreen";

export const Route = createFileRoute("/projects/$slug")({
	component: RouteComponent,
	loader: async ({ params }) => ({
		project: await getProjectBySlug(params.slug),
	}),
});

function RouteComponent() {
	const { project } = Route.useLoaderData();
	return <ProjectScreen project={project} />;
}
