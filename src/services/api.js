import axios from 'axios'

//Base URL:  https://api.themoviedb.org/3/
//URL da API : movie/now_playing?api_key=8715888b1f2eae09f86126cc6b37bd5c&language=pt-br

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
  });
  
  export default api;