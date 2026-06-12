import re

def clean_text(text: str) -> str:
    """
    Cleans raw OCR or user-provided text by removing noise,
    fixing spacing, and normalizing characters.
    """
    if not text:
        return ""

    # Remove non-printable characters
    text = re.sub(r"[^\x20-\x7E\n]", "", text)

    # Normalize multiple spaces/newlines
    text = re.sub(r"\s+", " ", text).strip()

    return text


def extract_numbers(text: str) -> list:
    """
    Extracts all numbers from text and returns them as a list of strings.
    """
    return re.findall(r"\d+", text)


def extract_keywords(text: str, keywords: list) -> list:
    """
    Returns a list of keywords found in the text (case-insensitive).
    """
    text_lower = text.lower()
    return [kw for kw in keywords if kw.lower() in text_lower]

