import { getMovieById } from './fetch-functions/get-movie-info';
import { activateModalBtns } from './modal/activate-movie-modal';
import { renderModalFilm } from './modal/render-modal';

export async function onMovieCardClick(evt) {
  evt.preventDefault();
  const currentItem = evt.target.closest('li');
  let id = +currentItem.dataset.id;

  try {
    document.querySelector('body').classList.add('modal-open');

    const movieInfo = await (await getMovieById(id)).data;
    renderModalFilm({ movieInfo });
    activateModalBtns();
  } catch (error) {
    console.log(error);
  }
}
