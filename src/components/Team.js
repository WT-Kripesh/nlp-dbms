import React from 'react';
import './Team.css';
import avahan from './assets/avahan.png';
import javed from './assets/javed.png';
import kripesh from './assets/kripesh.jpeg';

const Team = () => {
    const teamMembers = [
        {
            id: 1,
            name: "Avahan Tamrakar",
            role: "App Developer",
            description: "Oversaw the App development and integration of the project.",
            image: avahan,
        },
        {
            id: 2,
            name: "Javed Ansari",
            role: "Algorithm Developer",
            description: "Developed the algorithm for query conversion and execution.",
            image: javed,
        },
        {
            id: 3,
            name: "Kripesh Nihure",
            role: "Web developer",
            description: "Developed react-app and implemented backend for integration.",
            image: kripesh,
        },
       
    ];

    return (
        <section id="team" className="team-container">
            <h2 className="team-title">Meet Our Team</h2>
            <div className="team-grid">
                {teamMembers.map((member) => (
                    <div key={member.id} className="team-card">
                        <img src={member.image} alt={member.name} className="team-image" />
                        <h3 className="team-name">{member.name}</h3>
                        <p className="team-role">{member.role}</p>
                        <p className="team-description">{member.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Team;
