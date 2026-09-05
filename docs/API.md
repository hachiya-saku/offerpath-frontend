# OfferPath API 文档

本文档根据 `offerpath-backend` 当前实现整理，供前端开发和联调使用。

## 基础信息

```text
开发环境地址：http://localhost:3000/api/v1
请求格式：application/json
日期格式：ISO 8601 字符串，例如 2026-09-05T08:30:00.000Z
```

前端通过 `.env.local` 配置地址：

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

除健康检查、注册、登录和刷新外，其他接口均需携带 Access Token：

```http
Authorization: Bearer <accessToken>
```

Refresh Token 保存在 `HttpOnly Cookie` 中，不会出现在响应 JSON，也不能通过前端 JavaScript 读取。Axios 必须启用：

```ts
withCredentials: true
```

## 通用错误

NestJS 错误响应通常为：

```json
{
  "statusCode": 400,
  "message": ["email must be an email"],
  "error": "Bad Request"
}
```

`message` 可能是字符串，也可能是校验错误数组。

| 状态码 | 含义 |
| --- | --- |
| `400` | 请求字段或业务状态不合法 |
| `401` | 未登录、Access Token 失效或 Refresh Token 失效 |
| `404` | 当前用户无权访问该数据，或数据不存在 |
| `409` | 注册邮箱已存在 |

## 公共类型

### 认证用户

```ts
type AuthUser = {
  id: string;
  email: string;
  displayName: string;
};
```

### 用户资料

```ts
type UserProfile = AuthUser & {
  bio: string | null;
  location: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
};
```

### 公司

```ts
type Company = {
  id: string;
  userId: string;
  name: string;
  normalizedName: string;
  website: string | null;
  industry: string | null;
  size: string | null;
  location: string | null;
  description: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

type CompanySummary = Pick<Company, 'id' | 'name'>;
```

`normalizedName` 是后端用于查重的内部字段，前端通常不需要展示。

### 岗位状态

```ts
type JobStatus =
  | 'WISHLIST'
  | 'APPLIED'
  | 'DOCUMENT_SCREENING'
  | 'FIRST_INTERVIEW'
  | 'SECOND_INTERVIEW'
  | 'THIRD_INTERVIEW'
  | 'FINAL_INTERVIEW'
  | 'OFFER'
  | 'REJECTED';
```

### 岗位

```ts
type Job = {
  id: string;
  companyId: string;
  positionName: string;
  location: string | null;
  platform: string;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string;
  matchScore: number | null;
  url: string | null;
  status: JobStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

type JobWithCompany = Job & {
  company: CompanySummary;
};
```

当前薪资字段由前端和后端约定单位，接口本身只保存整数与币种，不进行年薪/月薪换算。

### 面试

```ts
type InterviewMode = 'ONLINE' | 'OFFLINE';

type Interview = {
  id: string;
  jobId: string;
  round: JobStatus;
  previousJobStatus: JobStatus | null;
  mode: InterviewMode;
  scheduledAt: string;
  platform: string | null;
  meetingUrl: string | null;
  meetingId: string | null;
  meetingPassword: string | null;
  location: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

type InterviewWithJob = Interview & {
  job: {
    id: string;
    positionName: string;
    company: CompanySummary;
  };
};
```

### 状态历史

```ts
type JobStatusChangeType = 'ADVANCE' | 'CORRECTION' | 'UNDO';

type JobStatusHistory = {
  id: string;
  jobId: string;
  fromStatus: JobStatus;
  toStatus: JobStatus;
  changeType: JobStatusChangeType;
  reason: string | null;
  createdAt: string;
};
```

## 健康检查

### `GET /health`

鉴权：不需要

成功状态：`200`

```json
{
  "status": "ok",
  "service": "offerpath-backend"
}
```

## 认证

### `POST /auth/register`

鉴权：不需要

请求：

```ts
type RegisterRequest = {
  email: string;       // 合法邮箱，最多 254 字符
  displayName: string; // 必填，最多 80 字符
  password: string;    // 8～72 字符
};
```

成功状态：`201`

```ts
type RegisterResponse = AuthUser & {
  createdAt: string;
};
```

```json
{
  "id": "00000000-0000-4000-8000-000000000001",
  "email": "saku@example.com",
  "displayName": "Saku",
  "createdAt": "2026-09-05T08:30:00.000Z"
}
```

注意：响应不包含密码，注册成功后也不会自动登录。

### `POST /auth/login`

鉴权：不需要

请求：

```ts
type LoginRequest = {
  email: string;
  password: string;
};
```

成功状态：`200`

```ts
type LoginResponse = {
  accessToken: string;
  user: AuthUser;
};
```

```json
{
  "accessToken": "eyJ...",
  "user": {
    "id": "00000000-0000-4000-8000-000000000001",
    "email": "saku@example.com",
    "displayName": "Saku"
  }
}
```

后端同时通过 `Set-Cookie` 写入 Refresh Token。响应 JSON 不包含 Refresh Token。

### `POST /auth/refresh`

鉴权：需要有效的 Refresh Cookie，不需要请求体

```ts
refreshTokenAPI();
```

成功状态：`200`

```ts
type RefreshResponse = {
  accessToken: string;
};
```

后端会轮换当前设备的 Refresh Token，并覆盖原 HttpOnly Cookie。

### `POST /auth/logout`

鉴权：需要 Access Token

请求体：无

成功状态：`200`

```json
{
  "message": "Logged out successfully"
}
```

只删除当前设备的 Refresh Session，并清除当前设备的 Refresh Cookie，不影响其他设备。

