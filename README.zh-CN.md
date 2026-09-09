# OfferPath Frontend

[![CI](https://github.com/hachiya-saku/offerpath-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/hachiya-saku/offerpath-frontend/actions/workflows/ci.yml)

[日本語](README.md) | [简体中文](README.zh-CN.md) | [English](README.en.md)

OfferPath 是一个求职岗位管理平台，用于集中管理分散在招聘网站和企业官网中的岗位信息，并持续追踪投递状态、技能匹配度和选考进度。

后端仓库：[offerpath-backend](https://github.com/hachiya-saku/offerpath-backend)

接口文档：[docs/API.md](docs/API.md)

认证、个人资料、岗位 CRUD、公司资料、面试管理和选考状态历史已经接入 NestJS / PostgreSQL 真实 API。界面默认使用日语，并支持切换至中文及保存语言选择。

## 要解决的问题

- 岗位信息分散在多个招聘平台
- 投递后的选考状态难以持续追踪
- 不容易直观看出岗位要求与个人技术栈的差距
- 缺少对投递数量、面试转化率等数据的统一统计

## 当前实现

- 注册、登录、Token 自动刷新、退出登录与路由鉴权
- 展示岗位数量、进行中选考和平均匹配度的示例仪表盘
- 基于 ECharts 的岗位状态分布图
- 岗位列表、关键词搜索、状态和平台筛选
- 支持年薪、月薪、时薪、固定加班费、雇佣类型与工作方式的岗位表单
- 结构化录入工作内容、应聘资格、选考流程、福利待遇等招聘信息
- 岗位详情、技能匹配分析和状态时间线
- 与岗位状态联动的线上 / 线下面试安排
- 受约束的岗位状态推进、挂了与 Offer 记录、逐步撤销
- 面试管理、会议信息与 Google Maps 地点查看
- 基于真实数据的公司一览、搜索、详情、关联岗位与资料维护
- 基于真实数据的个人资料编辑与示例技术栈档案
- 日语 / 中文界面切换与语言选择持久化
- 桌面侧边栏和移动端抽屉导航
- 深色主题响应式界面

岗位、公司、面试和个人资料会持久化到 PostgreSQL；仪表盘统计和个人技术栈目前仍使用示例数据。

## 后端联调基础

- 用户注册、密码登录与 Access Token 鉴权
- Refresh Token 轮换、退出登录与 Token 失效
- 基于 JWT 的用户数据隔离
- 当前用户资料的获取与修改
- 岗位、公司、面试 API 与 PostgreSQL 持久化
- 受约束的岗位状态推进、变更历史与逐步撤销
- Prisma / PostgreSQL、单元测试、E2E 与 GitHub Actions CI

## 岗位状态

```text
想投 -> 已投 -> 书类选考 -> 一面 -> 二面 -> 三面 -> 终面 -> Offer
  \___________________________________________________________ 挂了
```

面试阶段可以根据不同公司的轮次向后跳选；操作错误时只能逐步退回上一个有效状态。

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
/register    注册
/            仪表盘
/jobs        岗位一览
/jobs/new    新增岗位
/jobs/:id    岗位详情
/jobs/:id/edit 编辑岗位
/companies   公司一览
/companies/:id 公司详情
/interviews  面试管理
/profile     技术栈档案
```

## 后续开发

### MVP 发布目标：2026-09-13

1. `09-09`：岗位 API 搜索、筛选、排序与分页
2. `09-10`：岗位表单公司候选、个人技能 CRUD 与基础匹配度
3. `09-11`：仪表盘统计 API 与岗位 URL 非 AI 结构化解析
4. `09-12`：前端联调、日中双语以及加载、空数据、错误状态走查
5. `09-13`：Docker Compose、生产部署、E2E 验收、项目截图与最终文档

MVP 上线后再补面试编辑与删除、统一 API 响应格式、第三方登录和 AI 解析。

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

认证、岗位、公司、面试和个人资料的主要业务链已经接入真实 API。目前剩余分页、技术栈、仪表盘统计、URL 解析和部署收尾。
