import Notiflix from 'notiflix';
import { getMovies } from './get-movies';


//список фильмов для рендера странички
const watchedList = JSON.parse(localStorage.getItem("watchedList")) || [];

//кнопка добавления фильма в список (на модалке)

export async function addToWatchedOnClick (e) {
    const movieId = e.target.closest('.modal').dataset.id;
    const path = `/movie/${movieId}`;
    const movie = await (await getMovies(path)).data;
    movie.genre_ids = movie.genres.map(genre => genre.id);


    !watchedList.find(item => item.id === +movieId) ? watchedList.push(movie) : Notiflix.Notify.warning(`"${movie.title}" is already added to the watched list.`);

    localStorage.setItem('watchedList', JSON.stringify(watchedList));
}