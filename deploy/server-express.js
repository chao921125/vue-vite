/**
 * Express 服务器配置 - Vue Router History 模式支持
 * 用途：本地测试或 Node.js 部署
 *
 * 使用方式：
 * 1. npm install express
 * 2. node deploy/server-express.js
 * 3. 访问 http://localhost:3000
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 设置静态文件目录
const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));

// 核心配置：History 模式支持
// 所有路由请求都返回 index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📁 Serving files from: ${distPath}`);
  console.log(`✨ Vue Router History mode enabled`);
});

export default app;
