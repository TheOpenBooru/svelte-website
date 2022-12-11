import type { PageServerLoad } from './$types';
import { API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { ID, post_get } from 'js/booru';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const id = ID.decode(params.id);
    const post = await post_get(id, API_KEY);
    return { post };
  } catch (e: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    throw error(404, "Post Not Found");
  }
}