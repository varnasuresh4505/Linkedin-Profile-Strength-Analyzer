import fitz  # PyMuPDF
import spacy
from tips import get_section_tips

nlp = spacy.load("en_core_web_sm")

SECTION_KEYWORDS = {
    "About": ["about", "summary"],
    "Experience": ["experience", "work"],
    "Skills": ["skills", "technologies"],
    "Certifications": ["certifications", "courses"],
    "Projects": ["projects", "portfolio"],
    "Education": ["education", "university", "college"],
}

SKILL_CATEGORIES = {
    "AI/ML": ["machine learning", "deep learning", "tensorflow", "pytorch", "data science"],
    "Web Dev": ["react", "html", "css", "javascript", "frontend", "backend", "node"],
    "Tools": ["git", "docker", "linux", "vscode", "jupyter", "cloud", "sql"],
    "Soft Skills": ["communication", "leadership", "teamwork", "problem-solving", "adaptability"]
}

def extract_text_from_pdf(pdf_bytes):
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def score_sections(text):
    scores = {}
    text_lower = text.lower()
    for section, keywords in SECTION_KEYWORDS.items():
        match = any(k in text_lower for k in keywords)
        scores[section] = 15 if match else 0
    return scores

def analyze_skills(text):
    text_lower = text.lower()
    categories = []
    for category, keywords in SKILL_CATEGORIES.items():
        score = sum(1 for k in keywords if k in text_lower)
        if score > 0:
            categories.append({"name": category, "value": score * 10})
    return categories or [{"name": "Uncategorized", "value": 20}]

def analyze_pdf(pdf_bytes):
    raw_text = extract_text_from_pdf(pdf_bytes)
    section_scores = score_sections(raw_text)
    tips = get_section_tips(raw_text, section_scores)

    total = sum(section_scores.values())
    skill_data = analyze_skills(raw_text)

    result = {
        "total_score": total,
        "scores": [
            {"section": sec, "score": score, "tip": tips.get(sec, "")}
            for sec, score in section_scores.items()
        ],
        "skill_categories": skill_data
    }
    return result
