import { getMovieById } from './get-movie-info';
import modalFilm from '../templates/modalFilm.hbs';
import { activateModalBtns } from './secondary-functions/activate-movie-modal';

export async function onOpenModal(evt) {
  evt.preventDefault();
  const currentItem = evt.target.closest('li');
  let id = +currentItem.dataset.id;
  
  async function createModal() {
    try {
      document.querySelector('body').classList.add('modal-open');

      const movieInfo = await (await getMovieById(id)).data;
      renderModalFilm({ movieInfo });
      activateModalBtns();   
    } 
    catch (error) {
      console.log(error.message);
    }
  }
  createModal();
}

function renderModalFilm(film) {
  const backdrop = document.querySelector('.backdrop__movie-info');
  backdrop.innerHTML = modalFilm(film);
  const votes = document.querySelector('.modal__attributes-vote');
  const popularity = document.querySelector('.modal__attributes-text--popular');
  votes.textContent =
    votes.textContent % 1 === 0
      ? votes.textContent
      : (+votes.textContent).toFixed(1);
  popularity.textContent =
    popularity.textContent % 1 === 0
      ? popularity.textContent
      : (+popularity.textContent).toFixed(1);
  backdrop.classList.remove('is-hidden'); 
}
