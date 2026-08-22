# OfferPath Frontend

[日本語](README.md) | [简体中文](README.zh-CN.md) | [English](README.en.md)

OfferPath 是一个求职岗位管理平台，用于集中管理分散在招聘网站和企业官网中的岗位信息，并持续追踪投递状态、技能匹配度和选考进度。

后端仓库：[offerpath-backend](https://github.com/hachiya-saku/offerpath-backend)

项目目前完成了前端静态原型。后续将接入基于 NestJS 和 PostgreSQL 的真实 API、用户认证与数据持久化，最终作为完整的全栈个人项目。

## 要解决的问题

- 岗位信息分散在多个招聘平台
- 投递后的选考状态难以持续追踪
- 不容易直观看出岗位要求与个人技术栈的差距
- 缺少对投递数量、面试转化率等数据的统一统计

## 当前实现

- 登录页面
- 展示岗位数量、进行中选考和平均匹配度的仪表盘
- 基于 ECharts 的岗位状态分布图
- 岗位列表、关键词搜索、状态和平台筛选
- 新增岗位表单与技能标签输入
- 岗位详情、技能匹配分析和状态时间线
- 个人资料与技术栈档案
- 桌面侧边栏和移动端抽屉导航
- 深色主题响应式界面

当前数据全部为静态示例，登录、保存、编辑和删除尚未连接后端。

## 岗位状态

```text
想投 -> 已投 -> 书类选考 -> 一面 -> 二面 -> 三面 -> 终面 -> Offer
  \___________________________________________________________ 挂了
```

由于不同公司的选考流程并不统一，最终版本计划允许用户自由切换岗位状态。

## 技术栈

| 分类 | 技术 |
| --- | --- |
| 前端 | React 19、TypeScript |
| 构建工具 | Vite 8 |
| 路由 | React Router 7 |
| 状态管理 | Redux Toolkit |
| UI / CSS | shadcn/ui、Tailwind CSS 4、CSS |
| 图标 | Lucide React |
| 图表 | ECharts |
| HTTP 请求 | Axios |
| 代码检查 | Oxlint |
| 后端（计划） | NestJS |
| 数据库（计划） | PostgreSQL |
| 部署（计划） | Docker Compose |

## 页面路由

```text
/login       登录
/            仪表盘
/jobs        岗位一览
/jobs/new    新增岗位
/jobs/:id    岗位详情
/profile     技术栈档案
```

## 后续开发

1. 使用 NestJS 和 PostgreSQL 建立后端基础
2. 注册、登录、JWT 鉴权与用户数据隔离
3. 岗位增删改查、筛选、排序与分页
4. 岗位状态更新历史
5. 个人技能管理和加权匹配度计算
6. 仪表盘统计 API 与转化率
7. 使用 AI 从岗位描述中提取结构化信息
8. Docker Compose 与生产环境部署

## 本地运行

需要 Node.js `^20.19.0 || >=22.12.0`。

```bash
npm install
npm run dev
```

默认地址为 <http://localhost:5173>。

```bash
npm run build    # 类型检查并构建生产版本
npm run lint     # 执行代码检查
npm run preview  # 预览生产构建
```

## 开发状态

前端静态原型的第一版已经完成。下一阶段将在确认页面设计后，开始设计后端数据模型与 API 契约。
