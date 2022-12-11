import { Account } from "js/booru";
import { API_URL } from "js/config";

export async function getSitekey(): Promise<string> {
    return "10000000-ffff-ffff-ffff-000000000001";
}

type ApiData = {
    apiUrl: string,
    token: string|null,
}

export function getBooruConfig(): ApiData {
    return {
        apiUrl: API_URL,
        token: Account.getToken(),
    }
}