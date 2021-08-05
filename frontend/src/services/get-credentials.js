import axios from 'axios';

const API_URL = 'http://localhost:8000/api/manager/'

// function to get all saved credentials of user
const GetCredentialls = () => {
  const headers = {
    'Authorization': `Bearer ${localStorage.getItem(access)}`
  }

  return axios.post(`${API_URL}all-credentialls/`)

}
