const http = require("http")
const fs = require("fs")
const path = require("path")

const ROOT = path.join(__dirname, "dist")
const PORT = 5173

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
}

const server = http.createServer((req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname)
    let filePath = path.normalize(path.join(ROOT, urlPath))

    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403)
      return res.end("Forbidden")
    }

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(ROOT, "index.html")
    }

    const ext = path.extname(filePath).toLowerCase()
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" })
    fs.createReadStream(filePath).pipe(res)
  } catch (err) {
    res.writeHead(500)
    res.end("Server error")
  }
})

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Serving ${ROOT} on http://0.0.0.0:${PORT}`)
})

process.on("SIGINT", () => {})
process.on("SIGTERM", () => {})
