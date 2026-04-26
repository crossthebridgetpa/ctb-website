/**
 * One-off OG image generator for public/og/default.png (1200×630).
 *
 * Renders tools/render-og.html in headless Chromium (already installed via
 * @playwright/test) at viewport 1200×630 and screenshots to PNG.
 *
 * Re-run when the OG composition spec (UI-SPEC §OG Image Template) changes:
 *
 *   node tools/render-og.mjs
 *
 * The PNG output is committed to the repo; this script is documentation of
 * how the asset was generated.
 */
import { chromium } from 'playwright';
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const html = path.join(__dirname, 'render-og.html');
const out = path.join(__dirname, '..', 'public', 'og', 'default.png');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(`file://${html}`);
await page.waitForLoadState('networkidle');
const buf = await page.screenshot({ type: 'png', fullPage: false });
await browser.close();

// Recompress via sharp's PNG encoder in palette mode. The composition is
// flat brand colors + anti-aliased text, so an 8-bit palette PNG holds the
// quality but cuts file size dramatically vs Chromium's default PNG output.
await sharp(buf)
  .png({ palette: true, compressionLevel: 9, effort: 10 })
  .toFile(out);

console.log(`Wrote ${out}`);
