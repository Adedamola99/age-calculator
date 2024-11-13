import './App.css';
import AgeCalculator from './pages/AgeCalculator';
import YearOfBirth from './pages/YearOfBirthPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/age-calculator" element={<AgeCalculator />} />
                <Route path="/year-of-birth" element={<YearOfBirth />} />
            </Routes>
        </Router>
    );
};

export default App;
