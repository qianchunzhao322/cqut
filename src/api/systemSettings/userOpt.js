import request from '@/utils/request'

export function selectUser(params) {
  return request({
    url: '/user/page',
    method: 'post',
    data: params
  })
}
export function addUser(params) {
  return request({
    url: '/user',
    method: 'post',
    data: params
  })
}
export function editUser(params) {
  return request({
    url: '/user',
    method: 'put',
    data: params
  })
}
export function deleteUser(params) {
  return request({
    url: `/user?id=${params}`,
    method: 'delete'
  })
}
export function resetUser(params) {
  return request({
    url: `/user/userReset?id=${params}`,
    method: 'put'
  })
}
