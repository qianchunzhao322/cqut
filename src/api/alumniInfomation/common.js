import request from '@/utils/wholeRequest'
// -----------------------------------------common-----------------------------------------------
// 国家三字英文码值对照列表
export function getCountryPekList(){
    return request({
        url: 'dict/pek/getCountryPekList',
        method: 'get',
        proxyMode: '/wenhai'
    })
}

// 根据三字英文码值获取国家名称列表
export function getNameByPeks(data){
    return request({
        url: 'dict/pek/getNameByPeks',
        method: 'post',
        data,
        proxyMode: '/wenhai'
    })
}

// ISO 639语言编码信息列表
export function getLanguagesList(){
    return request({
        url: 'dict/language/getLanguagesList',
        method: 'get',
        proxyMode: '/wenhai'
    })
}

// 指定Code集合获取语言名称和简称
export function getLanguageMappingByCodes(data){
    return request({
        url: 'dict/language/getLanguageMappingByCodes',
        method: 'post',
        data,
        proxyMode: '/wenhai'
    })
}

/**
 * 指定境内外类型查询媒体类型【树型结构】
 * @param {object} params regionType -1:全部 0：境内 1：境外 
 */
export function getDataSourceTree(params){
    return request({
        url: 'dict/dataSource/getDataSourceTree',
        method: 'get',
        params,
        proxyMode: '/wenhai'
    })
}

// 指定Code集合获取媒体类型名称
export function getDataSourceMappingByCodes(data){
    return request({
        url: 'dict/dataSource/getDataSourceMappingByCodes',
        method: 'post',
        data,
        proxyMode: '/wenhai'
    })
}



/**
 * 指定区域父级节点查询子集(中国)
 * @param {*} params pid 0：所有省份
 * @returns 
 */
export function getMentionAreaList(params){
    return request({
        url: 'dict/mentionArea/getMentionAreaList',
        method: 'get',
        params,
        proxyMode: '/wenhai'
    })
}

// 查询地域树(全国)
export function getMentionAreaTree(){
    return request({
        url: 'dict/mentionArea/getMentionAreaTree',
        method: 'get',
        proxyMode: '/wenhai'
    })
}

// 媒体信源标签信息列表
export function selectMediaTagList(){
    return request({
        url: 'dict/mediaTag/selectMediaTagList',
        method: 'get',
        proxyMode: '/wenhai'
    })
}