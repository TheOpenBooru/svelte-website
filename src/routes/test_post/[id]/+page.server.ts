import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { post_get } from 'js/booru';

export const load: PageServerLoad = async ({ params }) => {
  let post;
  try {
    post = await post_get(params.id)
  } catch (e) {
    throw error(500, e + "," + JSON.stringify(e));
  }

  if (post) {
    return { post };
  } else {
    throw error(404, 'Post Not Found');
  }
}