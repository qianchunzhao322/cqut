import request from '@/utils/request'

export function selectChoosed(params) {
  return request({
    url: '/courseSchedulingChoose/page',
    method: 'post',
    data: params
  })
}

export function gradeAllSelect(params) {
  return request({
    url: '/courseSchedulingChoose/stuGradeSelect',
    method: 'post',
    data: params
  })
}
export function gradeSelect(params) {
  return request({
    url: '/courseSchedulingChoose/page',
    method: 'post',
    data: params
  })
}
