import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts';

function ProfileForm() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please upload a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Server returned error");
      }

      const data = await response.json();
      setResult(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to analyze the file. Check if backend is running.");
    }
  };

  const pieColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50'];

  return (
    <div style={{ marginTop: '1rem' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginBottom: '1rem' }}
        />
        <br />
        <button type="submit">Analyze PDF</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '2rem', background: '#f9f9f9', padding: '1rem' }}>
          <h3>Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>

          <h4 style={{ marginTop: '2rem' }}>📊 Section Scores</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={result.scores}>
              <XAxis dataKey="section" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>

          <h4 style={{ marginTop: '2rem' }}>🎯 Skill Categories</h4>
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
        </div>
      )}
    </div>
  );
}

export default ProfileForm;
