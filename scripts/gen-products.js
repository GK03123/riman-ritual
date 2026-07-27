const fs = require("fs");
const path = require("path");

const S = require("path").join(__dirname, "data");
const OUT = require("path").join(__dirname, "..", "lib", "products.ts");

const products = JSON.parse(fs.readFileSync(path.join(S, "products.json"), "utf8"));
const rituals = JSON.parse(fs.readFileSync(path.join(S, "rituals.json"), "utf8"));

const BESTSELLER_ORDER = [52745, 52743, 54387, 53140, 53150, 53142, 53146, 53148, 53164, 53172, 53162];

const clean = (s) =>
  (s || "")
    .replace(/<BR\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const retail = (p) => {
  const r = (p.pricing || []).find((x) => x.priceType === "R") || (p.pricing || [])[0];
  return r ? r.price : null;
};

const mapProduct = (p) => {
  const imgs = (p.imageUrls || []).map((i) => i.imageUrl).filter(Boolean);
  const cats = String(p.productCategory || "")
    .split(",")
    .map((c) => parseInt(c.trim(), 10))
    .filter((n) => !isNaN(n));
  const rank = BESTSELLER_ORDER.indexOf(p.productPK);
  const kit = (p.packageItems || [])
    .map((i) => clean(i.name || i.productName || i.title || ""))
    .filter(Boolean);
  const gallery = [p.imageUrl, ...imgs.filter((u) => u !== p.imageUrl)].filter(Boolean);
  return {
    id: p.productPK,
    name: clean(p.name),
    brand: p.brandName || "",
    line: p.productLine || "",
    menu: p.productMenu || "",
    categories: cats,
    price: retail(p),
    image: p.imageUrl || imgs[0] || "",
    imageAlt: imgs.find((u) => u !== p.imageUrl) || null,
    gallery,
    description: clean(p.description).slice(0, 800),
    shortDescription: clean(p.description).slice(0, 140),
    isPackage: !!p.isPackage,
    bestsellerRank: rank === -1 ? null : rank + 1,
    kit,
  };
};

const seen = new Set();
const all = [];
for (const p of [...products, ...rituals]) {
  if (seen.has(p.productPK)) continue;
  seen.add(p.productPK);
  all.push(mapProduct(p));
}

const ritualIds = rituals.map((r) => r.productPK);

const header = `// Generado automáticamente desde el API público de RIMAN (cart-api.riman.com)
// Fecha de captura: ${new Date().toISOString().slice(0, 10)}
// No editar a mano: regenerar con scripts/gen-products.js

export interface Product {
  id: number;
  name: string;
  brand: string;
  line: string;
  menu: string;
  categories: number[];
  price: number | null;
  image: string;
  imageAlt: string | null;
  gallery: string[];
  description: string;
  shortDescription: string;
  isPackage: boolean;
  bestsellerRank: number | null;
  kit: string[];
}

export const CATEGORY = { SKINCARE: 5, PERSONAL_CARE: 6, WELLNESS: 7, MONTHLY: 8, BESTSELLERS: 9 } as const;

export const RITUAL_IDS: number[] = ${JSON.stringify(ritualIds)};
`;

const body = `
export const PRODUCTS: Product[] = ${JSON.stringify(all, null, 2)};

export const BESTSELLERS: Product[] = PRODUCTS.filter((p) => p.bestsellerRank !== null).sort(
  (a, b) => (a.bestsellerRank ?? 99) - (b.bestsellerRank ?? 99)
);

export const RITUALS: Product[] = RITUAL_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(
  (p): p is Product => !!p
).sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, header + body, "utf8");
console.log(`OK: ${all.length} productos, ${ritualIds.length} rituales -> ${OUT}`);

