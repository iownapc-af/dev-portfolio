import { Tab } from '../types/Tab';
import { Action } from './action';

interface State {
  showAboutModal: boolean;
  showContactModal: boolean;
  tabSelected: Tab;
  selectedProject: string | null;
}

export const defaultState: State = {
  showAboutModal: false,
  showContactModal: false,
  tabSelected: 'home',
  selectedProject: null,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const Reducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case 'SHOW_ABOUT_MODAL':
      return {
        ...state,
        showAboutModal: action.showAboutModal,
      };
    case 'SHOW_CONTACT_MODAL':
      return {
        ...state,
        showContactModal: action.showContactModal,
      };
    case 'SET_TAB_SELECTED':
      return {
        ...state,
        tabSelected: action.tabSelected,
      };
    case 'SET_SELECTED_PROJECT':
      return {
        ...state,
        selectedProject: action.selectedProject,
      };
    default:
      return state;
  }
};
