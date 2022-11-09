import * as basicLightbox from 'basiclightbox';
import { getMovieById } from './get-movie-info';
import modalFilm from '../templates/modalFilm.hbs';

const backdrop = document.querySelector('.backdrop');
const modalBtn = document.querySelector('.modal-close-btn');
const films = document.querySelector('.films');

films.addEventListener('click', onOpenModal);
export function onOpenModal(evt) {
  evt.preventDefault();
  console.log(evt);
  const currentItem = evt.target.closest('li');
  console.log(currentItem);
  let id = +currentItem.dataset.id;
  async function onMovieClick() {
    try {
      const movieInfo = await (await getMovieById(id)).data;
      console.log('movieInfo', movieInfo);
      backdrop.innerHTML = modalFilm(movieInfo.results);
      renderModalFilm({ movieInfo });
    } catch (error) {
      console.log(error.message);
    }
  }
  onMovieClick();

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
      instance.close();
      backdrop.classList.add('is-hidden');
    }
  }

  modalBtn.addEventListener('click', onCloseModalBtn);
  function onCloseModalBtn(evt) {
    instance.close();
    backdrop.classList.add('is-hidden');
  }

  backdrop.addEventListener('click', onCloseModalBack);
  function onCloseModalBack(evt) {
    if (evt.target === evt.currentTarget) {
      instance.close();
      backdrop.classList.add('is-hidden');
    }
  }
}

export function renderModalFilm(film) {
  backdrop.insertAdjacentHTML('beforeend', modalFilm(film));
}
