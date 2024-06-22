import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import PrivateRoute from './PrivateRoute';
import About from './components/About';
import Contact from './components/Contact';
import UpdateProfile from './components/UpdateProfile';
import ResetPassword from './ResetPassword';
import AdminHome from './AdminHome';
import NotAuthorized from './NotAuthorized'; // Import the NotAuthorized component
import ProductsTable from './components/ProductsTable';
import UpdateProduct from './components/UpdateProduct';

const App = () => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={!token ? <Signup /> : <Navigate to={userRole === 'admin' ? '/adminhome' : '/home'} />} />
          <Route path="/login" element={!token ? <Login /> : <Navigate to={userRole === 'admin' ? '/adminhome' : '/home'} />} />
          <Route path="/reset-password" element={!token ? <ResetPassword /> : <Navigate to={userRole === 'admin' ? '/adminhome' : '/home'} />} />

          <Route path="/home" element={<PrivateRoute requiredRole="user"><Home /></PrivateRoute>} />
          <Route path="/adminhome" element={<PrivateRoute requiredRole="admin"><AdminHome /></PrivateRoute>} />
          <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
          <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
          <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
          {/* <Route path="/update/:id" render={({ match }) => <UpdateProduct productId={match.params.id} />} /> */}
          <Route path="/update/:productId" element={<UpdateProduct />} />

          <Route path="/notauthorized" element={<NotAuthorized />} /> {/* Add the NotAuthorized route */}
          <Route path="/products" element={<PrivateRoute><ProductsTable /></PrivateRoute>} />

          
          <Route path="/" element={<Navigate to={token ? (userRole === 'admin' ? '/adminhome' : '/home') : '/login'} />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
