# Motii 康复追踪 PWA — 项目技能

> 脑瘫儿童康复进展追踪与 AI 运动分析平台

---

## 📋 项目概述

**Motii** 是一个为脑瘫儿童家长设计的渐进式网页应用（PWA）。它结合视频分析、运动功能指标追踪、训练管理和康复价值计算（ROI），帮助家长科学管理孩子的康复过程。

### 核心功能
- 📱 **视频 + AI 分析**：用手机摄像头或相册视频，AI 自动提取骨骼关键点、计算关节角度
- 📊 **多维度指标追踪**：运动（腿脚/关节）、眼科（外斜视/集合）、听力（助听器依从性）
- 🏃 **康复价值计算**：8 种运动的 ROI 评分（右手/步态/视觉三维度）
- 📅 **每日打卡 + 月度总结**：追踪訓練痕跡，自定義活動管理
- 🎯 **仪表盘 + 建议**：实时 KPI、周行动计划、AI 洞察
- 🌍 **三语支持**：中文 / English / Français
- ⚡ **离线优先**：PWA + Service Worker，无网络仍可用

### 目标用户
加拿大（蒙特利尔）华裔脑瘫儿童家长，尤其是**自管家庭康复**场景。

---

## 🎯 何时使用此技能

使用此技能当你需要：
- ✅ 添加新功能到 Motii（如新的训练模块、指标、图表）
- ✅ 调整 UI 布局、字体大小、配色（移动优先设计）
- ✅ 扩展 AI 分析能力（骨骼检测、关节角度计算、运动质量评分）
- ✅ 改进数据管理（localStorage 持久化、导出、备份）
- ✅ 修复 bug、优化性能
- ✅ 为 PWA 添加新功能（离线支持、推送通知）
- ✅ 理解医学背景和康复指标的含义

**不适用场景**：
- ❌ 一般的 Web 开发问题（无关于 Motii 的）
- ❌ AWS/Azure 云部署（Motii 目前在 Vercel）
- ❌ 与脑瘫康复无关的学术讨论

---

## 👶 核心用户原型：晨宇

| 字段 | 值 |
|------|-----|
| 姓名 | 牛晨宇（Chengyu Niu） |
| 年龄 | 8 岁（2017年10月5日出生） |
| 诊断 | **右侧痉挛型脑瘫（Right Spastic Hemiparesis）** |
| 病因 | 围产期左额叶脑血管意外（2020年8月 MRI 确诊） |
| 主要障碍 | 右手欠主动、右脚足下垂+内扣、右眼外斜、右侧偏盲风险 |
| 兴趣 | 🛸 无人机、🔧 电子制作、🚤 小船、🧩 拼图、🤖 机器人 |
| 康复方式 | 🏊 游泳、⚽ 足球、🏀 篮球、🚴 骑车、🏃 运动为主 |
| 语言 | 普通话（主）、英语、法语 |

---

## 📐 技术架构

### 技术栈
- **前端**：纯 HTML + CSS + JavaScript（**单文件架构**，无构建工具）
- **后端**：Vercel Serverless Functions（Node.js）
- **AI**：Anthropic Claude API（claude-sonnet-4.0）
- **存储**：浏览器 localStorage（本地，不上传）
- **部署**：Vercel（主）+ GitHub Pages（备）
- **离线**：Service Worker（sw.js）

### 文件结构
```
motii/
├── index.html               # 主应用（所有前端逻辑）
├── manifest.json            # PWA 配置
├── sw.js                    # Service Worker
├── vercel.json              # Vercel 路由
├── CLAUDE.md                # 项目知识库（医学基线）
├── SKILL.md                 # 此文件
├── api/
│   └── analyze.js           # Anthropic API 代理
└── icons/
    └── icon-*.png           # PWA 图标
```

### 单文件设计原则
- ✅ **所有 HTML、CSS、JS 在 index.html 中**
- ✅ **CSS 变量系统**（支持深色模式、三语）
- ✅ **i18n 对象 T**（zh/en/fr，动态切换）
- ✅ **localStorage key 统一前缀 `cp_`**
- ✅ **无外部依赖**（不用 React、Vue 等框架）

