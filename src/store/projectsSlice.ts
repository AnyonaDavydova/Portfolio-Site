import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../types/Project';

interface ProjectsState {
    items: Project[];
}

const initialState: ProjectsState = {
    items: [],
};

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
});

export const { setProjects, addProject } = projectsSlice.actions;
export default projectsSlice.reducer;
