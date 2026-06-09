<template>
  <div class="statistics-container">
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
            <h2>使用统计</h2>
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
              <div class="stat-icon">📊</div>
              <div class="stat-content">
                <div class="stat-value">{{ totalBookings }}</div>
                <div class="stat-label">总预约数</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">✅</div>
              <div class="stat-content">
                <div class="stat-value">{{ completedBookings }}</div>
                <div class="stat-label">已完成预约</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⏳</div>
              <div class="stat-content">
                <div class="stat-value">{{ pendingBookings }}</div>
                <div class="stat-label">待审批</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">📈</div>
              <div class="stat-content">
                <div class="stat-value">{{ avgUtilization }}%</div>
                <div class="stat-label">平均利用率</div>
              </div>
            </div>
          </div>
          
          <div class="charts-section">
            <div class="chart-card">
              <h3>预约趋势分析</h3>
              <div ref="trendChart" style="height: 300px;"></div>
            </div>
            <div class="chart-card">
              <h3>资源使用排行</h3>
              <div ref="rankingChart" style="height: 300px;"></div>
            </div>
          </div>
          
          <div class="department-section">
            <h3>各部门使用统计</h3>
            <el-table :data="departmentStats" stripe>
              <el-table-column prop="department" label="部门" />
              <el-table-column prop="usageCount" label="使用次数" />
              <el-table-column prop="usageDuration" label="使用时长(小时)" />
              <el-table-column prop="userCount" label="使用人数" />
              <el-table-column prop="utilization" label="利用率">
                <template #default="{ row }">
                  <el-progress :percentage="row.utilization" :show-text="false" />
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
import { useBookingStore } from '../stores/booking'
import * as echarts from 'echarts'

export default {
  name: 'Statistics',
  data() {
    return {
      totalBookings: 0,
      completedBookings: 0,
      pendingBookings: 0,
      avgUtilization: 0,
      departmentStats: [
        { department: '信息学院', usageCount: 234, usageDuration: 456, userCount: 89, utilization: 92 },
        { department: '机械学院', usageCount: 189, usageDuration: 378, userCount: 67, utilization: 85 },
        { department: '经管学院', usageCount: 156, usageDuration: 312, userCount: 54, utilization: 78 },
        { department: '文学院', usageCount: 98, usageDuration: 196, userCount: 42, utilization: 65 },
        { department: '理学院', usageCount: 145, usageDuration: 290, userCount: 58, utilization: 81 }
      ]
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
      const store = useBookingStore()
      this.totalBookings = store.bookings.length
      this.completedBookings = store.bookings.filter(b => b.status === 'completed').length
      this.pendingBookings = store.bookings.filter(b => b.status === 'pending').length
      this.avgUtilization = Math.round((this.completedBookings / this.totalBookings) * 100) || 0
    },
    initCharts() {
      this.$nextTick(() => {
        if (this.$refs.trendChart) {
          const trendChart = echarts.init(this.$refs.trendChart)
          trendChart.setOption({
            tooltip: { trigger: 'axis' },
            legend: { data: ['预约数', '完成数'] },
            grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
            xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月'] },
            yAxis: { type: 'value' },
            series: [
              { name: '预约数', type: 'bar', data: [120, 150, 180, 200, 220, 250] },
              { name: '完成数', type: 'bar', data: [100, 130, 160, 180, 195, 220] }
            ]
          })
        }
        
        if (this.$refs.rankingChart) {
          const rankingChart = echarts.init(this.$refs.rankingChart)
          rankingChart.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
            xAxis: { type: 'value' },
            yAxis: { type: 'category', data: ['其他', '设备', '会议室', '实验室', '教室'] },
            series: [{ type: 'bar', data: [30, 85, 120, 160, 200] }]
          })
        }
        
        window.addEventListener('resize', () => {
          if (this.$refs.trendChart) {
            const trendChart = echarts.getInstanceByDom(this.$refs.trendChart)
            if (trendChart) trendChart.resize()
          }
          if (this.$refs.rankingChart) {
            const rankingChart = echarts.getInstanceByDom(this.$refs.rankingChart)
            if (rankingChart) rankingChart.resize()
          }
        })
      })
    },
    handleLogout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.statistics-container {
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

.department-section {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.department-section h3 {
  margin: 0 0 16px;
  font-size: 16px;
  color: #1e293b;
}

@media (max-width: 1024px) {
  .stats-overview {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .charts-section {
    grid-template-columns: 1fr;
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
  
  .stats-overview {
    grid-template-columns: 1fr;
  }
}
</style>
