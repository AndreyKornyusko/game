import axios from 'axios';

axios.defaults.baseURL = 'https://json-server-258905.appspot.com';

export const getAllFightersItems = async () => {
  const response = await axios.get('/fighters');
  return response.data;
};


export const getFightersItemById = async id => {
  const response = await axios.get(`/fighters/${id}`);
  // console.log("response.fighter", response.data);
  return response.data;
};