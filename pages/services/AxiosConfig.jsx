import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // L'URL du back-end Express.js
  headers: {
    "Content-Type": "application/json", // Ajoute un header pour les requêtes JSON
  },
});

export default axiosInstance;
