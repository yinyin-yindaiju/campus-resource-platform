<template>
  <div class="bookings-container">
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
            <h2>预约管理</h2>
          </div>
          <div class="header-right">
            <el-button type="primary" @click="showAddDialog">
              <el-icon><Plus /></el-icon>
              新增预约
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
            <el-input placeholder="搜索资源或预约人" v-model="searchQuery" style="width: 200px;">
              <template #append>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
            <el-select v-model="filterStatus" placeholder="选择状态">
              <el-option label="全部" value="" />
              <el-option label="待审批" value="pending" />
              <el-option label="已通过" value="approved" />
              <el-option label="已取消" value="cancelled" />
              <el-option label="已完成" value="completed" />
            </el-select>
            <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
          </div>
          
          <el-table :data="filteredBookings" stripe>
            <el-table-column prop="resource" label="资源名称" />
            <el-table-column prop="user" label="预约人" />
            <el-table-column prop="startTime" label="开始时间" />
            <el-table-column prop="endTime" label="结束时间" />
            <el-table-column prop="purpose" label="用途" />
            <el-table-column prop="status" label="状态">
              <template #default="{ row }">
                <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="{ row }">
                <el-button size="small" @click="showEditDialog(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="cancelBooking(row.id)" v-if="row.status === 'approved'">取消</el-button>
                <el-button size="small" type="primary" @click="approveBooking(row.id)" v-if="row.status === 'pending'">通过</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    
    <el-dialog title="新增预约" v-model="dialogVisible">
      <el-form :model="bookingForm" label-width="80px">
        <el-form-item label="资源名称">
          <el-select v-model="bookingForm.resource">
            <el-option v-for="r in resources" :key="r.id" :label="r.name" :value="r.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="预约人">
          <el-input v-model="bookingForm.user" />
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model="bookingForm.startTime" type="datetime" />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="bookingForm.endTime" type="datetime" />
        </el-form-item>
        <el-form-item label="用途">
          <el-textarea v-model="bookingForm.purpose" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveBooking">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { useBookingStore } from '../stores/booking'
import { useResourceStore } from '../stores/resource'

export default {
  name: 'Bookings',
  data() {
    return {
      searchQuery: '',
      filterStatus: '',
      dateRange: null,
      dialogVisible: false,
      bookingForm: {
        resource: '',
        user: '',
        startTime: '',
        endTime: '',
        purpose: '',
        status: 'pending'
      },
      editMode: false,
      editId: null
    }
  },
  computed: {
    resources() {
      return useResourceStore().resources
    },
    filteredBookings() {
      const store = useBookingStore()
      return store.bookings.filter(b => {
        const matchSearch = !this.searchQuery || b.resource.includes(this.searchQuery) || b.user.includes(this.searchQuery)
        const matchStatus = !this.filterStatus || b.status === this.filterStatus
        return matchSearch && matchStatus
      })
    }
  },
  methods: {
    getStatusType(status) {
      const types = {
        pending: 'warning',
        approved: 'success',
        cancelled: 'danger',
        completed: 'info'
      }
      return types[status] || 'info'
    },
    getStatusText(status) {
      const texts = {
        pending: '待审批',
        approved: '已通过',
        cancelled: '已取消',
        completed: '已完成'
      }
      return texts[status] || '未知'
    },
    showAddDialog() {
      this.editMode = false
      this.editId = null
      this.bookingForm = {
        resource: '',
        user: '',
        startTime: '',
        endTime: '',
        purpose: '',
        status: 'pending'
      }
      this.dialogVisible = true
    },
    showEditDialog(booking) {
      this.editMode = true
      this.editId = booking.id
      this.bookingForm = { ...booking }
      this.dialogVisible = true
    },
    saveBooking() {
      const store = useBookingStore()
      if (this.editMode) {
        store.updateBooking(this.bookingForm)
        this.$message.success('预约更新成功')
      } else {
        store.addBooking(this.bookingForm)
        this.$message.success('预约添加成功')
      }
      this.dialogVisible = false
    },
    cancelBooking(id) {
      this.$confirm('确定要取消这个预约吗？')
        .then(() => {
          const store = useBookingStore()
          store.cancelBooking(id)
          this.$message.success('预约已取消')
        })
        .catch(() => {})
    },
    approveBooking(id) {
      const store = useBookingStore()
      store.approveBooking(id)
      this.$message.success('预约已通过')
    },
    handleLogout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.bookings-container {
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
