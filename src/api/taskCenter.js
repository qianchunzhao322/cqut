
import wholeRequest from '@/utils/wholeRequest'

export function download(method, url, data) {
  return wholeRequest({
    url: url,
    method: method,
    responseType: 'blob',
    data: data
    // headers: {
    //   responseType: 'blob'
    // }
  })
}
export function upload(url, formData) {
  return wholeRequest({
    url: url,
    method: 'post',
    headers: {
      'Content-type': 'multipart/form-data'
    },
    data: formData
  })
}
