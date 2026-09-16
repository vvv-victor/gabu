// One-off: extrai o array ITEMS embutido no index.html e gera
// os arquivos content/publicacoes/<id>.md (frontmatter + corpo).
// Uso: node scripts/migrate-from-index.mjs
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const html = fs.readFileSync('index.html', 'utf8');
const m = html.match(/var ITEMS = (\[[\s\S]*?\n\s*\]);/);
if (!m) { console.error('Não encontrei o array ITEMS no index.html'); process.exit(1); }

// eslint-disable-next-line no-eval
const ITEMS = eval(m[1]);
console.log('ITEMS encontrados:', ITEMS.length);

const outDir = path.join('content', 'publicacoes');
fs.mkdirSync(outDir, { recursive: true });

// limpa .md antigos para regenerar do zero
for (const f of fs.readdirSync(outDir)) {
  if (f.endsWith('.md')) fs.rmSync(path.join(outDir, f));
}

ITEMS.forEach((x, i) => {
  const data = { id: x.id, title: x.title, cat: x.cat, kind: x.kind, order: i };
  if (x.k != null) data.k = x.k;
  if (x.meta != null) data.meta = x.meta;
  if (x.src != null) data.src = x.src;
  if (x.gallery) data.gallery = x.gallery;
  if (Array.isArray(x.ficha)) data.ficha = x.ficha.map(([rotulo, valor]) => ({ rotulo, valor }));
  if (x.desc != null) data.desc = x.desc;

  const body = Array.isArray(x.body) ? x.body.join('\n\n') : '';
  const md = matter.stringify(body ? '\n' + body + '\n' : '', data);
  fs.writeFileSync(path.join(outDir, x.id + '.md'), md);
});

console.log('Arquivos gerados em', outDir);
