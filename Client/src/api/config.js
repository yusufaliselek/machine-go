import axios from 'axios';

// axios config
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    "Content-type": "application/json"
  }
});

export const appendKey = (object, form) => {
  // eslint-disable-next-line
  Object.keys(object).map((key) => {
    form.append(key, object[key]);
  });
}

export default api;