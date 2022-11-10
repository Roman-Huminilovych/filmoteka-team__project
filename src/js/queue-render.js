import {createMarkup} from './render-searchQuery';
const container = document.querySelector('.films');
//кнопка "QUEUE" на странице библиотеки
const renderQueueBtn = document.querySelector('button#queue-btn'); 
const renderWatchedBtn = document.querySelector('button#watched-btn'); 
const queueList = JSON.parse(localStorage.getItem("queueList"));

export function renderQueue() {
    renderQueueBtn.addEventListener('click', queueMarkup);
    renderQueueBtn.addEventListener('click', toggleActiveBtns);
}

function toggleActiveBtns() {
    renderQueueBtn.classList.add('active');
    renderQueueBtn.disabled = true;
    renderWatchedBtn.classList.remove('active');
    renderWatchedBtn.disabled = false;
}

function queueMarkup (evt) {
    container.innerHTML = '';

    //ЗДЕСЬ МОЖНО ВСТАВИТЬ ФУНКЦИЮ СПИННЕРА, ПОКА РЕНДЕРИТСЯ РАЗМЕТКА

    // const queueList = JSON.parse(localStorage.getItem("queueList"));
    if(!queueList) {
        Notiflix.Notify.info('Your queue is empty. You can add movies to queue on main page.');
        return;
    }
    
    return createMarkup(queueList);
}