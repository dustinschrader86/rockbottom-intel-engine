from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root_endpoint():
    res = client.get("/")
    assert res.status_code == 200
    data = res.json()
    assert "status" in data
    assert data["status"] == "running"

def test_text_analysis_endpoint():
    payload = {"text": "Hello world"}
    res = client.post("/api/analyze-text", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert "summary" in data
    assert "sentiment" in data

def test_upload_endpoint():
    res = client.post(
        "/api/upload",
        files={"file": ("test.bin", b"12345", "application/octet-stream")}
    )
    assert res.status_code == 200
    data = res.json()
    assert "saved_to" in data