---

## 🔑 核心数据结构

### KPI_DATA（6 个核心功能指标）
```javascript
{key:'sls_right', label:{zh:'右腿站立',...}, val:2, max:8, target:8, icon:'🦴'}
{key:'hop_right', label:{zh:'右脚单跳',...}, val:0, max:3, target:3, icon:'🦴'}
{key:'prc', label:{zh:'PRC集合',...}, val:10, max:20, target:5, icon:'👁️', invert:true}
{key:'strabismus', label:{zh:'外斜频率',...}, val:2, max:5, target:4, icon:'👁️'}
{key:'hearing', label:{zh:'左耳识别率',...}, val:88, max:100, target:90, icon:'👂'}
{key:'right_hand', label:{zh:'右手参与率',...}, val:0, max:100, target:50, icon:'✋'}
```

### LOG_ITEMS（日志打卡项）
13 个预定义训练项 + 用户自定义项（localStorage `cp_log_custom`）
```javascript
{ic:'🦴', name:{zh:'靠墙拉伸小腿（3×30s)',...}, imp:'r'} // 'r'=必做, 'a'=重要
```

### MONTHLY_ITEMS（月度指标）
14 个关键月测项（SLS、跳跃、PRC、步态、协调度等）
存储位置：`localStorage cp_monthly`，按 `YYYY-MM` 分组

### ROI_DATA（运动康复价值）
8 种活动的三维度评分：
```javascript
{name:'🛸 无人机制作', hand:0.65, gait:0.00, vision:0.70, rec:'hot', tip:'...'}
```

### TIMELINE（医学报告历史）
- **motor**：4 份 PT/OT 评估（2020–2023）
- **eye**：5 份眼科随访（2023–2024）
- **ear**：4 份听力测试（2022–2026）

---

## 🧠 AI 分析流程

### 当前实现（callAPI → callAPI）

```
用户上传视频
    ↓
截取第 1 秒的帧 → base64 JPEG
    ↓
发送到 /api/analyze（Anthropic API 代理）
    ↓
Claude 返回 JSON：
{
  overall: 75,              // 综合评分 (0-100)
  layer1: {                 // 第一层：关节角度
    shoulder: {score:80, left:90°, right:75°, note:'...'},
    elbow: {...},
    wrist: {...},
    ankle: {...}
  },
  layer2: {                 // 第二层：运动质量
    symmetry: {score:70, note:'...'},
    gait_inward: {score:65, angle:15°, note:'...'},
    right_hand_use: {score:40, pct:30%, note:'...'},
    bimanual: {score:50, note:'...'},
    balance: {score:60, note:'...'}
  },
  insights: [               // AI 洞察（3 条）
    {type:'good', title:'...', body:'...'},
    {type:'warn', title:'...', body:'...'},
    {type:'alert', title:'...', body:'...'}
  ],
  next_focus: '...',        // 下次训练重点
  rehab_value: 85           // 康复价值 (0-100)
}
    ↓
renderResult() → 前端渲染彩色卡片 + 图表
    ↓
saveAnalysis() → localStorage 历史记录
```

### 医学上下文
Claude 收到的 system prompt 包含：
- 晨宇的诊断、障碍、基线数据
- 康复指标解释
- 评分标准（左右对比、功能等级）
- 语言选择（zh/en/fr）

---

## 📱 核心功能模块

### 1️⃣ 仪表盘（Dashboard）
- 6 个 KPI 环形图
- 本周alert（3项提醒）
- 4 条行动建议
- 快速导航 → 时间线 / 指标 / 训练

### 2️⃣ 时间线（Timeline）
- 医学报告历史（运动/眼科/听力三轨）
- 按时间排序，显示诊断 + 关键指标变化
- 彩色标签区分类型（tag-motor/eye/ear）

### 3️⃣ 指标（Metrics）
- 运动功能（10 项）：踝背屈、痉挛、SLS、跳跃、步态等
- 眼科功能（6 项）：PRC、斜视角、立体视觉、视力
- 听力功能（5 项）：语言识别率、PTA、依从性、FM系统
- 每项显示：2022年值 → 2023年值 → 目标值 → 优先级 + 进度条

