import { getMovies } from '../get-movies';

export async function makeGenres(selector, page) {
  const genreFields = document.querySelectorAll(selector);

  const path = 'genre/movie/list';
  const genres = await (await getMovies(path)).data.genres;

  genreFields.forEach((item, idx) => {
    if (!page) {
      item.textContent = getGenreFromId(item.textContent, genres);
    }
    // обрабатывает только новые карточки
    if (idx >= (page - 1) * 20) {
      item.textContent = getGenreFromId(item.textContent, genres);
    }
  });
}

function getGenreFromId(id, genres) {
  const arrOfIds = id.split(',');
  const arrOfGenres = [];

  if (arrOfIds.length > 3) {
    arrOfIds.length = 3;
    arrOfIds[2] = 'Other';
  }

  arrOfIds.forEach(i => {
    if (i === 'Other') {
      arrOfGenres.push(i);
    } else {
      i && arrOfGenres.push(genres.find(genre => genre.id === +i).name);
    }
  });
  return arrOfGenres.join(', ');
}
