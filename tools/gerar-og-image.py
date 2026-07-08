# Regenera assets/og-image.jpg (1200x630) — preview ao compartilhar em WhatsApp/DM.
# Rode quando mudar as métricas ou o slogan.
#
# Uso (macOS):
#   python3 -m venv venv && ./venv/bin/pip install pillow
#   ./venv/bin/python tools/gerar-og-image.py

import os
from PIL import Image, ImageDraw, ImageFont, ImageOps

W, H = 1200, 630
ACCENT = (10, 132, 255)
DESTINO = os.path.join(os.path.dirname(__file__), "..", "assets", "og-image.jpg")

TITULO = "burke.mov"
LINHA1 = "Vídeos que transformam"
LINHA2 = "atenção em clientes."
RODAPE = "+5M de views geradas   ·   17 clientes   ·   entrega média em 24h   ·   @burke_mov"


def find_font(style_wanted, size):
    """Acha um estilo da Helvetica Neue dentro do .ttc do macOS."""
    path = "/System/Library/Fonts/HelveticaNeue.ttc"
    for i in range(16):
        try:
            f = ImageFont.truetype(path, size, index=i)
        except Exception:
            break
        fam, style = f.getname()
        if style.lower() == style_wanted.lower():
            return f
    return ImageFont.truetype(path, size, index=0)


title_f = find_font("Bold", 100)
sub_f = find_font("Regular", 42)
small_f = find_font("Medium", 25)

img = Image.new("RGB", (W, H), (0, 0, 0))

# Brilho azul radial no topo
g = ImageOps.invert(Image.radial_gradient("L")).resize((1900, 1150))
g = g.point(lambda v: int((v / 255) ** 2.2 * 70))  # falloff suave, pico ~27% alpha
glow = Image.new("RGB", g.size, ACCENT)
img.paste(glow, (600 - 950, -820), mask=g)

img = img.convert("RGBA")
ov = Image.new("RGBA", (W, H), (0, 0, 0, 0))
d = ImageDraw.Draw(ov)

# Moldura de vidro
d.rounded_rectangle([40, 40, 1160, 590], radius=36,
                    fill=(255, 255, 255, 10), outline=(255, 255, 255, 38), width=2)

# Badge de play
d.rounded_rectangle([92, 92, 164, 164], radius=18,
                    fill=(255, 255, 255, 20), outline=(255, 255, 255, 46), width=2)
d.polygon([(122, 111), (148, 128), (122, 145)], fill=ACCENT + (255,))

# Textos
d.text((88, 236), TITULO, font=title_f, fill=(255, 255, 255, 255))
d.text((92, 372), LINHA1, font=sub_f, fill=(255, 255, 255, 185))
d.text((92, 426), LINHA2, font=sub_f, fill=(255, 255, 255, 185))
d.text((92, 512), RODAPE, font=small_f, fill=(255, 255, 255, 115))

img = Image.alpha_composite(img, ov).convert("RGB")
img.save(DESTINO, quality=88, progressive=True)
print("ok:", os.path.abspath(DESTINO), img.size)
