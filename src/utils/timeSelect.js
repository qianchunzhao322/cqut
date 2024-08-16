import moment from 'moment'
moment.locale('zh-cn') // zh-cn
// 精准聚焦到当前时间点
/**
 *
 * @param {number} day 近X天 可选【1，3，7，30，90】
 * @param {string} format 时间格式 默认：'yyyy-MM-DD HH:mm:ss'
 * @returns {array} [startTime,endTime]
 */
export const FocusNearDays = (day, format = 'yyyy-MM-DD HH:mm:ss') => {
  if (day > 0) {
    // day = day - 1 === 0 ? day : day - 1
    return [
      moment().subtract(day, 'd').format(format),
      moment().format('yyyy-MM-DD HH:mm:ss')
    ]
  } else {
    throw new Error('day 只能是正整数')
  }
}
export const getNowDay = () => {
  return moment().format('yyyy-MM-DD HH:mm:ss')
}
export const FocusNearly1Days = () => {
  // 近1日 / 今天
  return [moment().subtract(1, 'd').format('yyyy-MM-DD HH:mm:ss'), moment().format('yyyy-MM-DD HH:mm:ss')]
}
export const FocusNearly3Days = () => {
  // 近3日
  return [moment().subtract(2, 'd').format('yyyy-MM-DD HH:mm:ss'), moment().format('yyyy-MM-DD HH:mm:ss')]
}
export const FocusNearly7Days = () => {
  // 近7日
  return [moment().subtract(6, 'd').format('yyyy-MM-DD HH:mm:ss'), moment().format('yyyy-MM-DD HH:mm:ss')]
}
export const FocusNearly30Days = () => {
  // 近30日
  return [moment().subtract(29, 'd').format('yyyy-MM-DD HH:mm:ss'), moment().format('yyyy-MM-DD HH:mm:ss')]
}
export const FocusNearly90Days = () => {
  // 近90日
  return [moment().subtract(89, 'd').format('yyyy-MM-DD HH:mm:ss'), moment().format('yyyy-MM-DD HH:mm:ss')]
}
