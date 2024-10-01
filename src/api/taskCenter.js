
import wholeRequest from '@/utils/wholeRequest'

export function download(url) {
  return wholeRequest({
    url: url,
    method: 'post',
    responseType: 'blob'
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
