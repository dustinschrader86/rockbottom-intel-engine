import os
from dotenv import load_dotenv

# Load environment variables from .env if present
load_dotenv()

# === Application Settings ===
APP_NAME = "Rock Bottom Intelligence Agent"
APP_VERSION = "0.1.0"

# === Storage Settings ===
DATA_DIR = os.path.join(os.getcwd(), "data")
os.makedirs(DATA_DIR, exist_ok=True)

# === OCR Settings ===
OCR_ENGINE = "tesseract"  # placeholder for future expansion

# === AI Model Settings ===
VISION_MODEL = "gpt-4o-mini"
TEXT_MODEL = "gpt-4o-mini"

# === Debug Mode ===
DEBUG = True

