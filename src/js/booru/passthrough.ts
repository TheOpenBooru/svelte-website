import type { Types } from "openbooru";
import { Posts, Post, Profile, Tags } from "openbooru";
import { browser } from "$app/environment";
import { getToken } from "js/booru/account";
import { getBooruConfig } from "js/booru/misc";

type id = string | number;
export function posts_search(
	query: Types.PostQuery,
	index = 0,
	limit = 100,
	key: string | null = null,
): Promise<Types.Post[]> {
	return Posts.search(query, index, limit, getBooruConfig());
}

export function posts_create(file: File): Promise<Types.Post> {
	return Posts.create(file, getBooruConfig());
}

export function posts_import(url: string): Promise<Types.Post[]> {
	return Posts.Import(url, getBooruConfig());
}

export function post_edit(
	post_id: id,
	sources: string[],
	rating: Types.Rating,
	tags: string[],
): Promise<void> {
	return Post.edit(post_id, sources, rating, tags, getBooruConfig());
}

export function post_get(post_id: id, key: string | null = null): Promise<Types.Post> {
	const config = getBooruConfig();
	if (key) config.token = key;
	return Post.get(post_id, config);
}

export function post_delete(post_id: id): Promise<void> {
	return Post.Delete(post_id, getBooruConfig());
}

export function add_upvote(post_id: id): Promise<void> {
	return Post.add_upvote(post_id, getBooruConfig());
}

export function remove_upvote(post_id: id): Promise<void> {
	return Post.remove_upvote(post_id, getBooruConfig());
}

export function add_downvote(post_id: id): Promise<void> {
	return Post.add_downvote(post_id, getBooruConfig());
}

export function remove_downvote(post_id: id): Promise<void> {
	return Post.remove_downvote(post_id, getBooruConfig());
}

export async function profile(use_cache = true): Promise<Types.Profile> {
	if (!browser) throw Error("Tried to get Server Side profile");
	if (!getToken()) throw Error("Not Logged In");

	if (use_cache) {
		const profile_json = localStorage.getItem("profile");
		if (profile_json) {
			return JSON.parse(profile_json);
		}
	}

	const profile = await Profile.profile(getBooruConfig());
	localStorage.setItem("profile", JSON.stringify(profile));
	setTimeout(() => {
		localStorage.removeItem("profile");
	}, 1000);

	return profile;
}

export function profile_update_settings(settings: string): Promise<void> {
	return Profile.updateSettings(settings, getBooruConfig());
}

export function tags_all(): Promise<Types.Tag[]> {
	return Tags.all(getBooruConfig());
}

export function tag_get(tag: string): Promise<Types.Tag> {
	return Tags.get(tag, getBooruConfig());
}

export function tag_search(search: Types.TagQuery): Promise<Types.Tag[]> {
	return Tags.search(search, getBooruConfig());
}

export function tag_edit(
	tag: string,
	namespace: string | null,
	parents: string[],
	siblings: string[],
): Promise<Types.Tag> {
	return Tags.edit(tag, namespace, parents, siblings, getBooruConfig());
}
