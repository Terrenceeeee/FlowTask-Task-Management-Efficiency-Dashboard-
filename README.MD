# FlowTask 任务管理与效率数据看板

基于 Vue 3、TypeScript、Pinia、Vue Router 和 Tailwind CSS 开发的响应式任务管理与效率数据看板。

项目支持任务新增、编辑、删除、状态切换、关键词搜索、组合筛选、排序、分页、统计卡片、图表可视化、深色模式以及 localStorage 数据持久化，适合用于学习 Vue 3 前端工程开发，也可以作为初级前端开发作品集项目。

---

# 一、项目预览

FlowTask 主要包含以下页面：

```
- 数据看板
- 任务管理
- 任务新增
- 任务编辑
- 任务筛选
- 任务统计
- 深色模式
- 分页浏览
```

项目重点展示以下前端能力：

```
- Vue 3 Composition API
- TypeScript 类型设计
- Pinia 状态管理
- Vue Router 路由管理
- Tailwind CSS 响应式布局
- localStorage 数据持久化
- URL 查询参数同步
- 表单组件复用
- 分页和边界情况处理
- 本地数据结构校验
- ECharts 数据可视化
```

---

# 二、项目目标

本项目的主要目标是开发一个简单、实用并且具有一定工程化特征的任务管理应用。

项目重点解决以下问题：

```
1. 将任务数据集中管理，避免多个组件之间重复维护状态。
2. 支持任务搜索、筛选、排序和分页。
3. 支持看板页面直接编辑指定任务。
4. 支持页面刷新后保留任务数据。
5. 对 localStorage 中的异常数据进行校验。
6. 支持桌面端和移动端响应式布局。
7. 使用图表直观展示任务完成情况。
8. 支持浅色模式和深色模式切换。
```

---

# 三、功能列表

## 1. 任务管理

- 新增任务
- 编辑任务
- 删除任务
- 切换完成状态
- 设置任务优先级
- 设置任务截止日期
- 添加任务描述
- 查看任务创建时间和更新时间

## 2. 任务筛选

支持以下筛选方式：

- 关键词搜索
- 按任务状态筛选
- 按优先级筛选
- 多条件组合筛选
- 任务排序

任务状态包括：

- 全部
- 待完成
- 已完成

任务优先级包括：

- 低
- 中
- 高

排序方式包括：

- 最新创建
- 最早创建
- 截止日期
- 优先级

## 3. 分页

- 每页显示固定数量任务
- 支持上一页和下一页
- 支持直接点击页码
- 筛选条件变化时自动回到第一页
- 删除任务后自动修正当前页
- 页码同步到 URL 查询参数
- 刷新页面后恢复当前页

## 4. 数据看板

看板页面展示：

```
任务总数
已完成任务数
待完成任务数
已逾期任务数
任务完成率
最近任务列表
任务状态图表
```

## 5. 图表统计

使用 ECharts 展示任务状态分布：

```
已完成任务
待完成任务
已逾期任务
图表数据会根据任务状态自动更新。
```

支持：

```
饼图或环形图
响应式尺寸调整
任务数据变化后自动更新
组件卸载时销毁图表实例
```

## 6. 深色模式

```
支持浅色模式
支持深色模式
用户选择保存在 localStorage
页面刷新后保留主题设置
支持桌面端和移动端
```

## 7. 数据持久化

任务数据保存在浏览器 localStorage 中。

支持：

```
页面刷新后恢复数据
浏览器重新打开后恢复数据
初始化示例任务
本地数据异常时自动处理
非法任务数据自动过滤
```

## 8. 响应式布局

适配以下设备：

```
桌面端
笔记本
平板
手机
移动端支持：

折叠式导航菜单
自适应任务卡片
自适应筛选表单
自适应统计卡片
自适应图表宽度
```

---

# 四、技术栈

```
技术	用途
Vue 3	构建用户界面
TypeScript	类型约束和类型安全
Pinia	全局状态管理
Vue Router	页面路由管理
Tailwind CSS	样式和响应式布局
Vite	项目构建和开发服务器
ECharts	图表数据可视化
localStorage	浏览器本地数据持久化
```

