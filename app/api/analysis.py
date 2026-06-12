from fastapi import APIRouter, UploadFile, File
from PIL import Image
import io

from app.ocr.ocr_engine import OCREngine
from app.intelligence.text_analyzer import TextAnalyzer

router = APIRouter()

@router.post("/analyze")
async def analyze_screenshot(file: UploadFile = File(...)):
    # Read uploaded file
    image_bytes = await file.read()

    # Convert bytes → PIL Image
    image = Image.open(io.BytesIO(image_bytes))

    # Run OCR
    ocr = OCREngine()
    extracted_text = ocr.extract_text(image)

    # Run intelligence engine
    analyzer = TextAnalyzer()
    analysis = analyzer.analyze(extracted_text)

    return {
        "raw_text": extracted_text,
        "analysis": analysis
    }


