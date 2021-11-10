import { Tab } from '../types/Tab';
import { Action } from './action';

interface State {
  tabSelected: Tab;
  selectedProject: string | null;

  map: string[][];

  player: {
    playerCoords: [number, number];
  };
}

export const defaultState: State = {
  tabSelected: 'portfolio',
  selectedProject: 'porjec 2',

  map: [
    '##################################################'.split(''),
    '#                                                #'.split(''),
    '#                     #                          #'.split(''),
    '#   ####                                         #'.split(''),
    '#                                                #'.split(''),
    '#              #                                 #'.split(''),
    '#                                                #'.split(''),
    '#                                                #'.split(''),
    '#                                                #'.split(''),
    '##################################################'.split(''),
  ],

  player: {
    playerCoords: [5, 5],
  },
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
    case 'UPDATE_PLAYER_COORDS':
      return {
        ...state,
        player: { playerCoords: action.updatePlayerCoords },
      };
    default:
      return state;
  }
};