---

# 五、项目运行

## 1. 环境要求

建议使用以下环境：

```
Node.js >= 18
npm >= 9
也可以使用 pnpm 或 yarn。
```

## 2. 安装依赖

使用 npm：

```
npm install
```

使用 pnpm：

```
pnpm install
```

使用 yarn：

```
yarn install
```

## 3. 启动开发服务器

使用 npm：

```
npm run dev
```

使用 pnpm：

```
pnpm dev
```

启动后访问：

```
http://localhost:5173
```

## 4. 构建生产版本

```
npm run build
或：

pnpm build
```

## 5. 本地预览生产版本

```
npm run preview
或：

pnpm preview
```

## 6. 类型检查

```
npm run type-check
```

如果项目中还没有配置该命令，可以在 package.json 中增加：

```
{
  "scripts": {
    "type-check": "vue-tsc --noEmit"
  }
}
```

---

# 六、项目目录结构

```
flow-task/
├── public/
│ └── favicon.ico
│
├── src/
│ ├── assets/
│ │ └── styles/
│ │ └── index.css
│ │
│ ├── components/
│ │ ├── AppHeader.vue
│ │ ├── EmptyState.vue
│ │ ├── StatCard.vue
│ │ ├── TaskChart.vue
│ │ ├── TaskForm.vue
│ │ ├── TaskItem.vue
│ │ └── TaskFilters.vue
│ │
│ ├── layouts/
│ │ └── AppLayout.vue
│ │
│ ├── router/
│ │ └── index.ts
│ │
│ ├── stores/
│ │ └── task.ts
│ │
│ ├── types/
│ │ └── task.ts
│ │
│ ├── utils/
│ │ ├── date.ts
│ │ ├── storage.ts
│ │ └── query.ts
│ │
│ ├── views/
│ │ ├── DashboardView.vue
│ │ ├── NotFoundView.vue
│ │ └── TasksView.vue
│ │
│ ├── App.vue
│ └── main.ts
│
├── index.html
├── package.json
├── tailwind.config.cjs
├── postcss.config.cjs
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

# 七、核心数据类型

文件：

src/types/task.ts
任务类型示例：

```
export type TaskPriority = 'low' | 'medium' | 'high'

export type TaskStatus = 'all' | 'pending' | 'completed'

export type TaskSort =
  | 'newest'
  | 'oldest'
  | 'dueDate'
  | 'priority'

export interface Task {
  id: string
  title: string
  description: string
  priority: TaskPriority
  completed: boolean
  dueDate: string
  createdAt: string
  updatedAt: string
}

export interface TaskFormData {
  title: string
  description: string
  priority: TaskPriority
  dueDate: string
}
```

---

# 八、状态管理设计

文件：

```
src/stores/task.ts
```

使用 Pinia 管理任务数据。

Store 主要包含以下内容：

State

```
const tasks = ref<Task[]>([])
```

Getters
常用派生数据：

```
const totalCount = computed(() => {
  return tasks.value.length
})

const completedCount = computed(() => {
  return tasks.value.filter(task => {
    return task.completed
  }).length
})

const pendingCount = computed(() => {
  return tasks.value.filter(task => {
    return !task.completed
  }).length
})

const overdueCount = computed(() => {
  return tasks.value.filter(task => {
    return !task.completed && isOverdue(task.dueDate)
  }).length
})

```

## Actions

## 主要操作方法：

```

addTask(formData)
updateTask(id, formData)
removeTask(id)
toggleTask(id)

```

```
状态流转
用户操作
↓
组件触发事件
↓
调用 Pinia Action
↓
更新 tasks
↓
计算属性重新计算
↓
页面和图表自动更新
↓
同步保存到 localStorage
```

---

# 九、任务新增和编辑

## 任务表单组件负责：

```
输入任务标题
输入任务描述
选择优先级
选择截止日期
表单校验
提交任务
取消编辑
```

表单提交流程：

```
填写表单
↓
表单校验
↓
判断是否存在 editingTask
↓
存在：更新任务
不存在：新增任务
↓
清空编辑状态
↓
保存到 localStorage
```

表单校验示例：

```
if (!formData.title.trim()) {
  errors.title = '请输入任务标题'
}

