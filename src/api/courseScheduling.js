import request from '@/utils/request'

export function selectCourseScheduling(params) {
  return request({
    url: '/courseScheduling/page',
    method: 'post',
    data: params
  })
}

export function courseSchedulingAdd(params, enforceAdd) {
  return request({
    url: `/courseScheduling?enforceAdd=${enforceAdd}`,
    method: 'post',
    data: params
  })
}

export function courseSchedulingBatchAdd(data, enforceAdd) {
  return request({
    url: `/courseScheduling/batchAdd?enforceAdd=${enforceAdd}`,
    method: 'post',
    data: data
  })
}

export function courseSchedulingEdit(data, enforceEdit) {
  return request({
    url: `/courseScheduling?enforceEdit=${enforceEdit}`,
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

export function getCourseGrade(params) {
  return request({
    url: '/courseSchedulingChoose/courseGradePage',
    method: 'post',
    data: params
  })
}

export function getCourseEvaluate(params) {
  return request({
    url: '/tea-evaluate/courseEvaluatePage',
    method: 'post',
    data: params
  })
}

export function forceTakeCourseScheduling(params) {
  return request({
    url: '/courseSchedulingChoose/forceTakeCourseScheduling',
    method: 'post',
    params
  })
}
