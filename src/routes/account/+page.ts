import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';

export const load: PageLoad = async ({ params }) => {
  if (browser) {
    if (localStorage.getItem("test")) {
      throw redirect(302, '/profile')
    } else {
      throw redirect(302, '/account/login')
    }
  }
}