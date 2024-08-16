import request from '@/utils/request'

export function selectOptLog(params) {
  return request({
    url: '/operationLog/select',
    method: 'get',
    params
  })
}
