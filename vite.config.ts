import contentCollections from "@content-collections/vite";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { getProjects } from "#/data/project";

const config = defineConfig(async () => {
	const projects = await getProjects();
	return {
		resolve: { tsconfigPaths: true },
		plugins: [
			devtools(),
			nitro({ rollupConfig: { external: [/^@sentry\//] } }),
			contentCollections(),
			tailwindcss(),
			tanstackStart({
				prerender: {
					enabled: true,
					crawlLinks: true,
					failOnError: true,
				},
				pages: projects.map(({ slug }) => ({
					path: `/projects/${slug}`,
				})),
			}),
			viteReact(),
			babel({ presets: [reactCompilerPreset()] }),
		],
	};
});

export default config;
