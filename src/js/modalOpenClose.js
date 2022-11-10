import * as basicLightbox from 'basiclightbox';
import { getMovieById } from './get-movie-info';
import modalFilm from '../templates/modalFilm.hbs';
import { addToQueueOnClick } from './queue-add'; 
import { addToWatchedOnClick } from './watched-add';

const backdrop = document.querySelector('.backdrop');
const films = document.querySelector('.films');

films.addEventListener('click', onOpenModal);
export function onOpenModal(evt) {
  evt.preventDefault();
  const currentItem = evt.target.closest('li');
  let id = +currentItem.dataset.id;
  async function onMovieClick() {
    try {
      const movieInfo = await (await getMovieById(id)).data;
      backdrop.innerHTML = modalFilm(movieInfo.results);
      renderModalFilm({ movieInfo });
    } catch (error) {
      console.log(error.message);
    }
  }

  onMovieClick().then(() => {
    const modalBtn = document.querySelector('.modal .modal-close-btn');
    const addToQueueBtn = document.querySelector('.modal__btn--queue');
    const addToWatchedBtn = document.querySelector('.modal__btn--watched');
    modalBtn.addEventListener('click', closeModal);
    addToQueueBtn.addEventListener('click', addToQueueOnClick);
    addToWatchedBtn.addEventListener('click', addToWatchedOnClick); 

  });

  backdrop.classList.remove('is-hidden');

  const instance = basicLightbox.create(backdrop, {
    onShow: () => {
      document.addEventListener('keydown', onCloseModalEsc); 
    },
    onClose: () => {
      document.removeEventListener('keydown', onCloseModalEsc);
    },
  });
  instance.show();

  function onCloseModalEsc(evt) {
    if (evt.code === 'Escape') {
      closeModal();
    }
  }

  backdrop.addEventListener('click', onCloseModalBack);
  function onCloseModalBack(evt) {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  }

  function closeModal() {
    const addToQueueBtn = document.querySelector('.modal__btn--queue');
    addToQueueBtn.removeEventListener('click', addToQueueOnClick); 

    const addToWatchedBtn = document.querySelector('.modal__btn--watched');
    addToWatchedBtn.removeEventListener('click', addToWatchedOnClick);

    instance.close();
    backdrop.classList.add('is-hidden');
  }
}

function renderModalFilm(film) {
  backdrop.innerHTML = modalFilm(film);
  const votes = document.querySelector('.modal__attributes-vote');
  const popularity = document.querySelector('.modal__attributes-text--popular');
  votes.textContent = votes.textContent % 1 === 0 ? votes.textContent : (+votes.textContent).toFixed(1);
  popularity.textContent = popularity.textContent % 1 === 0 ? popularity.textContent : (+popularity.textContent).toFixed(1);

}
