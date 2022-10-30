import type { Types } from "openbooru";
import { Account } from "openbooru";
import { getBooruConfig } from "js/booru/misc";


export type Permission =
    "canViewPosts" |
    "canSearchPosts" |
    "canEditPosts" |
    "canDeletePosts" |
    "canCreatePosts" |
    "canVotePosts" |
    "canViewUsers" |
    "canSearchUsers" |
    "canEditUsers" |
    "canDeleteUsers" |
    "canLogin"
    ;


export async function getPermission(permission: Permission): Promise<Types.Permission> {
    const permissions = await Account.permissions(getBooruConfig())
    return permissions[permission];
}

export async function hasPermission(permission: Permission): Promise<boolean> {
    const perm = await getPermission(permission)
    return perm.has_permission;
}
