/**
 * Rasterises the brand mark into the PNG sizes the web manifest, Apple touch
 * icon and legacy favicon need.
 *
 * Run with `npm run icons` after changing `public/logo-official.png`. The
 * outputs are committed, so this is not part of the build — CI never needs
 * `sharp`.
 *
 * The source is the official IGNYT logo as supplied, not a redrawn copy of it.
 * Every icon on the site is a resize of that one file, so there is no second
 * version of the mark that can drift away from it.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const source = await readFile(path.join(root, "public", "logo-official.png"));

/** [output path relative to repo root, pixel size] */
const targets = [
  ["public/icon-192.png", 192],
  ["public/icon-512.png", 512],
  ["src/app/apple-icon.png", 180],
  ["src/app/icon1.png", 48],
  ["public/logo-mark.png", 512],
];

for (const [target, size] of targets) {
  const png = await sharp(source)
    .resize(size, size, { fit: "cover" })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(path.join(root, target), png);
  console.log(`wrote ${target} (${size}×${size}, ${png.length} bytes)`);
}
