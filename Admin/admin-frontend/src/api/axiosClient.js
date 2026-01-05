import axios from "axios";

const baseURL = process.env.NODE_ENV === 'development' 
  ? '' // In development, proxy in package.json handles routing to localhost:8181
  : 'http://localhost:8181'; // In production, use absolute URL

export default axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});
