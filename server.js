'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, 'public');
const port = Number(process.env.PORT || 3000);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon'};
const server = http.createServer((req,res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (pathname === '/healthz') { res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8','Cache-Control':'no-store'}); return res.end('ok'); }
  if (req.method !== 'GET' && req.method !== 'HEAD') {res.writeHead(405, {'Allow':'GET, HEAD'}); return res.end();}
  let decoded; try { decoded = decodeURIComponent(pathname); } catch {res.writeHead(400);return res.end();}
  const target = path.resolve(root, '.' + (decoded === '/' ? '/index.html' : decoded));
  if (target !== root && !target.startsWith(root + path.sep)) {res.writeHead(403);return res.end();}
  fs.stat(target, (error,stat) => {
    if(error || !stat.isFile()) {res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'});return res.end('Pagina non trovata');}
    res.writeHead(200, {'Content-Type':types[path.extname(target)] || 'application/octet-stream', 'X-Content-Type-Options':'nosniff', 'X-Frame-Options':'DENY','Referrer-Policy':'strict-origin-when-cross-origin','Cache-Control': target.endsWith('.html') ? 'no-cache' : 'public, max-age=3600'});
    if(req.method === 'HEAD') return res.end();
    fs.createReadStream(target).pipe(res);
  });
});
server.listen(port, '0.0.0.0', () => console.log(`Portfolio HTTP listening on 0.0.0.0:${port}`));
for (const signal of ['SIGTERM','SIGINT']) process.on(signal, () => server.close(() => process.exit(0)));
