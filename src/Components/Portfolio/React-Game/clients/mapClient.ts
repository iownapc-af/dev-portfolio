import axios from 'axios';

export const getMapContents = (mapId: Number): Promise<String[]> => {
  return axios.get(`http://localhost:8080/api/map/${mapId}`).then((res) => {
    return res.data.map;
  });
};
