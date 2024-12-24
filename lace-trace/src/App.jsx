import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Notfound from './pages/Notfound';
import Login from './pages/Login';
import UserHome from './pages/UserHome';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import axios from 'axios';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider, UserContext } from '../context/userContext';
import Streamlit from './pages/Streamlit';
import DashBoard from './pages/DashBoard';
import PrivateRoute from './components/PrivateRoute';
import Talk from './pages/Talk';

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

// Add the axios interceptor

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<><Hero /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/streamlit" element={
          <PrivateRoute>
            <Streamlit/>
          </PrivateRoute>
        } />
       
       <Route path="/talk" element={
          <PrivateRoute>
            <Talk/>
          </PrivateRoute>
        } />

        <Route path='*' element={<Notfound />} />
      </Routes>
      <Footer />
    </UserContextProvider>
  );
}

export default App;