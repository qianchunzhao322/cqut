import request from '@/utils/request'

export function noticeAdd(params) {
  return request({
    url: '/notice',
    method: 'post',
    data: params
  })
}

export function noticeSelect(params) {
  return request({
    url: '/notice/page',
    method: 'post',
    data: params
  })
}

export function noticeGet(params) {
  return request({
    url: '/notice/getNotice',
    method: 'put',
    data: params
  })
}

export function noticeDelete(params) {
  return request({
    url: `/notice?id=${params}`,
    method: 'delete'
  })
}
