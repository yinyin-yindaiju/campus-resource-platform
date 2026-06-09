<template>
  <div class="exceptions-container">
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
            <h2>异常报备</h2>
          </div>
          <div class="header-right">
            <el-button type="primary" @click="showAddDialog">
              <el-icon><Plus /></el-icon>
              报备异常
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
            <el-input placeholder="搜索资源或描述" v-model="searchQuery" style="width: 200px;">
              <template #append>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
            <el-select v-model="filterStatus" placeholder="选择状态">
              <el-option label="全部" value="" />
              <el-option label="待处理" value="pending" />
              <el-option label="处理中" value="processing" />
              <el-option label="已解决" value="resolved" />
            </el-select>
            <el-select v-model="filterType" placeholder="选择类型">
              <el-option label="全部" value="" />
              <el-option label="设备故障" value="equipment" />
              <el-option label="环境问题" value="environment" />
              <el-option label="其他" value="other" />
            </el-select>
          </div>
          
          <el-table :data="filteredExceptions" stripe>
            <el-table-column prop="resource" label="资源名称" />
            <el-table-column prop="type" label="异常类型">
              <template #default="{ row }">
                <el-tag :type="getTypeTag(row.type)">{{ getTypeText(row.type) }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="description" label="描述" />
            <el-table-column prop="reporter" label="报备人" />
            <el-table-column prop="reportTime" label="报备时间" />
            <el-table-column prop="status" label="状态">
              <template #default="{ row }">
                <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="{ row }">
                <el-button size="small" @click="showHandleDialog(row)">处理</el-button>
                <el-button size="small" type="danger" @click="deleteException(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    
    <el-dialog title="报备异常" v-model="dialogVisible">
      <el-form :model="exceptionForm" :rules="rules" ref="exceptionFormRef" label-width="80px">
        <el-form-item label="资源名称" prop="resource">
          <el-input v-model="exceptionForm.resource" />
        </el-form-item>
        <el-form-item label="异常类型" prop="type">
          <el-select v-model="exceptionForm.type">
            <el-option label="设备故障" value="equipment" />
            <el-option label="环境问题" value="environment" />
            <el-option label="其他" value="other" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
            <el-input v-model="exceptionForm.reporter" />
        </el-form-item>
        <el-form-item label="报备人" prop="reporter">
          <el-input v-model="exceptionForm.reporter" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveException">确定</el-button>
      </div>
    </el-dialog>
    
    <el-dialog title="处理异常" v-model="handleDialogVisible">
      <el-form :model="handleForm" label-width="80px">
        <el-form-item label="处理状态">
          <el-select v-model="handleForm.status">
            <el-option label="待处理" value="pending" />
            <el-option label="处理中" value="processing" />
            <el-option label="已解决" value="resolved" />
          </el-select>
        </el-form-item>
        <el-form-item label="处理备注">
          <el-textarea v-model="handleForm.note" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="handleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleException">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { useExceptionStore } from '../stores/exception'

export default {
  name: 'Exceptions',
  data() {
    return {
      searchQuery: '',
      filterStatus: '',
      filterType: '',
      dialogVisible: false,
      handleDialogVisible: false,
      exceptionForm: {
        resource: '',
        type: '',
        description: '',
        reporter: '',
        status: 'pending',
        reportTime: ''
      },
      handleForm: {
        status: '',
        note: ''
      },
      currentException: null,
      rules: {
        resource: [
          { required: true, message: '请输入资源名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择异常类型', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请填写异常描述', trigger: 'blur' },
          { min: 5, message: '描述至少需要5个字符', trigger: 'blur' }
        ],
        reporter: [
          { required: true, message: '请输入报备人', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    filteredExceptions() {
      const store = useExceptionStore()
      return store.exceptions.filter(e => {
        const matchSearch = !this.searchQuery || e.resource.includes(this.searchQuery) || e.description.includes(this.searchQuery)
        const matchStatus = !this.filterStatus || e.status === this.filterStatus
        const matchType = !this.filterType || e.type === this.filterType
        return matchSearch && matchStatus && matchType
      })
    }
  },
  methods: {
    getTypeTag(type) {
      const types = {
        equipment: 'danger',
        environment: 'warning',
        other: 'info'
      }
      return types[type] || 'info'
    },
    getTypeText(type) {
      const texts = {
        equipment: '设备故障',
        environment: '环境问题',
        other: '其他'
      }
      return texts[type] || '未知'
    },
    getStatusType(status) {
      const types = {
        pending: 'danger',
        processing: 'warning',
        resolved: 'success'
      }
      return types[status] || 'info'
    },
    getStatusText(status) {
      const texts = {
        pending: '待处理',
        processing: '处理中',
        resolved: '已解决'
      }
      return texts[status] || '未知'
    },
    showAddDialog() {
      this.exceptionForm = {
        resource: '',
        type: '',
        description: '',
        reporter: '',
        status: 'pending',
        reportTime: new Date().toLocaleString()
      }
      this.dialogVisible = true
    },
    showHandleDialog(exception) {
      this.currentException = exception
      this.handleForm = {
        status: exception.status,
        note: ''
      }
      this.handleDialogVisible = true
    },
    saveException() {
      this.$refs.exceptionFormRef.validate((valid) => {
        if (valid) {
          const store = useExceptionStore()
          store.addException(this.exceptionForm)
          this.$message.success('异常报备成功')
          this.dialogVisible = false
        }
      })
    },
    handleException() {
      const store = useExceptionStore()
      const exception = store.exceptions.find(e => e.id === this.currentException.id)
      if (exception) {
        exception.status = this.handleForm.status
        this.handleDialogVisible = false
        this.$message.success('异常处理成功')
      }
    },
    deleteException(id) {
      this.$confirm('确定要删除这个异常报备吗？')
        .then(() => {
          const store = useExceptionStore()
          store.deleteException(id)
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
.exceptions-container {
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
}
</style>
