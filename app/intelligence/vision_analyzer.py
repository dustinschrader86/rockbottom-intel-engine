from app.utils.image_loader import image_to_bytes
from app.config import VISION_MODEL
import base64

class VisionAnalyzer:
    """
    Uses an AI vision model to analyze images and return structured insights.
    """

    def __init__(self, model: str = VISION_MODEL):
        self.model = model

    def analyze(self, image) -> dict:
        """
        Sends an image to the vision model and returns structured results.
        """
        img_bytes = image_to_bytes(image)
        img_b64 = base64.b64encode(img_bytes).decode("utf-8")

        # Placeholder for actual model call
        # Replace with OpenAI / Anthropic / custom model later
        result = {
            "model": self.model,
            "description": "Vision model placeholder response.",
            "objects": [],
            "tags": [],
            "raw_image_base64": img_b64[:100] + "...",  # truncated for safety
        }

        return result

