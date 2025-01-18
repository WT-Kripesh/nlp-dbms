import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Features from './components/Features';
import Team from './components/Team';
import Contact from './components/Contact';
import './App.css';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Features />
      <Team />
      <Contact />
      <Footer/>
    </div>
  );
};

export default App;
