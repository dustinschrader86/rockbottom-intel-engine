# app/utils/ocr.py

import pytesseract
from PIL import Image
import io

def extract_text(image_bytes: bytes) -> str:
    """
    Convert raw image bytes → PIL Image → OCR text.
    """
    try:
        image = Image.open(io.BytesIO(image_bytes))
        text = pytesseract.image_to_string(image)
        return text.strip()
    except Exception as e:
        return f"OCR_ERROR: {str(e)}"
