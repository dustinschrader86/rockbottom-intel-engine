from fastapi import APIRouter, UploadFile, File
from backend.utils.ocr import extract_text
from backend.utils.intelligence import analyze_screenshot

analyze = APIRouter()

@analyze.post("/")
async def analyze_image(file: UploadFile = File(...)):
    image_bytes = await file.read()

    extracted_text = extract_text(image_bytes)
    analysis = analyze_screenshot(extracted_text)

    return {
        "text": extracted_text,
        "analysis": analysis
    }
