import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { post_get } from 'js/booru';

export const load: PageServerLoad = async ({ params }) => {
  const post = await post_get(params.id)
  
  if (post) {
    return { post };
  } else {
    throw error(404, 'Not found');
  }
}