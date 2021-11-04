import { Tab } from '../types/Tab';
import { Action } from './action';

interface State {
  tabSelected: Tab;
  selectedProject: string | null;
}

export const defaultState: State = {
  tabSelected: 'home',
  selectedProject: null,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const Reducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
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
