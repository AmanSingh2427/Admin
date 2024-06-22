import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  const handleUpdate = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const product = response.data;
      navigate(`/update/${id}`, { state: { product } });
    } catch (err) {
      console.error('Error fetching product:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setProducts(products.filter(product => product.id !== id)); // Update state after deletion
      console.log('Product deleted successfully!');
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Our Products</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Photo</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.id}</td>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.price}</td>
              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b">
                <img 
                  src={`http://localhost:5000/${product.photo}`} 
                  alt={product.name} 
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleUpdate(product.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
