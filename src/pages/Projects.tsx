import React from 'react';
import '../styles/Projects.css';

export const Projects: React.FC = () => {
    const projects = [
        { href: "https://github.com/AnyonaDavydova/PersonalSite", label: "Персональный сайт (новый)" },
        { href: "https://github.com/AnyonaDavydova/DAVYDOVA-ANYONA---site", label: "Персональный сайт (старый)" },
        { href: "https://github.com/AnyonaDavydova/WoodLand", label: "Браузерная игра" },
        { href: "https://vk.com/kittyjpeg?z=photo-210589082_457253315%2Fwall-210589082_63972", label: "Продолжение следует..." },
    ];

    return (
        <div className="projects">
            <h2>Мои проекты</h2>
            <div className="projects-grid">
                {projects.map(({ href, label }) => (
                    <div className="project-card" key={href}>
                        <a href={href}>{label}</a>
                    </div>
                ))}
            </div>
            <p>Тыкните для перехода на проект)</p>
        </div>
    );
};
