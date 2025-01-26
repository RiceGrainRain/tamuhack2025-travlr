import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Hero from './components/Hero';
import AttendantManager from './components/FlightAttendantManager';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar at the top center */}
        <nav className="bg-white py-4">
          <ul className="flex space-x-8 justify-center">
            <li>
              <Link
                to="/"
                className="text-black font-bold text-lg hover:text-blue-500"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-black font-bold text-lg hover:text-blue-500"text-gray-600
              >
                Dashboard
              </Link>
            </li>

          </ul>
        </nav>

        <Routes>
          {/* Set the Hero component as the homepage */}
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<AttendantManager />} />
        </Routes>
      </div>
    </Router>
  );
}
