def get_section_tips(text, scores):
    text = text.lower()
    tips = {}

    for section, score in scores.items():
        if section == "About":
            if "about" not in text or len(text.split()) < 100:
                tips[section] = "Add a strong personal summary with 3-4 key skills."
            else:
                tips[section] = "Nice summary! Highlight your goals briefly."
        elif section == "Experience":
            tips[section] = "List relevant roles, companies, and clear achievements." if score < 15 else "Good! Use bullet points for clarity."
        elif section == "Skills":
            tips[section] = "Include both technical and soft skills." if score < 15 else "Try grouping your skills into categories."
        elif section == "Certifications":
            tips[section] = "Include relevant online courses and certifications." if score < 15 else "Keep certs updated and relevant."
        elif section == "Projects":
            tips[section] = "List at least 2 strong projects with outcomes." if score < 15 else "Good job! Add GitHub or demo links."
        elif section == "Education":
            tips[section] = "Mention degree, university, and timeline." if score < 15 else "Include relevant coursework and CGPA."
        else:
            tips[section] = "Expand more details."

    return tips
