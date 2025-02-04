import { Project } from '../types/Project';

export const loadProjects = (): Project[] => {
    try {
        const storedProjects = localStorage.getItem('projects');
        if (!storedProjects) return [];
        const parsedProjects: unknown = JSON.parse(storedProjects);
        return Array.isArray(parsedProjects) ? parsedProjects as Project[] : [];
    } catch (error) {
        console.error('Ошибка при загрузке проектов:', error);
        return [];
    }
};

export const saveProjects = (projects: Project[]) => {
    try {
        localStorage.setItem('projects', JSON.stringify(projects));
    } catch (error) {
        console.error('Ошибка при сохранении проектов:', error);
    }
};
