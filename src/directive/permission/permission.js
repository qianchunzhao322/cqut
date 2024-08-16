
// import { sessionStorage } from "@/utils/storage"
import { getUserInfo } from "@/utils/auth"

export default {
  inserted(el, binding, vnode) {
    const { value } = binding

    if (value) {
      const permissionCode = value
      // status 0 1
      // value 0
      const hasPermission = [getUserInfo().status].some(role => {
        return role == permissionCode
      })
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="xxx"`)
    }
  }
}
