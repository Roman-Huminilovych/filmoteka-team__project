import Notiflix from 'notiflix';
import { getMovies } from '../fetch-functions/get-movies';
import { createMarkup } from '../search/render-search-query';

//список фильмов для рендера странички
export const watchedList =
  JSON.parse(localStorage.getItem('watchedList')) || [];

//кнопка добавления фильма в список (на модалке)

export async function addToWatchedOnClick(e) {
  const movieId = e.target.closest('.modal').dataset.id;
  const path = `/movie/${movieId}`;
  const movie = await (await getMovies(path)).data;
  movie.genre_ids = movie.genres.map(genre => genre.id);
  const messageWatched = `"${movie.title}" is already added to the watched list.`;

  if (watchedList.find(item => item.id === +movieId)) {
    return Notiflix.Notify.warning(messageWatched);
  } else {
    movie.watched = true;
    watchedList.push(movie);
    localStorage.setItem('watchedList', JSON.stringify(watchedList));
    Notiflix.Notify.success(`You added the "${movie.title}" to Watched!`);
  }

  let queueList = JSON.parse(localStorage.getItem('queueList'));

  if (queueList.find(item => item.id === +movieId)) {
    queueList = queueList.filter(item => item.id !== +movieId);
    //обновляет очередь без просмотренного фильма
    if (document.querySelector('#queue-btn.active')) {
      createMarkup(queueList);
    }
    // удаляет пустой массив фильмов или перезаписывает
    if (!queueList) {
      localStorage.removeItem('queueList');
    } else {
      localStorage.setItem('queueList', JSON.stringify(queueList));
    }

    // уведомление об оставшихся в очереди фильмах
    if (!queueList.length) {
      const messageAllWatched = `Great! You have watched all the movies from your queue. It's time for... More movies!`;
      Notiflix.Notify.info(messageAllWatched);
    } else if (queueList.length === 1) {
      const messageMovieInQueue = `Nice! You have 1 great movie left in the queue.`;
      Notiflix.Notify.info(messageMovieInQueue);
    } else {
      const messageMoviesInQueue = `Nice! You have ${queueList.length} great movies left in the queue.`;
      Notiflix.Notify.info(messageMoviesInQueue);
    }
  }
}