### 4️⃣ 训练管理（Training）
- 腿脚训练（5 个）
- 眼科训练（3 个）
- 听力管理（2 个）
- 手功能训练（2 个）
- 运动 ROI（8 种）

**每个训练卡片包含**：
- 目标问题
- 推荐剂量
- 具体方法
- 记录方式
- ⚠️ 特殊提醒

### 5️⃣ 视频分析（Video）
- 📷 摄像头录制（30 秒自动停）
- 📁 相册上传
- 运动类型选择（8 种 sport chip）
- AI 分析进度条（6 步）
- 两层结果（关节角度 + 运动质量）

### 6️⃣ 日志打卡（Daily Log）
- 13 个预定义训练项 + 自定义项
- 7 天矩阵（周一~周日）
- 输入框支持数字/文字
- ✅ 自定义活动：添加 / 删除
- 📝 今日备注（textarea）

### 7️⃣ 月度记录（Monthly）
- 14 个关键指标月测
- 对比基线值 + 目标值
- 自动更新 KPI 环形图
- 按 `YYYY-MM` 分组保存

---

## 🎨 设计系统

### 色彩主题
```css
--bg:       #0F1A14   /* 深绿背景 */
--nav:      #1C3A28   /* 导航栏深绿 */
--card:     #f8f9f7   /* 浅米白卡片 */
--em:       #2E7D52   /* 主调 薄荷绿 */
--mint:     #6FCF97   /* 亮薄荷 */
--amber:    #F2C94C   /* 琥珀 */
--coral:    #EB5757   /* 珊瑚红 */
```

### 典型布局
- **顶部**：Logo + 语言切换（中/EN/FR）
- **主体**：6 个面板，底部导航切换
- **底部 nav**：7 个图标按钮（仪表盘/时间线/指标/训练/视频/月测/打卡）
- **吐司**：确认消息（2.2 秒自动消失）

### 响应式
- **手机优先**：375px 宽度基准
- **CSS 变量**：font-size 已优化字体大小（**已放大 15-20%**）
- **安全区域**：`env(safe-area-inset-*)`，适配刘海屏

---

## 🔧 常见开发任务

### 添加新的训练项
在 `TRAINING` 对象中添加：
```javascript
const TRAINING = {
  leg: [
    {name:'靠墙拉伸小腿', target:'腓肠肌痉挛', dose:'3×30秒/天', method:'...', record:'...', warn:'...', imp:'r'}
  ]
}
```
然后调用 `buildTraining()` 重新渲染。

### 更新 KPI 指标
修改 `KPI_DATA` 数组，或通过月度表单保存后会自动更新。

### 新增语言支持
在 `T` 对象中添加新的语言分支：
```javascript
const T = {
  zh: {...},
  en: {...},
  fr: {...},
  de: {...}  // 新语言
}
```

### 修改 AI 提示词（System Prompt）
在 `callAPI()` 函数中修改 `sys` 变量，更改 Claude 的分析维度或输出格式。

### 添加新的时间线条目
编辑 `TIMELINE.motor/eye/ear` 数组，添加医学报告数据。

### 自定义活动管理
用户可在日志面板添加 / 删除活动：
- 存储：`localStorage cp_log_custom`
- 函数：`addLogItem()` / `deleteLogItem()` / `clearLogItems()`

---

## 📊 localStorage 数据键（cp_ 前缀）

| 键名 | 用途 | 格式 |
|------|------|------|
| `cp_lang` | 当前语言 | 'zh'\|'en'\|'fr' |
| `cp_monthly` | 月度指标历史 | `{YYYY-MM: {key:value}}` |
| `cp_log` | 周日志记录 | `{YYYY-MM-DD: {0:[...], 1:[...], note:''}}` |
| `cp_analysis` | 视频分析历史 | `[{date, sport, overall, rehab}]` |
| `cp_log_custom` | 自定义训练项 | `[{ic, name, imp}]` |

---

## ⚡ 开发最佳实践

