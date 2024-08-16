import request from '@/utils/request'

export function selectMajor(params) {
  return request({
    url: '/major/page',
    method: 'post',
    data: params
  })
}
export function addMajor(params) {
  return request({
    url: '/major',
    method: 'post',
    data: params
  })
}
export function editMajor(params) {
  return request({
    url: '/major',
    method: 'put',
    data: params
  })
}
export function deleteMajor(id) {
  return request({
    url: `/major?id=${id}`,
    method: 'delete'
  })
}
