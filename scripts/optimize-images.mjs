/*
 * Real photos only (no AI or stock): drop originals in ./photos/<name>.jpg, run `npm run images`.
 * Writes client/public/img/<name>-{640,1024,1600}.{avif,webp}. Use with <Photo src="/img/<name>.jpg" .../>.
 */
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const src = path.resolve("photos");
const out = path.resolve("client/public/img");
await mkdir(out, { recursive: true });
const files = (await readdir(src)).filter((f) => /\.(jpe?g|png|webp|heic|tiff?)$/i.test(f));
for (const f of files) {
  const name = f.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  for (const w of [640, 1024, 1600]) {
    const img = sharp(path.join(src, f)).rotate().resize({ width: w, withoutEnlargement: true });
    await img.clone().avif({ quality: 55 }).toFile(path.join(out, `${name}-${w}.avif`));
    await img.clone().webp({ quality: 78 }).toFile(path.join(out, `${name}-${w}.webp`));
  }
  console.log(`✓ ${f} -> img/${name}-{640,1024,1600}.{avif,webp}`);
}
if (!files.length) console.log("No photos in ./photos yet. See ASSETS-NEEDED.md.");
