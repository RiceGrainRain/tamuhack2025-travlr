// src/components/Sidebar.tsx

import { FaHome, FaInfoCircle, FaUsers } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-16 h-full bg-gray-800 text-white p-4 relative group">
        {/* Sidebar Icon */}
        <div className="flex flex-col items-center">
          <div className="text-2xl mb-4">
            <FaHome />
          </div>
          <div className="text-2xl mb-4">
            <FaInfoCircle />
          </div>
          <div className="text-2xl mb-4">
            <FaUsers />
          </div>
        </div>

        {/* Expanded Sidebar Text */}
        <div className="absolute inset-0 bg-gray-800 text-white transition-all duration-300 transform -translate-x-full group-hover:translate-x-0 flex flex-col items-center justify-center w-56">
          <ul className="text-sm">
            <li className="py-2 px-4 hover:bg-gray-600 rounded">Home</li>
            <li className="py-2 px-4 hover:bg-gray-600 rounded">About</li>
            <li className="py-2 px-4 hover:bg-gray-600 rounded">Users</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
