import { Tab, Project } from '../types/Tab';

export type Action =
  | { type: 'SHOW_ABOUT_MODAL'; showAboutModal: boolean }
  | { type: 'SHOW_CONTACT_MODAL'; showContactModal: boolean }
  | { type: 'SET_TAB_SELECTED'; tabSelected: Tab }
  | { type: 'SET_SELECTED_PROJECT'; selectedProject: Project };
