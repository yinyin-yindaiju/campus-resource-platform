# 校园资源智能管控平台 - 需求文档

## 1. 项目概述

### 1.1 项目背景
校园资源智能管控平台是一款面向高校的资源管理Web应用，旨在帮助学校高效管理各类校园资源（教室、实验室、会议室、体育场馆等），实现资源的数字化管理、预约审批、使用监控和数据分析。

### 1.2 目标用户
- **管理员**：负责资源登记、审批预约、查看统计数据
- **教师**：预约教学资源、查看预约状态
- **学生**：预约学习资源、查看可用资源

### 1.3 技术栈

| 分类 | 技术 | 版本 |
| :--- | :--- | :--- |
| 前端框架 | Vue | 3.x |
| 状态管理 | Pinia | 2.x |
| HTTP客户端 | Axios | 1.x |
| UI组件库 | Element Plus | 2.x |
| 路由 | Vue Router | 4.x |
| 图表库 | ECharts | 5.x |
| 构建工具 | Vite | 8.x |
| 后端框架 | Express | 4.x |
| 数据库 | MySQL | 8.x |
| 语言 | JavaScript | ES6+ |

### 1.4 设计原则
- **响应式设计**：支持手机端和电脑端访问
- **选项式API**：使用Vue 3选项式API风格
- **用户体验**：简洁直观的界面，流畅的交互
- **数据可视化**：直观展示资源使用情况

---

## 2. 功能需求

### 2.1 资源登记模块

| 功能点 | 需求描述 | 优先级 |
| :--- | :--- | :--- |
| 资源列表 | 展示所有校园资源，支持分页和搜索 | 高 |
| 资源登记 | 管理员可以登记新资源（教室、实验室等） | 高 |
| 资源编辑 | 管理员可以编辑资源信息 | 高 |
| 资源删除 | 管理员可以删除资源 | 高 |
| 资源详情 | 查看资源的详细信息（位置、容量、设备等） | 高 |
| 资源分类 | 按类型分类管理（教室、实验室、会议室、体育场馆） | 中 |
| 资源状态 | 标记资源状态（可用、维护中、已停用） | 高 |

### 2.2 预约管理模块

| 功能点 | 需求描述 | 优先级 |
| :--- | :--- | :--- |
| 资源预约 | 用户可以预约可用资源，选择时间段 | 高 |
| 预约列表 | 展示所有预约记录，支持筛选 | 高 |
| 预约审批 | 管理员可以审批预约申请 | 高 |
| 预约取消 | 用户可以取消自己的预约 | 高 |
| 预约冲突检测 | 自动检测预约时间冲突 | 高 |
| 预约提醒 | 预约开始前发送提醒通知 | 中 |
| 预约历史 | 查看历史预约记录 | 中 |

### 2.3 使用统计模块

| 功能点 | 需求描述 | 优先级 |
| :--- | :--- | :--- |
| 使用时长统计 | 统计资源使用时长 | 高 |
| 使用频次统计 | 统计资源使用频次 | 高 |
| 用户使用排行 | 统计用户使用资源排行 | 中 |
| 资源利用率 | 计算资源利用率 | 高 |
| 时间段统计 | 统计不同时间段的使用情况 | 中 |
| 部门使用统计 | 按部门统计资源使用情况 | 中 |

### 2.4 异常报备模块

| 功能点 | 需求描述 | 优先级 |
| :--- | :--- | :--- |
| 异常上报 | 用户可以上报资源异常（设备故障、损坏等） | 高 |
| 异常列表 | 展示所有异常记录 | 高 |
| 异常处理 | 管理员可以处理异常记录 | 高 |
| 异常状态 | 标记异常状态（待处理、处理中、已解决） | 高 |
| 异常统计 | 统计异常发生情况 | 中 |
| 异常通知 | 异常上报后通知相关人员 | 中 |

### 2.5 数据可视化模块

| 功能点 | 需求描述 | 优先级 |
| :--- | :--- | :--- |
| 资源使用趋势图 | 展示资源使用趋势（折线图） | 高 |
| 资源类型分布图 | 展示不同类型资源的分布（饼图） | 高 |
| 资源利用率图 | 展示资源利用率（柱状图） | 高 |
| 异常统计图 | 展示异常发生情况（柱状图） | 中 |
| 预约热力图 | 展示预约时间分布（热力图） | 中 |
| 实时数据看板 | 实时展示关键数据指标 | 高 |

