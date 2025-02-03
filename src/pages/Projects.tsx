import { useEffect, useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks.ts";
import { Layout } from "../components/Layout";
import { setProjects } from "../store/projectsSlice";
import { projects as dataProjects } from "../data/Projects";
import { ProjectFilter } from "../components/PrjFilter";
import { ProjectList } from "../components/PrjList";
import { AddProjectForm } from "../components/AddPrj";
import { TECHNOLOGIES, ALL_TECHNOLOGIES } from "../constants/technologies";
import "../styles/Projects.css";

export const Projects = () => {
    const projects = useAppSelector((state) => state.projects.items);
    const dispatch = useAppDispatch();

    const [selectedTech, setSelectedTech] = useState<string>(ALL_TECHNOLOGIES);
    const [isAddFormVisible, setIsAddFormVisible] = useState<boolean>(false);

    useEffect(() => {
        const savedProjects = localStorage.getItem("projects");
        if (savedProjects) {
            try {
                const parsedProjects = JSON.parse(savedProjects);
                if (Array.isArray(parsedProjects)) {
                    dispatch(setProjects(parsedProjects));
                }
            } catch (error) {
                console.error("Ошибка при парсинге данных из localStorage:", error);
            }
        } else if (!projects.length) {
            dispatch(setProjects(dataProjects));
        }
    }, [dispatch, projects.length]);

    const filteredProjects = useMemo(
        () =>
            selectedTech === ALL_TECHNOLOGIES
                ? projects
                : projects.filter((project) =>
                    project.technologies.includes(selectedTech)
                ),
        [projects, selectedTech]
    );

    return (
        <Layout>
            {isAddFormVisible ? (
                <AddProjectForm onClose={() => setIsAddFormVisible(false)} />
            ) : (
                <>
                    <h2>Мои проекты</h2>
                    <button
                        onClick={() => setIsAddFormVisible(true)}
                        className="form-button"
                    >
                        Добавить проект
                    </button>
                    <ProjectFilter
                        selectedTech={selectedTech}
                        onFilterChange={setSelectedTech}
                        technologies ={TECHNOLOGIES}
                    />
                    <ProjectList projects={filteredProjects} />
                </>
            )}
        </Layout>
    );
};
