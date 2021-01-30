import Axios from 'axios';
import { configure } from 'axios-hooks';
import LRU from 'lru-cache';

const BASE_URL = `api.openweathermap.org/data/2.5`;
const cache = new LRU({ max: 10 });
export let axiosInstance: any;

type ApiConfigParams = {
  isLoggedIn: boolean;
  authToken: string | null | undefined;
};
const initApiConfig = (params: ApiConfigParams) => {
  const { isLoggedIn, authToken = '' } = params;

  axiosInstance = Axios.create({
    baseURL: `https://${BASE_URL}`,
    timeout: 60000,
    headers: {
      'Content-Type': 'application/json',
      ...(isLoggedIn ? { 'Authorization': authToken } : {}),
    },
  });
  configure({ axios: axiosInstance, cache });
};

export default initApiConfig;