---

## 3. 资源类型

| 资源类型 | 说明 | 示例 |
| :--- | :--- | :--- |
| 教室 | 教学活动使用的教室 | A栋101教室 |
| 实验室 | 实验教学使用的实验室 | 计算机实验室 |
| 会议室 | 会议使用的会议室 | 行政楼会议室 |
| 体育场馆 | 体育活动使用的场馆 | 篮球场、足球场 |
| 图书馆 | 学习使用的图书馆区域 | 自习室、研讨室 |
| 多媒体室 | 多媒体教学使用的教室 | 录播教室 |

---

## 4. 非功能需求

### 4.1 性能需求
- 页面加载时间 ≤ 2秒
- 接口响应时间 ≤ 500ms
- 支持1000+资源数据展示
- 支持100+并发预约请求

### 4.2 兼容性需求
- 支持Chrome、Firefox、Safari、Edge主流浏览器
- 支持响应式布局，适配手机、平板、电脑

### 4.3 安全需求
- 用户密码加密存储（BCrypt）
- API接口身份验证（JWT Token）
- 防止SQL注入攻击
- XSS攻击防护
- 预约权限控制

---

## 5. 技术架构

### 5.1 前端架构

```
├── src/
│   ├── main.js              # 应用入口
│   ├── App.vue              # 根组件
│   ├── router/              # 路由配置
│   │   └── index.js
│   ├── stores/              # Pinia状态管理
│   │   ├── user.js          # 用户状态
│   │   ├── resource.js      # 资源状态
│   │   └── booking.js       # 预约状态
│   ├── views/               # 页面视图
│   │   ├── Login.vue        # 登录页面
│   │   ├── Register.vue     # 注册页面
│   │   ├── Dashboard.vue    # 数据看板
│   │   ├── ResourceList.vue # 资源列表
│   │   ├── ResourceForm.vue # 资源表单
│   │   ├── BookingList.vue  # 预约列表
│   │   ├── BookingForm.vue  # 预约表单
│   │   ├── Statistics.vue   # 使用统计
│   │   ├── Exception.vue    # 异常报备
│   │   └── Visualization.vue # 数据可视化
│   ├── components/          # 公共组件
│   │   ├── Sidebar.vue      # 侧边栏
│   │   ├── Header.vue       # 头部导航
│   │   ├── ResourceCard.vue # 资源卡片
│   │   └── BookingCard.vue  # 预约卡片
│   └── utils/               # 工具函数
│       ├── axios.js         # Axios配置
│       ├── auth.js          # 认证工具
│       └── date.js          # 日期工具
```

### 5.2 后端架构

```
├── server/
│   ├── app.js               # Express入口
│   ├── routes/              # 路由定义
│   │   ├── auth.js          # 用户认证路由
│   │   ├── resources.js     # 资源管理路由
│   │   ├── bookings.js      # 预约管理路由
│   │   ├── statistics.js    # 统计数据路由
│   │   └── exceptions.js    # 异常报备路由
│   ├── controllers/         # 控制器
│   │   ├── auth.js          # 认证控制器
│   │   ├── resources.js     # 资源控制器
│   │   ├── bookings.js      # 预约控制器
│   │   ├── statistics.js    # 统计控制器
│   │   └── exceptions.js    # 异常控制器
│   ├── models/              # 数据模型
│   │   ├── User.js          # 用户模型
│   │   ├── Resource.js      # 资源模型
│   │   ├── Booking.js       # 预约模型
│   │   └── Exception.js     # 异常模型
│   ├── middleware/          # 中间件
│   │   ├── auth.js          # JWT验证中间件
│   │   └── booking.js       # 预约冲突检测中间件
│   ├── config/              # 配置文件
│   │   ├── db.js            # 数据库配置
│   │   └── jwt.js           # JWT配置
│   └── package.json         # 依赖配置
```

### 5.3 数据库设计

#### 5.3.1 用户表 (users)

