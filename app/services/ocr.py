from PIL import Image
import pytesseract
import io

def extract_text_from_image(image_bytes: bytes) -> str:
    # Convert raw bytes → PIL Image
    image = Image.open(io.BytesIO(image_bytes))

    # Run OCR
    raw_text = pytesseract.image_to_string(image)

    # Clean text
    cleaned = raw_text.strip().replace("\n\n", "\n")

    return cleaned

