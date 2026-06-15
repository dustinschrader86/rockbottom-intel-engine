from fastapi import APIRouter
from api.analyze import analyze

router = APIRouter()

router.include_router(analyze, prefix="/analyze", tags=["analyze"])
