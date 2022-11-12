import { createMarkup } from '../search/render-search-query';
import Notiflix from 'notiflix';

const container = document.querySelector('.films');
//кнопка "QUEUE" на странице библиотеки
const renderQueueBtn = document.querySelector('button#queue-btn');
const renderWatchedBtn = document.querySelector('button#watched-btn');

export function renderQueue() {
  queueMarkup();
  renderQueueBtn.addEventListener('click', queueMarkup);
  renderQueueBtn.addEventListener('click', toggleActiveBtns);
}

function toggleActiveBtns() {
  renderQueueBtn.classList.add('active');
  renderQueueBtn.disabled = true;
  renderWatchedBtn.classList.remove('active');
  renderWatchedBtn.disabled = false;
}

function queueMarkup() {
  container.innerHTML = '';
  const queueList = JSON.parse(localStorage.getItem('queueList'));

  //ЗДЕСЬ МОЖНО ВСТАВИТЬ ФУНКЦИЮ СПИННЕРА, ПОКА РЕНДЕРИТСЯ РАЗМЕТКА

  if (!queueList) {
    Notiflix.Notify.info(
      'Your queue is empty. You can add movies to queue on main page.'
    );
    return;
  }

  return createMarkup(queueList);
}
