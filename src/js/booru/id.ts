export function encode(id: number): string {
    return id.toString(32);
}

export function decode(encoded: string) {
    return parseInt(encoded, 32);
}