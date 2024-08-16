import request from '@/utils/request'
import wholeRequest from '@/utils/wholeRequest'
// -----------------------------------------校友资讯 index-----------------------------------------------
// 分页检索发文信息列表
export function getSearchList(data){
    return wholeRequest({
        url: '/classmate-info/search',
        method: 'post',
        data
    })
}

// -----------------------------------------校友资讯 主题-----------------------------------------------
// 查询所有资讯主题
export function selectAllThemes(params){
    return request({
        url: `/informationTheme/selectAll`,
        method: 'get',
        params
    })
}

export function selectInfoTheme(params){
    return request({
        url: `/informationTheme/select`,
        method: 'get',
        params
    })
}

export function getThemeTree(params){
    return request({
        url: `/informationTheme/selectInformationThemeTree`,
        method: 'get',
        params
    })
}

// /informationTheme/add
export function addTheme(data){
    return request({
        url: `/informationTheme/add`,
        method: 'put',
        data
    })
}



// /informationTheme/delete/{id}
export function deleteTheme(id){
    return request({
        url: `/informationTheme/delete/${id}`,
        method: 'delete'
    })
}


// /informationTheme/update
export function updateTheme(data){
    return request({
        url: `/informationTheme/update`,
        method: 'patch',
        data
    })
}