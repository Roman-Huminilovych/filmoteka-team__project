import { getMovies } from "./get-movies";

export async function getGenres() {
    const path = 'genre/movie/list';
    const genres = await (await getMovies(path)).data.genres;
    localStorage.setItem('genres', JSON.stringify(genres));
}