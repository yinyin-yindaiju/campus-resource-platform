# 校园资源智能管控平台

## 项目简介

校园资源智能管控平台是基于 Vue 3 构建的校园资源管理系统，帮助学校高效管理资源登记、预约、统计和异常报备等业务。

### 功能模块

- 资源登记：管理校园各类资源（教室、实验室、会议室、设备等）
- 预约管理：资源预约申请、审批和取消
- 使用统计：资源使用情况图表展示和数据统计
- 异常报备：资源异常上报和处理流程
- 数据看板：综合数据可视化展示

## 技术栈

- 前端框架: Vue 3.5 (选项式 API)
- 状态管理: Pinia 2.3
- 路由管理: Vue Router 4.6
- UI 组件: Element Plus 2.10
- 图表库: ECharts 5.6
- HTTP 客户端: Axios 1.8
- 构建工具: Vite 8.0

## 环境要求

- Node.js: ^20.19.0 || >=22.12.0
- npm: >= 10.0.0

## 快速开始

### 1. 安装依赖

```bash
cd e:\VOCode0033\校园资源智能管控平台
npm install
```

### 2. 开发模式运行

```bash
npm run dev
```

启动后访问：http://localhost:5173

### 3. 生产构建

```bash
npm run build
```

构建产物生成在 `dist` 目录下。

### 4. 预览生产版本

```bash
npm run preview
```

## 项目结构

```
校园资源智能管控平台/
├── src/
│   ├── components/          # 公共组件
│   ├── stores/              # Pinia 状态管理
│   │   ├── resource.js      # 资源管理
│   │   ├── booking.js       # 预约管理
│   │   ├── exception.js     # 异常管理
│   │   └── storage.js       # 本地存储工具
│   ├── views/               # 页面视图
│   │   ├── Login.vue        # 登录页面
│   │   ├── Dashboard.vue    # 数据看板
│   │   ├── Resources.vue    # 资源登记
│   │   ├── Bookings.vue     # 预约管理
│   │   ├── Statistics.vue   # 使用统计
│   │   └── Exceptions.vue   # 异常报备
│   ├── router/
│   │   └── index.js         # 路由配置
│   ├── App.vue              # 根组件
│   └── main.js              # 入口文件
├── index.html               # HTML 模板
├── vite.config.js           # Vite 配置
├── package.json             # 项目配置
└── .gitignore               # Git 忽略规则
```

## 功能说明

### 登录页面
- 支持任意邮箱和密码登录
- 登录后自动跳转至数据看板

### 数据看板
- 资源概览统计卡片
- 资源类型分布饼图
- 预约趋势折线图

### 资源登记
- 资源列表展示
- 新增/编辑/删除资源
- 资源类型筛选

### 预约管理
- 预约列表展示
- 新增/编辑预约
- 预约审批（待审核→通过）
- 预约取消（已通过→已取消）
- 时间冲突检测

### 使用统计
- 预约趋势柱状图（月度）
- 资源使用排行柱状图

### 异常报备
- 异常列表展示
- 新增异常报备
- 异常状态处理（待处理→处理中→已解决）
- 异常删除

## Git 版本控制

### 初始化 Git

1. 安装 Git：https://git-scm.com/download/win

2. 运行初始化脚本：
```bash
cd e:\VOCode0033\校园资源智能管控平台
.\init-git.ps1
```

或手动执行：
```bash
git init
git config user.name "你的名字"
git config user.email "你的邮箱"
git add .
git commit -m "初始化项目"
```

### 常用 Git 命令

```bash
git status          # 查看状态
git add .           # 添加文件
git commit -m "描述" # 提交更改
git log             # 查看提交历史
```

## 常见问题

- 运行 npm install 失败？确保 Node.js 版本符合要求，检查网络连接。
- 页面无法正常显示？检查依赖是否安装正确，确认开发服务器已启动。
- 数据看板图表不显示？确保页面完全加载，图表需要等待 DOM 渲染完成。
- 预约冲突检测不生效？系统会自动检测同一资源在同一时间段的重复预约。

## 许可证

MIT License



