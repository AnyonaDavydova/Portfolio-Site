import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';
import { Project } from '../types/Project';

type PreloadedState = {
    projects: {
        items: Project[];
    };
};

const isValidProject = (project: Project): boolean => {
    return (
        project.technologies.every((tech: unknown) => typeof tech === 'string')
    );
};

const loadProjectsFromLocalStorage = (): PreloadedState['projects']['items'] => {
    try {
        const storedProjects = localStorage.getItem('projects');
        if (storedProjects) {
            const parsedProjects: unknown = JSON.parse(storedProjects);
            if (Array.isArray(parsedProjects)) {
                return parsedProjects.filter((project) => isValidProject(project as Project));
            }
        }
    } catch (error) {
        console.error('Ошибка при чтении данных из localStorage:', error);
    }
    return [];
};

const preloadedState: PreloadedState = {
    projects: {
        items: loadProjectsFromLocalStorage(),
    },
};

export const store = configureStore({
    reducer: {
        projects: projectsReducer,
    },
    preloadedState,
});

store.subscribe(() => {
    try {
        localStorage.setItem('projects', JSON.stringify(store.getState().projects.items));
    } catch (error) {
        console.error('Ошибка при сохранении данных в localStorage:', error);
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
