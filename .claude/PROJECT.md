# 项目开发文档 (PROJECT.md)

## 1. 🛠 技术栈
- **框架**: Taro 4.x (React DSL)
- **语言**: TypeScript (严格模式)
- **样式**: SCSS + CSS Modules (遵循BEM命名规范，拒绝Tailwind除非明确要求)
- **状态管理**: Zustand (轻量级，支持Hooks)
- **路由/网络**: Taro Router, Taro.request 封装
- **UI组件库**: NutUI React (京东风格，适合电商/营销) 或 根据设计图自建核心组件

## 2. 📦 关键依赖
```json
{
  "dependencies": {
    "@tarojs/taro": "latest",
    "@tarojs/react": "latest",
    "react": ">=18",
    "zustand": "latest",
    "classnames": "latest",
    "dayjs": "latest" // 时间处理
  }
}
```

## 3. 📂 目录结构规范
```text
src/
  assets/         # 静态资源 (images, fonts)
  components/     # 公共组件 (Button, Card, NavBar)
  constants/      # 常量定义 (api, config, enums)
  hooks/          # 自定义Hooks (useAuth, useLocation)
  pages/          # 页面文件
    home/         
    user/
    device/
    partner/
    marketing/
  services/       # API请求封装
  store/          # Zustand状态管理
  styles/         # 全局样式/变量 (variables.scss, mixins.scss)
  types/          # TS类型定义
  utils/          # 工具函数 (format, validate)
  app.tsx         # 入口文件
  app.config.ts   # 小程序全局配置
```

## 4. 📝 开发约定
- **变量命名**: 小驼峰 (userProfile), 组件大驼峰 (UserProfile).
- **文件命名**: 页面/组件使用 `index.tsx` 或 `ComponentName.tsx`.
- **Git提交**: 遵循 Conventional Commits (`feat:`, `fix:`, `style:`).
- **注释**: 复杂逻辑必须写注释，接口必须定义 Interface.

## 5. ⚠️ 踩坑记录 (待补充)
- *暂无*

## 6. ✅ 待办清单
- [x] 初始化项目脚手架
- [ ] 配置 Eslint & Prettier
- [ ] 封装 Request 网络请求 (拦截器, Token注入)
- [ ] 搭建多环境配置 (Dev/Prod)
- [x] 部署到 GitHub (https://github.com/ch1109/qushuiyuanxtu.git)
