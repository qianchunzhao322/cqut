// 数据分析
import request from '@/utils/request'
import wholeRequest from '@/utils/wholeRequest'
// /dataAnalysis/selectAll
export function dataAnalysisSelectAll() {
  return request({
    url: `/dataAnalysis/selectAll`,
    method: 'get'
  })
}
// /dataAnalysis/pieMap
export function pieMap() {
  return request({
    url: '/dataAnalysis/selectCompanyCategory',
    method: 'get'
  })
}
export function getClassmateInfo(data) {
  return wholeRequest({
    url: `/dataAnalysis/select/classmate/recent`,
    method: 'post',
    data
  })
}

export function getTheme() {
  return request({
    url: `/Theme/select`,
    method: 'get'
  })
}
