<template>
  <div class="dashboard-container">
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
            <h2>数据看板</h2>
          </div>
          <div class="header-right">
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
          <div class="stats-overview">
            <div class="stat-card">
              <div class="stat-icon">🏢</div>
              <div class="stat-content">
                <div class="stat-value">{{ resourceCount }}</div>
                <div class="stat-label">资源总数</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">📅</div>
              <div class="stat-content">
                <div class="stat-value">{{ bookingCount }}</div>
                <div class="stat-label">今日预约</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⚠️</div>
              <div class="stat-content">
                <div class="stat-value">{{ exceptionCount }}</div>
                <div class="stat-label">异常报备</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">📊</div>
              <div class="stat-content">
                <div class="stat-value">{{ utilizationRate }}%</div>
                <div class="stat-label">资源利用率</div>
              </div>
            </div>
          </div>
          
          <div class="charts-section">
            <div class="chart-card">
              <h3>资源类型分布</h3>
              <div ref="typeChart" style="height: 300px;"></div>
            </div>
            <div class="chart-card">
              <h3>预约趋势</h3>
              <div ref="trendChart" style="height: 300px;"></div>
            </div>
          </div>
          
          <div class="recent-section">
            <h3>最近预约</h3>
            <el-table :data="recentBookings" stripe>
              <el-table-column prop="resource" label="资源名称" />
              <el-table-column prop="user" label="预约人" />
              <el-table-column prop="startTime" label="预约时间" />
              <el-table-column prop="status" label="状态">
                <template #default="{ row }">
                  <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { useResourceStore } from '../stores/resource'
import { useBookingStore } from '../stores/booking'
import * as echarts from 'echarts'

export default {
  name: 'Dashboard',
  data() {
    return {
      resourceCount: 0,
      bookingCount: 0,
      exceptionCount: 0,
      utilizationRate: 87,
      recentBookings: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadData()
      this.initCharts()
    })
  },
  methods: {
    loadData() {
      const resourceStore = useResourceStore()
      const bookingStore = useBookingStore()
      
      this.resourceCount = resourceStore.resources.length
      this.bookingCount = bookingStore.bookings.length
      this.exceptionCount = 2
      this.recentBookings = bookingStore.bookings.slice(0, 5)
    },
    initCharts() {
      this.$nextTick(() => {
        if (this.$refs.typeChart) {
          const typeChart = echarts.init(this.$refs.typeChart)
          typeChart.setOption({
            title: { text: '' },
            tooltip: { trigger: 'item' },
            legend: { orient: 'horizontal', bottom: 10 },
            series: [{
              name: '资源类型',
              type: 'pie',
              radius: '50%',
              data: [
                { value: 35, name: '教室' },
                { value: 25, name: '实验室' },
                { value: 20, name: '会议室' },
                { value: 15, name: '设备' },
                { value: 5, name: '其他' }
              ]
            }]
          })
        }
        
        if (this.$refs.trendChart) {
          const trendChart = echarts.init(this.$refs.trendChart)
          trendChart.setOption({
            title: { text: '' },
            tooltip: { trigger: 'axis' },
            grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
            xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
            yAxis: { type: 'value' },
            series: [{
              name: '预约数',
              type: 'line',
              data: [12, 19, 3, 5, 2, 3, 10]
            }]
          })
        }
        
        window.addEventListener('resize', () => {
          if (this.$refs.typeChart) {
            const typeChart = echarts.getInstanceByDom(this.$refs.typeChart)
            if (typeChart) typeChart.resize()
          }
          if (this.$refs.trendChart) {
            const trendChart = echarts.getInstanceByDom(this.$refs.trendChart)
            if (trendChart) trendChart.resize()
          }
        })
      })
    },
    getStatusType(status) {
      const typeMap = {
        pending: 'warning',
        approved: 'success',
        cancelled: 'danger',
        completed: 'info'
      }
      return typeMap[status] || 'info'
    },
    handleLogout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.dashboard-container {
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

.stats-overview {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
}

.stat-label {
  font-size: 14px;
  color: #64748b;
}

.charts-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.chart-card {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.chart-card h3 {
  margin: 0 0 16px;
  font-size: 16px;
  color: #1e293b;
}

.recent-section {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.recent-section h3 {
  margin: 0 0 16px;
  font-size: 16px;
  color: #1e293b;
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
  
  .stats-overview {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .charts-section {
    grid-template-columns: 1fr;
  }
}
</style>
