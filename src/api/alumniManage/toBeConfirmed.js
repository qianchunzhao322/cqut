import request from '@/utils/request'
import wholeRequest from '@/utils/wholeRequest'
// /classmateWaitconfirm/confirm/{modifyClassify}
export function confirmClassmateWaitconfirm(params){
    return wholeRequest({
        url: `/classmateWaitconfirm/confirm/${params.modifyClassify}/${params.attribute}`,
        method: 'post',
        params: {
            ids: params.ids
        },
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