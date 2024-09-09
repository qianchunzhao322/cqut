import Cookies from 'js-cookie'
import { getTheme } from '@/api/index'

const TokenKey = 'token'
const UserInfo = 'user_info'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserInfo(info) {
  return Cookies.set(UserInfo, info)
}

export function getUserInfo() {
  return Cookies.get(UserInfo) ? JSON.parse(Cookies.get(UserInfo)) : {}
}

export function removeUserInfo() {
  return Cookies.remove(UserInfo)
}

export function setUserRealId(id) {
  return Cookies.set('realId', id)
}

export function setThemeData() {
  return getTheme().then((res) => {
    if (res.result) {
      if (res.data) {
        const result = res.data
        const keyList = Object.keys(result)
        keyList.forEach((key) => {
          localStorage.setItem(key, result[key])
        })
      }
    }
  })
}
