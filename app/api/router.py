from fastapi import APIRouter, UploadFile, File
from app.ocr.ocr_engine import OCREngine
from app.intelligence.vision_analyzer import VisionAnalyzer
from app.intelligence.text_analyzer import TextAnalyzer
from app.storage.file_manager import FileManager
from app.utils.image_loader import load_and_convert

router = APIRouter()

ocr_engine = OCREngine()
vision = VisionAnalyzer()
text_ai = TextAnalyzer()
files = FileManager()

@router.post("/ocr")
async def ocr_endpoint(file: UploadFile = File(...)):
    image = load_and_convert(file.file)
    result = ocr_engine.extract_text(image)
    return {"text": result}

@router.post("/vision")
async def vision_endpoint(file: UploadFile = File(...)):
    image = load_and_convert(file.file)
    result = vision.analyze(image)
    return result

@router.post("/analyze-text")
async def text_endpoint(payload: dict):
    text = payload.get("text", "")
    result = text_ai.analyze(text)
    return result

@router.post("/upload")
async def upload_endpoint(file: UploadFile = File(...)):
    data = await file.read()
    path = files.save_bytes(data, extension=".bin")
    return {"saved_to": path}
from fastapi import APIRouter
from pydantic import BaseModel
from app.intelligence.text_analyzer import TextAnalyzer

router = APIRouter()
analyzer = TextAnalyzer()


class TextRequest(BaseModel):
    text: str


@router.post("/analyze-text")
def analyze_text(payload: TextRequest):
    return analyzer.analyze(payload.text)


@router.post("/summarize-text")
def summarize_text(payload: TextRequest):
    return {"summary": analyzer.summarize(payload.text)}

