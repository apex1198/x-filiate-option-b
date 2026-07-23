import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const backgroundPath = path.join(root, "assets", "hero-bg-poster.jpg");
const symbolPath = path.join(root, "assets", "x-filiate-symbol-polished-gold.png");
const outputPath = path.join(root, "assets", "xfiliate-social-preview.png");

const width = 1200;
const height = 630;

const background = await sharp(backgroundPath)
  .resize(width, height, { fit: "cover", position: "centre" })
  .modulate({ brightness: 0.42, saturation: 0.75 })
  .blur(0.35)
  .png()
  .toBuffer();

const symbol = await sharp(symbolPath)
  .resize({ width: 430, height: 430, fit: "contain" })
  .png()
  .toBuffer();

const artwork = Buffer.from(`
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shade" x1="0" x2="1">
        <stop offset="0" stop-color="#05070A" stop-opacity=".98"/>
        <stop offset=".58" stop-color="#05070A" stop-opacity=".77"/>
        <stop offset="1" stop-color="#05070A" stop-opacity=".28"/>
      </linearGradient>
      <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#FFE37A"/>
        <stop offset=".55" stop-color="#FFC400"/>
        <stop offset="1" stop-color="#FF9800"/>
      </linearGradient>
      <radialGradient id="flare">
        <stop offset="0" stop-color="#FFC400" stop-opacity=".35"/>
        <stop offset="1" stop-color="#FFC400" stop-opacity="0"/>
      </radialGradient>
      <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="18"/>
      </filter>
    </defs>
    <rect width="1200" height="630" fill="url(#shade)"/>
    <circle cx="985" cy="290" r="300" fill="url(#flare)"/>
    <g opacity=".2" stroke="#FFC400" fill="none">
      <path d="M760 0L950 630M850 0L1010 630M940 0L1070 630M1030 0L1130 630" />
      <circle cx="982" cy="308" r="205"/>
      <circle cx="982" cy="308" r="265"/>
    </g>
    <rect x="62" y="52" width="275" height="46" rx="23" fill="#FFC400"/>
    <circle cx="86" cy="75" r="5" fill="#101318"/>
    <text x="104" y="81" font-family="Ubuntu, Arial, sans-serif" font-size="17" font-weight="700" fill="#101318" letter-spacing="1.4">NỀN TẢNG AFFILIATE #1</text>
    <text x="62" y="192" font-family="Ubuntu, Arial, sans-serif" font-size="67" font-weight="700" fill="#FFFFFF" letter-spacing="-2.5">
      <tspan x="62" dy="0">KIẾM TIỀN</tspan>
      <tspan x="62" dy="78">BỀN VỮNG CÙNG</tspan>
      <tspan x="62" dy="78" fill="url(#gold)">XFILIATE</tspan>
    </text>
    <text x="64" y="470" font-family="Ubuntu, Arial, sans-serif" font-size="23" font-weight="400" fill="#C9CDD5">
      <tspan x="64" dy="0">500+ chiến dịch uy tín · Tracking minh bạch</tspan>
      <tspan x="64" dy="36">Thanh toán linh hoạt · Hỗ trợ đồng hành 24/7</tspan>
    </text>
    <rect x="62" y="554" width="242" height="4" rx="2" fill="#FFC400"/>
    <text x="62" y="595" font-family="Ubuntu, Arial, sans-serif" font-size="18" font-weight="700" fill="#FFFFFF" letter-spacing="2.2">X-FILIATE.COM</text>
    <circle cx="983" cy="309" r="220" fill="#FFC400" opacity=".12" filter="url(#softGlow)"/>
  </svg>
`);

await sharp(background)
  .composite([
    { input: artwork, left: 0, top: 0 },
    { input: symbol, left: 760, top: 94 },
  ])
  .png({ quality: 95, compressionLevel: 9 })
  .toFile(outputPath);

console.log(outputPath);
