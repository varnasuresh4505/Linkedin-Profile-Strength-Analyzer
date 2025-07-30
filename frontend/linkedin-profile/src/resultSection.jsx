import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts';
import './ProfileForm.css';

function ResultSection() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;

  const pieColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50'];

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

  return (
    <div className="profile-container">
      <header className="navbar">
        <h1 className="brand">LinkedIn Profile Strength Analyzer</h1>
        <nav className="nav-links">
          <a href="#">Dashboard</a>
          <a href="#">Analyze</a>
          <a href="#">Tips</a>
          <a href="#">About</a>
        </nav>
      </header>

      <section className="result-section">
        <h3>Result:</h3>
        <pre>{JSON.stringify(result, null, 2)}</pre>

        <h4>📊 Section Scores</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={result.scores}>
            <XAxis dataKey="section" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        <h4>🎯 Skill Categories</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={result.skill_categories}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {result.skill_categories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}

export default ResultSection;
