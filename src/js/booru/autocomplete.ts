import type { Types } from "openbooru";
import { Tags } from "openbooru";
import { getBooruConfig } from "js/booru/misc";

export async function tagAutocomplete(search: string, limit = 5): Promise<Types.Tag[]> {
	if (search === "") {
		return [];
	}

	try {
		return await Tags.search({ name_like: search, limit: limit }, getBooruConfig());
	} catch (e) {
		return [];
	}
}
