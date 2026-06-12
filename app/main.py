from fastapi import FastAPI
from app.api.router import router
from app.config import APP_NAME, APP_VERSION

app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
)

# Mount API routes
app.include_router(router, prefix="/api")

@app.get("/")
def root():
    return {
        "app": APP_NAME,
        "version": APP_VERSION,
        "status": "running"
    }
from fastapi import FastAPI
from app.api import analysis_router

app = FastAPI()

app.include_router(analysis_router, prefix="/api")

