import request from '@/utils/request'
import wholeRequest from '@/utils/wholeRequest'
export function selectTask(params, id) {
  return request({
    url: `/task/select/${id}`,
    method: 'get',
    params
  })
}
export function download(id) {
  return wholeRequest({
    url: `/task/download/${id}`,
    method: 'get',
    responseType: 'blob'
    // headers: {
    //   responseType: 'blob'
    // }
  })
}
export function deleteTask(params) {
  return request({
    url: '/task/delete',
    method: 'delete',
    params
  })
}
