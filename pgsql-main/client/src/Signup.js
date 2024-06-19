import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('user'); // Added state for role
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('fullName', fullName);
    formData.append('role', role); // Added role to formData
    if (image) formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/signup', formData);
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="mb-4 p-2 w-full border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-4 p-2 w-full border rounded"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mb-4 p-2 w-full border rounded"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mb-4 p-2 w-full border rounded pr-12"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5C6.478 4.5 1.943 8.239.5 12c1.443 3.761 5.978 7.5 11.5 7.5s10.057-3.739 11.5-7.5C22.057 8.239 17.522 4.5 12 4.5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5C6.478 4.5 1.943 8.239.5 12c1.443 3.761 5.978 7.5 11.5 7.5s10.057-3.739 11.5-7.5C22.057 8.239 17.522 4.5 12 4.5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
                </svg>
              )}
            </span>
          </div>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mb-4 p-2 w-full border rounded"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="mb-4 p-2 w-full border rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Signup
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full mt-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
