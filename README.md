# burke.mov — Site de conversão

Site single-page para **@burke_mov** (Davi Burke), editor de vídeo e motion designer.
Estética **Apple Liquid Glass Dark** com acento azul-elétrico. HTML/CSS/JS puro, sem build, pronto para deploy.

## Estrutura

```
Site/
├── index.html          # Todas as seções (single page)
├── css/styles.css      # Design system (tokens em :root) + componentes
├── js/main.js          # Config do WhatsApp, portfolio, modal, animações
└── assets/
    ├── favicon.svg
    ├── og-image.jpg    # Preview 1200×630 p/ WhatsApp/DM
    └── thumbnails/     # Capas dos vídeos (locais, sem dependência externa)
```

## Dados reais já preenchidos

- **WhatsApp:** `5543991358713` — em `CONFIG.whatsappNumber` (`js/main.js`). Fonte única: todos os botões usam.
- **Métricas:** +5M views · 17 clientes · entrega média 24h.
- **Portfolio:** 11 vídeos do Vimeo — 10 verticais 9:16 + Treasure Coast Legal (16:9) como banner de destaque (Ads Meta ×4, Corporativo ×4, Gaming ×3).
- **Contato:** Instagram, Behance, LinkedIn, e-mail e WhatsApp no footer.
- **SEO/OG:** domínio `burkemov.com`, `assets/og-image.jpg` gerada.
- Seção de depoimentos **omitida de propósito** (sem depoimentos reais ainda).

## Como editar

- **Número/mensagens do WhatsApp:** `CONFIG` no topo de `js/main.js`.
- **Adicionar vídeo:** nova entrada em `PROJECTS` (`js/main.js`). Campos: `title`, `meta`, `category`, `tag`, `vimeoId`, `thumb`, `aspect` (`"9:16"` é o padrão do grid; `"16:9"` vira banner de destaque de largura total). Filtros e contadores são gerados automaticamente; para uma categoria nova, adicione o rótulo em `FILTER_LABELS`.
- **Thumbnail de vídeo novo:** baixe a capa do Vimeo para `assets/thumbnails/` (ex.: `https://vumbnail.com/ID.jpg`).
- **Cor de acento:** `--accent` em `css/styles.css` (`:root`). O verde dos CTAs de WhatsApp é `--wa`.
- **OG image:** se mudar métricas/slogan, regenere com `tools/gerar-og-image.py` (instruções no topo do script).
- **Depoimentos:** quando existirem, criar uma seção entre Diferenciais e FAQ.

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
