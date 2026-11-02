/*
 * Structured-data check: every JSON-LD @type and property in dist/public must exist in the
 * schema.org vocabulary and be valid for that type (inherited types included).
 *   node scripts/schema-check.mjs            (downloads the current vocabulary)
 *   node scripts/schema-check.mjs vocab.jsonld
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const vocab = process.argv[2]
  ? readFileSync(process.argv[2], "utf8")
  : await (await fetch("https://schema.org/version/latest/schemaorg-current-https.jsonld")).text();
const dist = path.resolve(import.meta.dirname, "../dist/public");
const g = JSON.parse(vocab)["@graph"];
const id = (x) => (x || "").replace("schema:", "");
const parents = {}, props = {};
for (const n of g) {
  const t = [].concat(n["@type"]);
  if (t.includes("rdfs:Class")) parents[id(n["@id"])] = [].concat(n["rdfs:subClassOf"] || []).map((p) => id(p["@id"]));
  if (t.includes("rdf:Property")) props[id(n["@id"])] = [].concat(n["schema:domainIncludes"] || []).map((d) => id(d["@id"]));
}
const anc = (t, s = new Set()) => { if (s.has(t)) return s; s.add(t); (parents[t] || []).forEach((p) => anc(p, s)); return s; };
let errs = 0, objs = 0;
const check = (o, where) => {
  if (Array.isArray(o)) return o.forEach((x) => check(x, where));
  if (!o || typeof o !== "object") return;
  const t = o["@type"];
  if (t) {
    objs++;
    if (!parents[t]) { errs++; console.log(where, "unknown type", t); }
    const a = anc(t);
    for (const k of Object.keys(o)) { if (k.startsWith("@")) continue;
      if (!props[k]) { errs++; console.log(where, t, "unknown property", k); }
      else if (!props[k].some((d) => a.has(d))) { errs++; console.log(where, t, "property not valid for type:", k); } }
  }
  Object.values(o).forEach((v) => check(v, where));
};
const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith(".html") ? [path.join(d, e.name)] : []);
for (const f of walk(dist)) for (const m of readFileSync(f, "utf8").matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) check(JSON.parse(m[1]), path.relative(dist, f));
console.log(`schema.org check: ${objs} typed objects, ${errs} problems`);
if (errs) process.exit(1);
