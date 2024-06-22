import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const { productId } = useParams(); // Get productId from route params
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || {
    id: '',
    name: '',
    price: '',
    description: '',
    photo: ''
  });

  useEffect(() => {
    if (!location.state?.product) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/products/${productId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setProduct(response.data);
        } catch (err) {
          console.error('Error fetching product:', err);
        }
      };
      fetchProduct();
    }
  }, [productId, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/products/${productId}`, product, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Product updated successfully!');
      navigate('/'); // Redirect to the products table after successful update
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
          <input type="text" id="name" name="name" value={product.name} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
          <input type="text" id="price" name="price" value={product.price} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea id="description" name="description" value={product.description} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo URL:</label>
          <input type="text" id="photo" name="photo" value={product.photo} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Update</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
