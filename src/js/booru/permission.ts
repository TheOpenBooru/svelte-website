import type { Types } from "openbooru";
import { Account }from "openbooru";
import { getBooruConfig } from "js/booru";
import { getToken } from "js/booru/account";
import Cache from "js/cache";

export type Permission =
    | "canLogin"
    | "canRegister"
    | "canViewPosts"
    | "canSearchPosts"
    | "canEditPosts"
    | "canDeletePosts"
    | "canRecieveAllTags"
    | "canSearchTags"
    | "canEditTags"
    | "canViewUsers"
    | "canSearchUsers"
    | "canEditUsers"
    | "canDeleteUsers"
    | "canCreatePosts"
    | "canVotePosts"
    | "canCreateSubscriptions"
    | "canSearchSubscriptions"
    | "canDeleteSubscriptions"
    | "canViewProfile"
    | "canUpdateSettings";

export async function getPermission(permission: Permission, use_cache: boolean = true): Promise<Types.Permission> {
    let permissions;
    let cache_key = "permissions-" + getToken();
    const profile_json = Cache.get(cache_key);
    
    if (profile_json && use_cache) {
        permissions = JSON.parse(profile_json);
    } else {
        permissions = await Account.permissions(getBooruConfig());
		Cache.set(cache_key, JSON.stringify(permissions), 30)
    }

    return permissions[permission];
}

export async function hasPermission(permission: Permission): Promise<boolean> {
    const perm = await getPermission(permission);
    return perm.has_permission;
}

export async function needsCaptcha(permission: Permission): Promise<boolean> {
    const perm = await getPermission(permission);
    return perm.captcha;
}
