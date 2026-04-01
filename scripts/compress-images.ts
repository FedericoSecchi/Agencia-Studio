/**
 * Compresses oversized project images in-place.
 * Targets: src/assets/projects/ and src/assets/work/
 *
 * Rules:
 *  - JPG  → quality 82, max 2560px wide
 *  - PNG  → quality 85, max 2560px wide
 *  - Skips files already under 400KB
 *
 * Run: npx tsx scripts/compress-images.ts
 */
import sharp from "sharp";
import { readdirSync, statSync, writeFileSync } from "fs";
import { join, extname, basename } from "path";

const ASSET_DIRS = [
  "src/assets/projects/security-alliance",
  "src/assets/projects/the-red-guild",
  "src/assets/projects/orbita",
  "src/assets/projects/nude",
  "src/assets/work",
];

const MAX_WIDTH = 2560;
const JPEG_QUALITY = 82;
const PNG_QUALITY = 85;
const SKIP_UNDER_KB = 400;

async function compressFile(filePath: string): Promise<void> {
  const ext = extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  const beforeBytes = statSync(filePath).size;
  const beforeKB = Math.round(beforeBytes / 1024);

  if (beforeKB < SKIP_UNDER_KB) {
    console.log(`  skip  ${basename(filePath)} (${beforeKB}KB — already small)`);
    return;
  }

  const img = sharp(filePath);
  const meta = await img.metadata();
  const needsResize = (meta.width ?? 0) > MAX_WIDTH;

  let pipeline = needsResize ? img.resize({ width: MAX_WIDTH, withoutEnlargement: true }) : img;

  let output: Buffer;
  if (ext === ".png") {
    output = await pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 }).toBuffer();
  } else {
    output = await pipeline.jpeg({ quality: JPEG_QUALITY, progressive: true }).toBuffer();
  }

  const afterKB = Math.round(output.length / 1024);
  const saved = beforeKB - afterKB;
  const ratio = Math.round((1 - output.length / beforeBytes) * 100);

  if (afterKB < beforeKB) {
    writeFileSync(filePath, output);
    console.log(`  ✅  ${basename(filePath)}: ${beforeKB}KB → ${afterKB}KB (−${saved}KB, ${ratio}% smaller)`);
  } else {
    console.log(`  skip  ${basename(filePath)} (compression would increase size)`);
  }
}

async function main() {
  console.log("Compressing project images...\n");
  let totalBefore = 0;
  let totalAfter = 0;

  for (const dir of ASSET_DIRS) {
    const files = readdirSync(dir).map((f) => join(dir, f));
    console.log(`📁 ${dir}`);
    for (const file of files) {
      const before = statSync(file).size;
      await compressFile(file);
      const after = statSync(file).size;
      totalBefore += before;
      totalAfter += after;
    }
    console.log("");
  }

  const totalSavedMB = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(1);
  const totalBeforeMB = (totalBefore / 1024 / 1024).toFixed(1);
  const totalAfterMB = (totalAfter / 1024 / 1024).toFixed(1);
  console.log(`Total: ${totalBeforeMB}MB → ${totalAfterMB}MB (saved ${totalSavedMB}MB)`);
}

main().catch(console.error);
