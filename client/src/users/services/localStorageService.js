import { jwtDecode } from "jwt-decode"
const TOKEN = "token"

export const setTokenInLocalStorage = (encryptedToken) => localStorage.setItem(TOKEN, encryptedToken)

export const getUser = () => {
    try {
        const token = localStorage.getItem(TOKEN)
        if (!token) return null

        const decoded = jwtDecode(token)
        if (decoded.exp * 1000 < Date.now()) {
            removeToken()
            return null
        }

        return decoded
    } catch (error) {
        removeToken()
        return null
    }
}

export const removeToken = () => localStorage.removeItem(TOKEN)

export const getToken = () => {
    const token = localStorage.getItem(TOKEN)
    if (!token) return null

    try {
        const { exp } = jwtDecode(token)
        if (exp * 1000 < Date.now()) {
            removeToken()
            return null
        }

        return token
    } catch (error) {
        removeToken()
        return null
    }
}