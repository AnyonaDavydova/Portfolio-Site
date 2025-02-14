import { Project } from "./Project";

export type PrjFormInputs = Pick<Project, "title" | "description" | "link"> & {
  technologies: string; 
};