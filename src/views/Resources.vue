<template>
  <div class="resources-container">
    <el-container>
      <el-aside width="220px">
        <div class="logo-section">
          <div class="logo">🏫</div>
          <span class="logo-text">资源管控平台</span>
        </div>
        
        <el-menu
          :default-active="$route.path"
          router
          background-color="#1e293b"
          text-color="#94a3b8"
          active-text-color="#667eea"
        >
          <el-menu-item index="/dashboard">
            <el-icon><DataAnalysis /></el-icon>
            <span>数据看板</span>
          </el-menu-item>
          <el-menu-item index="/resources">
            <el-icon><OfficeBuilding /></el-icon>
            <span>资源登记</span>
          </el-menu-item>
          <el-menu-item index="/bookings">
            <el-icon><Calendar /></el-icon>
            <span>预约管理</span>
          </el-menu-item>
          <el-menu-item index="/statistics">
            <el-icon><TrendCharts /></el-icon>
            <span>使用统计</span>
          </el-menu-item>
          <el-menu-item index="/exceptions">
            <el-icon><Warning /></el-icon>
            <span>异常报备</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header>
          <div class="header-left">
            <h2>资源登记</h2>
          </div>
          <div class="header-right">
            <el-button type="primary" @click="showAddDialog">
              <el-icon><Plus /></el-icon>
              新增资源
            </el-button>
            <el-dropdown>
              <span class="user-info">
                <el-icon><User /></el-icon>
                <span>管理员</span>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        
        <el-main>
          <div class="filter-section">
            <el-input placeholder="搜索资源名称" v-model="searchQuery" style="width: 200px;">
              <template #append>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
            <el-select v-model="filterType" placeholder="选择类型">
              <el-option label="全部" value="" />
              <el-option label="教室" value="classroom" />
              <el-option label="实验室" value="laboratory" />
              <el-option label="会议室" value="meeting" />
              <el-option label="设备" value="equipment" />
            </el-select>
            <el-select v-model="filterStatus" placeholder="选择状态">
              <el-option label="全部" value="" />
              <el-option label="可用" value="available" />
              <el-option label="维护中" value="maintenance" />
              <el-option label="不可用" value="unavailable" />
            </el-select>
          </div>
          
          <div class="resources-grid">
            <el-card v-for="resource in filteredResources" :key="resource.id" class="resource-card">
              <div class="resource-header">
                <div class="resource-icon">{{ getResourceIcon(resource.type) }}</div>
                <div class="resource-info">
                  <h3>{{ resource.name }}</h3>
                  <span class="resource-type">{{ getResourceTypeName(resource.type) }}</span>
                </div>
                <el-tag :type="getStatusType(resource.status)">{{ getStatusText(resource.status) }}</el-tag>
              </div>
              <div class="resource-description">{{ resource.description }}</div>
              <div class="resource-meta">
                <span><el-icon><Map /></el-icon>{{ resource.location }}</span>
                <span><el-icon><Users /></el-icon>{{ resource.capacity }}人</span>
              </div>
              <div class="resource-actions">
                <el-button size="small" @click="showEditDialog(resource)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteResource(resource.id)">删除</el-button>
              </div>
            </el-card>
          </div>
        </el-main>
      </el-container>
    </el-container>
    
    <el-dialog title="新增资源" v-model="dialogVisible">
      <el-form :model="resourceForm" label-width="80px">
        <el-form-item label="资源名称">
          <el-input v-model="resourceForm.name" />
        </el-form-item>
        <el-form-item label="资源类型">
          <el-select v-model="resourceForm.type">
            <el-option label="教室" value="classroom" />
            <el-option label="实验室" value="laboratory" />
            <el-option label="会议室" value="meeting" />
            <el-option label="设备" value="equipment" />
          </el-select>
        </el-form-item>
        <el-form-item label="位置">
          <el-input v-model="resourceForm.location" />
        </el-form-item>
        <el-form-item label="容量">
          <el-input type="number" v-model="resourceForm.capacity" />
        </el-form-item>
        <el-form-item label="描述">
          <el-textarea v-model="resourceForm.description" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveResource">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { useResourceStore } from '../stores/resource'

