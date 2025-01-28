import { useState } from "react";
import { Layout } from "../components/Layout";
import { projects } from "../data/Projects";
import { IProject } from "../types/Project";
import "../styles/Projects.css";

const TECHNOLOGIES = ["All", "React", "TypeScript", "JavaScript", "Unity", "Vue", "Electron"];

export const Projects = () => {
    const [selectedTech, setSelectedTech] = useState<string>("All");

    const filteredProjects =
        selectedTech === "All"
            ? projects
            : projects.filter((project) => project.technologies.includes(selectedTech));

    return (
        <Layout>
            <h2>Мои проекты</h2>
            <div className="filter">
                <label htmlFor="technology-filter">Выберите технологию: </label>
                <select
                    id="technology-filter"
                    value={selectedTech}
                    onChange={(e) => setSelectedTech(e.target.value)}
                >
                    {TECHNOLOGIES.map((tech) => (
                        <option key={tech} value={tech}>
                            {tech}
                        </option>
                    ))}
                </select>
            </div>

            <div className="projects-list">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project: IProject) => (
                        <div key={project.id} className="project-card">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <p className="tech">
                                Технологии: {project.technologies.join(", ")}
                            </p>
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                Перейти на GitHub
                            </a>
                        </div>
                    ))
                ) : (
                    <p>Проекты не найдены</p>
                )}
            </div>
        </Layout>
    );
};
