import { getMovies } from './get-movies';

async function getMovieById(id) {
  const path = `/movie/${id}`;
  return await getMovies(path);
}
