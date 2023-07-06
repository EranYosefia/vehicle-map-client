import axios from 'axios';

const url = 
process.env.NODE_ENV === 'development' 
? 
'http://localhost:8000/api/vehicles/' 
:
'https://vehicle-map-server-eranyo.onrender.com/api/vehicles/';

const instance = axios.create({
    baseURL: url,

    headers: {
      'Content-Type': 'application/json',
    },
  });

  export default instance;