if (formData.title.trim().length > 80) {
  errors.title = '任务标题不能超过 80 个字符'
}
```

---

# 十、筛选和排序实现

筛选和排序使用 computed 完成。

示例：

```

const filteredTasks = computed(() => {
  let result = [...taskStore.tasks]

  const keyword = searchKeyword.value
    .trim()
    .toLowerCase()

  if (keyword) {
    result = result.filter(task => {
      return (
        task.title.toLowerCase().includes(keyword) ||
        task.description.toLowerCase().includes(keyword)
      )
    })
  }

  if (statusFilter.value === 'completed') {
    result = result.filter(task => task.completed)
  }

  if (statusFilter.value === 'pending') {
    result = result.filter(task => !task.completed)
  }

  if (priorityFilter.value !== 'all') {
    result = result.filter(task => {
      return task.priority === priorityFilter.value
    })
  }

  return sortTasks(result, sortType.value)
})

```

## 使用数组副本的原因：

```
let result = [...taskStore.tasks]
```

这样不会直接修改 Pinia 中的原始任务数组。

---

# 十一、分页实现

## 分页的核心逻辑：

```

const pageSize = 5

const pageCount = computed(() => {
  return Math.max(
    1,
    Math.ceil(
      filteredTasks.value.length / pageSize
    )
  )
})

const paginatedTasks = computed(() => {
  const start = (
    currentPage.value - 1
  ) * pageSize

  return filteredTasks.value.slice(
    start,
    start + pageSize
  )
})

```

## 任务列表使用分页后的数据：

```

<TaskItem
  v-for="task in paginatedTasks"
  :key="task.id"
  :task="task"
/>

```

## 筛选后重置页码：

```

watch(
  [
    searchKeyword,
    statusFilter,
    priorityFilter,
    sortType
  ],
  () => {
    currentPage.value = 1
  }
)
```

防止当前页超出范围：

```
watch(
  pageCount,
  value => {
    if (currentPage.value > value) {
      currentPage.value = value
    }
  }
)

```

例如：

```
原本在第 5 页
删除任务后只剩 4 页
自动跳转到第 4 页
```

---

# 十二、URL 查询参数同步

任务页支持将筛选条件和分页状态同步到 URL。

示例：

```

/tasks?keyword=学习&status=pending&priority=high&page=2

```

## URL 参数说明：

```
参数 说明
keyword 搜索关键词
status 任务状态
priority 优先级
sort 排序方式
page 当前页码
edit 正在编辑的任务 ID
```

### 这样做的好处：

```

刷新页面后可以恢复筛选状态
可以复制当前页面链接
浏览器前进和后退更加符合预期
页面状态更加透明
方便调试和分享

```

---

# 十三、修复看板编辑跳转

看板中的任务编辑不应该使用：

```

window.location.href = '/tasks'

```

这种方式会刷新整个页面，也无法指定任务。

推荐使用 Vue Router：

```

router.push({
  path: '/tasks',
  query: {
    edit: task.id
  }
})

```

## 最终 URL：

```

/tasks?edit=task-001

```

## 任务页面读取 edit 参数：

```

const editId = getStringQuery(
  route.query.edit
)

const task = taskStore.tasks.find(item => {
  return item.id === editId
})

editingTask.value = task ?? null

```

## 这样可以实现：

```

看板点击编辑
↓
跳转任务页
↓
读取任务 ID
↓
查找指定任务
↓
自动填充表单
↓
进入编辑状态

```

---

# 十四、localStorage 数据持久化

## 文件：

```

src/utils/storage.ts

```

## 存储 Key：

```

const STORAGE_KEY = 'flow-task-tasks'

```

## 保存数据：

```

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tasks)
  )
}

```

## 读取数据：

```

