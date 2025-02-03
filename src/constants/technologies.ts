export const TECHNOLOGIES: readonly string[] = [
    'React', 'TypeScript', 'JavaScript', 'Unity', 'Vue', 'Electron'
];

export const ERROR_MESSAGES = {
    INVALID_TECH: `Допустимые технологии: ${TECHNOLOGIES.join(', ')}`,
    REQUIRED_TITLE: 'Название проекта обязательно',
    INVALID_URL: 'Введите корректный URL',
};
