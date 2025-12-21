# 💻 开发环境指南 (Development Guide)

本指南介绍如何在任何新设备上从零开始搭建项目的开发环境。

## 1. 前置准备

在开始之前，请确保已安装以下软件：

*   **Node.js**: 推荐版本 v18+ (使用 `node -v` 检查)
*   **Git**: 用于版本控制 (使用 `git --version` 检查)
*   **微信开发者工具**: 用于运行和调试小程序 ([下载地址](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html))
*   **VS Code** (推荐): 最佳代码编辑器

## 2. 🚀 快速开始

### 第一步：获取代码
```bash
# 克隆仓库
git clone https://github.com/ch1109/qushuiyuanxtu.git

# 进入项目目录
cd qushuiyuanxtu
cd miniprogram-v4
```

### 第二步：安装依赖
项目中包含了 `package-lock.json`，请务必使用 `npm` 安装以保证版本一致性。
```bash
npm install
```

### 第三步：启动开发服务器
Taro 框架需要编译才能在小程序中运行。
```bash
# 启动微信小程序 编译监听模式
npm run dev:weapp
```
*看见 "监听文件修改中..." 表示编译成功。*

### 第四步：导入微信开发者工具
1. 打开 **微信开发者工具**。
2. 选择 **导入项目**。
3. **目录**：选择克隆下来的 `qushuiyuanxtu/miniprogram-v4` 文件夹（注意不是 `dist`）。
4. **AppID**：使用测试号或你的实际 AppID。
5. 点击 **确定**，等待编译完成即可预览。

## 3. ⚠️ 常见问题

### 依赖安装失败
如果 `npm install` 报错，尝试：
```bash
# 清除缓存
npm cache clean --force
# 删除 node_modules 后重试
rm -rf node_modules
npm install
```

### 编译报错 "SassError"
如果是 Node 版本过高导致的 node-sass 问题，本项目使用的是 Dart Sass，一般不会出现。如果遇到样式编译问题，检查是否意外安装了 `node-sass`，建议仅保留 `sass` (dart-sass)。

### Project Config 冲突
如果 `project.config.json` 或 `project.private.config.json` 发生变动导致开发者工具报错，可以尝试删除 `project.private.config.json` 让工具重新生成。

## 4. 提交代码规范
在提交变更前，请确保：
- 代码无 Lint 错误
- 功能在模拟器中验证通过

Happy Coding! 🚀
