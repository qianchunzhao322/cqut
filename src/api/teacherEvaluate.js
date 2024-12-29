import request from '@/utils/request'

export function getMyEvaluateScore() {
  return request({
    url: '/tea-evaluate/getMyEvaluateScore',
    method: 'post'
  })
}

export function getAllEvalate(params) {
  return request({
    url: '/tea-evaluate/page',
    method: 'post',
    data: params
  })
}

export function addEvaluate(params) {
  return request({
    url: '/tea-evaluate/addEvaluate',
    method: 'post',
    data: params
  })
}
