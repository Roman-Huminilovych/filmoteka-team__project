//F15, F19
import Notiflix from 'notiflix';
import { getMovies } from './get-movies';


//список фильмов для рендера странички
const queueList = JSON.parse(localStorage.getItem("queueList")) || [];

//кнопка добавления фильма в список (на модалке)

export async function addToQueueOnClick (e) {
    const movieId = e.target.closest('.modal').dataset.id;
    const path = `/movie/${movieId}`;
    const movie = await (await getMovies(path)).data;
    movie.genre_ids = movie.genres.map(genre => genre.id);

    !queueList.find(item => item.id === +movieId) ? queueList.push(movie) : Notiflix.Notify.warning(`"${movie.title}" is already added to the queue`);

    localStorage.setItem('queueList', JSON.stringify(queueList));
}







