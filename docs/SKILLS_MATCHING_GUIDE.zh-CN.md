# 技能与匹配度：代码复盘

## 先试功能

1. 登录后打开 `/profile`。
2. 点击“添加技能”，输入 React，选择“熟练”，保存。
3. 打开一个要求 React 的岗位，查看匹配度及技能标签。
4. 回个人页面，把 React 改成“一般”，重新进入岗位，分数会降低。
5. 点击技能右侧编辑按钮，在弹窗中删除，岗位匹配度会再次变化。

技能会保存到 PostgreSQL，刷新页面仍然存在。同名技能不能重复添加。

## 表结构

`Skill` 是公共技能词典，保存 React 这样的名称。
`UserSkill` 表示“某个用户掌握某项技能”，保存掌握程度和经验时长。
`JobSkill` 表示“某个岗位要求某项技能”，区分必须和加分。

用户修改名称时换的是自己的关联，不会改掉其他用户或岗位使用的公共词条。
编辑、删除接口里的 id 是 UserSkill.id，不是 Skill.id。

## 后端阅读顺序

1. `src/skills/skill.dto.ts`：请求允许哪些字段，怎么校验。
2. `src/skills/skills.controller.ts`：Guard 鉴权，CurrentUser 取用户 ID，转发给 Service。
3. `src/skills/skills.service.ts`：关联技能、检查归属、处理重复、保存及重新计算。
4. `src/skills/matching.ts`：独立的纯计算函数，不发请求、不读数据库。
5. `src/jobs/jobs.service.ts`：创建/编辑岗位时更新分数，列表先校正旧缓存，再按分数筛选排序。

技能写入和相关岗位分数更新放在一个事务里，避免只保存了一半。
分数更新保留岗位原 updatedAt，改变技能不等于修改岗位资料。
列表当前会检查自己的全部岗位分数；适合个人规模，数据量大时应改为版本化缓存或后台批量更新。

## 计算例子

岗位必须 React，加分 Next.js，满分为 2 + 1 = 3。
用户 React 熟练，Next.js 了解：得分 2 × 1 + 1 × 0.3 = 2.3。
匹配度为 round(2.3 / 3 × 100) = 77%。

没有岗位技能要求：null，显示横线，不计入平均值。
有要求但没有自己的技能：0%。
经验时长只是备注，不参与评分。技能按照名称规范化匹配，不自动猜测别名，例如 JS 不等于 JavaScript。
命中标签表示已登记该技能，不代表满分；实际得分还要看熟练度。

## 前端阅读顺序

1. `src/types/skills.ts`：请求/返回的 TypeScript 类型。
2. `src/api/skills.ts`：封装 GET、POST、PATCH、DELETE。
3. `src/pages/Profile/index.tsx`：加载列表，控制弹窗，提交后重新获取列表和平均分。
4. `src/pages/Profile/EditSkillDialog.tsx`：表单、校验、确认删除、保存中状态。
5. `src/pages/JobDetail/index.tsx`：拿自己的技能，标记真实命中与缺口，不再按数组位置假打勾。

接口的完整字段和状态码见 `docs/API.md`。
仪表盘仍是下一阶段任务，这次没有把它伪装成真实统计。
