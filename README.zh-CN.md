# OfferPath Frontend

[![CI](https://github.com/hachiya-saku/offerpath-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/hachiya-saku/offerpath-frontend/actions/workflows/ci.yml)

[日本語](README.md) | [简体中文](README.zh-CN.md) | [English](README.en.md)

OfferPath 是一个求职岗位管理平台，用于集中管理分散在招聘网站和企业官网中的岗位信息，并持续追踪投递状态、技能匹配度和选考进度。

后端仓库：[offerpath-backend](https://github.com/hachiya-saku/offerpath-backend)

接口文档：[docs/API.md](docs/API.md)

前端主要页面以及基于 NestJS / PostgreSQL 的后端核心 API 已经完成，目前正在把静态数据逐步替换为真实接口数据。界面默认使用日语，并支持切换至中文及保存语言选择。

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
- 支持年薪、月薪、时薪、固定加班费、雇佣类型与工作方式的岗位表单
- 结构化录入工作内容、应聘资格、选考流程、福利待遇等招聘信息
- 岗位详情、技能匹配分析和状态时间线
- 与岗位状态联动的线上 / 线下面试安排
- 岗位状态修正、错误推进撤销与变更时间线
- 面试管理、会议信息与 Google Maps 地点查看
- 公司一览、公司搜索、公司详情及关联岗位展示
- 个人资料与技术栈档案
- 日语 / 中文界面切换与语言选择持久化
- 桌面侧边栏和移动端抽屉导航
- 深色主题响应式界面

当前数据全部为静态示例，登录、保存、编辑和删除尚未连接后端。

## 后端联调基础

- 用户注册、密码登录与 Access Token 鉴权
- Refresh Token 轮换、退出登录与 Token 失效
- 基于 JWT 的用户数据隔离
- 当前用户资料的获取与修改
- 岗位、公司、面试 API 与 PostgreSQL 持久化
- 岗位状态修正、变更历史与面试撤销
- Prisma / PostgreSQL、单元测试、E2E 与 GitHub Actions CI

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
| 后端 | NestJS、Prisma ORM |
| 数据库 | PostgreSQL |
| 部署（计划） | Docker Compose |

## 页面路由

```text
/login       登录
/            仪表盘
/jobs        岗位一览
/jobs/new    新增岗位
/jobs/:id    岗位详情
/companies   公司一览
/companies/:id 公司详情
/interviews  面试管理
/profile     技术栈档案
```

## 后续开发

1. 登录、Token 刷新、退出登录与个人资料的真实 API 联调
2. 将岗位、公司、面试页面从静态数据迁移到真实数据
3. 岗位筛选、排序与分页
4. 个人技能管理和加权匹配度计算
5. 仪表盘统计 API 与转化率
6. 岗位 URL 的非 AI 结构化解析
7. 日语 / 中文全页面细节检查
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

主要页面的静态实现、响应式适配以及后端认证和核心业务 API 已经完成。目前正在进行前端认证联调，并逐步用真实数据替换静态示例。
