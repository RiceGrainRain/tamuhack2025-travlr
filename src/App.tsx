import { React , useEffect }  from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Hero from './components/Hero';
import AttendantManager from './components/FlightAttendantManager';
import FlightList from './components/FlightList';
import UserDashboard from './components/userDashboard';
import Chatbot from './components/Chatbot';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const userType = sessionStorage.getItem('type');
  const navigate = useNavigate();

  useEffect(() => {
    if (userType === 'a') {
      navigate('/about');
    } else if (userType === 'c') {
      navigate('/Lmnop');
    } else {
      navigate('/');
    }
  }, [userType, navigate]);

  // Only render children if user is admin
  return userType === 'a' ? children : null;
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route 
            path="/about" 
            element={
              <ProtectedRoute>
                <AttendantManager />
              </ProtectedRoute>
            } 
          />
          <Route path="/User" element={<FlightList/>} />
          <Route path="/Lmnop" element={<UserDashboard/>} />
          <Route path="/Red" element={<Chatbot/>} />
        </Routes>
      </div>
    </Router>
  );
}

function NavBar() {
  const navigate = useNavigate();

  const navButtons = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/about' },
    { label: 'Flights', path: '/User' },
    /*{ label: 'Dash2', path: '/Lmnop' },*/
    /*{ label: 'Chat', path: '/Red' }*/
  ];

  return (
    <nav className="bg-white py-4">
      <div className="flex space-x-4 justify-center">
        {navButtons.map((button) => (
          <button
            key={button.path}
            onClick={() => navigate(button.path)}
            className="bg-transparent text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors"
          >
            {button.label}
          </button>
        ))}
      </div>
    </nav>
  );
}