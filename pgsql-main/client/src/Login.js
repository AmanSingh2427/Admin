import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

 const handleLoginSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/login', { username, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('username', username);
    localStorage.setItem('userImage', response.data.userImage);
    localStorage.setItem('role', response.data.role); // Store user role in local storage
    console.log(response.data.token);
    console.log(username);
    console.log(response.data.userImage);
    console.log(response.data.role);
      

    if (response.data.role === 'admin') {
      navigate('/adminhome'); // Redirect admin to adminhome
    } else {
      navigate('/home'); // Redirect normal user to home
    }
  } catch (error) {
    console.error(error.response.data.message);
    alert(error.response.data.message); // Show error message
  }
};



  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/forgot-password', { email });
      setIsOtpSent(true);
      alert(response.data.message); // Show success message
    } catch (error) {
      console.error(error.response.data.message);
      alert(error.response.data.message); // Show error message
    }
  };

  const handleVerifyOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/verify-otp', { email, otp });
      alert(response.data.message); // Show success message or navigate to reset password page
      navigate('/reset-password'); // Redirect to reset password page after successful OTP verification
    } catch (error) {
      console.error(error.response.data.message);
      alert(error.response.data.message); // Show error message
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        {!isForgotPassword ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mb-4 p-2 w-full border rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mb-4 p-2 w-full border rounded"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="w-full mt-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors"
              >
                Don't have an Account?
              </button>
              <button
                type="button"
                onClick={() => setIsForgotPassword(true)}
                className="w-full mt-2 text-blue-500 hover:underline"
              >
                Forgot Password?
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6">{isOtpSent ? 'Verify OTP' : 'Forgot Password'}</h2>
            <form onSubmit={isOtpSent ? handleVerifyOtpSubmit : handleForgotPasswordSubmit}>
              {isOtpSent ? (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="mb-4 p-2 w-full border rounded"
                  />
                </>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mb-4 p-2 w-full border rounded"
                  />
                </>
              )}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
              >
                {isOtpSent ? 'Verify OTP' : 'Send OTP'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(false);
                  setIsOtpSent(false);
                }}
                className="w-full mt-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors"
              >
                {isOtpSent ? 'Back to Forgot Password' : 'Back to Login'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
