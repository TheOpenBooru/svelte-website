import type { Types } from "openbooru";
import { Account } from "openbooru";
import { getBooruConfig } from "js/booru/misc";


type Permission =
    "canViewPosts" |
    "canSearchPosts" |
    "canEditPosts" |
    "canDeletePosts" |
    "canCreatePosts" |
    "canVotePosts" |
    "canViewUsers" |
    "canSearchUsers" |
    "canEditUsers" |
    "canDeleteUsers";


export async function getPermission(permission: Permission): Promise<Types.Permission> {
    const permissions = await Account.permissions(getBooruConfig())
    return permissions[permission];
}
