# GABU — arquivo multimídia

Site estático (single-file, SPA por hash-router) com painel de conteúdo **Sveltia CMS** exclusivo, pronto para publicar no **Netlify**.

## Estrutura

```
index.html              # o site (design + dados)
admin/
  index.html            # carrega Sveltia CMS
  config.yml            # painel EXCLUSIVO deste projeto (backend GitHub)
content/
  publicacoes/*.md      # publicações editáveis pelo painel
  config/geral.json     # nome, e-mail e redes sociais
photos/                 # uploads de imagem do painel
netlify.toml            # config de publicação (sem build)
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

## Observação sobre os dados

Hoje o `index.html` já traz o conteúdo embutido no próprio arquivo (array `ITEMS`). O painel Sveltia grava as publicações em `content/publicacoes/*.md`. Para que **o que você editar no painel apareça automaticamente no site**, é preciso um passo extra: fazer o `index.html` ler esses arquivos (via fetch de um `content.json` gerado, ou um pequeno build). Isso ficou como próximo passo — me avise que eu conecto os dois.

## Fotos

O `index.html` referencia imagens em `photos/` (ex.: `photos/C2Q3hZ5ssx0.jpg`) que ainda não estão no repositório. Suba os arquivos reais nessa pasta (ou pelo painel, em uma publicação de fotografia) para que apareçam.
