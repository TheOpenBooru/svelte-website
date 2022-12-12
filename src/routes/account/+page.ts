import type { PageLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { browser } from "$app/environment";
import { Account } from "js/booru";

export const load: PageLoad = async ({ params }) => {
	if (browser) {
		if (Account.loggedIn()) {
			throw redirect(302, "/profile");
		} else {
			throw redirect(302, "/account/login");
		}
	}
};