### 单文件约束
- ✅ 所有样式写在 `<style>` 标签中（CSS 变量）
- ✅ 所有 JS 写在 `<script>` 标签中（无 module）
- ✅ 所有数据结构定义在脚本顶部（DATA 层）
- ✅ 所有 UI 构建函数：`buildXxx()` 命名规范

### i18n 模式
```javascript
// 定义多语言
const T = { zh: {key: '值'}, en: {key: 'value'}, fr: {key: 'valeur'} };

// 获取翻译
const t = k => (T[lang]||T.zh)[k] || T.zh[k] || k;

// 在 HTML 中标记
<div data-i18n="alertTitle">⚠️ 本周需要关注</div>

// 渲染时更新
function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n;
    if (T[lang]?.[k]) el.textContent = T[lang][k];
  });
}
```

### localStorage 模式
```javascript
// 保存
localStorage.setItem('cp_key', JSON.stringify(data));

// 读取
const data = JSON.parse(localStorage.getItem('cp_key')||'{}');
```

### PWA 离线支持
- Service Worker (`sw.js`) 缓存 index.html、manifest.json、icons
- 用户可添加到桌面：**"安装到主屏幕"**
- 无网络时仍可打开、查看历史数据、打卡

---

## 🐛 常见问题

### Q: 为什么选择单文件架构？
A: 简化部署、避免构建步骤、移动端轻量级、用户可直接修改源代码。

### Q: AI 分析依赖什么？
A: Anthropic Claude API（后端代理 /api/analyze）。无视频时也能生成代表性评估。

### Q: 如何处理视频隐私？
A: 视频只在浏览器中处理（截帧 → base64），截帧发送给 Claude，不存储完整视频。

### Q: 支持哪些视频格式？
A: 浏览器原生支持的格式（MP4、WebM、MOV 等）。

### Q: 如何导出数据？
A: 目前存储在 localStorage。可复制 JSON，或手动导出到 CSV。

---

## 🚀 部署与维护

### Vercel 部署
```bash
vercel deploy
```
环境变量：`ANTHROPIC_API_KEY=sk-ant-xxxxxx`

### 本地测试
```bash
python -m http.server 8000
# 访问 http://localhost:8000
```

### PWA 检查
- ✅ manifest.json 有效
- ✅ sw.js 注册正确
- ✅ HTTPS 部署（Vercel 自动）

---

## 📚 参考文件

- **CLAUDE.md**：完整医学基线、报告数据、指标定义
- **index.html**：完整应用代码
- **api/analyze.js**：Anthropic API 代理
- **sw.js**：Service Worker 离线支持

---

## 🎓 核心康复概念

### 诊断背景
- **脑瘫类型**：右侧痉挛型（肌张力高，右侧肢体受限）
- **严重程度**：GMFCS Level I（最高功能级别）
- **合并问题**：外斜视、左耳传导性听力损失

### 关键指标解释
| 指标 | 含义 | 目标 |
|------|------|------|
| 踝背屈（DF） | 脚是否能向上翘（对抗足下垂） | ≥10° |
| SLS（单脚站立） | 单腿平衡秒数（本体感觉） | ≥8秒（右腿） |
| PRC（集合近点） | 两眼最近聚焦点（外斜视训练） | <5cm |
| 右手使用率 | 运动中右手主动参与比例 | ≥50% |
| 腓肠肌痉挛（Ashworth） | 小腿肌肉紧张程度（0-4 级） | 维持或降低 |

### ROI 三维度
- **右手** (0-1)：手功能改善程度
- **步态** (0-1)：下肢运动改善程度
- **视觉** (0-1)：眼睛协调、追踪改善程度

---

## 📞 支持与反馈

此项目由晨宇的妈妈维护，用于自管家庭康复追踪。

**最后更新**：2026年6月14日

---

**使用此技能时，Copilot 将自动理解：**
✅ 脑瘫康复的医学背景  
✅ 晨宇的具体情况与基线数据  
✅ Motii 的架构、数据模型、设计原则  
✅ 如何安全地添加功能而不破坏现有代码  
✅ 三语支持与 PWA 离线的重要性
