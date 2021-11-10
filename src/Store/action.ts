import { PlayerDirection } from '../types/PlayerAction';
import { Tab, Project } from '../types/Tab';
// import { PlayerAction } from '../types/PlayerAction';

export type Action =
  | { type: 'SET_TAB_SELECTED'; tabSelected: Tab }
  | { type: 'SET_SELECTED_PROJECT'; selectedProject: Project }
  | { type: 'UPDATE_PLAYER_COORDS'; updatePlayerCoords: [number, number] }
  | { type: 'UPDATE_PLAYER_DIRECTION'; updatePlayerDirection: PlayerDirection }
  | { type: 'UPDATE_MAP'; updateMap: string[][] };
