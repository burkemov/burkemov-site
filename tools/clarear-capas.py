# Clareia as capas subexpostas de assets/thumbnails/.
#
# O Vimeo escolhe o frame de capa sozinho e às vezes cai num momento
# escuro do vídeo. Com o véu escuro que o card aplica por cima, o card
# fica parecendo vazio. Este script levanta as sombras por gama (que
# preserva os brancos, ao contrário de brilho linear) até a capa chegar
# num nível legível.
#
# Uso (macOS):
#   python3 -m venv venv && ./venv/bin/pip install pillow
#   ./venv/bin/python tools/clarear-capas.py            # aplica
#   ./venv/bin/python tools/clarear-capas.py --listar   # só mostra
#
# Atenção: reescreve os arquivos no lugar. Rodar duas vezes na mesma
# capa clareia de novo; se errar, baixe a capa outra vez do Vimeo.

import os
import sys
from PIL import Image, ImageStat

PASTA = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "thumbnails")
ALVO = 78.0        # brilho médio desejado
LIMITE = 62.0      # abaixo disso, a capa é considerada escura demais
GAMA_MAX = 2.5     # acima disso a compressão vira banda e ruído


def brilho(img):
    return ImageStat.Stat(img.convert("L")).mean[0]


def aplicar_gama(img, g):
    tabela = [min(255, int(round(255.0 * (i / 255.0) ** (1.0 / g)))) for i in range(256)]
    return img.point(tabela * len(img.getbands()))


def gama_para_alvo(img, alvo):
    """Busca binária pela gama que leva o brilho médio ao alvo."""
    baixo, alto = 1.0, GAMA_MAX
    for _ in range(18):
        meio = (baixo + alto) / 2
        if brilho(aplicar_gama(img, meio)) < alvo:
            baixo = meio
        else:
            alto = meio
    return (baixo + alto) / 2


def main():
    listar = "--listar" in sys.argv
    for nome in sorted(os.listdir(PASTA)):
        if not nome.lower().endswith(".jpg") or nome.startswith("._"):
            continue
        caminho = os.path.join(PASTA, nome)
        img = Image.open(caminho).convert("RGB")
        antes = brilho(img)
        if antes >= LIMITE:
            print(f"  {nome:<22} {antes:6.1f}  ok")
            continue
        g = gama_para_alvo(img, ALVO)
        depois_img = aplicar_gama(img, g)
        depois = brilho(depois_img)
        print(f"  {nome:<22} {antes:6.1f} -> {depois:5.1f}  (gama {g:.2f})"
              f"{'  [simulação]' if listar else ''}")
        if not listar:
            depois_img.save(caminho, quality=88, progressive=True)


if __name__ == "__main__":
    main()
