import { getMovies } from './get-movies';

export async function getMovieById(id) {
  const path = `/movie/${id}`;
  return await getMovies(path);
}
