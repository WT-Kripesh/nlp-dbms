import React from 'react';
import './Features.css';

const Features = () => {
    const featuresList = [
        { id: 1, title: "Natural Language Query Processing", description: "Quickly converts natural language queries into precise SQL commands.", icon: "📜" },
        { id: 2, title: "Enhanced user experience", description: "Makes database management accessible to users with minimal technical background, knowledge of SQL not required.", icon: "💡" },
        { id: 3, title: "Scalibility", description: "Capacity to handle large-scale databases with efficiency.", icon: "📈" },
        { id: 4, title: "Intuitive UI", description: "Designed for user-friendly experience to input query and display results.", icon: "🖼️" },
    ];

    return (
        <section id="features" className="features-container">
            <h2 className="features-title">Key Features</h2>
            <div className="features-grid">
                {featuresList.map(feature => (
                    <div key={feature.id} className="feature-card">
                        <div className="feature-icon">{feature.icon}</div>
                        <h3 className="feature-title">{feature.title}</h3>
                        <p className="feature-description">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
