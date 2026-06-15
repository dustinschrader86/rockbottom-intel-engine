from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"status": "ok"}

@app.post("/analyze")
async def analyze_text(data: dict):
    text = data.get("text", "")
    return {"length": len(text), "preview": text[:50]}
