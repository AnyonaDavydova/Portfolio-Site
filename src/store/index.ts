import { configureStore, Middleware } from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';
import { Project } from '../types/Project';
import { createAsyncThunk } from '@reduxjs/toolkit';

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

const loadProjectsFromLocalStorage = (): Project[] => {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
        try {
            const parsedProjects: unknown = JSON.parse(storedProjects);
            if (Array.isArray(parsedProjects)) {
                return parsedProjects.filter((project) => isValidProject(project as Project));
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Ошибка при чтении данных из localStorage:', error.message);
            }
        }
    }
    return [];
};

const preloadedState: PreloadedState = {
    projects: {
        items: loadProjectsFromLocalStorage(),
    },
};

const loggerMiddleware: Middleware = () => (next) => (action) => {
    if (process.env.NODE_ENV === 'development') {
        console.log('dispatching', action);
    }
    return next(action);
};

export const store = configureStore({
    reducer: {
        projects: projectsReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loggerMiddleware),
});

store.subscribe(() => {
    try {
        localStorage.setItem('projects', JSON.stringify(store.getState().projects.items));
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Ошибка при сохранении данных в localStorage:', error.message);
        }
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async () => {
        const response = await new Promise<Project[]>((resolve) => {
            setTimeout(() => {
                resolve(loadProjectsFromLocalStorage());
            }, 0);
        });
        return response;
    }
);
