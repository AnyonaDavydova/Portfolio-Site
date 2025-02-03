import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../types/Project';

interface ProjectsState {
    items: Project[];
}

const initialState: ProjectsState = {
    items: [],
};

const isDuplicate = (state: ProjectsState, project: Project): boolean => {
    return state.items.some((existingProject) => existingProject.id === project.id);
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects(state, action: PayloadAction<Project[]>) {
            state.items = action.payload.filter(
                (project, index, self) => self.findIndex(p => p.id === project.id) === index
            );
        },
        addProject(state, action: PayloadAction<Project>) {
            if (!isDuplicate(state, action.payload)) {
                state.items.push(action.payload);
            } else {
                console.warn(`Проект с ID ${action.payload.id} уже существует и не был добавлен.`);
            }
        },
    },
});

export const { setProjects, addProject } = projectsSlice.actions;
export default projectsSlice.reducer;
