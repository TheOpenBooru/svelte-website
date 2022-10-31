import type { Types } from "openbooru";
import { Posts, Post, Profile, Tags } from "openbooru";
import { getBooruConfig } from "js/booru/misc";


type id = string|number
export async function posts_search(query: Types.PostQuery, index = 0, limit = 100): Promise<Types.Post[]> {
    return await Posts.search(query, index, limit, getBooruConfig())
}

export async function posts_create(file: File): Promise<Types.Post> {
    return await Posts.create(file, getBooruConfig())
}

export async function posts_import(url: string): Promise <Types.Post[]> {
    return await Posts.Import(url, getBooruConfig())
}

export async function post_edit(post_id: id, source: string, rating: Types.Rating, tags: string[]): Promise<void> {
    return await Post.edit(post_id, source, rating, tags, getBooruConfig())
}

export async function post_get(post_id: id): Promise<Types.Post> {
    return await Post.get(post_id, getBooruConfig())
}

export async function post_delete(post_id: id): Promise<void> {
    return await Post.Delete(post_id, getBooruConfig())
}

export async function add_upvote(post_id: id): Promise<void> {
    return await Post.add_upvote(post_id, getBooruConfig())
}

export async function remove_upvote(post_id: id): Promise<void> {
    return await Post.remove_upvote(post_id, getBooruConfig())
}

export async function add_downvote(post_id: id): Promise<void> {
    return await Post.add_downvote(post_id, getBooruConfig())
}

export async function remove_downvote(post_id: id): Promise<void> {
    return await Post.remove_downvote(post_id, getBooruConfig())
}

export async function profile(): Promise<Types.Profile> {
    return await Profile.profile(getBooruConfig())
}

export async function profile_update_settings(settings: string): Promise<void> {
    return await Profile.updateSettings(settings, getBooruConfig())
}

export async function tags_all(): Promise<Types.Tag[]> {
    return await Tags.all(getBooruConfig())
}

export async function tag_get(tag: string): Promise<Types.Tag> {
    return await Tags.get(tag, getBooruConfig())
}

export async function tag_search(search: Types.TagQuery): Promise<Types.Tag[]> {
    return await Tags.search(search, getBooruConfig());
}

export async function tag_edit(tag: string, namespace: string|null, parents: string[], siblings: string[]): Promise<Types.Tag> {
    return await Tags.edit(tag, namespace, parents, siblings, getBooruConfig());
}
