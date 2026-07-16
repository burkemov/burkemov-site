/* ============================================================
   burke.mov — main.js
   Config do WhatsApp · portfolio · modal · animações
   ============================================================ */

/* ------------------------------------------------------------
   CONFIG — fonte única da verdade.
   Troque o número ou as mensagens aqui e todos os botões
   de WhatsApp do site atualizam automaticamente.
   ------------------------------------------------------------ */
const CONFIG = {
  // Formato internacional, só dígitos: 55 (Brasil) + DDD + número
  whatsappNumber: "5543991358713",

  // Mensagem pré-preenchida por contexto (reduz fricção do lead)
  messages: {
    default: "Olá! Vi seu site e quero conversar sobre um projeto de vídeo.",
    nav: "Olá! Vim pelo seu site e quero saber mais sobre seu trabalho.",
    hero: "Olá! Vi seu portfolio e quero conversar sobre um projeto.",
    portfolio: "Olá! Gostei dos seus trabalhos e quero um orçamento.",
    final: "Olá! Quero tirar um orçamento para um projeto de vídeo.",
    footer: "Olá! Vim pelo seu site e quero conversar.",
    float: "Olá! Vi seu site e quero conversar sobre um projeto.",
    modal: "Olá! Vi um trabalho no seu site e quero um vídeo parecido.",
  },
};

/* ------------------------------------------------------------
   PORTFOLIO — vídeos reais (Vimeo).
   - category: "ads" | "corporativo" | "gaming" | "motion"...
     Novas categorias podem ser adicionadas (o filtro é gerado
     automaticamente; rótulo em FILTER_LABELS). Um vídeo pode ter
     mais de uma categoria, separadas por espaço: "corporativo ads".
   - aspect: "9:16" (vertical, padrão do grid) ou "16:9"
     (horizontal — vira o banner de destaque de largura total)
   - thumb: imagem local em assets/thumbnails/
   ------------------------------------------------------------ */
const PROJECTS = [
  {
    title: "Treasure Coast Legal — Institucional",
    meta: "Corporativo · Advocacia — Flórida, EUA",
    category: "corporativo ads",
    tag: "Corporativo",
    vimeoId: "1207932432",
    thumb: "assets/thumbnails/1207932432.jpg",
    aspect: "16:9",
  },
  {
    title: "Estúdio de Pilates — Anúncio",
    meta: "Ads Meta · Studio de Pilates",
    category: "ads",
    tag: "Ads Meta",
    vimeoId: "1206133567",
    thumb: "assets/thumbnails/1206133567.jpg",
    aspect: "9:16",
  },
  {
    title: "Grupo Axis — Institucional",
    meta: "Corporativo · Grupo Axis",
    category: "corporativo",
    tag: "Corporativo",
    vimeoId: "1206133606",
    thumb: "assets/thumbnails/1206133606.jpg",
    aspect: "9:16",
  },
  {
    title: "Huiós Barbershop — Highlights",
    meta: "Ads Meta · Cortes sincronizados com música",
    category: "ads",
    tag: "Ads Meta",
    vimeoId: "1207932259",
    thumb: "assets/thumbnails/1207932259.jpg",
    aspect: "9:16",
  },
  {
    title: "Carro Pixar — Motion & VFX",
    meta: "Motion Design · Olhos animados no para-brisa",
    category: "motion",
    tag: "Motion",
    vimeoId: "1210391135",
    thumb: "assets/thumbnails/1210391135.jpg",
    aspect: "9:16",
  },
  {
    title: "Felipe Barreto — Gaming 01",
    meta: "Gaming · Felipe Barreto",
    category: "gaming",
    tag: "Gaming",
    vimeoId: "1206133658",
    thumb: "assets/thumbnails/1206133658.jpg",
    aspect: "9:16",
  },
  {
    title: "Grupo Axis — Anúncio 01",
    meta: "Ads Meta · Grupo Axis",
    category: "ads",
    tag: "Ads Meta",
    vimeoId: "1206133707",
    thumb: "assets/thumbnails/1206133707.jpg",
    aspect: "9:16",
  },
  {
    title: "Grupo Axis — Vídeo Corporativo",
    meta: "Corporativo · Grupo Axis",
    category: "corporativo",
    tag: "Corporativo",
    vimeoId: "1206133733",
    thumb: "assets/thumbnails/1206133733.jpg",
    aspect: "9:16",
  },
  {
    title: "Felipe Barreto — Gaming 02",
    meta: "Gaming · Felipe Barreto",
    category: "gaming",
    tag: "Gaming",
    vimeoId: "1206133772",
    thumb: "assets/thumbnails/1206133772.jpg",
    aspect: "9:16",
  },
  {
    title: "Grupo Axis — Anúncio 02",
    meta: "Ads Meta · Grupo Axis",
    category: "ads",
    tag: "Ads Meta",
    vimeoId: "1206133830",
    thumb: "assets/thumbnails/1206133830.jpg",
    aspect: "9:16",
  },
  {
    title: "Grupo Axis — Vídeo Corporativo 2",
    meta: "Corporativo · Grupo Axis",
    category: "corporativo",
    tag: "Corporativo",
    vimeoId: "1206133891",
    thumb: "assets/thumbnails/1206133891.jpg",
    aspect: "9:16",
  },
  {
    title: "Felipe Barreto — Gaming 03",
    meta: "Gaming · Felipe Barreto",
    category: "gaming",
    tag: "Gaming",
    vimeoId: "1206133930",
    thumb: "assets/thumbnails/1206133930.jpg",
    aspect: "9:16",
  },
];

