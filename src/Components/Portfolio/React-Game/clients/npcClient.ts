import axios from 'axios';
import { NPCtype } from '../../../../types/NPCtype';

export const getAllNPCs = (): Promise<NPCtype[]> => {
  return axios.get('http://localhost:8080/api/npc-moving').then((res) => {
    return res.data.npcs;
  });
};
