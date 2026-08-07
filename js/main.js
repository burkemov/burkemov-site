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

  // Discord. O ID numérico é o que permite abrir a conversa direto:
  // Discord > Configurações > Avançado > Modo desenvolvedor > botão
  // direito no seu perfil > "Copiar ID do usuário". Enquanto estiver
  // vazio, o ícone copia o nome de usuário abaixo.
  discordUserId: "497121311626231812",
  discordUsername: "burke_mov",

  // Mensagem pré-preenchida por contexto (reduz fricção do lead)
  messages: {
    default: "Hi! I saw your website and I'd like to talk about a video project.",
    hero: "Hi! I saw your portfolio and I'd like to talk about a project.",
    outro: "Hi! I liked your work and I'd like to talk about a project.",
  },
};

/* ------------------------------------------------------------
   PORTFOLIO — vídeos reais (Vimeo).
   - tag: rótulo curto exibido sobre a miniatura (ex.: "Corporate").
   - category: mantido como metadado; não há mais filtros na página.
   - aspect: "9:16" (vertical, padrão do grid) ou "16:9"
     (horizontal — vira o banner de destaque de largura total)
   - vídeo: use vimeoId (player do Vimeo) OU mp4 (caminho de um
     arquivo em assets/videos/ — hospedado no próprio site,
     player nativo, sem depender de serviço externo)
   - thumb: imagem local em assets/thumbnails/
   ------------------------------------------------------------ */
const PROJECTS = [
  {
    title: "Treasure Coast Legal Brand Film",
    meta: "Corporate · Law firm in Florida, USA",
    category: "corporate",
    tag: "Corporate",
    vimeoId: "1207932432",
    thumb: "assets/thumbnails/1207932432.jpg",
    aspect: "16:9",
  },
  {
    title: "Outdoor Interview",
    meta: "Short Form · Captioned talking head",
    category: "shortform",
    tag: "Short Form",
    vimeoId: "1216324428",
    thumb: "assets/thumbnails/1216324428.jpg",
    aspect: "9:16",
  },
  {
    title: "Interview Cut",
    meta: "Short Form · Interview edit",
    category: "shortform",
    tag: "Short Form",
    vimeoId: "1216324427",
    thumb: "assets/thumbnails/1216324427.jpg",
    aspect: "9:16",
  },
  {
    title: "Millionaire Saturdays",
    meta: "Short Form · Hook driven edit",
    category: "shortform",
    tag: "Short Form",
    vimeoId: "1216324396",
    thumb: "assets/thumbnails/1216324396.jpg",
    aspect: "9:16",
  },
  {
    title: "Pixar Car Motion & VFX",
    meta: "Motion Design · Animated eyes on the windshield",
    category: "motion",
    tag: "Motion",
    vimeoId: "1210391135",
    thumb: "assets/thumbnails/1210391135.jpg",
    aspect: "9:16",
  },
  {
    title: "Huiós Barbershop Highlights",
    meta: "Corporate · Music-synced cuts",
    category: "corporate",
    tag: "Corporate",
    vimeoId: "1207932259",
    thumb: "assets/thumbnails/1207932259.jpg",
    aspect: "9:16",
  },
  {
    title: "Grupo Axis Corporate Video",
    meta: "Corporate · Grupo Axis",
    category: "corporate",
    tag: "Corporate",
    vimeoId: "1206133891",
    thumb: "assets/thumbnails/1206133891.jpg",
    aspect: "9:16",
  },
  {
    title: "Grupo Axis Brand Film",
    meta: "Corporate · Grupo Axis",
    category: "corporate",
    tag: "Corporate",
    vimeoId: "1206133606",
    thumb: "assets/thumbnails/1206133606.jpg",
    aspect: "9:16",
  },
];

// Triângulo centrado no viewBox (bbox 7→18) com o leve empurrão à
// direita que todo botão de play precisa para parecer centralizado.
const PLAY_ICON =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5v14l11-7z"/></svg>';

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
      <article class="work-card reveal${wide}">
        <button class="work-card__media" type="button" data-index="${i}" aria-label="Watch: ${p.title}">
          <img src="${p.thumb}" alt="${p.title}" loading="lazy" decoding="async" />
          <span class="work-card__play" aria-hidden="true">${PLAY_ICON}</span>
          <span class="work-card__info">
            <span class="work-card__cat">${p.tag}</span>
            <span class="work-card__title">${p.title}</span>
          </span>
        </button>
      </article>`;
  }).join("");

  grid.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-index]");
    if (trigger) openModal(Number(trigger.dataset.index), trigger);
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
  modalPlayer.innerHTML = p.mp4
    ? `<video src="${p.mp4}" controls autoplay playsinline></video>`
    : `<iframe
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
   DISCORD
   Com discordUserId preenchido, o clique abre o seu perfil no
   Discord (com o botão "Message"). Sem o ID, o clique copia o
   usuário e avisa — o Discord não tem link de conversa por
   nome de usuário, só por ID numérico.
   ------------------------------------------------------------ */
function toast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.hidden = false;
  requestAnimationFrame(() => el.classList.add("is-in"));
  clearTimeout(toast._t);
  toast._t = setTimeout(() => {
    el.classList.remove("is-in");
    setTimeout(() => (el.hidden = true), 400);
  }, 2600);
}

function initDiscord() {
  document.querySelectorAll(".js-discord").forEach((el) => {
    if (CONFIG.discordUserId) {
      el.setAttribute("href", `https://discord.com/users/${CONFIG.discordUserId}`);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
      return;
    }

    el.setAttribute("href", `https://discord.com/users/${CONFIG.discordUsername}`);
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const user = CONFIG.discordUsername;
      navigator.clipboard?.writeText(user).then(
        () => toast(`Discord username copied: ${user}`),
        () => toast(`Discord: ${user}`)
      );
    });
  });
}

/* ------------------------------------------------------------
   INIT
   ------------------------------------------------------------ */
document.getElementById("year").textContent = new Date().getFullYear();
renderPortfolio();
initWhatsApp(); // depois do render: pega também os botões criados dinamicamente
initDiscord();
initModal();
initReveal();
initCursorLight();