export function loadTasks(): Task[] {
  try {
    const value = localStorage.getItem(STORAGE_KEY)

    if (value === null) {
      return createInitialTasks()
    }

    const parsedValue: unknown = JSON.parse(value)

    if (!Array.isArray(parsedValue)) {
      return []
    }

    return parsedValue.filter(isValidTask)
  } catch (error) {
    console.error('读取任务数据失败：', error)

    return []
  }
}

```

---

# 十五、本地数据结构校验

由于 localStorage 中的数据本质上是字符串，读取之后必须进行运行时校验。

## 类型断言：

```

const tasks = parsedValue as Task[]

```

只能告诉 TypeScript“我认为它是 Task[]”，并不能真正验证数据。

### 因此需要使用类型守卫：

```
function isTaskPriority(
  value: unknown
): value is TaskPriority {
  return (
    value === 'low' ||
    value === 'medium' ||
    value === 'high'
  )
}

function isValidTask(value: unknown): value is Task {
  if (
    typeof value !== 'object' ||
    value === null
  ) {
    return false
  }

  const task = value as Record<string, unknown>

  return (
    typeof task.id === 'string' &&
    typeof task.title === 'string' &&
    typeof task.description === 'string' &&
    isTaskPriority(task.priority) &&
    typeof task.completed === 'boolean' &&
    typeof task.dueDate === 'string' &&
    typeof task.createdAt === 'string' &&
    typeof task.updatedAt === 'string'
  )
}
```

### 非法数据会被自动过滤：

```
return parsedValue.filter(isValidTask)
```

处理结果：

```
合法任务：保留
字段缺失：过滤
类型错误：过滤
JSON 解析失败：返回空数组
```

---

# 十六、深色模式实现

## Tailwind 配置：

```
module.exports = {
  darkMode: 'class'
}
```

## 主题状态：

```
const isDark = ref(
  localStorage.getItem('flow-task-theme') === 'dark'
)
```

## 切换主题：

```
function toggleTheme(): void {
  isDark.value = !isDark.value
}
```

## 应用主题：

```
function applyTheme(): void {
  document.documentElement.classList.toggle(
    'dark',
    isDark.value
  )

  localStorage.setItem(
    'flow-task-theme',
    isDark.value ? 'dark' : 'light'
  )
}
```

## 组件样式示例：

```
<div
  class="
    bg-white text-slate-900
    dark:bg-slate-900 dark:text-slate-100
  "
>
  内容
</div>
```

## 主题切换流程：

```
点击主题按钮
↓
修改 isDark
↓
给 html 元素添加或移除 dark class
↓
Tailwind dark: 样式生效
↓
保存主题到 localStorage
```

---

# 十七、图表统计

## 文件：

```
src/components/TaskChart.vue
```

安装 ECharts：

```
npm install echarts
或：

pnpm add echarts
```

## 图表数据示例：

```
const chartData = computed(() => [
  {
    value: completedCount.value,
    name: '已完成'
  },
  {
    value: pendingCount.value,
    name: '待完成'
  },
  {
    value: overdueCount.value,
    name: '已逾期'
  }
])
```

## 图表使用：

```
<TaskChart
  :completed="completedCount"
  :pending="pendingCount"
  :overdue="overdueCount"
/>
```

### 图表组件需要注意：

#### 初始化

```
onMounted(() => {
  chart = echarts.init(chartElement.value)
  renderChart()
})
```

#### 数据更新

```
watch(
  () => [
    props.completed,
    props.pending,
    props.overdue
  ],
  () => {
    renderChart()
  }
)
```

#### 窗口缩放

```
window.addEventListener(
  'resize',
  handleResize
)
```

#### 组件销毁

```
onUnmounted(() => {
  window.removeEventListener(
    'resize',
    handleResize
  )

  chart?.dispose()
})
```

### 如果不销毁图表实例，页面多次进入和离开时可能导致：

```
内存占用增加
resize 事件重复绑定
图表重复渲染
控制台出现警告
```

---

# 十八、路由设计

文件：

src/router/index.ts

## 路由示例：

```
import {
  createRouter,
  createWebHistory
} from 'vue-router'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: {
        title: '数据看板'
      }
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('../views/TasksView.vue'),
      meta: {
        title: '任务管理'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],

  scrollBehavior() {
    return {
      top: 0
    }
  }
})

