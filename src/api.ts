import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:44358", // Replace with the actual URL of your API
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors here
    if (error.response) {
      if (error.response.status === 400) {
        // Bad request, handle validation errors or other cases
        const errorMessage = error.response.data.message || 'Bad request';
        return Promise.reject(errorMessage);
      } else if (error.response.status === 404) {
        // Not found
        return Promise.reject('Not found');
      } else if (error.response.status === 500) {
        // Internal server error
        return Promise.reject('Internal server error');
      }
    }
    return Promise.reject('An error occurred');
  }
);

export default api;
