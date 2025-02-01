// components/HowItWorks.js
import React, { useState } from 'react';
import './HowItWorks.css'; // Import the CSS for this component
import system_flow from "./assets/system_flow.png"
import query from "./assets/query.png"

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(null);

  // const query_steps = [
  //   {
  //     title: '1. User Input',
  //     description: 'The user inputs a natural language query (e.g., "Find the name of the employee whose salary is greater than 50000").',
  //   },
  //   {
  //     title: '2. Natural Language Processing (NLP)',
  //     description: 'The query is processed through tokenization, lemmatization, syntactic analysis, and semantic analysis.',
  //   },
  //   {
  //     title: '3. Query Mapping',
  //     description: 'The system maps the natural language query to an SQL query, including table selection, select clause formation, and conditions extraction.',
  //   },
  //   {
  //     title: '4. Query Execution',
  //     description: 'The generated SQL query is executed on the database, and the results are fetched.',
  //   },
  //   {
  //     title: '5. Result Display',
  //     description: 'The results are displayed to the user in a user-friendly format.',
  //   },
  // ];

  const steps = [
    {
      title: "Table Selection",
      description: "Identifies the relevant table(s) based on the natural language query.",
    },
    {
      title: "Select Clause Formation",
      description: "Determines which attributes (columns) should be included in the query.",
    },
    {
      title: "Conditions Extraction",
      description: "Extracts filtering conditions from the query, such as WHERE clauses.",
    },
    {
      title: "ORDER BY Clause Formation",
      description: "Identifies sorting conditions, such as ordering results by a column.",
    },
    {
      title: "Mapping",
      description: "Combines all the extracted elements into a structured SQL query.",
    },
  ];

  const toggleStep = (index) => {
    setActiveStep(activeStep === index ? null : index);
  };
  // const [selected, setSelected] = useState(null);

  return (
    <section id='how-it-works' className="how-it-works">
      
      <h1>How It Works?</h1>
      <>
      <img className='system-flow' src={system_flow} alt="System flow diagram" />
      <h2>System Flow Diagram</h2>
      </>
      <div className="content-container">
        <div className="steps-container">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step ${activeStep === index ? 'active' : ''}`}
              onClick={() => toggleStep(index)}
            >
              <h2>{step.title}</h2>
              {activeStep === index && <p>{step.description}</p>}
            </div>
          ))}
        </div>
        <div className="query">
          <img src={query} alt="Query generation algorithm" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;