# Regenera assets/og-image.jpg (1200x630) — a imagem que aparece quando o link
# do site é compartilhado no WhatsApp, DM, LinkedIn ou e-mail.
# Rode quando mudar as métricas, o slogan ou os frames em destaque.
#
# Uso (macOS):
#   python3 -m venv venv && ./venv/bin/pip install pillow
#   ./venv/bin/python tools/gerar-og-image.py

import os
from PIL import Image, ImageDraw, ImageFont, ImageOps

W, H = 1200, 630
ACCENT = (10, 132, 255)

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
DESTINO = os.path.join(RAIZ, "assets", "og-image.jpg")

TITULO = "burke.mov"
LINHA1 = "High-end video editing for"
LINHA2 = "creators, businesses & labels."
RODAPE = "5M+ views   ·   17 clients   ·   24h turnaround"

# Frames verticais em destaque (thumbnails do portfolio), da esquerda p/ direita
FRAMES = [
    "assets/thumbnails/1207932432.jpg",  # Treasure Coast Legal (claro, cliente EUA)
    "assets/thumbnails/1210391135.jpg",  # Pixar Car
    "assets/thumbnails/1216324396.jpg",  # Millionaire Saturdays
]


def find_font(style_wanted, size):
    """Acha um estilo da Helvetica Neue dentro do .ttc do macOS."""
    path = "/System/Library/Fonts/HelveticaNeue.ttc"
    for i in range(16):
        try:
            f = ImageFont.truetype(path, size, index=i)
        except Exception:
            break
        _, style = f.getname()
        if style.lower() == style_wanted.lower():
            return f
    return ImageFont.truetype(path, size, index=0)


def cantos_arredondados(img, raio):
    """Aplica cantos arredondados via canal alpha."""
    mask = Image.new("L", img.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, img.size[0] - 1, img.size[1] - 1],
                                           radius=raio, fill=255)
    out = img.convert("RGBA")
    out.putalpha(mask)
    return out


def cover(caminho, w, h):
    """Redimensiona cobrindo a área (recorte central), como object-fit: cover."""
    img = Image.open(os.path.join(RAIZ, caminho)).convert("RGB")
    return ImageOps.fit(img, (w, h), method=Image.LANCZOS, centering=(0.5, 0.45))


title_f = find_font("Bold", 92)
sub_f = find_font("Regular", 38)
small_f = find_font("Medium", 24)

img = Image.new("RGB", (W, H), (0, 0, 0))

# Brilho azul radial no topo
g = ImageOps.invert(Image.radial_gradient("L")).resize((1900, 1150))
g = g.point(lambda v: int((v / 255) ** 2.2 * 70))  # falloff suave
img.paste(Image.new("RGB", g.size, ACCENT), (600 - 950, -820), mask=g)

img = img.convert("RGBA")
ov = Image.new("RGBA", (W, H), (0, 0, 0, 0))
d = ImageDraw.Draw(ov)

# Moldura de vidro
d.rounded_rectangle([40, 40, 1160, 590], radius=36,
                    fill=(255, 255, 255, 10), outline=(255, 255, 255, 38), width=2)

# ---- Coluna esquerda: marca + proposta de valor ----
d.rounded_rectangle([92, 96, 156, 160], radius=17,
                    fill=(255, 255, 255, 20), outline=(255, 255, 255, 46), width=2)
d.polygon([(120, 114), (144, 128), (120, 142)], fill=ACCENT + (255,))

d.text((88, 236), TITULO, font=title_f, fill=(255, 255, 255, 255))
d.text((92, 364), LINHA1, font=sub_f, fill=(255, 255, 255, 190))
d.text((92, 412), LINHA2, font=sub_f, fill=(255, 255, 255, 190))
d.text((92, 502), RODAPE, font=small_f, fill=(255, 255, 255, 120))

img = Image.alpha_composite(img, ov)

# ---- Coluna direita: frames verticais 9:16 do portfolio ----
CARD_W, CARD_H, GAP = 148, 263, 16
total = len(FRAMES) * CARD_W + (len(FRAMES) - 1) * GAP
x0 = W - 78 - total          # alinhado à direita, dentro da moldura
y_base = (H - CARD_H) // 2
stagger = [18, -12, 18]      # leve arco, dá vida sem bagunçar

for i, caminho in enumerate(FRAMES):
    card = cantos_arredondados(cover(caminho, CARD_W, CARD_H), 18)
    x = x0 + i * (CARD_W + GAP)
    y = y_base + stagger[i]

    # sombra
    sombra = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(sombra).rounded_rectangle(
        [x + 4, y + 10, x + CARD_W + 4, y + CARD_H + 10], radius=18, fill=(0, 0, 0, 130))
    img = Image.alpha_composite(img, sombra)

    img.paste(card, (x, y), card)

    # borda de vidro por cima do frame
    borda = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(borda).rounded_rectangle(
        [x, y, x + CARD_W - 1, y + CARD_H - 1], radius=18,
        outline=(255, 255, 255, 60), width=2)
    img = Image.alpha_composite(img, borda)

img.convert("RGB").save(DESTINO, quality=88, progressive=True)

# Confere se o texto da esquerda não invade a área dos frames
limite = x0 - 24
for nome, fonte, txt in (("titulo", title_f, TITULO), ("linha1", sub_f, LINHA1),
                         ("linha2", sub_f, LINHA2), ("rodape", small_f, RODAPE)):
    largura = 92 + fonte.getbbox(txt)[2]
    print(f"  {nome}: termina em {largura}px (limite {limite}px)"
          f"{'  <-- ESTOUROU' if largura > limite else ''}")

print("ok:", os.path.abspath(DESTINO))
