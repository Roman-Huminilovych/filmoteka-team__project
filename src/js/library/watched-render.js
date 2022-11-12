import { createMarkup } from '../search/render-search-query';
import Notiflix from 'notiflix';
const container = document.querySelector('.films');
//кнопка "QUEUE" на странице библиотеки
const renderQueueBtn = document.querySelector('button#queue-btn');
const renderWatchedBtn = document.querySelector('button#watched-btn');
// const watchedList = JSON.parse(localStorage.getItem("watchedList"));

export function renderWatched() {
  renderWatchedBtn.addEventListener('click', watchedMarkup);
  renderWatchedBtn.addEventListener('click', toggleActiveBtns);
}

function toggleActiveBtns() {
  renderQueueBtn.classList.remove('active');
  renderQueueBtn.disabled = false;
  renderWatchedBtn.classList.add('active');
  renderWatchedBtn.disabled = true;
}

function watchedMarkup() {
  container.innerHTML = '';

  //ЗДЕСЬ МОЖНО ВСТАВИТЬ ФУНКЦИЮ СПИННЕРА, ПОКА РЕНДЕРИТСЯ РАЗМЕТКА

  const watchedList = JSON.parse(localStorage.getItem('watchedList'));
  if (!watchedList) {
    Notiflix.Notify.info(
      'Your watched is empty. You can add movies to watched on main page.'
    );
    return;
  }

  return createMarkup(watchedList);
}
