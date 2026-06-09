import { defineStore } from 'pinia'
import { storage } from '../utils/storage'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: storage.get('notifications', [
      {
        id: 1,
        type: 'booking',
        title: '新预约申请',
        message: '李同学预约了计算机实验室',
        status: 'unread',
        createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString()
      },
      {
        id: 2,
        type: 'exception',
        title: '异常上报',
        message: '3号电脑无法启动',
        status: 'unread',
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
      },
      {
        id: 3,
        type: 'system',
        title: '系统通知',
        message: '系统将在今晚进行维护',
        status: 'read',
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString()
      }
    ]),
    // 通知设置
    settings: storage.get('notification_settings', {
      booking: true,    // 预约通知
      exception: true, // 异常通知
      system: true,     // 系统通知
      sound: true,      // 声音提示
      desktop: false    // 桌面通知
    })
  }),
  getters: {
    // 获取未读通知数量
    unreadCount: (state) => {
      return state.notifications.filter(n => n.status === 'unread').length
    },
    // 获取未读通知
    unreadNotifications: (state) => {
      return state.notifications.filter(n => n.status === 'unread')
    },
    // 获取所有通知
    allNotifications: (state) => {
      return state.notifications
    }
  },
  actions: {
    // 添加通知
    addNotification(notification) {
      const newNotification = {
        id: Date.now(),
        ...notification,
        status: 'unread',
        createdAt: new Date().toISOString()
      }
      this.notifications.unshift(newNotification)
      this.saveToStorage()
      return newNotification
    },
    // 标记为已读
    markAsRead(id) {
      const notification = this.notifications.find(n => n.id === id)
      if (notification) {
        notification.status = 'read'
        this.saveToStorage()
      }
    },
    // 全部标记为已读
    markAllAsRead() {
      this.notifications.forEach(n => {
        n.status = 'read'
      })
      this.saveToStorage()
    },
    // 删除通知
    deleteNotification(id) {
      this.notifications = this.notifications.filter(n => n.id !== id)
      this.saveToStorage()
    },
    // 清空所有通知
    clearAll() {
      this.notifications = []
      this.saveToStorage()
    },
    // 更新设置
    updateSettings(newSettings) {
      this.settings = { ...this.settings, ...newSettings }
      storage.set('notification_settings', this.settings)
    },
    // 保存到本地存储
    saveToStorage() {
      storage.set('notifications', this.notifications)
    },
    // 创建预约通知
    notifyBooking(resource, user, action = 'apply') {
      const messages = {
        apply: `用户 ${user} 申请预约 ${resource}`,
        approve: `您预约的 ${resource} 已通过审批`,
        reject: `您预约的 ${resource} 未通过审批`,
        cancel: `您预约的 ${resource} 已被取消`
      }
      
      if (this.settings.booking) {
        this.addNotification({
          type: 'booking',
          title: '预约通知',
          message: messages[action] || '预约状态更新'
        })
      }
    },
    // 创建异常通知
    notifyException(resource, description, action = 'report') {
      const messages = {
        report: `${resource} 出现异常：${description}`,
        resolve: `${resource} 的异常已处理完成`
      }
      
      if (this.settings.exception) {
        this.addNotification({
          type: 'exception',
          title: '异常通知',
          message: messages[action] || '异常状态更新'
        })
      }
    },
    // 创建系统通知
    notifySystem(message) {
      if (this.settings.system) {
        this.addNotification({
          type: 'system',
          title: '系统通知',
          message: message
        })
      }
    }
  }
})

export default useNotificationStore