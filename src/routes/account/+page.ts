import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';
import * as Account from 'js/booru/Account';

export const load: PageLoad = async ({ params }) => {
  if (browser) {
    let token = Account.token();
    if (token) {
      throw redirect(302, '/profile')
    } else {
      throw redirect(302, '/account/login')
    }
  }
}