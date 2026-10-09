# CH Audio Match Website

静态产品官网，无构建依赖。

## 本地预览

在 `H:\forSVN\cc_task` 运行：

```powershell
python -m http.server 8765
```

打开：

```text
http://127.0.0.1:8765/CH-Audio-Match-Website/
```

## 部署

上传时保持插件 ZIP 位于网站的 `downloads` 目录：

```text
CH-Audio-Match-Website/downloads/CH-Audio-Match-0.3.1-Windows-x64-VST3.zip
```

可部署到 GitHub Pages、Cloudflare Pages、Netlify 或任意静态 Web 服务器。
