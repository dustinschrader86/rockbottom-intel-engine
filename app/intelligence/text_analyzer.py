from app.config import TEXT_MODEL
from app.utils.text_cleaner import clean_text

class TextAnalyzer:
    """
    Uses an AI text model to analyze text and return structured insights.
    """

    def __init__(self, model: str = TEXT_MODEL):
        self.model = model

    def analyze(self, text: str) -> dict:
        """
        Analyzes text using an AI model and returns structured results.
        """
        cleaned = clean_text(text)

        # Placeholder for actual LLM call
        # Replace with OpenAI / Anthropic / custom model later
        result = {
            "model": self.model,
            "input_text": cleaned,
            "summary": "Placeholder summary from text model.",
            "keywords": [],
            "sentiment": "neutral",
        }

        return result

    def summarize(self, text: str) -> str:
       

