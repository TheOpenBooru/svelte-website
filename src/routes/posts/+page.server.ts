import type { PageServerLoad } from "./$types";
import { posts_search } from "js/booru";
import { BSL } from "openbooru";

export const load: PageServerLoad = async ({ url }) => {
	const params = url.searchParams;
	const query = BSL.decode(params.get("query") || "");

	const posts = await Promise.any([
		posts_search(query, 0, 100),
		new Promise(resolve => setTimeout(() => resolve([]), 1000)),
	]);
	return { posts };
};
