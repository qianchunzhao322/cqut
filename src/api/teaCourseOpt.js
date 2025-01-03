import request from '@/utils/request'

export function getCourse() {
  return request({
    url: '/teacher/getCourse',
    method: 'get'
  })
}

export function getClassByDate(params) {
  return request({
    url: `/teacher/getClassByDate?date=${params}`,
    method: 'get'
  })
}

export function getStu(params) {
  return request({
    url: `/courseChoose/getStu?courseId=${params}`,
    method: 'post'
  })
}

export function classStuPage(params) {
  return request({
    url: '/teacher/classStuPage',
    method: 'post',
    data: params
  })
}

export function addGrade(params) {
  return request({
    url: '/courseSchedulingChoose/addGrade',
    method: 'post',
    data: params
  })
}

export function getSchedulingStu(params) {
  return request({
    url: '/courseSchedulingChoose/page',
    method: 'post',
    data: params
  })
}

export function getTeaScheduling(params) {
  return request({
    url: '/courseScheduling/page',
    method: 'post',
    data: params
  })
}

export function getSchedulingAllStu(params) {
  return request({
    url: '/courseSchedulingChoose/page',
    method: 'post',
    data: params
  })
}
