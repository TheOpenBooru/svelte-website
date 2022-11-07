import type { PageServerLoad } from './$types';
import { API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { getBooruConfig } from 'js/booru';
import { Posts, BSL } from 'openbooru';

export const load: PageServerLoad = async ({ url }) => {
	const params = url.searchParams;
	const query = BSL.decode(params.get("query") || "")
	
	const config = getBooruConfig();
	config.token = API_KEY;
	const posts = await Posts.search(query, 0, 100, config);

	return { posts };
}