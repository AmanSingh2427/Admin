import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarAdmin from './components/NavbarAdmin';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const navigate=useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    photo: '',
    description: ''
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setNewProduct(prevState => ({
      ...prevState,
      photo: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('photo', newProduct.photo);
    formData.append('description', newProduct.description);

    try {
      await axios.post('http://localhost:5000/create-product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setShowCreateForm(false);
      setNewProduct({
        name: '',
        price: '',
        photo: '',
        description: ''
      });
    } catch (err) {
      console.error('Error creating product:', err);
    }
  };

  return (
    <>
      <div>
        <NavbarAdmin toggleTableDisplay={() => setShowTable(!showTable)} />
      </div>

      {showTable && (
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
                  <td className="py-2 px-4 border-b text-center">{user.username}</td>
                  <td className="py-2 px-4 border-b text-center">{user.email}</td>
                  <td className="py-2 px-4 border-b text-center">{user.full_name}</td>
                  <td className="py-2 px-4 border-b text-center">{user.role}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <div className="flex justify-center items-center">
                      <img src={`http://localhost:5000/${user.image}`} alt={user.username} className="h-10 w-10 rounded-full object-cover" />
                    </div>
                  </td>

                  <td className="py-2 px-4 border-b text-center" >
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
      )}

      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Home Page</h2>
          <div className="mb-6 text-center">Welcome, {localStorage.getItem('username')}!</div>

          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Create New Product
            </button>
            <button
              onClick={() => navigate('/products')}
              className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors"
            >
              Update Product
            </button>
          </div>

          {showCreateForm && (
            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
                  Photo
                </label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
              >
                Create Product
              </button>
            </form>
          )}

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
