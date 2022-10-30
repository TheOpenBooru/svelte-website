import { CORS_PROXY } from "js/config"

export function generateUrl(url: string | undefined): string | undefined {
    if (CORS_PROXY && url && url.includes("rule34.xxx")) {
        return "https://cdn.r34.pics/?url=" + encodeURIComponent(url);
    } else {
        return url;
    }
    
}