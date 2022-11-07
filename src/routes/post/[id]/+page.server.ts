import type { PageServerLoad } from './$types';
import { API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { getBooruConfig } from 'js/booru';
import { Post } from 'openbooru';

export const load: PageServerLoad = async ({ params }) => {
  const config = getBooruConfig()
  config.token = API_KEY
  const post = await Post.get(params.id, config);

  if (post) {
    return { post };
  } else {
    throw error(404, 'Post Not Found');
  }
}