import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { Post } from 'openbooru';

export const load: PageLoad = async ({ params }) => {
  const post = await Post.get(Number(params.slug));
  
  if (post) {
    return { post };
  } else {
    throw error(404, 'Not found');
  }
}