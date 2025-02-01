import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Features from './components/Features';
import Team from './components/Team';
import Get_started from './components/LoginForm';
import HowItWorks from './components/HowItWorks';
import Dashboard from './components/Dashboard';
import './App.css';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/features" element={<Features />} />
      <Route path="/team" element={<Team />} />
      <Route path="/get-started" element={<Get_started />} />
      <Route path="/dashboard" element={<Dashboard />} /> {/* New Route */}
    </Routes>
    <Footer />
    </>
  );
};

export default App;
