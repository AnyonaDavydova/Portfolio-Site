export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    link: string;
}

export enum ProjectStatus {
    Idle = 'idle',
    Loading = 'loading',
    Succeeded = 'succeeded',
    Failed = 'failed',
}