import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
//request interceptor to add the auth token header to requests
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("user");
    if (accessToken) {
      config.headers["Authorization"] = accessToken.acces;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    let refreshToken = JSON.parse(localStorage.getItem("user")).refresh;
    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios
        .post(`${API_URL}/api/token/refresh`, { refreshToken: refreshToken })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("user", res.data);
            console.log("Access token refreshed!");
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

const getAllCredentials = () => {
  return instance.get(`${API_URL}manager/credentials/`, {
    headers: authHeader(),
  });
};

const addCredenetials = (website, login, password) => {
  const user = JSON.parse(localStorage.getItem("user")).user_id
  console.log(user)
  const credential = {user:user, website: website, login: login, password: password };
  return instance.post(`${API_URL}manager/credentials/`, credential, {
    headers: authHeader(),
  });
};

const updateCredentials = (body) => {
  return instance.put(`${API_URL}manager/credentials/`, {
    headers: authHeader(),
  });
};

const deleteCredentials = (id) => {
  return instance.delete(`${API_URL}manager/credential/${id}`, {
    headers: authHeader(),
  });
};

export default {
  getAllCredentials,
  addCredenetials,
  updateCredentials,
  deleteCredentials,
};