| 字段名 | 类型 | 约束 | 说明 |
| :--- | :--- | :--- | :--- |
| id | INT | PRIMARY KEY, AUTO_INCREMENT | 用户ID |
| email | VARCHAR(100) | UNIQUE, NOT NULL | 邮箱地址 |
| password | VARCHAR(255) | NOT NULL | 加密后的密码 |
| username | VARCHAR(50) | NOT NULL | 用户昵称 |
| role | ENUM('admin', 'teacher', 'student') | DEFAULT 'student' | 用户角色 |
| department | VARCHAR(50) | NULL | 所属部门 |
| phone | VARCHAR(20) | NULL | 联系电话 |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | DATETIME | DEFAULT CURRENT_TIMESTAMP ON UPDATE | 更新时间 |

#### 5.3.2 资源表 (resources)

| 字段名 | 类型 | 约束 | 说明 |
| :--- | :--- | :--- | :--- |
| id | INT | PRIMARY KEY, AUTO_INCREMENT | 资源ID |
| name | VARCHAR(100) | NOT NULL | 资源名称 |
| type | ENUM('classroom', 'lab', 'meeting', 'sports', 'library', 'multimedia') | NOT NULL | 资源类型 |
| location | VARCHAR(200) | NOT NULL | 资源位置 |
| capacity | INT | NOT NULL | 容纳人数 |
| facilities | TEXT | NULL | 设备设施 |
| status | ENUM('available', 'maintenance', 'disabled') | DEFAULT 'available' | 资源状态 |
| description | TEXT | NULL | 资源描述 |
| image_url | VARCHAR(255) | NULL | 资源图片 |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | DATETIME | DEFAULT CURRENT_TIMESTAMP ON UPDATE | 更新时间 |

#### 5.3.3 预约表 (bookings)

| 字段名 | 类型 | 约束 | 说明 |
| :--- | :--- | :--- | :--- |
| id | INT | PRIMARY KEY, AUTO_INCREMENT | 预约ID |
| user_id | INT | FOREIGN KEY REFERENCES users(id) | 预约用户ID |
| resource_id | INT | FOREIGN KEY REFERENCES resources(id) | 资源ID |
| start_time | DATETIME | NOT NULL | 开始时间 |
| end_time | DATETIME | NOT NULL | 结束时间 |
| purpose | VARCHAR(200) | NOT NULL | 使用目的 |
| status | ENUM('pending', 'approved', 'rejected', 'cancelled', 'completed') | DEFAULT 'pending' | 预约状态 |
| remark | TEXT | NULL | 备注 |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | DATETIME | DEFAULT CURRENT_TIMESTAMP ON UPDATE | 更新时间 |

#### 5.3.4 异常表 (exceptions)

| 字段名 | 类型 | 约束 | 说明 |
| :--- | :--- | :--- | :--- |
| id | INT | PRIMARY KEY, AUTO_INCREMENT | 异常ID |
| user_id | INT | FOREIGN KEY REFERENCES users(id) | 上报用户ID |
| resource_id | INT | FOREIGN KEY REFERENCES resources(id) | 资源ID |
| type | ENUM('equipment', 'damage', 'other') | NOT NULL | 异常类型 |
| description | TEXT | NOT NULL | 异常描述 |
| status | ENUM('pending', 'processing', 'resolved') | DEFAULT 'pending' | 处理状态 |
| handler_id | INT | FOREIGN KEY REFERENCES users(id) | 处理人ID |
| handle_remark | TEXT | NULL | 处理备注 |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | DATETIME | DEFAULT CURRENT_TIMESTAMP ON UPDATE | 更新时间 |

---

## 6. API接口设计

### 6.1 认证接口

| API路径 | HTTP方法 | 功能描述 |
| :--- | :--- | :--- |
| /api/auth/register | POST | 用户注册 |
| /api/auth/login | POST | 用户登录 |
| /api/auth/logout | POST | 用户退出 |

### 6.2 资源接口

| API路径 | HTTP方法 | 功能描述 |
| :--- | :--- | :--- |
| /api/resources | GET | 获取资源列表 |
| /api/resources/:id | GET | 获取单个资源 |
| /api/resources | POST | 创建资源 |
| /api/resources/:id | PUT | 更新资源 |
| /api/resources/:id | DELETE | 删除资源 |

### 6.3 预约接口

