import type { Experience } from "#/data/experience";
import type { Note } from "#/data/note";
import type { Project } from "#/data/project";
import { AboutSection } from "./AboutSection";
import { ContactSection } from "./ContactSection";
import { ExperienceSection } from "./ExperienceSection";
import { HeroSection } from "./HeroSection";
import { NoteSection } from "./NoteSection";
import { ProjectSection } from "./ProjectSection";

export type HomeScreenProps = {
	projects: Project[];
	experiences: Experience[];
	notes: Note[];
};

export function HomeScreen({ projects, experiences, notes }: HomeScreenProps) {
	return (
		<div>
			<HeroSection />
			<ProjectSection projects={projects} />
			<AboutSection />
			<ExperienceSection experiences={experiences} />
			<NoteSection notes={notes} />
			<ContactSection />
		</div>
	);
}
