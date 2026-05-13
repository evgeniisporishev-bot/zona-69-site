const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const root = __dirname;

const loadEnvFile = () => {
  const envPath = path.join(root, ".env");

  if (!fs.existsSync(envPath)) {
    return;
  }

  const envFile = fs.readFileSync(envPath, "utf8");

  envFile.split(/\r?\n/).forEach((line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      return;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      return;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, "");

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  });
};

loadEnvFile();

const host = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT || 8000);
const maxPortAttempts = 10;
const maxBodyBytes = 16 * 1024;

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".mov": "video/quicktime",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".webm": "video/webm",
};

const sendJson = (response, statusCode, payload) => {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
};

const readJsonBody = (request) =>
  new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;

      if (Buffer.byteLength(body) > maxBodyBytes) {
        reject(new Error("Request body is too large"));
        request.destroy();
      }
    });

    request.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });

    request.on("error", reject);
  });

const formatBookingMessage = ({ name, phone, date, guests, language }) => {
  return [
    "Новая заявка с сайта ZONA 6/9",
    "",
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Дата и время: ${date ? date.replace("T", " ") : "не указано"}`,
    `Гостей: ${guests}`,
    `Язык сайта: ${language || "не указан"}`,
  ].join("\n");
};

const sendTelegramMessage = (text) =>
  new Promise((resolve, reject) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      reject(new Error("Telegram is not configured"));
      return;
    }

    const payload = JSON.stringify({
      chat_id: chatId,
      disable_web_page_preview: true,
      text,
    });

    const request = https.request(
      {
        hostname: "api.telegram.org",
        method: "POST",
        path: `/bot${token}/sendMessage`,
        headers: {
          "Content-Length": Buffer.byteLength(payload),
          "Content-Type": "application/json",
        },
      },
      (response) => {
        let responseBody = "";

        response.on("data", (chunk) => {
          responseBody += chunk;
        });

        response.on("end", () => {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            resolve();
            return;
          }

          reject(new Error(`Telegram returned ${response.statusCode}: ${responseBody}`));
        });
      },
    );

    request.on("error", reject);
    request.write(payload);
    request.end();
  });

const handleBooking = async (request, response) => {
  try {
    const booking = await readJsonBody(request);
    const name = String(booking.name || "").trim();
    const phone = String(booking.phone || "").trim();
    const date = String(booking.date || "").trim();
    const guests = String(booking.guests || "").trim();
    const language = String(booking.language || "").trim();

    if (!name || !phone || !date || !guests) {
      sendJson(response, 400, { ok: false, error: "missing_fields" });
      return;
    }

    await sendTelegramMessage(formatBookingMessage({ name, phone, date, guests, language }));
    sendJson(response, 200, { ok: true });
  } catch (error) {
    const isTelegramConfigError = error.message === "Telegram is not configured";
    const statusCode = isTelegramConfigError ? 503 : 500;

    console.error(error);
    sendJson(response, statusCode, {
      ok: false,
      error: isTelegramConfigError ? "telegram_not_configured" : "booking_failed",
    });
  }
};

const serveStaticFile = (request, response) => {
  const url = new URL(request.url, `http://${host}:${port}`);
  const requestPath = decodeURIComponent(url.pathname);
  const filePath = path.resolve(root, requestPath === "/" ? "index.html" : requestPath.slice(1));
  const relativePath = path.relative(root, filePath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.stat(filePath, (error, stats) => {
    if (error || !stats.isFile()) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const contentType = types[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    const range = request.headers.range;
    const commonHeaders = {
      "Accept-Ranges": "bytes",
      "Content-Type": contentType,
    };

    if (range) {
      const match = range.match(/^bytes=(\d*)-(\d*)$/);
      const start = match?.[1] ? Number(match[1]) : 0;
      const end = match?.[2] ? Number(match[2]) : stats.size - 1;

      if (!match || start > end || end >= stats.size) {
        response.writeHead(416, {
          ...commonHeaders,
          "Content-Range": `bytes */${stats.size}`,
        });
        response.end();
        return;
      }

      response.writeHead(206, {
        ...commonHeaders,
        "Content-Length": end - start + 1,
        "Content-Range": `bytes ${start}-${end}/${stats.size}`,
      });

      if (request.method === "HEAD") {
        response.end();
        return;
      }

      fs.createReadStream(filePath, { start, end }).pipe(response);
      return;
    }

    response.writeHead(200, {
      ...commonHeaders,
      "Content-Length": stats.size,
    });

    if (request.method === "HEAD") {
      response.end();
      return;
    }

    fs.createReadStream(filePath).pipe(response);
  });
};

const handleRequest = (request, response) => {
  const url = new URL(request.url, `http://${host}:${port}`);

  if (request.method === "POST" && url.pathname === "/api/booking") {
    handleBooking(request, response);
    return;
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    sendJson(response, 405, { ok: false, error: "method_not_allowed" });
    return;
  }

  serveStaticFile(request, response);
};

const startServer = (nextPort, attemptsLeft) => {
  const appServer = http.createServer(handleRequest);

  appServer.once("error", (error) => {
    if (error.code === "EADDRINUSE" && attemptsLeft > 0) {
      startServer(nextPort + 1, attemptsLeft - 1);
      return;
    }

    throw error;
  });

  appServer.listen(nextPort, host, () => {
    const displayHost = host === "0.0.0.0" ? "127.0.0.1" : host;
    console.log(`Site is running at http://${displayHost}:${nextPort}`);
  });
};

startServer(port, maxPortAttempts);
