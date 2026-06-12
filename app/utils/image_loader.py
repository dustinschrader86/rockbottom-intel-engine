from PIL import Image
import os

def load_image(path: str) -> Image.Image:
    """
    Loads an image from disk and returns a PIL Image object.
    """
    if not os.path.exists(path):
        raise FileNotFoundError(f"Image not found: {path}")

    return Image.open(path)

def load_and_convert(path: str, mode: str = "RGB") -> Image.Image:
    """
    Loads an image and converts it to the specified mode (default: RGB).
    """
    img = load_image(path)
    return img.convert(mode)

def image_to_bytes(img: Image.Image) -> bytes:
    """
    Converts a PIL Image to raw bytes for model input.
    """
    from io import BytesIO
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    return buffer.getvalue()