export default {
  name: 'Resources',
  data() {
    return {
      searchQuery: '',
      filterType: '',
      filterStatus: '',
      dialogVisible: false,
      resourceForm: {
        name: '',
        type: '',
        location: '',
        capacity: 0,
        description: '',
        status: 'available'
      },
      editMode: false,
      editId: null
    }
  },
  computed: {
    filteredResources() {
      const store = useResourceStore()
      return store.resources.filter(r => {
        const matchSearch = !this.searchQuery || r.name.includes(this.searchQuery)
        const matchType = !this.filterType || r.type === this.filterType
        const matchStatus = !this.filterStatus || r.status === this.filterStatus
        return matchSearch && matchType && matchStatus
      })
    }
  },
  methods: {
    getResourceIcon(type) {
      const icons = {
        classroom: '🏫',
        laboratory: '🔬',
        meeting: '📋',
        equipment: '💻'
      }
      return icons[type] || '📦'
    },
    getResourceTypeName(type) {
      const types = {
        classroom: '教室',
        laboratory: '实验室',
        meeting: '会议室',
        equipment: '设备'
      }
      return types[type] || '其他'
    },
    getStatusType(status) {
      const types = {
        available: 'success',
        maintenance: 'warning',
        unavailable: 'danger'
      }
      return types[status] || 'info'
    },
    getStatusText(status) {
      const texts = {
        available: '可用',
        maintenance: '维护中',
        unavailable: '不可用'
      }
      return texts[status] || '未知'
    },
    showAddDialog() {
      this.editMode = false
      this.editId = null
      this.resourceForm = {
        name: '',
        type: '',
        location: '',
        capacity: 0,
        description: '',
        status: 'available'
      }
      this.dialogVisible = true
    },
    showEditDialog(resource) {
      this.editMode = true
      this.editId = resource.id
      this.resourceForm = { ...resource }
      this.dialogVisible = true
    },
    saveResource() {
      const store = useResourceStore()
      if (this.editMode) {
        store.updateResource(this.editId, this.resourceForm)
        this.$message.success('资源更新成功')
      } else {
        store.addResource(this.resourceForm)
        this.$message.success('资源添加成功')
      }
      this.dialogVisible = false
    },
    deleteResource(id) {
      this.$confirm('确定要删除这个资源吗？')
        .then(() => {
          const store = useResourceStore()
          store.deleteResource(id)
          this.$message.success('删除成功')
        })
        .catch(() => {})
    },
    handleLogout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.resources-container {
  min-height: 100vh;
  background: #f8fafc;
}

.el-aside {
  background: #1e293b;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
}

.logo-section {
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  font-size: 32px;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.el-header {
  background: #fff;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.header-left h2 {
  margin: 0;
  color: #1e293b;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.el-main {
  padding: 24px;
  margin-left: 220px;
}

.filter-section {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.resource-card {
  border-radius: 12px;
}

.resource-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.resource-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.resource-info h3 {
  margin: 0 0 4px;
  font-size: 16px;
}

.resource-type {
  font-size: 12px;
  color: #64748b;
}

.resource-description {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 12px;
  line-height: 1.5;
}

.resource-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  font-size: 13px;
  color: #64748b;
}

.resource-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

@media (max-width: 1024px) {
  .resources-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .el-aside {
    width: 60px !important;
  }
  
  .logo-text {
    display: none;
  }
  
  .el-main {
    margin-left: 60px;
    padding: 16px;
  }
  
  .filter-section {
    flex-direction: column;
  }
  
  .resources-grid {
    grid-template-columns: 1fr;
  }
}
</style>
