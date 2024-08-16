import request from '@/utils/request'
import wholeRequest from '@/utils/wholeRequest'


// 导出待确认 确认中 非校友库 中的校友信息
// /exportExcel/classmateWaitconfirm
export function exportClassmateWaitconfirm({data, classify}){
    return request({
        url: `/exportExcel/classmateWaitconfirm/${classify}`,
        method: 'post',
        data
    })
}

// 删除
export function deleteClassmate(id){
    return request({
        url: `/classmateWaitconfirm/deleteById/${id}`,
        method: 'delete'
    })
}

// 查询校友资讯
export function searchClassmateInfo(params){
    return wholeRequest({
        url: `/classmate-info/classmate/search`,
        method: 'get',
        params
    })
}

// 合并
export function mergeClassmate({data, ids, classify}){
    return request({
        url: `/classmateWaitconfirm/mergeWaitConfirm/${classify}`,
        method: 'post',
        params: {
            ids
        },
        data,
        
        paramsSerializer: function (params) {
            let result = [];
            for (let field in params) {
              if (params[field] === undefined || params[field] === null) {
                result.push(`${field}=`);
                continue
              }
              if (Array.isArray(params[field])) {
                result.push(params[field].map(_ => `${field}=${_}`).join("&"));
              } else {
                result.push(`${field}=${encodeURIComponent(params[field])}`);
              }
            }
            return result.join("&");
          }
    })
}



export function uploadImage(data){
  return request({
      url: `/uploadImage`,
      method: 'post',
      data
  })
}
