import { Login } from '@/api/model/Login';
import ENV from '@/constants/KeyManagerConstants';
import axios from 'axios';

const performAuth = async (
  userLogin: Login
): Promise<{ data: { token: string } }> => {
  console.log(`Calling: ${ENV.API.AUTH_URL}/`);
  return await axios.post(`${ENV.API.AUTH_URL}`, userLogin);
};

const registerSuccessfullLogin = (token: string): void => {
  setupAxiosInterceptors(token);
};

const setupAxiosInterceptors = (token: string): void => {
  axios.interceptors.request.use((config) => {
    if (token) {
      console.log('token is adquired', token);
      config.headers.authorization = token;
    }
    return config;
  });
};

export { performAuth, registerSuccessfullLogin };
