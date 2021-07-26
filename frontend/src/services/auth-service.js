import axios from "axios";

const API_URL = "http://localhost:8000/";

const register = (username, email, password,password2) => {
  return axios.post(API_URL + "api/user/register/", {
    username,
    email,
    password,
    password2,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "api/token/", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.access) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
