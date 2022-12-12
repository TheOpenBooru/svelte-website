import { ID } from "./booru";

export const home = () => "/home";
export const tags = () => "/tags";
export const post = (id: number) => "/post/" + ID.encode(id);

export default { home, tags, post };