## 当前用户

### `GET /users/me`

鉴权：需要 Access Token

成功状态：`200`

返回：`UserProfile`

### `PATCH /users/me`

鉴权：需要 Access Token

请求字段全部可选：

```ts
type UpdateUserProfileRequest = {
  displayName?: string; // 最多 80 字符
  bio?: string;         // 最多 300 字符
  location?: string;    // 最多 120 字符
  avatarUrl?: string;   // 必须是包含协议的 URL
};
```

成功状态：`200`

返回：更新后的 `UserProfile`

注意：当前接口不能修改邮箱和密码。

## 公司

公司接口均需要 Access Token，并且只访问当前用户自己的数据。

### `GET /companies`

成功状态：`200`

返回：`Company[]`，按 `updatedAt` 降序。

当前没有 `GET /companies/:id` 接口。公司详情页联调时需从公司列表查找，或后续补充详情接口。

### `POST /companies`

请求：

```ts
type CreateCompanyRequest = {
  name: string;    // 必填，最多 120 字符
  website?: string; // 必须是包含协议的 URL
  notes?: string;   // 最多 2000 字符
};
```

成功状态：`201`

返回：创建后的 `Company`

### `PATCH /companies/:id`

请求字段全部可选，字段规则与创建公司相同：

```ts
type UpdateCompanyRequest = Partial<CreateCompanyRequest>;
```

成功状态：`200`

返回：更新后的 `Company`

### `DELETE /companies/:id`

成功状态：`200`

返回：被删除的 `Company`

数据库当前限制有关联岗位的公司被直接删除。

## 岗位

岗位接口均需要 Access Token，并通过岗位所属公司隔离当前用户的数据。

### `GET /jobs`

成功状态：`200`

返回：`JobWithCompany[]`，按 `updatedAt` 降序。

当前接口返回全部岗位，尚未实现服务端筛选和分页。

### `GET /jobs/:id`

成功状态：`200`

返回：`JobWithCompany`

### `POST /jobs`

请求：

```ts
type CreateJobRequest = {
  companyId?: string;
  companyName?: string;
  positionName: string;
  platform: string;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  url?: string;
  status?: JobStatus;
  notes?: string;
};
```

规则：

- `companyId` 与 `companyName` 至少提供一个。
- 传入 `companyId` 时，只能选择当前用户自己的公司。
- 只传 `companyName` 时，后端会查找同名公司；不存在则自动创建。
- `positionName` 最多 160 字符，`platform` 最多 80 字符。
- `salaryMin`、`salaryMax` 必须为大于等于 `0` 的整数。
- `url` 必须包含 `http://` 或 `https://`。
- 未传 `status` 时默认为 `WISHLIST`，未传币种时默认为 `JPY`。

成功状态：`201`

返回：创建后的 `Job`，此接口当前不附带 `company` 对象。

### `PATCH /jobs/:id`

请求字段全部可选，可修改创建岗位中的字段，但不能通过此接口修改 `status`。

成功状态：`200`

返回：更新后的 `Job`，当前不附带 `company` 对象。

### `DELETE /jobs/:id`

成功状态：`200`

返回：被删除的 `Job`

关联面试、岗位技能和状态历史会随岗位一起删除。

### `PATCH /jobs/:id/status`

用于纠正误操作或自由调整岗位状态。

请求：

```ts
type CorrectJobStatusRequest = {
  status: JobStatus;
  reason?: string; // 最多 500 字符
};
```

成功状态：`200`

返回：更新后的 `Job`

如果目标状态与当前状态相同，返回 `400`。成功后会创建 `CORRECTION` 状态历史。

### `GET /jobs/:id/status-history`

成功状态：`200`

返回：`JobStatusHistory[]`，按 `createdAt` 降序。

## 面试

面试接口均需要 Access Token。

### `GET /interviews`

成功状态：`200`

返回：`InterviewWithJob[]`，按 `scheduledAt` 升序。

### `POST /jobs/:jobId/interviews`

请求：

```ts
type CreateInterviewRequest = {
  round:
    | 'FIRST_INTERVIEW'
    | 'SECOND_INTERVIEW'
    | 'THIRD_INTERVIEW'
    | 'FINAL_INTERVIEW';
  mode: InterviewMode;
  scheduledAt: string;
  platform?: string;
  meetingUrl?: string;
  meetingId?: string;
  meetingPassword?: string;
  location?: string;
  notes?: string;
};
```

规则：

- 线上面试 `mode: 'ONLINE'` 时，`platform` 必填。
- 线下面试 `mode: 'OFFLINE'` 时，`location` 必填。
- `round` 必须晚于岗位当前所处的选考阶段，可以跨级安排面试。
- 创建成功后，岗位状态自动更新为对应面试轮次。
- 同时创建一条 `ADVANCE` 状态历史。

成功状态：`201`

返回：`InterviewWithJob`

### `DELETE /jobs/:jobId/interviews/:interviewId/undo`

撤销最近一次由面试安排引起的状态推进。

成功状态：`200`

返回：恢复上一状态后的 `Job`

只有最新创建的面试，且岗位仍处于该面试轮次时才能撤销。成功后删除面试并创建 `UNDO` 状态历史。

## 当前未实现的 API

以下前端功能已有静态界面或数据结构，但后端尚无对应接口：

- 单个公司详情 `GET /companies/:id`
- 技能与个人技术栈 CRUD
- 岗位技能匹配度计算
- 仪表盘统计数据
- 岗位服务端筛选、排序与分页
- 招聘 URL 解析
- 注册后的邮箱验证、找回密码与第三方登录

