from app.intelligence.vision_analyzer import VisionAnalyzer
from app.intelligence.text_analyzer import TextAnalyzer

def test_vision_analyzer_initializes():
    vision = VisionAnalyzer()
    assert vision is not None

def test_text_analyzer_initializes():
    analyzer = TextAnalyzer()
    assert analyzer is not None

def test_text_analyzer_output_structure():
    analyzer = TextAnalyzer()
    result = analyzer.analyze("Hello world")
    assert "summary" in result
    assert "sentiment" in result
    assert "keywords" in result

def test_text_summary():
    analyzer = TextAnalyzer()
    summary = analyzer.summarize("This is a long text that needs summarizing.")
    assert isinstance(summary, str)