| API路径 | HTTP方法 | 功能描述 |
| :--- | :--- | :--- |
| /api/bookings | GET | 获取预约列表 |
| /api/bookings/:id | GET | 获取单个预约 |
| /api/bookings | POST | 创建预约 |
| /api/bookings/:id | PUT | 更新预约状态 |
| /api/bookings/:id | DELETE | 取消预约 |
| /api/bookings/check-conflict | POST | 检查预约冲突 |

### 6.4 统计接口

| API路径 | HTTP方法 | 功能描述 |
| :--- | :--- | :--- |
| /api/statistics/usage | GET | 获取使用统计数据 |
| /api/statistics/utilization | GET | 获取资源利用率 |
| /api/statistics/exception | GET | 获取异常统计数据 |
| /api/statistics/dashboard | GET | 获取看板数据 |

### 6.5 异常接口

| API路径 | HTTP方法 | 功能描述 |
| :--- | :--- | :--- |
| /api/exceptions | GET | 获取异常列表 |
| /api/exceptions/:id | GET | 获取单个异常 |
| /api/exceptions | POST | 上报异常 |
| /api/exceptions/:id | PUT | 处理异常 |

---

## 7. 页面设计

### 7.1 页面结构

| 页面 | 路径 | 描述 |
| :--- | :--- | :--- |
| 登录页 | /login | 用户登录界面 |
| 注册页 | /register | 用户注册界面 |
| 数据看板 | / | 数据可视化看板 |
| 资源管理 | /resources | 资源列表和管理 |
| 预约管理 | /bookings | 预约列表和管理 |
| 使用统计 | /statistics | 使用统计分析 |
| 异常报备 | /exceptions | 异常上报和处理 |

### 7.2 页面原型

#### 7.2.1 数据看板
- 资源总数、今日预约、异常数量等关键指标
- 资源使用趋势图
- 资源类型分布图
- 资源利用率排行
- 实时预约动态

#### 7.2.2 资源管理
- 资源列表（卡片式布局）
- 资源筛选（类型、状态）
- 新增资源按钮
- 资源详情和编辑

#### 7.2.3 预约管理
- 预约列表
- 预约筛选（状态、时间）
- 新建预约按钮
- 预约审批操作

#### 7.2.4 使用统计
- 使用时长统计
- 使用频次统计
- 用户使用排行
- 部门使用统计

#### 7.2.5 异常报备
- 异常列表
- 异常筛选（状态、类型）
- 上报异常按钮
- 异常处理操作

---

## 8. 部署与集成

### 8.1 开发环境

**前端：**
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

**后端：**
```bash
# 进入服务器目录
cd server

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 8.2 生产环境

**前端部署：**
- 构建产物部署至Nginx
- 配置反向代理至后端API

**后端部署：**
- 使用PM2管理进程
- 配置MySQL数据库连接
- 设置环境变量

### 8.3 环境变量

**前端环境变量 (.env)**
```
VITE_API_BASE_URL=http://localhost:3000/api
```

**后端环境变量 (.env)**
```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=resource_management
JWT_SECRET=your_jwt_secret
```

---

## 9. 项目进度计划

| 阶段 | 时间 | 任务 |
| :--- | :--- | :--- |
| 需求分析 | 第1周 | 完成需求文档、技术选型 |
| 前端开发 | 第2-4周 | 完成所有页面开发、组件封装 |
| 后端开发 | 第2-4周 | 完成API接口、数据库设计 |
| 联调测试 | 第5周 | 前后端联调、功能测试 |
| 部署上线 | 第6周 | 生产环境部署、验收测试 |

---

## 10. 附录

### 10.1 资源类型映射
```javascript
const RESOURCE_TYPES = {
  classroom: '教室',
  lab: '实验室',
  meeting: '会议室',
  sports: '体育场馆',
  library: '图书馆',
  multimedia: '多媒体室'
}
```

### 10.2 预约状态映射
```javascript
const BOOKING_STATUS = {
  pending: '待审批',
  approved: '已通过',
  rejected: '已拒绝',
  cancelled: '已取消',
  completed: '已完成'
}
```

### 10.3 异常类型映射
```javascript
const EXCEPTION_TYPES = {
  equipment: '设备故障',
  damage: '设施损坏',
  other: '其他'
}
```

---

**文档版本：** v1.0  
**创建日期：** 2026年5月29日  
**最后更新：** 2026年5月29日