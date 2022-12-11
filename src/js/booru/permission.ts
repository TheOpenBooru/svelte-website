import type { Types } from "openbooru";
import { Account } from "openbooru";
import { getBooruConfig } from "js/booru/misc";


export type Permission =
    "canLogin" |
    "canRegister" |
    "canViewPosts" |
    "canSearchPosts" |
    "canEditPosts" |
    "canDeletePosts" |
    "canRecieveAllTags" |
    "canSearchTags" |
    "canEditTags" |
    "canViewUsers" |
    "canSearchUsers" |
    "canEditUsers" |
    "canDeleteUsers" |
    "canCreatePosts" |
    "canVotePosts" |
    "canCreateSubscriptions" |
    "canSearchSubscriptions" |
    "canDeleteSubscriptions" |
    "canViewProfile" |
    "canUpdateSettings"
;
 

export async function getPermission(permission: Permission): Promise<Types.Permission> {
    const permissions = await Account.permissions(getBooruConfig())
    return permissions[permission];
}

export async function hasPermission(permission: Permission): Promise<boolean> {
    const perm = await getPermission(permission)
    return perm.has_permission;
}

export async function needsCaptcha(permission: Permission): Promise<boolean> {
    const perm = await getPermission(permission)
    return perm.captcha;
}
