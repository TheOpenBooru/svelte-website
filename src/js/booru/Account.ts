import { browser } from "$app/environment";
import * as Openbooru from "openbooru";
import type { Types } from "openbooru";


export function login(token: string){
  if (browser){
    localStorage.setItem("token", token)
  }
}

export function token(){
  if (browser){
    return localStorage.getItem("token");
  } else {
    return null
  }
}

export async function proflie(): Promise<Types.Profile>{
  const profile = await Openbooru.Profile.profile({
    apiUrl: import.meta.env.VITE_API_URL,
    token: token(),
  })
  return profile
}

export function logout(){
  if (browser){
    localStorage.removeItem("token")
  }
}