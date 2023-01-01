import type { Types } from "openbooru";
import { BSL, Errors, Posts, Post, Profile, Tags } from "openbooru";
import { browser } from "$app/environment";
import { getToken, logout } from "js/booru/account";
import { getBooruConfig } from "js/booru/misc";
import Cache from "js/cache";

type id = string | number;
export async function posts_search(query: Types.PostQuery, index = 0, limit = 100): Promise<Types.Post[]> {
    let bsl = BSL.encode(query)
    let cache_key = `search bsl:(${bsl}) index:(${index}) limit:(${limit})`

    let cached = Cache.get(cache_key);
    if (cached) return cached

    let posts
    try {
        posts = await Posts.search(query, index, limit, getBooruConfig());
    } catch (e) {
        if (!(e instanceof Errors.TokenError)) throw e;
        logout();
        posts = await Posts.search(query, index, limit, getBooruConfig());
    }
    
    Cache.set(cache_key, posts, 20);
    return posts
}

export function posts_create(file: File, captchaResponse: string | null): Promise<Types.Post> {
    let config = getBooruConfig();
    config.token = captchaResponse;
    return Posts.create(file, config);
}

export function posts_import(url: string, captchaResponse: string | null): Promise<Types.Post[]> {
    let config = getBooruConfig();
    config.token = captchaResponse;
    return Posts.Import(url, config);
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

    let cache_key = "profile-" + getToken();
    const profile_json = Cache.get(cache_key);
    if (profile_json && use_cache) {
        return JSON.parse(profile_json);
    }

    const profile = await Profile.profile(getBooruConfig());
    Cache.set(cache_key, JSON.stringify(profile), 5)
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
