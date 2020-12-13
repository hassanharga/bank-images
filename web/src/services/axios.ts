import axios from 'axios';

const token = localStorage.getItem('token') || '';
export default axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  },
});
