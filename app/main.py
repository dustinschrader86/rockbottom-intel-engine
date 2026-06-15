from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from analyze import router as analyze_router

app = FastAPI()

# CORS (allows your mobile app to call the API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(analyze_router, prefix="/analyze", tags=["analyze"])

@app.get("/")
def root():
    return {"message": "Rockbottom Insight API is running"}
