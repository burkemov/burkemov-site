# burke.mov — Site de conversão

Site single-page (portfolio + máquina de conversão) para **@burke_mov**, editor de vídeo e motion designer. Estética "Apple Liquid Glass Dark". HTML/CSS/JS puro, sem build, pronto para deploy.

## Estrutura

```
Site/
├── index.html          # Todas as seções (single page)
├── css/styles.css      # Design system + componentes
├── js/main.js          # Config WhatsApp, portfolio, modal, animações
└── assets/
    ├── favicon.svg
    ├── thumbnails/     # Thumbs dos vídeos (adicionar)
    └── og-image.jpg    # Preview p/ WhatsApp/DM (adicionar, 1200×630)
```

## Estado atual (já preenchido)

- ✅ **WhatsApp**: `5543991358713` em `CONFIG.whatsappNumber` (`js/main.js`) — fonte única, todos os botões usam.
- ✅ **Portfolio**: 9 vídeos reais do Vimeo em `PROJECTS` (nichos: ads, corporativo, gaming).
- ✅ **Métricas**: 10M+ views · 30+ clientes · 3 nichos · 48h.
- ✅ **Logos** (texto): Grupo Axis, Felipe Barreto, Studio Pilates.
- ✅ **Contato**: Instagram, Behance, LinkedIn, e-mail, WhatsApp no footer.
- ✅ **SEO**: domínio `burkemov.com` + `assets/og-image.jpg` (1200×630, provisória gerada).
- ✅ Seção de depoimentos removida (sem depoimentos ainda).

## Recomendado melhorar depois

1. **Thumbnails dos vídeos** — hoje usam `https://vumbnail.com/ID.jpg` (thumbnail automática do Vimeo, serviço de terceiros). Para **confiabilidade total**, baixe cada imagem para `assets/thumbnails/` e troque o campo `thumb` no `PROJECTS` pelo caminho local (ex.: `assets/thumbnails/axis-01.jpg`).
2. **OG image** — `assets/og-image.jpg` é provisória (gerada por código). Se quiser, substitua por uma arte final com um frame de vídeo.
3. **Logos em imagem** — se tiver os logos dos clientes em PNG/SVG, troque os `<span class="logo-placeholder">` por `<img>` no `index.html`.
4. **Depoimentos** — quando tiver, dá pra reativar a seção (o CSS `.testimonials` continua no `styles.css`).
5. **Mensagens do WhatsApp** — ajuste os textos em `CONFIG.messages` se quiser.

> Para adicionar/editar vídeos: cada item de `PROJECTS` aceita `videoType: "vimeo" | "youtube" | "mp4"` e `videoId` (número do Vimeo, id do YT, ou caminho em `assets/videos/`).

## Rodar localmente

Qualquer servidor estático. Ex.:

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

## Deploy

- **GitHub Pages:** suba os arquivos na raiz do repositório e ative Pages na branch `main`.
- **Vercel/Netlify:** arraste a pasta ou conecte o repo. Sem build step (framework: "Other" / static).

## Personalização rápida

- **Cor de acento:** `--accent` em `css/styles.css` (:root). Um único tom em toda a UI.
- **Verde do WhatsApp:** `--wa` (mantido reconhecível de propósito).
- **Blur do vidro:** `--glass-blur`.

## Notas técnicas

- `backdrop-filter` tem fallback sólido automático (`@supports`) para navegadores/dispositivos sem suporte.
- Respeita `prefers-reduced-motion`.
- Vídeos só carregam ao abrir o modal (não pesam na primeira carga).
- Mobile-first e responsivo (breakpoints 900/760/520px).
