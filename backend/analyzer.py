import fitz  # PyMuPDF
from tips import get_section_tips

SECTION_KEYWORDS = {
    "About": ["about", "summary"],
    "Experience": ["experience", "work"],
    "Skills": ["skills", "technologies"],
    "Certifications": ["certifications", "courses"],
    "Education": ["education", "university", "college"],
}

SECTION_SCORES = {
    "About": 20,
    "Experience": 20,
    "Skills": 20,
    "Certifications": 20,
    "Education": 20,
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

def extract_sections(text):
    sections = {}
    lines = text.splitlines()
    current_section = None
    section_text = []

    for line in lines:
        lower = line.lower().strip()
        found_section = None
        for section, keywords in SECTION_KEYWORDS.items():
            if any(k in lower for k in keywords):
                found_section = section
                break

        if found_section:
            if current_section:
                sections[current_section] = "\n".join(section_text).strip()
            current_section = found_section
            section_text = []
        elif current_section:
            section_text.append(line)

    if current_section:
        sections[current_section] = "\n".join(section_text).strip()

    return sections

def score_sections(text):
    scores = {}
    text_lower = text.lower()
    for section, keywords in SECTION_KEYWORDS.items():
        matched = any(k in text_lower for k in keywords)
        scores[section] = SECTION_SCORES[section] if matched else 0
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
    sections = extract_sections(raw_text)
    tips = get_section_tips(sections)

    total = sum(section_scores.values())
    skill_data = analyze_skills(raw_text)

    return {
        "total_score": total,
        "scores": [
            {
                "section": sec,
                "score": section_scores.get(sec, 0),
                "tip": tips.get(sec, "No suggestions found.")
            }
            for sec in SECTION_KEYWORDS
        ],
        "skill_categories": skill_data,
        "sections": sections
    }
