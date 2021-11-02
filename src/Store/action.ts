import { Tab } from '../types/Tab';

export type Action =
  | { type: 'SHOW_ABOUT_MODAL'; showAboutModal: boolean }
  | { type: 'SHOW_CONTACT_MODAL'; showContactModal: boolean }
  | { type: 'SET_TAB_SELECTED'; tabSelected: Tab };
