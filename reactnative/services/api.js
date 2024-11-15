import axios from 'axios';

// Replace 'http://localhost:8080' with your server's IP address if using a physical device
const api = axios.create({

  //baseURL: 'http://192.168.48.194:8080' // Update this IP to match your server's IP address
  //baseURL:'http://localhost:8080',
  baseURL:'http://192.168.43.151:8080'
});

export default api;
