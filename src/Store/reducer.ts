import { Tab } from '../types/Tab';
import { PlayerDirection } from '../types/PlayerAction';
import { Action } from './action';

interface State {
  tabSelected: Tab;
  selectedProject: string | null;

  indexMap: number;
  overworld: string[][][];
  rooms: string[][][];

  player: {
    playerCoords: [number, number];
    playerDirection: PlayerDirection;
  };
}

export const defaultState: State = {
  tabSelected: 'portfolio',
  selectedProject: 'porjec 2',

  indexMap: 0,
  overworld: [
    [
      '##################################################'.split(''),
      '#                                                #'.split(''),
      '#    11111            #                          #'.split(''),
      '#   1111111    #                                 #'.split(''),
      '#   1111111                                      #'.split(''),
      '#   111:111    #                                 #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                        :                       #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '##################################################'.split(''),
    ],
    [
      '##################################################'.split(''),
      '#                                                #'.split(''),
      '#   #######      #                               #'.split(''),
      '#   #     #      ##                              #'.split(''),
      '#   #     #      # #                             #'.split(''),
      '#   ###:###      #  #                            #'.split(''),
      '#                #   #                           #'.split(''),
      '#                     #                          #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#########################:########################'.split(''),
    ],
    [
      '##################################################'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '#                                                #'.split(''),
      '##################################################'.split(''),
    ],
  ],

  rooms: [
    [
      '##########'.split(''),
      '#        #'.split(''),
      '# ##     #'.split(''),
      '#        #'.split(''),
      '####:#####'.split(''),
    ],
    [
      '##########'.split(''),
      '#     ## #'.split(''),
      '#        #'.split(''),
      '#        #'.split(''),
      '##########'.split(''),
    ],
  ],

  player: {
    playerCoords: [2, 2],
    playerDirection: 'south',
  },
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const Reducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case 'RESET_GAME':
      return defaultState;

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
        player: {
          playerCoords: action.updatePlayerCoords,
          playerDirection: state.player.playerDirection,
        },
      };
    case 'UPDATE_PLAYER_DIRECTION':
      return {
        ...state,
        player: {
          playerCoords: state.player.playerCoords,
          playerDirection: action.updatePlayerDirection,
        },
      };
    case 'UPDATE_MAP':
      return {
        ...state,
        overworld: action.updateMap,
      };
    case 'UPDATE_INDEX_MAP':
      return {
        ...state,
        indexMap: action.updateIndexMap,
      };
    default:
      return state;
  }
};
