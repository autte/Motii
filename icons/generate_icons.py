from PIL import Image, ImageDraw, ImageFont
import os

sizes = [72, 96, 128, 144, 152, 192, 512]

for size in sizes:
    img = Image.new('RGB', (size, size), '#1a1916')
    draw = ImageDraw.Draw(img)
    # Draw rounded rect feel with circle
    margin = size // 8
    draw.ellipse([margin, margin, size-margin, size-margin], fill='#2ea066')
    # Text
    font_size = size // 3
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
    except:
        font = ImageFont.load_default()
    text = "CP"
    bbox = draw.textbbox((0,0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text(((size-tw)//2, (size-th)//2 - size//12), text, fill='white', font=font)
    img.save(f'/home/claude/cp-growth-os/icons/icon-{size}.png')
    print(f"Created icon-{size}.png")
