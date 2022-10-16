export function encode(id: number): string {
    return id.toString()
}


export function decode(encoded_id: string):number {
    return Number(encoded_id);
}
