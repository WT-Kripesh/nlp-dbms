import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import queryGPTImage from "./assets/querygpt.png";
import logo from "./assets/logo.png";
import "./styles/Home.css";



const Home = () => {
  return (
    <section id="home" className="home-container">
      <div className="home-content">
      <motion.div 
          className="image-container"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img src={queryGPTImage} alt="Query GPT" className="query-image" />
          {/* <p className="image-caption">Powered by Query GPT</p> */}
        </motion.div>
        <motion.div 
          className="text-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img src={logo} alt="Project Logo" className="logo" />
          <h1 className="title">NLP-Based Database Management System</h1>
          
          <p className="description">
            Use natural language to interact with databases effortlessly.
            <Link to="/how-it-works" className="learn-more"> Learn more</Link>
          </p>
          <Link to="/get-started"><button className="cta-button">Get Started</button></Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Home;
