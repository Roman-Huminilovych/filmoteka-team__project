import { createMarkup } from '../search/render-search-query';
import { queueList } from '../library/queue-add';

export function deleteFromQueue(evt) {
  const id = +evt.target.dataset.id;
  let queueList = JSON.parse(localStorage.getItem('queueList'));
  queueList = queueList.filter(item => item.id !== id);
  localStorage.setItem('queueList', JSON.stringify(queueList));
  createMarkup(queueList);
}

export function deleteFromWatched(evt) {
  const id = +evt.target.dataset.id;
  let watchedList = JSON.parse(localStorage.getItem('watchedList'));
  watchedList = watchedList.filter(item => item.id !== id);
  localStorage.setItem('watchedList', JSON.stringify(watchedList));
  createMarkup(watchedList);
}

export function removewatchedToQueue(evt) {
  const id = +evt.target.dataset.id;
  let watchedList = JSON.parse(localStorage.getItem('watchedList'));
  watchedList = watchedList.filter(item => item.id !== id);
  localStorage.setItem('watchedList', JSON.stringify(watchedList));
  createMarkup(watchedList);
  console.log('deleteFromWatched выполняется 2');
}
