import React from 'react';
import '../styles/Projects.css';

const Projects: React.FC = () => {
    return (
        <div className="projects">
            <h2>Мои проекты</h2>
            <div className="projects-grid">
                <div className="project-card">
                    <a href="https://github.com/AnyonaDavydova/PersonalSite">
                        Персональный сайт (новый)
                    </a>
                </div>
                <div className="project-card">
                    <a href="https://github.com/AnyonaDavydova/DAVYDOVA-ANYONA---site">
                        Персональный сайт (старый)
                    </a>
                </div>
                <div className="project-card">
                    <a href="https://github.com/AnyonaDavydova/WoodLand">
                        Браузерная игра
                    </a>
                </div>
                <div className="project-card">
                    <a href="https://vk.com/kittyjpeg?z=photo-210589082_457253315%2Fwall-210589082_63972">
                        Продолжение следует...
                    </a>
                </div>
            </div>
            <p>Тыкните для перехода на проект)</p>
        </div>
    );
};

export default Projects;
