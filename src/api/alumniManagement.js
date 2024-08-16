// 校友管理

// 待确认
// /classmateWaitconfirm/select/{classify}
// 查询校友
import request from '@/utils/request'

export function selectClassmateWaitconfirm(params) {
  let classify = params.classify
  if(params.classifyTemp?.length){
    classify = params.classifyTemp
  }
  return request({
    url: `/classmateWaitconfirm/select/${classify}`,
    method: 'get',
    params
  })
}

// /classmateWaitconfirm/selectById/{id}
// 根据id查询待确认校友的基础信息
export function selectClassmateWaitconfirmById(id) {
  return request({
    url: `/classmateWaitconfirm/selectById/${id}`,
    method: 'get'
  })
}

// /classmateCompanyRecord/selectByClassmateId/{id}
// 根据校友id查询工作履历
export function selectClassmateCompanyRecordByClassmateId(id) {
  return request({
    url: `/classmateCompanyRecord/selectByClassmateId/${id}`,
    method: 'get'
  })
}

// 教育经历
export function selectClassmateEducationRecordByClassmateId(id) {
  return request({
    url: `/ClassmateEducationRecord/selectByClassmateId/${id}`,
    method: 'get'
  })
}

// 成果荣誉
// /ClassmateHonor/selectByClassmateId/{id}
export function selectClassmateHonorByClassmateId(id) {
  return request({
    url: `/ClassmateHonor/selectByClassmateId/${id}`,
    method: 'get'
  })
}
