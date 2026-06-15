from fastapi import APIRouter, UploadFile, File
from utils.ocr import extract_text
from utils.intelligence import analyze_screenshot

router = APIRouter()

@router.post("/")
async def analyze(file: UploadFile = File(...)):
    image_bytes = await file.read()

    extracted_text = extract_text(image_bytes)
    analysis = analyze_screenshot(extracted_text)

    return {
        "text": extracted_text,
        "analysis": analysis
    }
