import { defineStore } from 'pinia'
import { storage } from '../utils/storage'
import { isTimeConflict } from '../utils/date'

export const useBookingStore = defineStore('booking', {
  state: () => ({
    bookings: storage.get('bookings', [
      { id: 1, resource: 'A栋101教室', user: '张老师', startTime: '2024-05-29 09:00', endTime: '2024-05-29 11:00', purpose: '课程教学', status: 'approved', createdAt: '2024-05-25 10:00:00' },
      { id: 2, resource: '计算机实验室', user: '李同学', startTime: '2024-05-29 14:00', endTime: '2024-05-29 16:00', purpose: '实验课程', status: 'pending', createdAt: '2024-05-28 14:00:00' },
      { id: 3, resource: '行政楼会议室', user: '王老师', startTime: '2024-05-30 10:00', endTime: '2024-05-30 12:00', purpose: '部门会议', status: 'approved', createdAt: '2024-05-27 09:00:00' },
      { id: 4, resource: '篮球场', user: '体育部', startTime: '2024-05-30 16:00', endTime: '2024-05-30 18:00', purpose: '体育活动', status: 'pending', createdAt: '2024-05-28 16:00:00' },
      { id: 5, resource: '图书馆自习室', user: '赵同学', startTime: '2024-05-31 18:00', endTime: '2024-05-31 20:00', purpose: '学习', status: 'completed', createdAt: '2024-05-26 18:00:00' }
    ]),
    currentBooking: null,
    loading: false
  }),
  getters: {
    // 获取某个资源的预约列表
    getBookingsByResource: (state) => (resourceName) => {
      return state.bookings.filter(b => b.resource === resourceName && b.status !== 'cancelled')
    },
    // 获取某个用户的预约列表
    getBookingsByUser: (state) => (userName) => {
      return state.bookings.filter(b => b.user === userName)
    },
    // 获取待审批的预约数量
    pendingCount: (state) => {
      return state.bookings.filter(b => b.status === 'pending').length
    },
    // 获取今日预约数量
    todayCount: (state) => {
      const today = new Date().toLocaleDateString('zh-CN')
      return state.bookings.filter(b => 
        b.startTime.includes(today) && b.status === 'approved'
      ).length
    }
  },
  actions: {
    setBookings(bookings) {
      this.bookings = bookings
      storage.set('bookings', bookings)
    },
    setCurrentBooking(booking) {
      this.currentBooking = booking
    },
    setLoading(loading) {
      this.loading = loading
    },
    // 检查预约冲突
    checkConflict(resource, startTime, endTime, excludeId = null) {
      const resourceBookings = this.bookings.filter(b => 
        b.resource === resource && 
        b.status !== 'cancelled' &&
        b.status !== 'rejected' &&
        b.id !== excludeId
      )
      
      for (const booking of resourceBookings) {
        if (isTimeConflict(startTime, endTime, booking.startTime, booking.endTime)) {
          return {
            hasConflict: true,
            conflictBooking: booking
          }
        }
      }
      
      return { hasConflict: false }
    },
    addBooking(booking) {
      const conflict = this.checkConflict(booking.resource, booking.startTime, booking.endTime)
      if (conflict.hasConflict) {
        return {
          success: false,
          message: `该时间段与 "${booking.resource}" 的 "${booking.user}" 的预约冲突`,
          conflictBooking: conflict.conflictBooking
        }
      }
      
      const newBooking = {
        ...booking,
        id: Date.now(),
        status: 'pending',
        createdAt: new Date().toLocaleString('zh-CN')
      }
      this.bookings.push(newBooking)
      storage.set('bookings', this.bookings)
      
      return {
        success: true,
        message: '预约提交成功',
        booking: newBooking
      }
    },
    updateBooking(booking) {
      const index = this.bookings.findIndex(b => b.id === booking.id)
      if (index !== -1) {
        // 如果更新了时间或资源，检查冲突
        const oldBooking = this.bookings[index]
        if (oldBooking.resource !== booking.resource || 
            oldBooking.startTime !== booking.startTime || 
            oldBooking.endTime !== booking.endTime) {
          const conflict = this.checkConflict(
            booking.resource,
            booking.startTime,
            booking.endTime,
            booking.id
          )
          if (conflict.hasConflict) {
            return {
              success: false,
              message: '预约时间冲突'
            }
          }
        }
        
        this.bookings[index] = { ...this.bookings[index], ...booking }
        storage.set('bookings', this.bookings)
        return { success: true }
      }
      return { success: false, message: '预约不存在' }
    },
    updateStatus(id, status) {
      const booking = this.bookings.find(b => b.id === id)
      if (booking) {
        booking.status = status
        storage.set('bookings', this.bookings)
        return true
      }
      return false
    },
    approveBooking(id) {
      return this.updateStatus(id, 'approved')
    },
    cancelBooking(id) {
      return this.updateStatus(id, 'cancelled')
    },
    deleteBooking(id) {
      this.bookings = this.bookings.filter(b => b.id !== id)
      storage.set('bookings', this.bookings)
    }
  }
})