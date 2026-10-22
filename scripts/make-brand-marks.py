#!/usr/bin/env python3
"""Turunkan logo aruthtale dari master brand/Aruthtales_logo.jpg.

Master 1792x2400 (potret) berisi emblem ogee-arch + 4 bintang emas di atas
latar navy. Emblem penuh (puncak, kaki bawah, bintang atas/bawah/kiri/kanan)
terukur occupy x 225-1588, y 165-2147 -> 1363x1982, reaffirmed stabil di
threshold luminance 22%-70%.

Emblem bersifat potret, jadi tidak mungkin mengisi kanvas bujur sangkar
utuh (butuh >=1982 px lebar, master hanya 1792). Solusinya: emblem diskalakan
dan diletakkan di atas lempeng navy bundar:

  * lambang halaman (navbar/footer/cross-link) -> lingkaran navy + emblem,
    transparan di luar lingkaran. Satu berkas untuk tema gelap & terang.
  * ikon aplikasi (icon.png/apple-icon.png) -> persegi navy penuh, karena
    iOS/Android memotong ikon themselves jadi squircle.

Latar navy dihilangkan dari Potong emblem lewat alpha berbasis luminance
(navy gelap -> transparan, emas/ivory -> opaque), lalu artwork di-komposit
di atas lempeng navy datar sehingga tidak ada sambungan seam.
"""

import pathlib
import statistics

from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
MASTER = ROOT / "brand" / "Aruthtales_logo.jpg"
SCRATCH = pathlib.Path("/home/aruthtale/.hermes/cache/scratch")

# bbox emblem terukur dari master (left, top, right, bottom)
BOX = (225, 165, 1588, 2147)

CANVAS = 1400          # sisi kanvas kerja
PLATE_RATIO = 0.86     # tinggi emblem terhadap sisi kanvas
MARGIN = 0.025          # ruang transparan agar rim anti-alias tak terpotong
LO, HI = 0.12, 0.30    # ambang alpha luminance (0..1)

NAVY = (0x16, 0x1A, 0x38)  # navy brand, diambil dari latar master
GOLD = (0xD4, 0xAF, 0x6A)  # champagne gold, warna arch/bintang di master
RING = 0.030               # tebal cincin emas (>=1px saat di-render 38px)


def emblem_art() -> Image.Image:
    """Potong emblem + buat alpha (navy jadi transparan)."""
    src = Image.open(MASTER).convert("RGB").crop(BOX)
    luma = src.convert("L")
    lo, hi = LO * 255, HI * 255
    alpha = luma.point(
        lambda v: 0 if v <= lo else (255 if v >= hi else int((v - lo) / (hi - lo) * 255))
    )
    out = src.convert("RGBA")
    out.putalpha(alpha)
    return out


