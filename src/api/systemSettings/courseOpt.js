import request from '@/utils/request'

export function selectCourse(params) {
  return request({
    url: '/course/page',
    method: 'post',
    data: params
  })
}
export function addCourse(params) {
  return request({
    url: '/course',
    method: 'post',
    data: params
  })
}
export function editCourse(params) {
  return request({
    url: '/course',
    method: 'put',
    data: params
  })
}
export function deleteCourse(params) {
  return request({
    url: `/course?id=${params}`,
    method: 'delete'
  })
}
export function turnCourseStatus(id, status) {
  return request({
    url: `/course/courseStatus?id=${id}&courseStatus=${status}`,
    method: 'put'
  })
}
export function getCourseById(params) {
  return request({
    url: `/course/getByCourseId?id=${params}`,
    method: 'get'
  })
}
