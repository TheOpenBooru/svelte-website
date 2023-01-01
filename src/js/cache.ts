type CacheStore = {
    expiration: number,
    value: any
}

function get(key: string): null | any {
    key = "cache-" + key
    let json = sessionStorage.getItem(key)
    if (json == null) return null

    let store: CacheStore = JSON.parse(json);
    if (Date.now() > store.expiration) {
        sessionStorage.removeItem(key);
        return null;
    }

    return store.value
}

function set(key: string, value: any, ttl: number = 5) {
    key = "cache-" + key
    
    let store = {
        value: value,
        expiration: Date.now() + (ttl * 1000),
    };
    sessionStorage.setItem(key, JSON.stringify(store))
}

export default { get, set};