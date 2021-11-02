import { Action } from './action';

interface State {
  showAboutModal: boolean;
  showContactModal: boolean;
  tabSelected: string;
}

export const defaultState: State = {
  showAboutModal: false,
  showContactModal: false,
  tabSelected: 'Home',
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
    default:
      return state;
  }
};
