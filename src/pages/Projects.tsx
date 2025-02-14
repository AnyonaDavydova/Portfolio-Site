import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { loadProjectsWithFallback } from '../store/projectsSlice';
import { Layout } from '../components/Layout';
import { ProjectFilter } from '../components/PrjFilter';
import { ProjectList } from '../components/PrjList';
import { AddProjectForm } from '../components/AddPrj';
import { Loader } from '../components/Loader.tsx';
import { Refresh } from '../components/Refresh.tsx';
import { ProjectStatus } from '../types/Project';
import '../styles/Projects.css';

const DEFAULT_FILTER = 'All';

export const Projects = () => {
    const projects = useSelector((state: RootState) => state.projects.items);
    const projectStatus = useSelector((state: RootState) => state.projects.status);
    const projectError = useSelector((state: RootState) => state.projects.error);
    const dispatch = useDispatch<AppDispatch>();

    const [selectedTech, setSelectedTech] = useState<string>(DEFAULT_FILTER);
    const [showAddForm, setShowAddForm] = useState<boolean>(false);

    const loadProjects = useCallback(() => {
        dispatch(loadProjectsWithFallback('AnyonaDavydova'));
    }, [dispatch]);

    useEffect(() => {
        if (projectStatus === ProjectStatus.Idle || projectStatus === ProjectStatus.Failed) {
            loadProjects();
        }
    }, [loadProjects, projectStatus]);

    const filteredProjects = useMemo(() => {
        return projects.filter((project) =>
            selectedTech === DEFAULT_FILTER ? true : project.technologies.includes(selectedTech)
        );
    }, [projects, selectedTech]);

    const allTechnologies = useMemo(() => {
        const techSet = new Set<string>();
        projects.forEach((project) => {
            project.technologies.forEach((tech) => techSet.add(tech));
        });
        return [DEFAULT_FILTER, ...Array.from(techSet)];
    }, [projects]);

    if (projectStatus === ProjectStatus.Loading) {
        return (
            <Layout>
                <Loader />
            </Layout>
        );
    }

    return (
        <Layout>
            {showAddForm ? (
                <AddProjectForm onClose={() => setShowAddForm(false)} />
            ) : (
                <>
                    <h2>Мои проекты</h2>
                    {projectError && <p className="error-message">Ошибка: {projectError}</p>}
                    <Refresh onClick={loadProjects} />
                    <button onClick={() => setShowAddForm(true)} className="form-button">
                        Добавить проект
                    </button>
                    <ProjectFilter selectedTech={selectedTech} onFilterChange={setSelectedTech} technologies={allTechnologies} />
                    <ProjectList projects={filteredProjects} />
                </>
            )}
        </Layout>
    );
};
