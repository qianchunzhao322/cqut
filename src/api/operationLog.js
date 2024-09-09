import request from '@/utils/request'

export function selectOptLog(params) {
  return request({
    url: '/operatorLog/page',
    method: 'post',
    data: params
  })
}
