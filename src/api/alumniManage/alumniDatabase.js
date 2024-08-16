// 校友库

// /classmateConfirm/select
// 根据条件查询校友库中的校友
import request from '@/utils/request'

export function selectClassmateConfirm(params) {
  return request({
    url: `/classmateConfirm/select`,
    method: 'get',
    params
  })
}

// /classmateConfirm/delete/{id}
export function deleteClassmateConfirm(id){
  return request({
    url: `/classmateConfirm/delete/${id}`,
    method: 'delete'
  })
}

// /classmateConfirm/update/{id}
export function updateClassmateConfirm(data) {
  return request({
    url: `/classmateConfirm/update/${data.targetId}`,
    method: 'PATCH',
    data
  })
}

// /classmateConfirm/select/{id}
export function selectClassmateConfirmById(id) {
  return request({
    url: `/classmateConfirm/select/${id}`,
    method: 'GET'
  })
}


// /classmateUpdated/selectByMD5/{md5}
export function selectClassmateUpdatedByMD5(md5){
  return request({
    url: `/classmateUpdated/selectByMD5/${md5}`,
    method: 'get'
  })
}

// /classmateConfirm/updateByMD5/{id}
export function updateClassmateByMD5({data, id}){
  return request({
    url: `/classmateConfirm/updateByMD5/${id}`,
    method: 'patch',
    data
  })
}


export function exportClassmate(data){
  return request({
    url: `/exportExcel/classmateConfrim`,
    method: 'post',
    data
  })
}