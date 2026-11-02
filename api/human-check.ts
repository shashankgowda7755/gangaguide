import type { IncomingMessage, ServerResponse } from "node:http";
import { handleHumanCheck, clientIp } from "../server/guard.js";

type Req = IncomingMessage & { body?: unknown };

/** Vercel function: POST /api/human-check (never counted by the guard). */
export default async function handler(req: Req, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json");
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.end(JSON.stringify({ ok: false }));
  }
  const r = await handleHumanCheck(req.body, clientIp(req.headers, req.socket.remoteAddress));
  if (r.cookie) res.setHeader("Set-Cookie", r.cookie);
  res.statusCode = r.status;
  res.end(JSON.stringify(r.body));
}
