import React, { useState } from 'react';
import './ProfileForm.css';
import { useNavigate } from 'react-router-dom';

function ProfileForm() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      setError("");
      navigate("/results", { state: { result: data } });
    } catch (err) {
      console.error(err);
      setError("Failed to analyze the file. Check if backend is running.");
    }
  };

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

      <main className="form-section">
        <div className="form-box">
          <h2>Analyze Your LinkedIn Profile</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit">Analyze PDF</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </main>
    </div>
  );
}

export default ProfileForm;
