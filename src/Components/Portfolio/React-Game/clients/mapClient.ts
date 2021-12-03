import axios from 'axios';

export const getMapContents = (): Promise<String[]> => {
  return axios.get('http://localhost:8080/api/map/0').then((res) => {
    return res.data.map;
  });
};
