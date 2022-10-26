import { browser } from "$app/environment";
import { API_URL } from "js/config"
import { Account, Errors } from "openbooru";
import type { Types } from "openbooru";


export async function login(username: string, password:string, hcatpcha_response:string|null = null) {
  if (browser) {
    const token = await Account.login(username, password, {
      apiUrl: API_URL,
      hcatpcha_response: hcatpcha_response,
    })
    localStorage.setItem("token", token)
  }
}

export async function register(username: string, password: string, confrimPassword: string, hcatpcha_response: string | null = null) {
  const UsernameRegex = /^[a-zA-Z0-9_]{4,32}$/;
  if (import.meta.env.SSR) return;
  if (password !== confrimPassword) {
    throw "The Passwords Don't Match";
  } else if (!UsernameRegex.test(username)) {
    throw "Username Doesn't Meet Requirements";
  }

  try {
    const token = await Account.register(username, password, {
      apiUrl: API_URL,
      hcatpcha_response: hcatpcha_response,
    })
    localStorage.setItem("token", token)
  } catch (e) {
    if (e instanceof Errors.UserAlreadyExists) {
      throw "A User With That Name Already Exists"
    } else if (e instanceof Errors.BadCaptcha) {
      throw "Invalid Captcha Response"
    } else if (e instanceof Errors.PasswordDoesntMeetRequirements) {
      throw "Password does not meet requirements With That Name Already Exists"
    } else if (e instanceof Errors.InternalServerError) {
      throw "Interal Server Error, Try Again Later"
    } else {
      throw "Unknown Error"
    }
  }
}


export function token(){
  if (browser){
    return localStorage.getItem("token");
  } else {
    return null
  }
}

export const loggedIn = () => !!token()

export function logout(){
  if (browser){
    localStorage.removeItem("token")
  }
}