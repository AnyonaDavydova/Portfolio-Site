import { Project } from '../types/Project';
 export const projects: Project[] = [
    {
        id: 1,
        title: 'Персональный сайт',
        description: 'Сайт для демонстрации умений ANONы, version 1',
        technologies: ['Vue', 'TypeScript'],
        link: 'https://github.com/AnyonaDavydova/DAVYDOVA-ANYONA---site',
    },
    {
        id: 2,
        title: 'Персональный сайт',
        description: 'Сайт для демонстрации умений ANONы, version 2',
        technologies: ['Vue', 'TypeScript', 'React'],
        link: 'https://github.com/AnyonaDavydova/PersonalSite',
    },
    {
        id: 3,
        title: 'Woodland',
        description: 'Браузерная игра, вдохновленная Geometry Dash',
        technologies: ['Vue','TypeScript', 'Electron'],
        link: 'https://github.com/AnyonaDavydova/WoodLand',
    }
 ];