router.afterEach(to => {
  const title = String(to.meta.title ?? 'FlowTask')

  document.title = `${title} - FlowTask`
})

export default router
```

## 使用懒加载的好处：

```
初始加载体积更小
页面按需加载
提升首次访问速度
适合后续扩展更多页面
```

---

# 十九、组件设计

## TaskItem.vue

## 负责展示单条任务：

```
任务标题
任务描述
优先级
截止日期
完成状态
编辑按钮
删除按钮
```

## TaskForm.vue

## 负责：

```
新增任务
编辑任务
表单校验
提交事件
取消事件
```

## TaskFilters.vue

## 负责：

```
关键词输入
状态选择
优先级选择
排序选择
重置筛选条件
```

## StatCard.vue

## 负责展示统计数据：

```
标题
数字
图标
颜色
辅助说明
```

## TaskChart.vue

## 负责：

```
初始化 ECharts
展示任务统计
监听数据变化
监听窗口变化
销毁图表实例
```

## EmptyState.vue

## 负责处理没有任务时的页面状态：

```
没有任务
没有匹配结果
引导用户新增任务
提供重置筛选按钮
```

---

# 二十、关键边界情况

## 项目对以下情况进行了处理：

```
1. 没有任务
   显示空状态，而不是显示空白页面。

2. 搜索没有结果
   显示“没有匹配的任务”，并提供重置筛选按钮。

3. 删除最后一条任务
   删除后自动更新统计数据和分页状态。

4. 删除当前页最后一条任务
   如果当前页已经不存在，自动返回上一页。

5. URL 页码非法
   例如：

/tasks?page=-1
/tasks?page=abc
/tasks?page=999
程序会使用安全的默认页码或自动修正到有效范围。

6. localStorage 数据损坏
   JSON 解析失败时返回安全的默认数据。

7. localStorage 数据字段缺失
   通过类型守卫过滤非法任务。

8. 编辑任务不存在
   如果 URL 中的任务 ID 不存在，不进入编辑状态。

9. 图表容器不存在
   图表初始化前检查 DOM 引用，避免运行时错误。

10. 移动端屏幕过窄
    使用响应式布局和换行样式，避免内容溢出。
```

---

# 二十一、设计原则

```
1. 单一数据源
   所有任务数据统一保存在 Pinia Store 中。

组件不直接维护完整任务列表，只负责：

展示数据
触发事件
调用 Store 方法 2. 派生数据使用 computed
任务总数、完成数量、筛选结果、分页结果等均通过 computed 计算。

这样可以：

自动响应数据变化
避免手动同步多个变量
减少重复计算
提高代码可读性 3. 组件通过事件通信
子组件不直接修改父组件数据，而是通过事件通知父组件：

@toggle="handleToggle"
@edit="handleEdit"
@remove="handleRemove" 4. 页面状态与 URL 同步
将搜索、筛选、排序和页码同步到 URL，让页面状态可恢复、可分享。

5. 数据进入应用前进行校验
   localStorage 数据读取后先校验，再进入 Store，避免异常数据污染应用状态。
```

---

# 二十二、可维护性设计

## 项目通过以下方式提高可维护性：

```
类型定义集中管理
Store 统一管理任务逻辑
表单和列表组件拆分
工具函数独立封装
路由使用懒加载
使用语义化函数名
避免组件直接操作 localStorage
避免在模板中编写复杂逻辑
使用 computed 管理派生状态
对异常数据进行安全处理
```

---

# 二十三、性能考虑

## 当前项目数据保存在 localStorage，适合小规模任务数据。

### 已经考虑的性能问题：

```
列表使用 v-for 和稳定的 :key
过滤和排序使用 computed 缓存
页面采用路由懒加载
图表只在组件加载时初始化
图表数据变化时更新配置
组件销毁时清理 ECharts 实例
避免直接修改原始任务数组
当前项目不适合：

