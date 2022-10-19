import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';

export const load: PageLoad = async ({ params }) => {
  throw redirect(302, '/posts')
}