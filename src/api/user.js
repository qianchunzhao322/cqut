import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  })
}

export function getInfo(id) {
  return request({
    url: `/user/getById?id=${id}`,
    method: 'get'
  })
}

export function resetInfo(data) {
  return request({
    url: '/user/resetInfo',
    method: 'put',
    data: data
  })
}

export function resetPwd(data) {
  return request({
    url: '/user/resetPwd',
    method: 'put',
    data: data
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
export function userSelect(params) {
  return request({
    url: '/user/select',
    method: 'get',
    params
  })
}
export function userAdd(params) {
  return request({
    url: '/user/add',
    method: 'put',
    data: params
  })
}
export function userEdit(params) {
  return request({
    url: '/user/update',
    method: 'patch',
    data: params
  })
}
export function userDelete(params) {
  return request({
    url: '/user/delete',
    method: 'delete',
    params
  })
}
export function userReset(id) {
  return request({
    url: `/user/renew/${id}`,
    method: 'patch'
  })
}
