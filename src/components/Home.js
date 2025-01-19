import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import SignupModal from "./SignupModal";

import "./Home.css";
import logo from "./assets/logo.png";

const Home = () => {

  return (
    <section id="home" className="home-container">
      <div className="hero-content">
        <img src={logo} alt="Project Logo" className="home-logo" />
        <h1 className="hero-title">
          Natural language interface to Database Management System
        </h1>
        <p className="hero-description">
          Leveraging NLP to simplify database interactions by allowing to
          communicate with the database using natural language queries.
        </p>
        <a href="#features">
          <button className="cta-button">Get Started</button>
        </a>
      </div>
    </section>
  );
};

export default Home;