const FILTER_LABELS = {
  todos: "Todos",
  ads: "Ads Meta",
  corporativo: "Corporativo",
  gaming: "Gaming",
  motion: "Motion",
};

const PLAY_ICON =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

/* ------------------------------------------------------------
   WHATSAPP
   ------------------------------------------------------------ */
function buildWhatsAppLink(context) {
  const msg = CONFIG.messages[context] || CONFIG.messages.default;
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

function initWhatsApp() {
  document.querySelectorAll(".js-whatsapp").forEach((el) => {
    el.setAttribute("href", buildWhatsAppLink(el.dataset.waContext || "default"));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
}

/* ------------------------------------------------------------
   PORTFOLIO — grid + filtros
   ------------------------------------------------------------ */
function renderPortfolio() {
  const grid = document.getElementById("workGrid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p, i) => {
    const wide = p.aspect === "16:9" ? " work-card--wide" : "";
    return `
      <article class="work-card glass glass--light reveal${wide}" data-category="${p.category}">
        <button class="work-card__media" type="button" data-index="${i}" aria-label="Assistir: ${p.title}">
          <img src="${p.thumb}" alt="${p.title}" loading="lazy" decoding="async" />
          <span class="work-card__tag">${p.tag}</span>
          <span class="work-card__play" aria-hidden="true">${PLAY_ICON}</span>
        </button>
        <div class="work-card__info">
          <h3 class="work-card__title">${p.title}</h3>
          <p class="work-card__meta">${p.meta}</p>
        </div>
      </article>`;
  }).join("");

  grid.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-index]");
    if (trigger) openModal(Number(trigger.dataset.index), trigger);
  });
}

function renderFilters() {
  const wrap = document.getElementById("workFilters");
  if (!wrap) return;

  const counts = { todos: PROJECTS.length };
  PROJECTS.forEach((p) => {
    p.category.split(" ").forEach((c) => {
      counts[c] = (counts[c] || 0) + 1;
    });
  });

  wrap.innerHTML = Object.keys(counts)
    .map(
      (key, i) => `
      <button class="filter${i === 0 ? " is-active" : ""}" type="button" data-filter="${key}">
        ${FILTER_LABELS[key] || key}<span class="filter__count">${counts[key]}</span>
      </button>`
    )
    .join("");

  wrap.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;

    wrap.querySelectorAll(".filter").forEach((f) => f.classList.remove("is-active"));
    btn.classList.add("is-active");

    const key = btn.dataset.filter;
    document.querySelectorAll(".work-card").forEach((card) => {
      const cats = card.dataset.category.split(" ");
      card.classList.toggle("is-hidden", key !== "todos" && !cats.includes(key));
    });
  });
}

/* ------------------------------------------------------------
   MODAL — vídeo só carrega ao abrir (performance)
   ------------------------------------------------------------ */
const modal = document.getElementById("videoModal");
const modalPlayer = document.getElementById("modalPlayer");
const modalTitle = document.getElementById("modalTitle");
let lastFocused = null;

function openModal(index, trigger) {
  const p = PROJECTS[index];
  if (!p || !modal) return;

  lastFocused = trigger || document.activeElement;
  modal.querySelector(".modal__box").classList.toggle("modal__box--vertical", p.aspect === "9:16");
  modalTitle.textContent = p.title;
  modalPlayer.innerHTML = `<iframe
    src="https://player.vimeo.com/video/${p.vimeoId}?autoplay=1&title=0&byline=0&portrait=0&badge=0&dnt=1"
    allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
    allowfullscreen
    title="${p.title}"></iframe>`;

  modal.hidden = false;
  document.body.classList.add("modal-open");
  modal.querySelector(".modal__close").focus();
}

function closeModal() {
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  modalPlayer.innerHTML = ""; // derruba o player e o áudio
  document.body.classList.remove("modal-open");
  if (lastFocused) lastFocused.focus();
}

function initModal() {
  if (!modal) return;
  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

/* ------------------------------------------------------------
   SCROLL REVEAL — com stagger sutil por grupo
   ------------------------------------------------------------ */
function initReveal() {
  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }

  // Delay progressivo entre irmãos do mesmo grupo (cards, stats, steps)
  items.forEach((el) => {
    const siblings = el.parentElement
      ? [...el.parentElement.children].filter((c) => c.classList.contains("reveal"))
      : [el];
    if (siblings.length > 1) {
      el.style.setProperty("--reveal-delay", `${(siblings.indexOf(el) % 6) * 80}ms`);
    }
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => io.observe(el));
}

/* ------------------------------------------------------------
   LUZ NO CURSOR — só em desktop com ponteiro fino
   ------------------------------------------------------------ */
function initCursorLight() {
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduced) return;

  document.querySelectorAll(".glass--light").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });
}

/* ------------------------------------------------------------
   NAV — sombra ao rolar
   ------------------------------------------------------------ */
function initNav() {
  const nav = document.getElementById("nav");
  if (!nav) return;
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ------------------------------------------------------------
   INIT
   ------------------------------------------------------------ */
document.getElementById("year").textContent = new Date().getFullYear();
renderPortfolio();
renderFilters();
initWhatsApp(); // depois do render: pega também os botões criados dinamicamente
initModal();
initReveal();
initCursorLight();
initNav();
