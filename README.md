# GABU — arquivo multimídia

Site estático (single-file, SPA por hash-router) com painel de conteúdo **Decap CMS** exclusivo, pronto para publicar no **Netlify**.

## Estrutura

```
index.html              # o site (design + dados)
admin/
  index.html            # carrega Decap CMS + Netlify Identity
  config.yml            # painel EXCLUSIVO deste projeto (backend git-gateway)
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
git commit -m "GABU — site + painel Decap CMS"
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

## 3) Ativar o painel /admin (Decap CMS)

O painel usa **git-gateway**, então precisa do Netlify Identity ligado:

1. No site do Netlify → **Site configuration → Identity** → **Enable Identity**.
2. **Identity → Registration** → mude para **Invite only** (recomendado).
3. **Identity → Services → Git Gateway** → **Enable Git Gateway**.
4. **Identity → Invite users** → convide o **seu e-mail**. Aceite o convite pelo link recebido e defina a senha.
5. Acesse `https://SEU-SITE.netlify.app/admin/` e faça login. Pronto — você edita as publicações e configurações por ali.

> Se, ao abrir `/admin/`, o login não aparecer, confirme que o widget do Identity está ativo (passo 1) e o Git Gateway habilitado (passo 3).

## 4) Ajustar o `site_url` do painel

Depois de saber o endereço final, edite `admin/config.yml` e troque as três URLs `https://gabu.netlify.app` pelo endereço real do seu site, e faça commit/push.

---

## Observação sobre os dados

Hoje o `index.html` já traz o conteúdo embutido no próprio arquivo (array `ITEMS`). O painel Decap grava as publicações em `content/publicacoes/*.md`. Para que **o que você editar no painel apareça automaticamente no site**, é preciso um passo extra: fazer o `index.html` ler esses arquivos (via fetch de um `content.json` gerado, ou um pequeno build). Isso ficou como próximo passo — me avise que eu conecto os dois.

## Fotos

O `index.html` referencia imagens em `photos/` (ex.: `photos/C2Q3hZ5ssx0.jpg`) que ainda não estão no repositório. Suba os arquivos reais nessa pasta (ou pelo painel, em uma publicação de fotografia) para que apareçam.
