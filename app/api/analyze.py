from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ScreenshotRequest(BaseModel):
    image: str

@router.post("/analyze-screenshot")
async def analyze_screenshot(payload: ScreenshotRequest):
    # TODO: send image to your intelligence engine
    return {
        "summary": "Screenshot analyzed",
        "tokens": [],
        "contracts": [],
        "warnings": [],
        "raw_text": ""
    }

from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.ocr import extract_text_from_image
from app.services.intelligence import analyze_text
from app.services.response_builder import build_response

router = APIRouter()

@router.post("/analyze")
async def analyze_screenshot(file: UploadFile = File(...)):
    try:
        # 1. Read image bytes
        image_bytes = await file.read()

        # 2. OCR → extract text from screenshot
        extracted_text = extract_text_from_image(image_bytes)

        # 3. AI Intelligence Engine → analyze extracted text
        intelligence = analyze_text(extracted_text)

        # 4. Build structured JSON response
        response = build_response(
            raw_text=extracted_text,
            intelligence=intelligence
        )

        return response

    except Exception as e:
        print("Analysis error:", e)
        raise HTTPException(status_code=500, detail="Failed to analyze screenshot")