def on_plate(art: Image.Image, circle: bool) -> Image.Image:
    """Komposit artwork di atas lempeng navy + cincin emas.

    Cincin emas bukan hiasan: tanpa itu, lempeng navy di atas halaman gelap
    nyaris tak terlihat. Cincin emas membuat lambang terbaca di latar gelap
    maupun terang.
    """
    inset = int(CANVAS * MARGIN)
    r = int(CANVAS * RING)
    plate = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
    draw = ImageDraw.Draw(plate)
    if circle:
        draw.ellipse((inset, inset, CANVAS - inset - 1, CANVAS - inset - 1), fill=GOLD + (255,))
        draw.ellipse((inset + r, inset + r, CANVAS - inset - r - 1, CANVAS - inset - r - 1),
                     fill=NAVY + (255,))
    else:
        draw.rectangle((0, 0, CANVAS - 1, CANVAS - 1), fill=NAVY + (255,))
        draw.ellipse((inset, inset, CANVAS - inset - 1, CANVAS - inset - 1),
                     outline=GOLD + (255,), width=r)

    h = int(CANVAS * PLATE_RATIO)
    w = int(art.width * (h / art.height))
    art = art.resize((w, h), Image.Resampling.LANCZOS)
    plate.alpha_composite(art, ((CANVAS - w) // 2, (CANVAS - h) // 2))
    return plate


OG_W, OG_H = 1200, 630          # ukuran kartu Open Graph standar
OG_FONT = "/usr/share/fonts/google-noto-vf/NotoSans[wght].ttf"
IVORY = (0xF5, 0xF1, 0xE8)
MUTED = (0x9A, 0xA3, 0xC0)
TARGET = (0x1C, 0x22, 0x48)      # ujung gradien latar kartu OG


def og_card(title: str, lines: list[str], accent: tuple[int, int, int], dest: pathlib.Path) -> None:
    """Kartu Open Graph 1200x630: lambang + nama brand + dua baris meta."""
    base = Image.new("RGB", (OG_W, OG_H), NAVY)
    # gradien navy lembut supaya latar tidak datar
    grad = ImageDraw.Draw(base)
    for y in range(OG_H):
        t = y / OG_H
        row = tuple(int(NAVY[i] + (TARGET[i] - NAVY[i]) * t) for i in range(3))
        grad.line([(0, y), (OG_W, y)], fill=row)

    # pendar lembut di belakang lambang
    glow = Image.new("L", (OG_W, OG_H), 0)
    ImageDraw.Draw(glow).ellipse((-260, -260, 620, OG_H + 260), fill=70)
    base = Image.composite(
        Image.new("RGB", (OG_W, OG_H), (0x3A, 0x44, 0x78)),
        base,
        glow.point(lambda v: int(v * 0.55)),
    )

    # lambang brand (alpha dari master, latar navy jadi transparan)
    art = emblem_art()
    eh = 330
    art = art.resize((int(art.width * (eh / art.height)), eh), Image.Resampling.LANCZOS)
    card = Image.new("RGBA", (OG_W, OG_H), (0, 0, 0, 0))
    card.alpha_composite(art, (96, (OG_H - eh) // 2))
    base = Image.alpha_composite(base.convert("RGBA"), card).convert("RGB")

    draw = ImageDraw.Draw(base)
    x = 500
    try:
        big = ImageFont.truetype(OG_FONT, 78)
        big.set_variation_by_axes([700])
        small = ImageFont.truetype(OG_FONT, 31)
        small.set_variation_by_axes([400])
    except Exception:
        big = small = ImageFont.load_default()
    draw.text((x, OG_H // 2 - 92), title, font=big, fill=IVORY)
    for i, line in enumerate(lines):
        draw.text((x, OG_H // 2 + 8 + i * 44), line, font=small, fill=accent if i == 0 else MUTED)

    base.save(dest, "WEBP", quality=88, method=6)
    print(f"og card     : {dest} ({dest.stat().st_size} B)")


def main() -> int:
    if not MASTER.exists():
        print(f"master tidak ditemukan: {MASTER}")
        return 1

    art = emblem_art()
    print(f"emblem crop : {art.width}x{art.height}  box={BOX}")

    circle = on_plate(art, circle=True)
    square = on_plate(art, circle=False)

    out512 = SCRATCH / "aruthtale-mark-512.png"
    circle.resize((512, 512), Image.Resampling.LANCZOS).save(out512)
    print(f"512 png     : {out512} ({out512.stat().st_size} B)")

    webp = SCRATCH / "aruthtale-mark-256.webp"
    circle.resize((256, 256), Image.Resampling.LANCZOS).save(webp, "WEBP", quality=90, method=6)
    print(f"256 webp    : {webp} ({webp.stat().st_size} B)")

    for size, name in ((512, "icon.png"), (180, "apple-icon.png")):
        dest = SCRATCH / name
        square.resize((size, size), Image.Resampling.LANCZOS).save(dest)
        print(f"{name:14}: {dest} ({dest.stat().st_size} B)")

    ico = SCRATCH / "favicon.ico"
    circle.resize((256, 256), Image.Resampling.LANCZOS).save(ico, sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"favicon     : {ico} ({ico.stat().st_size} B)")

    og_card("aruthtale", ["Studio Web & Fullstack Developer", "Cianjur, Indonesia"],
            (0x63, 0x66, 0xF1), ROOT / "apps/showcase/public/og-image.webp")
    og_card("Rchibnu", ["Ibnu Hambal Al Bantani Rch", "Fullstack Developer · Cianjur"],
            (0xE3, 0xA5, 0x7C), ROOT / "apps/profile/public/og-image.webp")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
