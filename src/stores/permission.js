import { defineStore } from 'pinia'
import { storage } from '../utils/storage'

/**
 * 权限配置
 */
const PERMISSIONS = {
  admin: {
    // 管理员权限
    resources: {
      view: true,    // 查看资源
      create: true,  // 创建资源
      edit: true,    // 编辑资源
      delete: true   // 删除资源
    },
    bookings: {
      view: true,    // 查看预约
      create: true,  // 创建预约
      approve: true, // 审批预约
      cancel: true   // 取消预约
    },
    exceptions: {
      view: true,    // 查看异常
      report: true,  // 上报异常
      handle: true,  // 处理异常
      delete: true   // 删除异常
    },
    statistics: {
      view: true,    // 查看统计
      export: true   // 导出数据
    },
    users: {
      view: true,    // 查看用户
      create: true,  // 创建用户
      edit: true,    // 编辑用户
      delete: true   // 删除用户
    }
  },
  teacher: {
    // 教师权限
    resources: {
      view: true,
      create: false,
      edit: false,
      delete: false
    },
    bookings: {
      view: true,
      create: true,
      approve: false,
      cancel: true
    },
    exceptions: {
      view: true,
      report: true,
      handle: false,
      delete: false
    },
    statistics: {
      view: true,
      export: false
    },
    users: {
      view: false,
      create: false,
      edit: false,
      delete: false
    }
  },
  student: {
    // 学生权限
    resources: {
      view: true,
      create: false,
      edit: false,
      delete: false
    },
    bookings: {
      view: true,
      create: true,
      approve: false,
      cancel: true
    },
    exceptions: {
      view: true,
      report: true,
      handle: false,
      delete: false
    },
    statistics: {
      view: true,
      export: false
    },
    users: {
      view: false,
      create: false,
      edit: false,
      delete: false
    }
  }
}

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    // 默认管理员权限
    currentPermissions: PERMISSIONS.admin
  }),
  getters: {
    // 检查是否有某个权限
    hasPermission: (state) => (module, action) => {
      if (!state.currentPermissions[module]) return false
      return state.currentPermissions[module][action] || false
    },
    // 检查是否为管理员
    isAdmin: (state) => {
      return state.currentPermissions === PERMISSIONS.admin
    },
    // 检查是否为教师
    isTeacher: (state) => {
      return state.currentPermissions === PERMISSIONS.teacher
    },
    // 检查是否为学生
    isStudent: (state) => {
      return state.currentPermissions === PERMISSIONS.student
    }
  },
  actions: {
    // 设置权限
    setPermissions(role) {
      if (PERMISSIONS[role]) {
        this.currentPermissions = PERMISSIONS[role]
      }
    },
    // 获取权限配置
    getPermissions(role = 'admin') {
      return PERMISSIONS[role] || {}
    },
    // 检查权限
    checkPermission(role, module, action) {
      const permissions = PERMISSIONS[role]
      if (!permissions) return false
      if (!permissions[module]) return false
      return permissions[module][action] || false
    }
  }
})

export { PERMISSIONS }
export default usePermissionStore