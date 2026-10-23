type Note = {
	guid: string;
	author: string;
	content: string;
	description: string;
	link: string;
	pubDate: string;
	enclosure: {
		link: string;
	};
	title: string;
};

export async function getNotes(): Promise<Note[]> {
	const res = await fetch(
		"https://api.rss2json.com/v1/api.json?rss_url=https://mnindrazaka.substack.com/feed&api_key=yo2kpldwbqueg1fnmgetuyv0czz5odjskwvxlb7g",
	);
	const data = await res.json();
	return data.items;
}
