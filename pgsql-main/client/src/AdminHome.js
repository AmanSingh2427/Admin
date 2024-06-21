import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import axios from 'axios';

const AdminHome = () => {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/pending-registrations', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setPendingUsers(response.data);
      } catch (err) {
        console.error('Error fetching pending users:', err);
      }
    };
    fetchPendingUsers();
  }, []);

  const handleApprove = async (userId) => {
    try {
      await axios.post('http://localhost:5000/approve-user', { userId }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPendingUsers(pendingUsers.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Error approving user:', err);
    }
  };

  const handleReject = async (userId) => {
    try {
      await axios.post('http://localhost:5000/reject-user', { userId }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPendingUsers(pendingUsers.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Error rejecting user:', err);
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Home Page</h2>
          <div className="mb-6 text-center">Welcome, {localStorage.getItem('username')}!</div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Username</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Full Name</th>
                  <th className="py-2 px-4 border-b">Role</th>
                  <th className="py-2 px-4 border-b">Image</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.map(user => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border-b">{user.username}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.full_name}</td>
                    <td className="py-2 px-4 border-b">{user.role}</td>
                    <td className="py-2 px-4 border-b">
                      <img src={`http://localhost:5000/${user.image}`} alt={user.username} className="h-10 w-10 rounded-full object-cover" />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleApprove(user.id)}
                        className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition-colors mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(user.id)}
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('username');
              window.location.href = '/login';
            }}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors mt-6"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
