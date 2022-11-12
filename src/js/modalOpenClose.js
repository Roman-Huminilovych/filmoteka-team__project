import { getMovieById } from './get-movie-info';
import modalFilm from '../templates/modalFilm.hbs';
import { addToQueueOnClick } from './queue-add';
import { addToWatchedOnClick } from './watched-add';
import { deleteFromQueue } from './secondary-functions/delete-from-queue';

const backdrop = document.querySelector('.backdrop__movie-info');

export async function onOpenModal(evt) {
  evt.preventDefault();
  const currentItem = evt.target.closest('li');
  let id = +currentItem.dataset.id;
  
  async function createModal() {
    try {
      document.querySelector('body').classList.add('modal-open');

      const movieInfo = await (await getMovieById(id)).data;
      renderModalFilm({ movieInfo });
      backdrop.classList.remove('is-hidden');    
    } 
    catch (error) {
      console.log(error.message);
    }
  }

  // добавление слушателей после создания модального окна
  createModal().then(() => {
    const modalCloseBtn = document.querySelector('.modal .modal-close-btn');
    const addToQueueBtn = document.querySelector('.modal__btn--queue');
    const addToWatchedBtn = document.querySelector('.modal__btn--watched');
    const removeBtn = document.querySelector('.modal__btn--queue-remove');
    
    document.addEventListener('keydown', onCloseModalEsc);
    // закрывает модальное окно по клику вне модального окна
    backdrop.addEventListener('click', onCloseModalBack); 
    modalCloseBtn.addEventListener('click', closeModal);

    // для страницы "просмотренные"
    if (document.querySelector('#watched-btn.active')) {
      const buttonList = document.querySelector('.library-cont');
      buttonList.style.display = 'none';
    } 
    // для страницы очереди
    else if (document.querySelector('#queue-btn.active')) {
      addToQueueBtn.style.display = 'none';

      removeBtn.addEventListener('click', deleteFromQueue);
      removeBtn.addEventListener('click', closeModal);
      addToWatchedBtn.addEventListener('click', addToWatchedOnClick);
      addToWatchedBtn.addEventListener('click', closeModal);
    } 
    // для домашней страницы
    else {
      removeBtn.style.display = 'none';

      addToQueueBtn.addEventListener('click', addToQueueOnClick);
      addToWatchedBtn.addEventListener('click', addToWatchedOnClick);
    }
  })
  .catch((error) => console.log(error.message));
}

function onCloseModalEsc(evt) {
    if (evt.code === 'Escape') {
      closeModal();
    }
  }

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

  backdrop.classList.add('is-hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseModalEsc);
}



function renderModalFilm(film) {
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
}
