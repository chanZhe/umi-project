import Cookies from 'js-cookie'

export const TokenKey = 'TOEKN';

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token:String, rememberMe:Boolean) {
    if (rememberMe) {
        return Cookies.set(TokenKey, token, { expires: 1 })
    } else return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}