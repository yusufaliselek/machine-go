import axios from 'axios';

// axios config
const api = axios.create({
  baseURL: "https://localhost:7230/api",
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