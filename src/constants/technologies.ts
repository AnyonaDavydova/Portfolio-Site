export const TECHNOLOGIES: readonly string[] = [
    'React', 'TypeScript', 'JavaScript', 'Unity', 'Vue', 'Electron'
];

export const ALL_TECHNOLOGIES = "All";

export const ERROR_MESSAGES = {
    requiredTitle: 'Название проекта обязательно',
    requiredDescription: 'Описание проекта обязательно',
    requiredTechnologies: 'Указать технологии тоже обязательно',
    requiredLink: 'Ссылка на проект обязательна',
    invalidTechnologies: `Допустимые технологии: ${TECHNOLOGIES.join(', ')}`,
    invalidLink: 'Некорректный URL',
    invalidUrl: 'Неверный формат ссылки',
    maxTitleLength: 'Название не должно превышать 100 символов',
    invalidTitlePattern: 'Название может содержать только буквы, цифры, пробелы и дефисы'
};