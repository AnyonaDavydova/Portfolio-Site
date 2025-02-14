import axios, { AxiosInstance } from 'axios';
import { Project } from '../types/Project';

const GITHUB_API_URL = 'https://api.github.com';
const DEFAULT_DESCRIPTION = 'Описание не указано';
const ERROR_FETCH_LANGUAGES = 'Ошибка при загрузке языков для репозитория';
const ERROR_FETCH_REPOS = 'Не удалось загрузить репозитории с GitHub. Проверьте имя пользователя и токен.';
const ERROR_GENERAL_FETCH = 'Ошибка при загрузке репозиториев с GitHub';
const ERROR_NO_LANGUAGES = 'Нет языков для репозитория';
const ERROR_INVALID_USERNAME = 'Некорректное имя пользователя';
const ERROR_INVALID_TOKEN = 'Некорректный токен';

interface GitHubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: GITHUB_API_URL,
});

const token = localStorage.getItem('githubToken');

axiosInstance.interceptors.request.use(
    (config) => {
        if (token) {
            config.headers['Authorization'] = `token ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(ERROR_GENERAL_FETCH, error);
        return Promise.reject(error);
    }
);

export const fetchRepos = async (username: string): Promise<Project[]> => {
    if (typeof username !== 'string' || username.trim() === '') {
        throw new Error(ERROR_INVALID_USERNAME);
    }

    if (token && (typeof token !== 'string' || token.trim() === '')) {
        throw new Error(ERROR_INVALID_TOKEN);
    }

    try {
        const response = await axiosInstance.get<GitHubRepo[]>(`/users/${username}/repos`);

        const repos = response.data;

        const projects: Project[] = await Promise.all(
            repos.map(async (repo) => {
                try {
                    const languages = await fetchRepoLanguages(username, repo.name);

                    return {
                        id: String(repo.id),
                        title: repo.name,
                        description: repo.description || DEFAULT_DESCRIPTION,
                        technologies: languages,
                        link: repo.html_url,
                    };
                } catch (error) {
                    console.error(`${ERROR_FETCH_LANGUAGES} "${repo.name}":`, error);
                    return {
                        id: String(repo.id),
                        title: repo.name,
                        description: repo.description || DEFAULT_DESCRIPTION,
                        technologies: [],
                        link: repo.html_url,
                    };
                }
            })
        );

        return projects;
    } catch (error: unknown) {
        if (error instanceof Error) {
            const customError = new Error(ERROR_FETCH_REPOS);
            customError.cause = error;
            console.error(ERROR_GENERAL_FETCH, error);
            throw customError;
        }
        console.error(ERROR_GENERAL_FETCH, error);
        throw new Error(ERROR_FETCH_REPOS);
    }
};

const languagesCache: Record<string, string[]> = {};

const fetchRepoLanguages = async (username: string, repoName: string): Promise<string[]> => {
    const cacheKey = `${username}-${repoName}`;

    if (languagesCache[cacheKey]) {
        console.log(`Используем кешированные данные для "${repoName}"`);
        return languagesCache[cacheKey];
    }

    try {
        const response = await axiosInstance.get<Record<string, number>>(
            `/repos/${username}/${repoName}/languages`
        );

        const languages = Object.keys(response.data);

        if (languages.length === 0) {
            console.warn(`${ERROR_NO_LANGUAGES} "${repoName}"`);
        } else {
            languagesCache[cacheKey] = languages;
        }

        return languages;
    } catch (error) {
        console.error(`${ERROR_FETCH_LANGUAGES} "${repoName}":`, error);
        return [];
    }
};