from PIL import Image
import numpy as np

src_path = r'C:\Users\krish\.gemini\antigravity-ide\brain\30ad7fbe-918f-4f08-ba49-a16a2f31d1ac\.user_uploaded\media_1791796524996.png'
img = Image.open(src_path).convert('RGBA')

# Convert to numpy array
data = np.array(img)
r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]

# In the uploaded image: background is white (255,255,255), letters are black (0,0,0)
# Luminance:
gray = 0.299 * r + 0.587 * g + 0.114 * b

# Alpha should be inverted luminance: 255 - gray
# Where it's white (255), alpha is 0 (transparent). Where it's black (0), alpha is 255.
alpha_channel = (255 - gray).astype(np.uint8)

# 1. Black logo on transparent:
black_logo = np.zeros_like(data)
black_logo[:, :, 0] = 0   # R
black_logo[:, :, 1] = 0   # G
black_logo[:, :, 2] = 0   # B
black_logo[:, :, 3] = alpha_channel

black_img = Image.fromarray(black_logo, 'RGBA')

# Crop to non-transparent bounding box
bbox = black_img.getbbox()
if bbox:
    # Add a tiny 4px padding
    pad = 6
    w, h = black_img.size
    crop_box = (max(0, bbox[0] - pad), max(0, bbox[1] - pad), min(w, bbox[2] + pad), min(h, bbox[3] + pad))
    black_cropped = black_img.crop(crop_box)
else:
    black_cropped = black_img

black_cropped.save(r'public\images\logo.png', format='PNG')
print('Saved public/images/logo.png:', black_cropped.size)

# 2. White logo on transparent (for footer):
white_logo = np.zeros_like(data)
white_logo[:, :, 0] = 255  # R
white_logo[:, :, 1] = 255  # G
white_logo[:, :, 2] = 255  # B
white_logo[:, :, 3] = alpha_channel

white_img = Image.fromarray(white_logo, 'RGBA')
if bbox:
    white_cropped = white_img.crop(crop_box)
else:
    white_cropped = white_img

white_cropped.save(r'public\images\logo-white.png', format='PNG')
print('Saved public/images/logo-white.png:', white_cropped.size)
