import type { IncomingMessage, ServerResponse } from "node:http";
import { handleLead } from "../server/leads.js";
import { guardCheck, clientIp } from "../server/guard.js";

type Req = IncomingMessage & { body?: unknown };

/** Vercel function: POST /api/leads */
export default async function handler(req: Req, res: ServerResponse) {
  const send = (status: number, body: object) => {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(body));
  };
  if (req.method !== "POST") return send(405, { ok: false, error: "method not allowed" });
  const ip = clientIp(req.headers, req.socket.remoteAddress);
  const blocked = guardCheck(ip, "/api/leads", req.headers.cookie, req.headers["user-agent"]);
  if (blocked) return send(blocked.status, blocked.body);
  const r = await handleLead(req.body, ip);
  send(r.status, r.body);
}
