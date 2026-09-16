# GABU — arquivo multimídia

Site estático (single-file, SPA por hash-router) com painel de conteúdo **Sveltia CMS** exclusivo, pronto para publicar no **Netlify**.

## Estrutura

```
index.html              # o site (lê content.json em runtime)
content.json            # gerado pelo build a partir de content/
admin/
  index.html            # carrega Sveltia CMS
  config.yml            # painel EXCLUSIVO deste projeto (backend GitHub)
content/
  publicacoes/*.md      # publicações editáveis pelo painel
  config/geral.json     # nome, e-mail e redes sociais
scripts/
  build-content.mjs     # gera content.json (roda no deploy)
  migrate-from-index.mjs# utilitário único de migração (histórico)
photos/                 # uploads de imagem do painel
netlify.toml            # publicação + build (npm run build)
package.json            # dependências do build (gray-matter)
```

---

## 1) Criar o repositório no GitHub

O nome combinado é **`gabu`** (público), na conta `vvv-victor`.

```bash
# dentro desta pasta
git init
git add .
git commit -m "GABU — site + painel Sveltia CMS"
git branch -M main
git remote add origin https://github.com/vvv-victor/gabu.git
git push -u origin main
```

> Se preferir criar pela interface: GitHub → **New repository** → nome `gabu`, público, **sem** README, depois rode os comandos acima.

## 2) Conectar ao Netlify (novo site)

1. Acesse <https://app.netlify.com> → **Add new site** → **Import an existing project** → **GitHub**.
2. Autorize o Netlify e escolha o repositório **`vvv-victor/gabu`**.
3. Configuração de build:
   - **Build command:** *(deixe em branco)*
   - **Publish directory:** `.`
4. **Deploy site**. Em ~1 min o site estará no ar (ex.: `https://gabu.netlify.app`).
   - Opcional: **Site settings → Change site name** para definir `gabu` no subdomínio.

## 3) Ativar o painel /admin (Sveltia CMS)

O Sveltia usa o **backend GitHub direto** (não usa Netlify Identity/Git Gateway).
É preciso um **OAuth** para o login. O jeito mais simples, hospedando no Netlify:

1. Crie um **GitHub OAuth App**: <https://github.com/settings/developers> → **New OAuth App**
   - **Application name:** gabu CMS
   - **Homepage URL:** `https://SEU-SITE.netlify.app`
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`
   - Anote o **Client ID** e gere um **Client Secret**.
2. No Netlify: **User settings → Applications → OAuth → Install provider** (ou
   **Site configuration → Access & security → OAuth**) → escolha **GitHub** e cole
   o Client ID/Secret do passo 1.
3. Acesse `https://SEU-SITE.netlify.app/admin/` → **Login with GitHub**. Pronto —
   você edita as publicações e configurações por ali, com commit direto no repo.

> Alternativa sem Netlify OAuth: usar o worker oficial **sveltia-cms-auth**
> (Cloudflare) e apontar `backend.base_url` no `config.yml` para ele. Veja
> <https://github.com/sveltia/sveltia-cms#authentication>.

> Importante: no `admin/config.yml`, o `backend.repo` já está como
> `vvv-victor/gabu`. Se você usar outro nome/conta, ajuste essa linha.

## 4) Ajustar o `site_url` do painel

Depois de saber o endereço final, edite `admin/config.yml` e troque as três URLs `https://gabu.netlify.app` pelo endereço real do seu site, e faça commit/push.

---

## Como o conteúdo funciona (CMS ligado ao site)

O conteúdo mora em arquivos e o site lê deles — o que você editar no painel aparece no site após o deploy:

1. Cada publicação é um arquivo em **`content/publicacoes/*.md`** (frontmatter + corpo).
   As configurações (nome, e-mail, redes) ficam em **`content/config/geral.json`**.
2. No deploy, o Netlify roda **`npm run build`** → `scripts/build-content.mjs` lê esses
   arquivos e gera **`content.json`** na raiz.
3. O **`index.html`** faz `fetch('content.json')` ao abrir e desenha tudo a partir dali.

Fluxo de edição: você mexe no `/admin` → o Sveltia faz commit no `content/` → o Netlify
rebuilda → o `content.json` é regenerado → o site reflete a mudança.

> As **categorias** (Escrita, Cinema, Fotografia, Som, Videocast) continuam fixas no
> `index.html`, porque estão ligadas às cores/estilos do tema.

### Rodar o build localmente
```bash
npm install
npm run build   # gera content.json
```

`scripts/migrate-from-index.mjs` foi o utilitário único que migrou o conteúdo antigo
(embutido no `index.html`) para os arquivos `.md`. Não precisa rodar de novo.

## Fotos

O `index.html` referencia imagens em `photos/` (ex.: `photos/C2Q3hZ5ssx0.jpg`) que ainda não estão no repositório. Suba os arquivos reais nessa pasta (ou pelo painel, em uma publicação de fotografia) para que apareçam.
