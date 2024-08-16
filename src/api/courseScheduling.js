import request from '@/utils/request'

export function selectCourseScheduling(params) {
  return request({
    url: '/courseScheduling/page',
    method: 'post',
    data: params
  })
}

export function courseSchedulingAdd(params) {
  return request({
    url: '/courseScheduling',
    method: 'post',
    data: params
  })
}

export function courseSchedulingBatchAdd(data) {
  return request({
    url: '/courseScheduling/batchAdd',
    method: 'post',
    data: data
  })
}

export function courseSchedulingEdit(data) {
  return request({
    url: '/courseScheduling',
    method: 'put',
    data: data
  })
}

export function courseSchedulingDelete(id) {
  return request({
    url: `/courseScheduling?id=${id}`,
    method: 'DELETE'
  })
}
