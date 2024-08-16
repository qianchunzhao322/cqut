import request from '@/utils/request'

// 城市列表
export function getCity(params){
    return request({
        url: `/city`,
        method: 'get',
        params
    })
}