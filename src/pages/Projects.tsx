import React from 'react';
import '../styles/Projects.css';

const Projects: React.FC = () => {
    return (
        <div className="projects">
            <h2>Мои проекты</h2>
            <div className="projects-grid">
                <div className="project-card">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        ч 1
                    </a>
                </div>
                <div className="project-card">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        ч 2
                    </a>
                </div>
                <div className="project-card">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        ч 3
                    </a>
                </div>
                <div className="project-card">
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                        ч 4
                    </a>
                </div>
            </div>
            <p>Тыкните для перехода на проект)</p>
        </div>
    );
};

export default Projects;
