import Notiflix from 'notiflix';
import { getMovies } from '../fetch-functions/get-movies';
import { watchedList } from './watched-add';

//список фильмов для рендера странички
const queueList = JSON.parse(localStorage.getItem('queueList')) || [];

//кнопка добавления фильма в список (на модалке)

export async function addToQueueOnClick(e) {
  const movieId = e.target.closest('.modal').dataset.id;
  const path = `/movie/${movieId}`;
  const movie = await (await getMovies(path)).data;
  movie.genre_ids = movie.genres.map(genre => genre.id);
  const messageInQueue = `"${movie.title}" is already added to the queue.`;
  const messageWatched = `You have already watched ${movie.title}.`;
  const messageAddedtoQueue = `${movie.title} was added to the queue.`;

  // проверка на наличие в очереди
  if (queueList.find(item => item.id === +movieId)) {
    return Notiflix.Notify.warning(messageInQueue);
  }
  // проверка в просмотренных
  else if (watchedList.find(item => item.id === +movieId)) {
    return Notiflix.Notify.warning(messageWatched);
  } else {
    queueList.push(movie);
    localStorage.setItem('queueList', JSON.stringify(queueList));
    return Notiflix.Notify.success(messageAddedtoQueue);
  }
}
