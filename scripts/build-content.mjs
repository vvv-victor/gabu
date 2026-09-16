// Build: lê content/publicacoes/*.md + content/config/geral.json
// e gera content.json (consumido pelo index.html em runtime).
// Uso: node scripts/build-content.mjs  (rodado pelo Netlify no deploy)
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const dir = path.join('content', 'publicacoes');
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.md')) : [];

const items = files.map((f) => {
  const g = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
  const d = g.data || {};
  const item = {
    id: d.id || f.replace(/\.md$/, ''),
    title: d.title || '',
    cat: d.cat,
    kind: d.kind,
  };
  if (d.k != null) item.k = d.k;
  if (d.meta != null) item.meta = d.meta;
  if (d.src != null) item.src = d.src;
  if (!item.src && d.image) item.src = d.image; // imagem enviada pelo painel
  if (d.desc != null) item.desc = d.desc;
  if (Array.isArray(d.gallery) && d.gallery.length) item.gallery = d.gallery;
  if (Array.isArray(d.ficha)) item.ficha = d.ficha.map((r) => [r.rotulo, r.valor]);
  if (d.kind === 'text') {
    item.body = g.content.trim().split(/\n{2,}/).map((s) => s.trim().replace(/\s*\n\s*/g, ' ')).filter(Boolean);
  }
  item._order = typeof d.order === 'number' ? d.order : 9999;
  return item;
});

items.sort((a, b) => a._order - b._order);
items.forEach((i) => delete i._order);

let config = {};
try {
  config = JSON.parse(fs.readFileSync(path.join('content', 'config', 'geral.json'), 'utf8'));
} catch (e) { /* sem config: usa padrões do site */ }

fs.writeFileSync('content.json', JSON.stringify({ items, config }, null, 2));
console.log('content.json gerado:', items.length, 'publicações');
