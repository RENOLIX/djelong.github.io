const http = require("node:http");
const { handler } = require("./index.js");
const { createCustomerAuth } = require("./customer-auth.js");
const customerAuth = createCustomerAuth();

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "127.0.0.1";

const server = http.createServer(async (request, response) => {
  if (request.url === "/health") {
    response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ status: "ok" }));
    return;
  }

  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > (request.url.startsWith("/customer/") ? 20000 : 9 * 1024 * 1024)) {
      response.writeHead(413);
      response.end();
      return;
    }
    chunks.push(chunk);
  }

  const event = {
    body: chunks.length ? Buffer.concat(chunks).toString("utf8") : undefined,
    headers: request.headers,
    httpMethod: request.method,
    path: new URL(request.url, "http://localhost").pathname,
    remoteAddress: request.socket.remoteAddress,
  };
  const result = await customerAuth(event) || await handler(event);

  response.writeHead(result.statusCode, result.headers);
  response.end(result.body);
});

server.listen(port, host, () => {
  console.log(`Djelong News API listening on http://${host}:${port}`);
});

function shutdown() {
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
