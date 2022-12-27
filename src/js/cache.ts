type CacheStore = {
    expiration: number,
    value: any
}

function get(key: string): null | any {
    let json = localStorage.getItem(key)
    if (json == null) return null

    let store: CacheStore = JSON.parse(json);
    if (Date.now() > store.expiration) {
        localStorage.removeItem(key);
        return null;
    }

    return store.value
}

function set(key: string, value: any, ttl: number = 5) {
    let store = {
        value: value,
        expiration: Date.now() + (ttl * 1000),
    };
    localStorage.setItem(key, JSON.stringify(store))
}

export default { get, set};