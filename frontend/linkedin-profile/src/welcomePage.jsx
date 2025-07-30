import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="overlay" />
      <div className="blur-circle"></div>
      <div className="content">
        <h1 className="title">Welcome!</h1>
        <h2 className="subtitle">LinkedIn profile strength analyzer</h2>
        <p className="description">
          Get personalized insights and expert recommendations based on your
          LinkedIn profile.
        </p>
        <p className="description">
          Discover how to improve your professional visibility, attract the
          right opportunities.
        </p>
        <button
          onClick={() => navigate('/ProfileForm')}
          className="start-button"
        >
          Get Started!
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
