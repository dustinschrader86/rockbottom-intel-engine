from fastapi import FastAPI
from app.api.router import router as api_router
from app.config import APP_NAME, APP_VERSION

app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
)

# Mount API routes
app.include_router(api_router, prefix="/api")

@app.get("/")
def root():
    return {
        "app": APP_NAME,
        "version": APP_VERSION,
        "status": "running"
    }
from fastapi.staticfiles import StaticFiles

app.mount("/static", StaticFiles(directory="app/static"), name="static")
from app.api.analyze import router as analyze_router
app.include_router(analyze_router)
from app.api.analyze import router as analyze_router
app.include_router(analyze_router)



