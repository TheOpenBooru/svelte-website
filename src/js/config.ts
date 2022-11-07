import {
    PUBLIC_SITE_NAME,
    PUBLIC_SITE_DESCRIPTION,
    PUBLIC_SITE_URL,
    PUBLIC_SITE_KEYWORDS,
    PUBLIC_API_URL,
    PUBLIC_READ_ONLY,
    PUBLIC_CORS_PROXY,
    PUBLIC_DEFAULT_SEARCH,
} from '$env/static/public';
export const SITE_NAME = PUBLIC_SITE_NAME || "Open Booru";
export const SITE_DESC = PUBLIC_SITE_DESCRIPTION || "The Open Booru";
export const SITE_URL = PUBLIC_SITE_URL || "localhost";
export const SITE_KEYWORDS: string[] = (PUBLIC_SITE_KEYWORDS || "").split(",");

export const API_URL = PUBLIC_API_URL || "https://api.openbooru.org";

export const READ_ONLY = PUBLIC_READ_ONLY === "true";
export const CORS_PROXY = PUBLIC_CORS_PROXY || "";
export const DEFAULT_SEARCH = PUBLIC_DEFAULT_SEARCH || "created_at";