数万条以上任务数据
多人同时编辑
实时同步
高并发场景
多设备数据共享
如果需要支持更大规模数据，应接入后端 API 和数据库。
```

---

# 二十四、目前项目的限制

```
1. 仅支持本地数据
   数据存储在当前浏览器中，不同浏览器之间不会共享。

2. 没有用户系统
   目前没有：

登录
注册
权限
用户隔离
账号数据同步

3. 没有后端服务
项目不包含：

API 服务
数据库
云端存储
服务端数据校验

4. localStorage 容量有限
localStorage 通常只适合保存少量结构化数据，不适合存储大量任务和附件。

5. 不支持多人协作
   不同用户之间无法共享和实时修改任务。
```

---

# 二十五、后续可扩展功能

```
基础扩展
任务标签
任务分类
任务优先级颜色
拖拽调整顺序
批量删除
批量完成
导出 JSON
导入 JSON
清空所有任务
恢复默认数据
工程化扩展
Vitest 单元测试
Vue Test Utils 组件测试
ESLint
Prettier
Husky Git 提交检查
GitHub Actions 自动化构建
错误监控
性能监控
全栈扩展
用户登录
后端 API
数据库持久化
云端同步
多设备访问
团队协作
权限管理
实时更新
```

---

# 二十六、测试建议

## Store 测试

## 测试以下功能：

```
新增任务
编辑任务
删除任务
切换完成状态
统计数量是否正确
逾期任务判断是否正确
```

## 筛选测试

## 测试以下场景：

```
关键词搜索
状态筛选
优先级筛选
多条件组合
筛选结果为空
重置筛选
分页测试
```

## 测试以下场景：

```
正常切换页码
第一页不能点击上一页
最后一页不能点击下一页
筛选后回到第一页
删除任务后页码自动修正
URL 页码恢复
```

## 数据校验测试

## 测试以下数据：

```
[]
[{}]
[
{
"id": "task-001",
"title": "合法任务",
"description": "",
"priority": "high",
"completed": false,
"dueDate": "",
"createdAt": "2026-01-01",
"updatedAt": "2026-01-01"
}
]
非法 JSON
```

---

# 二十七、简历项目描述

## 项目名称

### FlowTask 任务管理与效率数据看板

```
技术栈
Vue 3、TypeScript、Pinia、Vue Router、Tailwind CSS、ECharts、Vite
简历描述
基于 Vue 3、TypeScript、Pinia、Vue Router 和 Tailwind CSS 开发响应式任务管理与效率数据看板，支持任务新增、编辑、删除、完成状态切换、关键词搜索、组合筛选、排序、分页、统计卡片和图表可视化。

