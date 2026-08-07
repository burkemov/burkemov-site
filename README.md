# burke.mov — Site de conversão

Site single-page para **@burke_mov** (Davi Burke), editor de vídeo.
Layout minimalista centrado (foto redonda, título, descrição, contatos) sobre estética
**Apple Liquid Glass Dark**. HTML/CSS/JS puro, sem build, pronto para deploy.

**Página = hero + portfolio + rodapé.** Não há menu, métricas, processo, diferenciais, FAQ
nem filtros de categoria: tudo removido de propósito para nada competir com os vídeos.

Hero: identidade discreta (foto pequena + `burke.mov` numa pílula), headline em duas partes
(contexto apagado + promessa em destaque), descrição, "Contact now" e os dois contatos.

## Estrutura

```
Site/
├── index.html          # Todas as seções (single page)
├── css/styles.css      # Design system (tokens em :root) + componentes
├── js/main.js          # Config do WhatsApp, portfolio, modal, animações
└── assets/
    ├── favicon.svg
    ├── profile.jpg     # Foto do hero (512×512, recorte 1:1 no rosto)
    ├── og-image.jpg    # Preview 1200×630 p/ WhatsApp/DM
    ├── thumbnails/     # Capas dos vídeos (locais, sem dependência externa)
    └── videos/         # MP4 hospedado no próprio site
```

## Dados reais já preenchidos

- **WhatsApp:** `5543991358713` — em `CONFIG.whatsappNumber` (`js/main.js`). Fonte única: todos os botões usam.
- **Métricas:** +5M views · 17 clientes · entrega média 24h.
- **Portfolio:** 8 vídeos do Vimeo — 7 verticais 9:16 + Treasure Coast Legal (16:9) como banner que abre a grade. `assets/videos/` está vazio: nenhum MP4 hospedado no momento (o campo `mp4` continua suportado).
- **Contato:** Discord e WhatsApp aparecem duas vezes (hero e bloco após os projetos), como logos brancas sem círculo, cada um com uma frase curta diferente; Instagram, Behance, LinkedIn e e-mail no rodapé. O CTA dentro do player de vídeo também é Discord.
- **Sem traços (—):** todo texto visível usa vírgula ou ponto médio (·). Os títulos dos vídeos seguem o padrão "Cliente + tipo de trabalho", sem traço.
- **SEO/OG:** URLs absolutas apontam para `https://burkemov.vercel.app/` (domínio no ar). `assets/og-image.jpg` mostra 3 frames reais do portfolio.

> ⚠️ **Domínio:** `burkemov.com` **não está registrado** (NXDOMAIN). Enquanto isso, as URLs absolutas do `index.html` (canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD) usam `burkemov.vercel.app`. Se um dia comprar o domínio, troque as 5 ocorrências — se apontarem para um domínio que não existe, **a imagem de preview do link some** (foi exatamente o que acontecia).
- Seção de depoimentos **omitida de propósito** (sem depoimentos reais ainda).

## Idioma

O site é **inteiramente em inglês americano** (`lang="en-US"`): textos, títulos dos vídeos, rótulos dos filtros, mensagens pré-preenchidas do WhatsApp, meta tags e a OG image. As chaves de categoria em `PROJECTS` são `ads` / `corporate` / `gaming` / `motion`.

Os **comentários do código continuam em português** de propósito — eles são para você manter o site, não aparecem para o visitante.

## Como editar

- **Número/mensagens do WhatsApp:** `CONFIG` no topo de `js/main.js`.
- **Adicionar vídeo:** nova entrada em `PROJECTS` (`js/main.js`). Campos: `title`, `meta`, `category`, `tag`, `vimeoId` **ou** `mp4` (caminho de um arquivo em `assets/videos/` — comprima antes: `avconvert -p Preset1280x720 -s origem.mp4 -o destino.mp4`; manter abaixo de ~50 MB), `thumb`, `aspect` (`"9:16"` é o padrão do grid; `"16:9"` vira banner de destaque de largura total). Os dois banners 16:9 ficam nos dois primeiros índices de propósito: em qualquer outra posição eles empurram os cards e deixam célula vazia no meio da grade.
- **Thumbnail de vídeo novo:** baixe a capa do Vimeo para `assets/thumbnails/` (ex.: `https://vumbnail.com/ID.jpg`).
- **Cor de acento:** `--accent` em `css/styles.css` (`:root`). O verde dos CTAs de WhatsApp é `--wa`.
- **OG image:** se mudar métricas/slogan, regenere com `tools/gerar-og-image.py` (instruções no topo do script).
- **Foto do hero:** `assets/profile.jpg`, quadrada (1:1) com o rosto centralizado — o CSS a recorta em círculo.
- **Discord:** `CONFIG.discordUserId` (`497121311626231812`) faz o ícone abrir o perfil direto, com o botão "Message". Se esse campo for esvaziado, o clique volta a copiar o `discordUsername` e mostrar um aviso — o Discord não tem URL de conversa por nome de usuário, só por ID numérico.

## Rodar localmente

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Deploy

- **Vercel** (recomendado — `vercel.json` já configura cache): conecte o repo, framework "Other", sem build.
- **GitHub Pages:** ative Pages na branch `main` (raiz).

## Notas técnicas

- `backdrop-filter` tem fallback sólido automático (`@supports`) para navegadores sem suporte.
- Blur reduzido em telas pequenas (performance mobile) e `prefers-reduced-motion` respeitado.
- Vídeos **só carregam ao abrir o modal** — a primeira carga usa apenas thumbnails locais lazy.
- Mobile-first, breakpoints em 1020/760/560px.
