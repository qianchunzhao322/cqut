import request from '@/utils/request'

export function getComment(params) {
  return request({
    url: '/comment/page',
    method: 'post',
    data: params
  })
}

export function addComment(params) {
  return request({
    url: '/comment',
    method: 'post',
    data: params
  })
}
export function deleteComment(params) {
  return request({
    url: `/comment?id=${params}`,
    method: 'delete'
  })
}
