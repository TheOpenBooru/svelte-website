import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { API_URL } from 'js/config';
import { Post } from 'openbooru';

export const load: PageLoad = async ({ params }) => {
  const post = await Post.get(
    Number(params.id),
    { apiUrl: API_URL }
  );
  
  if (post) {
    return { post };
  } else {
    throw error(404, 'Not found');
  }
}