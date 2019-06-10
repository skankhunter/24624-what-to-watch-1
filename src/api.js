import axios from "axios";
import history from "./history";

export const createAPI = () => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/wtw`,
    timeout: 5000,
    withCredentials: true
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.status === 403) {
      history.push(`/login`);
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
