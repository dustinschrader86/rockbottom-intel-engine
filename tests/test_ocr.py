from app.ocr.ocr_engine import OCREngine
from PIL import Image

def test_ocr_engine_initializes():
    engine = OCREngine()
    assert engine is not None

def test_ocr_extract_text_blank_image():
    engine = OCREngine()
    img = Image.new("RGB", (200, 200), color="white")
    text = engine.extract_text(img)
    assert isinstance(text, str)

