/**
 * 本地存储工具类
 */
const STORAGE_KEY = 'campus_resource_'

export const storage = {
  /**
   * 设置数据
   */
  set(key, value) {
    try {
      const data = JSON.stringify(value)
      localStorage.setItem(STORAGE_KEY + key, data)
      return true
    } catch (error) {
      console.error('存储数据失败:', error)
      return false
    }
  },

  /**
   * 获取数据
   */
  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(STORAGE_KEY + key)
      return data ? JSON.parse(data) : defaultValue
    } catch (error) {
      console.error('读取数据失败:', error)
      return defaultValue
    }
  },

  /**
   * 删除数据
   */
  remove(key) {
    try {
      localStorage.removeItem(STORAGE_KEY + key)
      return true
    } catch (error) {
      console.error('删除数据失败:', error)
      return false
    }
  },

  /**
   * 清空所有数据
   */
  clear() {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith(STORAGE_KEY)) {
          localStorage.removeItem(key)
        }
      })
      return true
    } catch (error) {
      console.error('清空数据失败:', error)
      return false
    }
  },

  /**
   * 检查数据是否存在
   */
  has(key) {
    return localStorage.getItem(STORAGE_KEY + key) !== null
  }
}

export default storage