/* ============================================================
   burke.mov — main.js
   ============================================================ */

/* ------------------------------------------------------------
   CONFIG — [SUBSTITUIR] Única fonte da verdade.
   Troque o número e as mensagens aqui e todos os botões
   de WhatsApp do site são atualizados automaticamente.
   ------------------------------------------------------------ */
const CONFIG = {
  // Formato internacional, só dígitos: 55 (Brasil) + DDD + número
  whatsappNumber: "5543991358713",

  // Mensagem pré-preenchida por contexto (reduz fricção do lead)
  messages: {
    default: "Olá! Vi seu site e quero conversar sobre um projeto de vídeo.",
    nav: "Olá! Vim pelo seu site e quero saber mais sobre seu trabalho.",
    hero: "Olá! Vi seu portfolio e quero conversar sobre um projeto.",
    portfolio: "Olá! Gostei dos trabalhos e queria ver um exemplo do meu nicho.",
    processo: "Olá! Quero começar um projeto de vídeo. Como funciona?",
    final: "Olá! Quero tirar um orçamento para um projeto de vídeo.",
    footer: "Olá! Vim pelo seu site e quero conversar.",
    float: "Olá! Vi seu site e quero conversar sobre um projeto.",
    modal: "Olá! Vi um trabalho no seu site e quero um vídeo parecido.",
  },
};

