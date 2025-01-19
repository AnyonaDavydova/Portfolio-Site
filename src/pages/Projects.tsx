import React from 'react';
import '../styles/Projects.css';

const Projects: React.FC = () => {
    return (
        <div className="projects">
            <h2>Мои проекты</h2>
            <div className="projects-grid">
                <div className="project-card">
                    <a href="https://github.com/AnyonaDavydova/PersonalSite" target="_blank" rel="noopener noreferrer">
                        Персональный сайт (новый)
                    </a>
                </div>
                <div className="project-card">
                    <a href="https://github.com/AnyonaDavydova/DAVYDOVA-ANYONA---site" target="_blank" rel="noopener noreferrer">
                        Персональный сайт (старый)
                    </a>
                </div>
                <div className="project-card">
                    <a href="https://github.com/AnyonaDavydova/WoodLand" target="_blank" rel="noopener noreferrer">
                        Браузерная игра
                    </a>
                </div>
                <div className="project-card">
                    <a href="https://yandex.ru/images/search?from=tabbar&img_url=https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FFLUTzJkXsAYexBo.jpg&lr=75&pos=7&rpt=simage&text=котенок%20мем" target="_blank" rel="noopener noreferrer">
                        Продолжение следует...
                    </a>
                </div>
            </div>
            <p>Тыкните для перехода на проект)</p>
        </div>
    );
};

export default Projects;
