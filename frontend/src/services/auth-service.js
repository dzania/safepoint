import axios from "axios";

const API_URL = "http://localhost:8000/";

const register = (
  username,
  email,
  first_name,
  last_name,
  password,
  password2
) => {
  return axios.post(API_URL + "api/user/register/", {
    username,
    email,
    first_name,
    last_name,
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
        localStorage.setItem("username", username);
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

const getCurrentUserName = () => {
  return localStorage.getItem("username");
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getCurrentUserName,
};
