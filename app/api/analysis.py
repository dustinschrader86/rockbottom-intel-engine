from fastapi import APIRouter, UploadFile, File
from app.intelligence.text_analyzer import TextAnalyzer
from app.ocr.ocr_engine import OCREngine

router = APIRouter()

@router.post("/analyze")
async def analyze_screenshot(file: UploadFile = File(...)):
    # Read file bytes
    image_bytes = await file.read()

    # Run OCR
    text = OCREngine().extract_text(image_bytes)

    # Run intelligence engine
    result = TextAnalyzer().analyze(text)

    return {
        "raw_text": text,
        "analysis": result
    }
from fastapi import APIRouter, UploadFile, File
from app.ocr.ocr_engine import OCREngine
from app.intelligence.text_analyzer import TextAnalyzer

router = APIRouter()

@router.post("/analyze")
async def analyze_screenshot(file: UploadFile = File(...)):
    # Read uploaded file
    image_bytes = await file.read()

    # Run OCR
    text = OCREngine().extract_text(image_bytes)

    # Run intelligence engine
    analyzer = TextAnalyzer()
    result = analyzer.analyze(text)

    return {
        "raw_text": text,
        "analysis": result
    }

