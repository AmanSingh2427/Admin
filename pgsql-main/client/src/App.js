import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/home" element={<PrivateRoute role="user"><Home /></PrivateRoute>} />
          <Route path="/adminhome" element={<PrivateRoute role="admin"><AdminHome /></PrivateRoute>} />
          <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
          <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
          <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} /> {/* Add the NotAuthorized route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
