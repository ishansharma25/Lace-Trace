import React, { useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import Notfound from './pages/Notfound';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Register from './pages/Register';
import { UserContext } from '../context/userContext';
import Streamlit from './pages/Streamlit';
import PrivateRoute from './components/PrivateRoute';

function AppContent() {
  const { loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/streamlit" element={
          <PrivateRoute>
            <Streamlit/>
          </PrivateRoute>
        } />
        <Route path='*' element={<Notfound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default AppContent;