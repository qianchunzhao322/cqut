import request from '@/utils/request'

export function getNewSemesterStartDate() {
  return request({
    url: '/getNewSemesterStartDate',
    method: 'get'
  })
}

export function editNewSemesterStartDate(data) {
  return request({
    url: `/editNewSemesterStartDate?newSemesterStartDate=${data}`,
    method: 'get'
  })
}

export function getSysService() {
  return request({
    url: '/system/getSysService',
    method: 'get'
  })
}

export function sysInfoSelect() {
  return request({
    url: '/system/sysInfoSelect',
    method: 'get'
  })
}

export function semesterReset() {
  return request({
    url: '/system/semesterReset',
    method: 'get'
  })
}
