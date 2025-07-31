def get_section_tips(sections):
    tips = {}

    about = sections.get("About", "").strip()
    experience = sections.get("Experience", "").strip()
    skills = sections.get("Skills", "").strip()
    certifications = sections.get("Certifications", "").strip()
    education = sections.get("Education", "").strip()

    # About
    if not about:
        tips["About"] = (
            "You currently don’t have a summary. This section is crucial for telling your story.\n"
            "👉 Suggestions:\n"
            "- Start with academic background.\n"
            "- Highlight key technical skills.\n"
            "- Mention interests or projects.\n"
            "- Share your career goal.\n\n"
            "**Example:**\n"
            "Aspiring AI/ML Engineer | B.Tech in AI & ML | Python, React.js | Passionate Problem Solver"
        )
    elif len(about.split()) < 50:
        tips["About"] = "Try expanding your 'About' section to at least 3–4 sentences including skills, goals, and passions."
    else:
        tips["About"] = "Nice summary! Consider briefly stating your career goal and adding keywords like technologies or interests."

    # Experience
    if not experience:
        tips["Experience"] = (
            "You haven't listed any experience. Add internships, projects, or freelance work.\n"
            "✅ Use bullet points with action verbs and outcomes.\n\n"
            "**Example:**\n"
            "- Built an AI chatbot using Python and NLP.\n"
            "- Integrated chatbot in a web app using React.js."
        )
    elif len(experience.split()) < 50:
        tips["Experience"] = "List specific roles, technologies used, and results. Use bullet points for clarity."
    else:
        tips["Experience"] = "Good! Use action verbs, quantify achievements, and highlight your personal contributions."

    # Skills
    if not skills:
        tips["Skills"] = (
            "No skills found. Include both technical and soft skills.\n"
            "✅ Example: Python, React, ML, Communication, Teamwork"
        )
    elif len(skills.split(",")) < 5:
        tips["Skills"] = "Try adding more relevant skills. Group by category like Programming Languages, Tools, etc."
    else:
        tips["Skills"] = "Well listed! Consider organizing into categories like Frontend, Backend, ML Tools."

    # Certifications
    if not certifications:
        tips["Certifications"] = (
            "No certifications found. Add online courses or certificates (Coursera, Udemy, etc.) relevant to your goals.\n"
            "✅ Shows initiative and learning mindset."
        )
    else:
        tips["Certifications"] = "Good job! Make sure they’re relevant and include issue dates."

    # Education
    if not education:
        tips["Education"] = (
            "Add your degree, institution, and timeline.\n"
            "✅ Mention key courses, GPA (if good), or club participation."
        )
    else:
        tips["Education"] = "Looks good! You could improve it by listing relevant courses, awards, or activities."

    return tips
