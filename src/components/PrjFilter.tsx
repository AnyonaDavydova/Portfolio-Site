import React from "react";
import { ALL_TECHNOLOGIES } from '../constants/technologies.ts';

export const LABEL_TEXT = "Выберите технологию:"

interface ProjectFilterProps {
    selectedTech: string;
    onFilterChange: (tech: string) => void;
    technologies: readonly  string[];
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({ selectedTech, onFilterChange, technologies }) => {
    return (
        <div className="project-tech-filter">
            <label htmlFor="tech-select">{LABEL_TEXT}</label>
            <select
                id="tech-select"
                value={selectedTech}
                onChange={(e) => onFilterChange(e.target.value)}
            >
                <option value={ALL_TECHNOLOGIES}>{ALL_TECHNOLOGIES}</option>
                {technologies.map((tech) => (
                    <option key={tech} value={tech}>
                        {tech}
                    </option>
                ))}
            </select>
        </div>
    );
};
