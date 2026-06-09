import { defineStore } from 'pinia'
import { storage } from '../utils/storage'

export const useResourceStore = defineStore('resource', {
  state: () => ({
    resources: storage.get('resources', [
      { id: 1, name: 'A栋101教室', type: 'classroom', location: 'A栋1楼', capacity: 60, status: 'available', description: '标准多媒体教室', facilities: '投影仪、空调、白板', createdAt: '2024-05-01 10:00:00' },
      { id: 2, name: '计算机实验室', type: 'lab', location: 'B栋2楼', capacity: 40, status: 'available', description: '配备40台电脑', facilities: '电脑40台、投影仪、网络', createdAt: '2024-05-01 10:00:00' },
      { id: 3, name: '行政楼会议室', type: 'meeting', location: '行政楼3楼', capacity: 20, status: 'maintenance', description: '大型会议室', facilities: '投影仪、音响、空调', createdAt: '2024-05-01 10:00:00' },
      { id: 4, name: '篮球场', type: 'sports', location: '体育馆1楼', capacity: 100, status: 'available', description: '标准篮球场', facilities: '篮球架2个、计时器', createdAt: '2024-05-01 10:00:00' },
      { id: 5, name: '图书馆自习室', type: 'library', location: '图书馆2楼', capacity: 80, status: 'available', description: '安静自习环境', facilities: '空调、饮水机、插座', createdAt: '2024-05-01 10:00:00' },
      { id: 6, name: '录播教室', type: 'multimedia', location: 'C栋3楼', capacity: 50, status: 'available', description: '专业录播设备', facilities: '录播系统、投影仪、音响', createdAt: '2024-05-01 10:00:00' }
    ]),
    currentResource: null,
    loading: false
  }),
  actions: {
    setResources(resources) {
      this.resources = resources
      storage.set('resources', resources)
    },
    setCurrentResource(resource) {
      this.currentResource = resource
    },
    setLoading(loading) {
      this.loading = loading
    },
    addResource(resource) {
      const newResource = {
        ...resource,
        id: Date.now(),
        createdAt: new Date().toLocaleString('zh-CN')
      }
      this.resources.push(newResource)
      storage.set('resources', this.resources)
    },
    updateResource(resource) {
      const index = this.resources.findIndex(r => r.id === resource.id)
      if (index !== -1) {
        this.resources[index] = { ...this.resources[index], ...resource }
        storage.set('resources', this.resources)
      }
    },
    deleteResource(id) {
      this.resources = this.resources.filter(r => r.id !== id)
      storage.set('resources', this.resources)
    }
  }
})