import React from 'react';
import '../styles/Skills.css';

export const Skills: React.FC = () => {
    return (
        <div className="skills">
            <h2>Мои навыки</h2>
            <div className="skills-columns">
                <div className="skills-column">
                    <h1>Программирование</h1>
                    <ul>
                        <li>C++, C#</li>
                        <li>Python</li>
                        <li>Typescript</li>
                        <li>HTML, CSS</li>
                    </ul>
                </div>
                <div className="skills-column">
                    <h1>Графический дизайн</h1>
                    <ul>
                        <li>Adobe Photoshop</li>
                        <li>Adobe Illustrator</li>
                        <li>Blender</li>
                        <li>Aseprite</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
