import { addToQueueOnClick } from '../library/queue-add';
import { addToWatchedOnClick } from '../library/watched-add';
import { deleteFromQueue } from './delete-from-queue';

export function activateModalBtns() {
  const refs = {
    backdrop: document.querySelector('.backdrop__movie-info'),
    modalCloseBtn: document.querySelector('.modal-close-btn'),
    addToQueueBtn: document.querySelector('.modal__btn--queue'),
    addToWatchedBtn: document.querySelector('.modal__btn--watched'),
    removeBtn: document.querySelector('.modal__btn--queue-remove'),
  };

  document.addEventListener('keydown', onCloseModalEsc);
  // закрывает модальное окно по клику вне модального окна
  refs.backdrop.addEventListener('click', onCloseModalBack);
  refs.modalCloseBtn.addEventListener('click', closeModal);

  // для страницы "просмотренные"
  if (document.querySelector('#watched-btn.active')) {
    const buttonList = document.querySelector('.modal__list-btn');
    buttonList.style.display = 'none';
  }
  // для страницы очереди
  else if (document.querySelector('#queue-btn.active')) {
    refs.addToQueueBtn.style.display = 'none';

    refs.removeBtn.addEventListener('click', deleteFromQueue);
    refs.removeBtn.addEventListener('click', closeModal);
    refs.addToWatchedBtn.addEventListener('click', addToWatchedOnClick);
    refs.addToWatchedBtn.addEventListener('click', closeModal);
  }
  // для домашней страницы
  else {
    refs.removeBtn.style.display = 'none';

    refs.addToQueueBtn.addEventListener('click', addToQueueOnClick);
    refs.addToWatchedBtn.addEventListener('click', addToWatchedOnClick);
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
    refs.addToQueueBtn = document.querySelector('.modal__btn--queue');
    refs.addToQueueBtn.removeEventListener('click', addToQueueOnClick);
    refs.addToWatchedBtn = document.querySelector('.modal__btn--watched');
    refs.addToWatchedBtn.removeEventListener('click', addToWatchedOnClick);

    refs.backdrop.classList.add('is-hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onCloseModalEsc);
  }
}
