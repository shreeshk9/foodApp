import React from 'react';

import './App.css';
import Home from './screens/Home';
import Footer from './components/Footer'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './screens/Signup';
import Login from './screens/Login';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createuser" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myOrder" element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
