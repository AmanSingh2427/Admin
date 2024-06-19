import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const username = localStorage.getItem('username');
  const userImage = localStorage.getItem('userImage');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userImage');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/home" className="text-white">Home</Link>
          <Link to="/about" className="text-white">About</Link>
          <Link to="/contact" className="text-white">Contact</Link>
        </div>
        <div className="flex space-x-4 items-center">
          {username ? (
            <>
              <Link to="/update-profile" className="text-blue-400 hover:text-blue-700 transition-colors">Update Profile</Link>
              <img 
                src={userImage ? `http://localhost:5000/${userImage}` : "default-image-url"} 
                alt="User profile" 
                className="w-8 h-8 rounded-full"
              />
              <span className="text-white">{username}</span>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-white">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
