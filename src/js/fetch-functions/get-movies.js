import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '8cb2067df7427c657a5f093d2a8e51ae';

export function getMovies(path, page = 1, query = '') {
    if(query) {
        return axios.get(`${BASE_URL}/${path}?api_key=${API_KEY}&&query=${query}&page=${page}`)
    }

    return axios.get(`${BASE_URL}/${path}?api_key=${API_KEY}&page=${page}`);
}
