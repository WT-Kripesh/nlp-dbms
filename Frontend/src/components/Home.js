import React from "react";
import {Link} from 'react-router-dom'
import "./Home.css";
import logo from "./assets/logo.png";


const Home = () => {

  return (
  <section id="home" className="home-container">
      <div className="home-content">
        <img src={logo} alt="Project Logo" className="home-logo" />
        <h1 className="home-title">
          Natural language interface to Database Management System
        </h1>
        <p className="home-description">
          Leveraging NLP to simplify database interactions by allowing to
          communicate with the database using natural language queries. <Link to="/how-it-works">Learn more</Link>
        </p>
        <Link to="/get-started"><button className="cta-button">Get Started</button></Link>
      </div>
    </section>
  );
};

export default Home;
