import axios from 'axios';
import { PlayerType } from '../../../../types/gametypes';

export const getPlayer = (key: String): Promise<PlayerType> => {
  return axios.put(`http://localhost:8080/api/player/${key}`).then((res) => {
    return res.data;
  });
};
