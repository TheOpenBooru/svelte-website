export const API_URL = import.meta.env.VITE_API_URL || "https://api.openbooru.org";
export const SITE_NAME = import.meta.env.VITE_SITE_NAME || "Open Booru";
export const SITE_DESC = import.meta.env.VITE_SITE_DESC || "The Open Booru";
export const SITE_URL = import.meta.env.VITE_SITE_URL || "localhost";
export const READ_ONLY = import.meta.env.VITE_READ_ONLY === "true";
export const CORS_PROXY = import.meta.env.VITE_VITE_CORS_PROXY || null;