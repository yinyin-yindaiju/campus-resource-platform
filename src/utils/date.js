/**
 * 日期工具类
 */

/**
 * 格式化日期
 */
export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) return ''
  const d = new Date(date)
  
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 获取今天日期
 */
export function getToday() {
  return formatDate(new Date(), 'YYYY-MM-DD')
}

/**
 * 获取当前时间戳
 */
export function getNow() {
  return Date.now()
}

/**
 * 判断两个时间段是否冲突
 */
export function isTimeConflict(start1, end1, start2, end2) {
  const s1 = new Date(start1).getTime()
  const e1 = new Date(end1).getTime()
  const s2 = new Date(start2).getTime()
  const e2 = new Date(end2).getTime()
  
  return s1 < e2 && s2 < e1
}

/**
 * 获取相对时间
 */
export function getRelativeTime(date) {
  const now = Date.now()
  const diff = now - new Date(date).getTime()
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`
  
  return formatDate(date, 'YYYY-MM-DD')
}

export default {
  formatDate,
  getToday,
  getNow,
  isTimeConflict,
  getRelativeTime
}