/* Monta o link wa.me a partir do contexto */
function buildWhatsAppLink(context) {
  const msg = CONFIG.messages[context] || CONFIG.messages.default;
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

/* Aplica os links em todos os elementos .js-whatsapp */
function initWhatsApp() {
  document.querySelectorAll(".js-whatsapp").forEach((el) => {
    const ctx = el.dataset.waContext || "default";
    el.setAttribute("href", buildWhatsAppLink(ctx));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
}

/* ------------------------------------------------------------
   PORTFOLIO — vídeos reais (Vimeo).
   - category: gaming | ads | corporativo
   - videoType: "youtube" | "vimeo" | "mp4" | null
   - videoId: id do Vimeo (só o número), YT, caminho do .mp4, ou null
   - thumb: imagem do card, servida localmente de assets/thumbnails/
            (capas do Vimeo baixadas). Se a imagem faltar, cai no gradiente.
   - Títulos/descrições podem ser ajustados livremente.
   ------------------------------------------------------------ */
const PROJECTS = [
  // ---- ADS ----
  {
    title: "Estúdio de Pilates — Anúncio",
    meta: "Ads Meta · Studio de Pilates",
    category: "ads",
    tag: "Ads Meta",
    videoType: "vimeo",
    videoId: "1206133567",
    thumb: "assets/thumbnails/1206133567.jpg",
    desc: "Criativo pensado para captação de alunos: hook rápido e chamada clara para ação.",
  },
  {
    title: "Grupo Axis — Anúncio 01",
    meta: "Ads Meta · Grupo Axis",
    category: "ads",
    tag: "Ads Meta",
    videoType: "vimeo",
    videoId: "1206133707",
    thumb: "assets/thumbnails/1206133707.jpg",
    desc: "Vídeo de anúncio focado em conversão para campanha de tráfego pago.",
  },
  {
    title: "Grupo Axis — Anúncio 02",
    meta: "Ads Meta · Grupo Axis",
    category: "ads",
    tag: "Ads Meta",
    videoType: "vimeo",
    videoId: "1206133830",
    thumb: "assets/thumbnails/1206133830.jpg",
    desc: "Variação de criativo para teste A/B em campanha paga.",
  },
  // ---- CORPORATIVO ----
  {
    title: "Grupo Axis — Institucional",
    meta: "Corporativo · Grupo Axis",
    category: "corporativo",
    tag: "Corporativo",
    videoType: "vimeo",
    videoId: "1206133606",
    thumb: "assets/thumbnails/1206133606.jpg",
    desc: "Vídeo institucional que posiciona a marca com credibilidade.",
  },
  {
    title: "Grupo Axis — Vídeo Corporativo",
    meta: "Corporativo · Grupo Axis",
    category: "corporativo",
    tag: "Corporativo",
    videoType: "vimeo",
    videoId: "1206133733",
    thumb: "assets/thumbnails/1206133733.jpg",
    desc: "Comunicação corporativa com ritmo e acabamento profissional.",
  },
  {
    title: "Grupo Axis — Apresentação",
    meta: "Corporativo · Grupo Axis",
    category: "corporativo",
    tag: "Corporativo",
    videoType: "vimeo",
    videoId: "1206133891",
    thumb: "assets/thumbnails/1206133891.jpg",
    desc: "Peça de apresentação que valoriza a empresa e o seu trabalho.",
  },
  // ---- GAMING ----
  {
    title: "Felipe Barreto — Gaming 01",
    meta: "Gaming · Felipe Barreto",
    category: "gaming",
    tag: "Gaming",
    videoType: "vimeo",
    videoId: "1206133658",
    thumb: "assets/thumbnails/1206133658.jpg",
    desc: "Edição dinâmica com motion e efeitos para prender o público.",
  },
  {
    title: "Felipe Barreto — Gaming 02",
    meta: "Gaming · Felipe Barreto",
    category: "gaming",
    tag: "Gaming",
    videoType: "vimeo",
    videoId: "1206133772",
    thumb: "assets/thumbnails/1206133772.jpg",
    desc: "Cortes com ritmo e energia pensados para retenção e alcance.",
  },
  {
    title: "Felipe Barreto — Gaming 03",
    meta: "Gaming · Felipe Barreto",
    category: "gaming",
    tag: "Gaming",
    videoType: "vimeo",
    videoId: "1206133930",
    thumb: "assets/thumbnails/1206133930.jpg",
    desc: "Highlights editados para destacar os melhores momentos.",
  },
];

const PLAY_ICON =
  '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

function renderPortfolio() {
  const grid = document.getElementById("portfolioGrid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p, i) => {
    const thumb = p.thumb
      ? `<img class="card__thumb" src="${p.thumb}" alt="${p.title}" loading="lazy" />`
      : `<div class="card__thumb" role="img" aria-label="${p.title}"></div>`;
    return `
      <article class="card" data-category="${p.category}" data-index="${i}" tabindex="0" role="button" aria-label="Abrir ${p.title}">
        ${thumb}
        <div class="card__play">${PLAY_ICON}</div>
        <div class="card__overlay">
          <span class="card__tag">${p.tag}</span>
          <h3 class="card__title">${p.title}</h3>
          <p class="card__meta">${p.meta}</p>
        </div>
      </article>`;
  }).join("");

  // Abrir modal por clique ou teclado
  grid.querySelectorAll(".card").forEach((card) => {
    const open = () => openModal(PROJECTS[+card.dataset.index]);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });
}

/* ------------------------------------------------------------
   FILTROS
   ------------------------------------------------------------ */
function initFilters() {
  const filters = document.querySelectorAll(".filter");
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((f) => {
        f.classList.remove("is-active");
        f.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");

      const cat = btn.dataset.filter;
      document.querySelectorAll(".card").forEach((card) => {
        const show = cat === "all" || card.dataset.category === cat;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });
}

/* ------------------------------------------------------------
   MODAL / LIGHTBOX
   ------------------------------------------------------------ */
const modal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");

function videoEmbed(project) {
  const { videoType, videoId } = project;
  if (videoType === "youtube" && videoId) {
    return `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>`;
  }
  if (videoType === "vimeo" && videoId) {
    return `<iframe src="https://player.vimeo.com/video/${videoId}?autoplay=1" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
  }
  if (videoType === "mp4" && videoId) {
    return `<video src="${videoId}" controls autoplay playsinline></video>`;
  }
  // Sem vídeo real ainda → placeholder
  return `<div class="modal__video-placeholder">[SUBSTITUIR: adicionar vídeo real deste projeto em PROJECTS (videoType + videoId).]</div>`;
}

function openModal(project) {
  if (!project) return;
  modalVideo.innerHTML = videoEmbed(project);
  modalTitle.textContent = project.title;
  modalDesc.textContent = project.desc || "";
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.hidden = true;
  modalVideo.innerHTML = ""; // para o vídeo
  document.body.style.overflow = "";
}

function initModal() {
  modal.querySelectorAll("[data-close]").forEach((el) =>
    el.addEventListener("click", closeModal)
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });
}

/* ------------------------------------------------------------
   NAV — scroll state + menu mobile
   ------------------------------------------------------------ */
function initNav() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");

  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });

  // Fecha o menu ao clicar num link
  nav.querySelectorAll(".nav__link").forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

/* ------------------------------------------------------------
   REVEAL on scroll
   ------------------------------------------------------------ */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  els.forEach((el) => io.observe(el));
}

/* ------------------------------------------------------------
   MÉTRICAS — contador animado
   ------------------------------------------------------------ */
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const dur = 1400;
  const start = performance.now();

  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
    const val = Math.round(eased * target);
    el.textContent = val + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function initCounters() {
  const els = document.querySelectorAll(".metric__value");
  if (!("IntersectionObserver" in window)) {
    els.forEach(animateCount);
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  els.forEach((el) => io.observe(el));
}

/* ------------------------------------------------------------
   LUZ seguindo cursor (cards interativos) — desktop apenas
   ------------------------------------------------------------ */
function initCursorLight() {
  if (window.matchMedia("(hover: none)").matches) return;
  document.querySelectorAll(".glass--interactive").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });
}

/* ------------------------------------------------------------
   PARALLAX leve nos glows do hero
   ------------------------------------------------------------ */
function initParallax() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const glows = document.querySelectorAll(".bg-glow");
  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        glows.forEach((g, i) => {
          g.style.transform = `translateY(${y * (0.04 + i * 0.02)}px)`;
        });
        ticking = false;
      });
    },
    { passive: true }
  );
}

/* ------------------------------------------------------------
   INIT
   ------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initWhatsApp();
  renderPortfolio();
  initFilters();
  initModal();
  initNav();
  initReveal();
  initCounters();
  initCursorLight();
  initParallax();
});
