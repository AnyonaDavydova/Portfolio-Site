import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { Layout } from "../components/Layout";
import { setProjects } from '../store/projectsSlice';
import { projects as dataProjects } from "../data/Projects";
import { ProjectFilter } from '../components/PrjFilter';
import { ProjectList } from '../components/PrjList';
import { AddProjectForm } from '../components/AddPrj';
import "../styles/Projects.css";

export const Projects = () => {
    const projects = useSelector((state: RootState) => state.projects.items);
    const dispatch = useDispatch<AppDispatch>();

    const [selectedTech, setSelectedTech] = useState<string>('All');
    const [showAddForm, setShowAddForm] = useState<boolean>(false);

    const technologies = ["React", "TypeScript", "JavaScript", "Vue", "Electron"];

    useEffect(() => {
        const savedProjects = localStorage.getItem('projects');
        if (savedProjects) {
            dispatch(setProjects(JSON.parse(savedProjects)));
        } else if (!projects.length) {
            dispatch(setProjects(dataProjects));
        }
    }, [dispatch, projects.length]);


    const filteredProjects = useMemo(() => {
        if (selectedTech === 'All') return projects;
        return projects.filter((project) => project.technologies.includes(selectedTech));
    }, [projects, selectedTech]);

    return (
        <Layout>
            {showAddForm ? (
                <AddProjectForm onClose={() => setShowAddForm(false)} />
            ) : (
                <>
                    <h2>Мои проекты</h2>
                    <button onClick={() => setShowAddForm(true)} className="form-button">
                        Добавить проект
                    </button>
                    <ProjectFilter selectedTech={selectedTech} onFilterChange={setSelectedTech} technologies={technologies} />
                    <ProjectList projects={filteredProjects} />
                </>
            )}
        </Layout>
    );
};
