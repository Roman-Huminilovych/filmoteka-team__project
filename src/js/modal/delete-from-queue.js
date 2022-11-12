import { createMarkup } from '../search/render-search-query';

export function deleteFromQueue(evt) {
  const id = +evt.target.dataset.id;
  let queueList = JSON.parse(localStorage.getItem('queueList'));
  queueList = queueList.filter(item => item.id !== id);
  localStorage.setItem('queueList', JSON.stringify(queueList));
  createMarkup(queueList);
}
