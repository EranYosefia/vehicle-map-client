import axios from 'axios';

const instance = axios.create({
    baseURL: 
    process.env.NODE_ENV === 'development' 
    ? 
    'http://localhost:8000/api/vehicles' 
    :
    'https://vehicle-map-server-eranyo.onrender.com/api/vehicles',

    headers: {
      'Content-Type': 'application/json',
    },
  });

  export default instance;