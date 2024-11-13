import '../App.css'
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            {/* Blob shapes for background */}
            <div className="blob blob1"></div>
            <div className="blob blob2"></div>
            
            <Header title="Select a Calculator" />
            <p className="description">Choose one of the calculators below to get started:</p>
            
            <div className="home-button-container">
                <button 
                    className="custom-button" 
                    onClick={() => navigate('/age-calculator')}
                >
                    Age Calculator
                </button>
                <p className="button-description">Calculate your age and see how many days you've lived!</p>

                <button 
                    className="custom-button" 
                    onClick={() => navigate('/year-of-birth')}
                >
                    Year of Birth Calculator
                </button>
                <p className="button-description">Discover your birth year by entering your age!</p>
            </div>
        </div>
    );
};

export default HomePage;
