import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProfileForm.css";
import "./resultSection.css";
import PieChart from "./scoreChart";

function ResultSection() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;

  // Define max scores per section
  const max_scores = {
    About: 20,
    Experience: 20,
    Skills: 20,
    Certifications: 20,
    Education: 20,
  };

  if (!result) {
    return (
      <div className="form-section">
        <div className="form-box">
          <p>No result data found. Please upload your profile first.</p>
          <button onClick={() => navigate("/")}>Go Back</button>
        </div>
      </div>
    );
  }

  const getScoreFeedback = (score) => {
    if (score >= 85)
      return "🌟 Excellent! Your profile is strong and well-optimized.";
    if (score >= 60)
      return "✅ Good! A few improvements can make your profile shine.";
    if (score >= 30)
      return "⚠️ Needs Improvement. Let's enhance your profile sections.";
    return "❌ Your profile is mostly empty. Let’s get started!";
  };

  return (
    <div className="profilecontainer">
      <header className="navbar">
        <h1 className="brand">LinkedIn Profile Strength Analyzer</h1>
      </header>

      <section className="result-section">
        <div className="score-summary">
          <h2>Overall Score: {result.total_score} / 100</h2>
          <p>{getScoreFeedback(result.total_score)}</p>
          <div className="score-cards-scroll">
            <div className="score-cards-container">
              {result.scores.map((item, index) => {
                const sectionMax = max_scores[item.section] || 20;
                const percentage = (item.score / sectionMax) * 100;
                const statusClass =
                  percentage >= 100
                    ? "score-green"
                    : percentage >= 50
                    ? "score-yellow"
                    : "score-red";

                return (
                  <div key={index} className={`score-card ${statusClass}`}>
                    <div className="score">
                      {item.score}/{sectionMax}
                    </div>
                    <div className="section-name">{item.section}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="chart-box">
          <PieChart data={result.scores} />
        </div>

        <h3>🔍 Profile Analysis Summary</h3>
        {result.scores.map((item, index) => {
          const sectionMax = max_scores[item.section] || 20;
          return (
            <div key={index} className="result-card">
              <h4>
                {item.section} — Score: {item.score}/{sectionMax}
              </h4>
              {item.tip.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default ResultSection;