项目亮点
使用 Pinia 集中管理任务数据和统计状态，封装任务增删改查逻辑，降低组件耦合。
使用 Vue Router 和 URL 查询参数实现筛选条件、排序、页码及编辑任务 ID 的状态同步。
实现分页功能，支持筛选后自动重置页码，以及删除数据后自动修正当前页。
使用 localStorage 实现任务数据持久化，并通过 TypeScript 类型守卫校验本地数据结构，过滤非法数据。
使用 ECharts 展示任务完成、待完成和逾期数据，并实现窗口尺寸变化时的图表自适应。
使用 Tailwind CSS 实现响应式布局和深色模式，适配桌面端、平板和移动端。
使用 Vue 3 Composition API 和 TypeScript 构建可复用表单、任务项、统计卡片、筛选栏和图表组件。
```

---

# 二十八、面试项目介绍

这是一个基于 Vue 3 和 TypeScript 开发的任务管理与效率数据看板。

项目使用 Pinia 统一管理任务数据，任务增删改查后会同步保存到 localStorage。页面支持关键词搜索、状态筛选、优先级筛选、排序和分页，并且将筛选条件和当前页码同步到 URL 中，这样刷新页面后仍然可以恢复当前状态。

在交互方面，看板页的任务可以直接进入任务页进行编辑。跳转时通过 URL 传递任务 ID，任务页读取参数后自动查找并填充对应任务。

为了提高数据可靠性，项目没有直接信任 localStorage 中的数据，而是使用运行时类型守卫检查任务对象的字段和字段类型，只保留合法任务数据。

另外，项目使用 ECharts 展示任务状态分布，并使用 Tailwind CSS 实现响应式布局和深色模式。

---

# 二十九、可能的面试问题

为什么使用 Pinia？
因为任务数据需要被看板页、任务页、统计卡片和图表共同使用。使用 Pinia 可以集中管理状态，避免多个组件之间通过多层 props 传递数据。

为什么筛选结果使用 computed？
筛选结果依赖多个响应式状态，例如关键词、状态、优先级和排序方式。使用 computed 可以在依赖发生变化时自动重新计算，并且缓存计算结果。

为什么分页应该放在筛选和排序之后？
用户期望的是：

```
全部任务
↓
关键词筛选
↓
状态筛选
↓
优先级筛选
↓
排序
↓
分页
```

如果先分页再筛选，可能导致某些页面没有数据，分页总数也不准确。

为什么不能只使用 as Task[]？
类型断言只影响 TypeScript 编译器，不会在运行时检查数据。localStorage 中的数据可能被用户修改、损坏或来自旧版本，因此需要使用类型守卫进行运行时验证。

为什么编辑跳转使用 router.push？
router.push 是 Vue Router 提供的单页应用导航方式，不会重新加载整个页面，也可以通过 query 参数传递任务 ID。

为什么要销毁 ECharts 实例？
避免组件反复挂载时产生多个图表实例、重复绑定 resize 事件和内存泄漏。

localStorage 有什么限制？

```
只能保存字符串
存储容量有限
同源限制
没有复杂查询能力
不适合多人协作和云端同步
数据容易被用户手动修改
三十、提交前检查清单
功能检查
[ ] 可以新增任务
[ ] 可以编辑任务
[ ] 可以删除任务
[ ] 可以切换完成状态
[ ] 可以搜索任务
[ ] 可以按状态筛选
[ ] 可以按优先级筛选
[ ] 可以排序
[ ] 可以分页
[ ] 筛选后页码会重置
[ ] 删除任务后页码不会越界
[ ] 看板可以跳转到指定任务编辑
[ ] 图表数据会更新
[ ] 深色模式可以切换
[ ] 刷新后主题保持不变
[ ] 刷新后任务数据保持不变
响应式检查
[ ] 桌面端布局正常
[ ] 平板端布局正常
[ ] 手机端导航正常
[ ] 表格或任务卡片不会横向溢出
[ ] 图表在手机端正常显示
[ ] 分页按钮可以换行
数据检查
[ ] localStorage 为空时可以正常启动
[ ] localStorage 数据不是数组时不会报错
[ ] localStorage 数据字段缺失时不会报错
[ ] 非法优先级会被过滤
[ ] JSON 格式损坏时页面仍可使用
[ ] 编辑不存在的任务时不会报错
工程检查
[ ] TypeScript 类型检查通过
[ ] 项目可以正常构建
[ ] 控制台没有明显错误
[ ] 组件命名清晰
[ ] 关键逻辑有必要注释
[ ] README 文档完整
[ ] 项目截图或演示地址已准备
```

---

# 三十一、项目总结

## FlowTask 是一个面向前端学习和作品集展示的任务管理项目。

## 项目覆盖了从基础页面开发到状态管理、数据持久化、路由交互、分页处理、主题切换和图表可视化等多个方面，能够体现以下能力：

```
熟悉 Vue 3 基础开发模式
能够使用 TypeScript 设计数据结构
能够使用 Pinia 管理共享状态
能够使用 Vue Router 组织多页面应用
能够处理搜索、筛选、排序和分页逻辑
能够处理 URL 状态同步
能够考虑异常数据和边界情况
能够实现响应式和深色模式
能够使用图表展示业务数据
具备一定的组件化和工程化意识
```
