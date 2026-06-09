import { defineStore } from 'pinia'

export const useExceptionStore = defineStore('exception', {
  state: () => ({
    exceptions: [
      { id: 1, resource: '教学楼A-301', type: 'equipment', description: '投影仪无法正常工作', reporter: '张老师', status: 'pending', reportTime: '2024-01-15 10:30' },
      { id: 2, resource: '实验室B-202', type: 'environment', description: '空调温度调节故障', reporter: '李同学', status: 'processing', reportTime: '2024-01-14 14:20' },
      { id: 3, resource: '会议室C-101', type: 'equipment', description: '音响设备有杂音', reporter: '王老师', status: 'resolved', reportTime: '2024-01-13 09:15' }
    ]
  }),
  actions: {
    addException(exception) {
      this.exceptions.push({
        id: Date.now(),
        ...exception,
        reportTime: new Date().toLocaleString()
      })
    },
    deleteException(id) {
      const index = this.exceptions.findIndex(e => e.id === id)
      if (index > -1) {
        this.exceptions.splice(index, 1)
      }
    },
    updateException(exception) {
      const index = this.exceptions.findIndex(e => e.id === exception.id)
      if (index > -1) {
        this.exceptions[index] = exception
      }
    }
  }
})
