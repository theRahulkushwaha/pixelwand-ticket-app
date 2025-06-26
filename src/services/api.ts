import axios from 'axios';

const API_URL = 'http://192.168.1.6:3001/events';


export const fetchEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
