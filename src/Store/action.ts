import { Tab, Project } from '../types/Tab';

export type Action =
  | { type: 'SET_TAB_SELECTED'; tabSelected: Tab }
  | { type: 'SET_SELECTED_PROJECT'; selectedProject: Project };
