import pytesseract
from PIL import Image
from app.utils.text_cleaner import clean_text

class OCREngine:
    """
    Handles OCR extraction from images using Tesseract.
    """

    def __init__(self, lang: str = "eng"):
        self.lang = lang

    def extract_text(self, image: Image.Image) -> str:
        """
        Runs OCR on a PIL image and returns cleaned text.
        """
        raw = pytesseract.image_to_string(image, lang=self.lang)
        return clean_text(raw)

    def extract_data(self, image: Image.Image) -> dict:
        """
        Returns structured OCR data (text + confidence per block).
        """
        data = pytesseract.image_to_data(image, lang=self.lang, output_type=pytesseract.Output.DICT)

        cleaned_text = clean_text(" ".join(data.get("text", [])))

        return {
            "text": cleaned_text,
            "raw": data,
        }

