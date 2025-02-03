import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setProjects, fetchProjectsFromGitHub } from '../store/projectsSlice';
import { Layout } from '../components/Layout';
import { ProjectFilter } from '../components/PrjFilter';
import { ProjectList } from '../components/PrjList';
import { AddProjectForm } from '../components/AddPrj';
import { Loader } from '../components/Loader.tsx';
import { Refresh } from '../components/Refresh.tsx';
import { isFulfilled, isRejected } from '@reduxjs/toolkit';
import { loadFromLocalStorage, saveToLocalStorage } from '../localStorage';
import '../styles/Projects.css';
import { Project } from '../types/Project';

export const Projects = () => {
    const projects = useSelector((state: RootState) => state.projects.items);
    const projectStatus = useSelector((state: RootState) => state.projects.status);
    const projectError = useSelector((state: RootState) => state.projects.error);
    const dispatch = useDispatch<AppDispatch>();

    const [selectedTech, setSelectedTech] = useState<string>('All');
    const [showAddForm, setShowAddForm] = useState<boolean>(false);

    const loadProjects = useCallback(() => {
        dispatch(fetchProjectsFromGitHub('AnyonaDavydova'))
            .then((action) => {
                if (isFulfilled(action)) {
                    saveToLocalStorage('projects', action.payload);
                } else if (isRejected(action)) {
                    const savedProjects = loadFromLocalStorage<Project[]>('projects');
                    if (savedProjects && Array.isArray(savedProjects)) {
                        dispatch(setProjects(savedProjects));
                        console.log('Проекты загружены из localStorage:', savedProjects);
                    } else {
                        console.warn('Данные в localStorage некорректны или отсутствуют.');
                    }
                }
            })
            .catch((error) => {
                console.error('Ошибка при загрузке проектов с GitHub:', error);
            });
    }, [dispatch]);

    useEffect(() => {
        if (projectStatus === 'idle') {
            loadProjects();
        }
    }, [loadProjects, projectStatus]);

    const filteredProjects = useMemo(() => {
        return projects.filter((project) =>
            selectedTech === 'All' ? true : project.technologies.includes(selectedTech)
        );
    }, [projects, selectedTech]);

    const allTechnologies = useMemo(() => {
        const techSet = new Set<string>();
        projects.forEach((project) => {
            project.technologies.forEach((tech) => techSet.add(tech));
        });
        return ['All', ...Array.from(techSet)];
    }, [projects]);

    if (projectStatus === 'loading') {
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
