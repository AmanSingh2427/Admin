import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if passwords match
      if (newPassword !== confirmPassword) {
        alert("Passwords don't match");
        return;
      }

      // Call API to verify OTP and reset password
      const response = await axios.post('http://localhost:5000/reset-password', { otp, newPassword });
      alert(response.data.message); // Show success message
      navigate('/login'); // Redirect to login page after successful password reset
    } catch (error) {
      console.error(error.response.data.message);
      alert(error.response.data.message); // Show error message
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
        <form onSubmit={handleResetPasswordSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mb-4 p-2 w-full border rounded"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mb-4 p-2 w-full border rounded"
          />
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}h7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            onChange={(e) => setOtp(e.target.value)}
            required
            className="mb-4 p-2 w-full border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
