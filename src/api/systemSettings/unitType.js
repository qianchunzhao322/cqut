import request from '@/utils/request'

export function selectCompanyType(params) {
  return request({
    url: '/companytype/select',
    method: 'get',
    params
  })
}
export function addCompanyType(params) {
  return request({
    url: '/companytype/add',
    method: 'put',
    data: params
  })
}
export function editCompanyType(params) {
  return request({
    url: '/companytype/update',
    method: 'patch',
    data: params
  })
}
export function deleteCompanyType(params) {
  return request({
    url: '/companytype/delete',
    method: 'delete',
    params
  })
}
