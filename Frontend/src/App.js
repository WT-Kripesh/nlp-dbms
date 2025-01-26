import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Features from './components/Features';
import Team from './components/Team';
import Get_started from './components/LoginForm';
import './App.css';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Features />
      <Team />
      <Get_started />
      <Footer/>
    </div>
  );
};

export default App;
