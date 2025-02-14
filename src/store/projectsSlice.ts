import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchRepos } from '../services/githubService';
import { Project, ProjectStatus } from '../types/Project';
import { loadFromLocalStorage, saveToLocalStorage } from '../localStorage';

export const loadProjectsWithFallback = createAsyncThunk<Project[], string>(
    'projects/loadWithFallback',
    async (username, { rejectWithValue }) => {
        try {
            const projects = await fetchRepos(username);
            saveToLocalStorage('projects', projects);
            return projects;
        } catch (error) {
            const savedProjects = loadFromLocalStorage<Project[]>('projects');
            if (savedProjects) {
                return savedProjects;
            }
            return rejectWithValue(error instanceof Error ? error.message : 'Ошибка загрузки');
        }
    }
);

interface ProjectsState {
    items: Project[];
    status: ProjectStatus;
    error: string | null;
}

const initialState: ProjectsState = {
    items: [],
    status: ProjectStatus.Idle,
    error: null,
};

export const fetchProjectsFromGitHub = createAsyncThunk<Project[], string>(
    'projects/fetchFromGitHub',
    async (username, { rejectWithValue }) => {
        try {
            const projects = await fetchRepos(username);
            saveToLocalStorage('projects', projects);
            return projects;
        } catch (error) {
            const savedProjects = loadFromLocalStorage<Project[]>('projects');
            if (savedProjects) {
                return savedProjects;
            }
            return rejectWithValue(error instanceof Error ? error.message : 'Ошибка загрузки');
        }
    }
);

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects(state, action: PayloadAction<Project[]>) {
            state.items = action.payload;
        },
        addProject(state, action: PayloadAction<Project>) {
            state.items.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectsFromGitHub.pending, (state) => {
                state.status = ProjectStatus.Loading;
                state.error = null;
            })
            .addCase(fetchProjectsFromGitHub.fulfilled, (state, action) => {
                state.status = ProjectStatus.Succeeded;
                state.items = action.payload;
            })
            .addCase(fetchProjectsFromGitHub.rejected, (state, action) => {
                state.status = ProjectStatus.Failed;
                state.error = action.payload as string;
            });
    },
});

export const { setProjects, addProject } = projectsSlice.actions;
export default projectsSlice.reducer;
