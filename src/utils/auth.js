/**
 * 登录 把token存在sessionStorage中
 */
export function loginIn(token) {
  sessionStorage.setItem('token', token)
}

/**
 * 通过存储的内容判断用户是否登录
 */
export function isLogined() {
  if (sessionStorage.getItem('token')) {
    return true
  } else {
    return false
  }
}

/**
 * 清除本地存储
 */
export function logOut() {
  sessionStorage.removeItem('token')
}