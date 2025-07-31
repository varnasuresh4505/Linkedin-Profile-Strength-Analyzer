import { Routes, Route } from 'react-router-dom';
import WelcomePage from './welcomePage';
import ProfileForm from './ProfileForm';
import ResultSection from './resultSection';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/ProfileForm" element={<ProfileForm />} />
      <Route path="/results" element={<ResultSection />} />
    </Routes>
  );
};    
export default App;     

