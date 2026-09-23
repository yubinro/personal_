const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');

const portArgument = process.argv.indexOf('--port');
const port = Number(portArgument >= 0 ? process.argv[portArgument + 1] : process.env.PORT || 5173);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('Use a port number between 1 and 65535.');
  process.exit(1);
}

const assets = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/style.css', ['style.css', 'text/css; charset=utf-8']],
  ['/app.js', ['app.js', 'text/javascript; charset=utf-8']],
]);

const server = http.createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end('Method not allowed');
    return;
  }
  let pathname;
  try {
    pathname = new URL(request.url, 'http://localhost').pathname;
  } catch {
    response.writeHead(400);
    response.end('Bad request');
    return;
  }
  const asset = assets.get(pathname);
  if (!asset) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }
  try {
    const content = await fs.readFile(path.join(__dirname, asset[0]));
    response.writeHead(200, {
      'Content-Type': asset[1],
      'Content-Length': content.length,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch (error) {
    console.error('Unable to read asset:', error.message);
    response.writeHead(500);
    response.end('Unable to read asset');
  }
});

server.on('error', (error) => {
  console.error(error.code === 'EADDRINUSE'
    ? `Port ${port} is already in use. Try: npm.cmd run dev -- --port ${port + 1}`
    : error.message);
  process.exit(1);
});
server.listen(port, '127.0.0.1', () => {
  console.log(`\n  Byeolgyeol dev server: http://localhost:${port}\n  Refresh the browser after editing. Press Ctrl+C to stop.\n`);
});
