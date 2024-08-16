export function getDay(str, defaultText = '-'){
    if(str?.length){
        const res = str.split('.').filter(o=>!(o == '00' || o == '0000')).join('.')
        return res?.length ? res : defaultText
    }else{
        return defaultText
    }
}

export function getBirthDay(str, defaultText = '-'){
    if(str?.length){
        const res = str.split('.').filter(o=>!(o == '00' || o == '0000')).join('-')
        return res?.length ? res : defaultText
    }else{
        return defaultText
    }
}


export function getShowCityValue({info, keys, defaultText}){
    if(keys?.length && info){
        let res = []
        keys.map((item)=>{
            const result = info[item]
            if(result?.length){
                res.push(result)
            }
        })
        if(res?.length){
            return res.join(' ')
        }else{
            return defaultText
        }
    }else{
        return defaultText
    }
}

export function showTime({
    startTime,
    endTime,
    defaultMidText = '-'
}){
    const start = getDay(startTime, '') || ""
    const end = getDay(endTime, '') || ""
    let midText = ` ${defaultMidText} `
    if(start && !end){
        midText = ''        
    }
    return `${start}${midText}${end}`
}