import React from "react";

interface ProjectFilterProps {
    selectedTech: string;
    onFilterChange: (tech: string) => void;
    technologies: string[];
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({ selectedTech, onFilterChange, technologies }) => {
    return (
        <div className="filter">
            <label htmlFor="tech-select">Выберите технологию:</label>
            <select
                id="tech-select"
                value={selectedTech}
                onChange={(e) => onFilterChange(e.target.value)}
            >
                <option value="All">Все</option>
                {technologies.map((tech) => (
                    <option key={tech} value={tech}>
                        {tech}
                    </option>
                ))}
            </select>
        </div>
    );
};
