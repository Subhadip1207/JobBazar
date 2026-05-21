import axios from "axios";
import API_URL from "./api.js";

// Creating an axios instance with defaults
const axiosInstance = axios.create({
  baseURL: API_URL,       // backend URL from api.js
  withCredentials: true,  
});

export default axiosInstance;
