import { CORS_PROXY } from "js/config";

export function generateUrl(url: string | undefined): string | undefined {
	if (CORS_PROXY && url && url.includes("rule34.xxx")) {
		return CORS_PROXY + encodeURIComponent(url);
	} else {
		return url;
	}
}
