//F15, F19
import Notiflix from 'notiflix';
import createMarkup from './render-searchQuery';

const container = document.querySelector('.films');

//кнопка добавления фильма в список (на модалке)
const addToQueueBtn = document.querySelector('button.js-addQueueBtn'); 

//кнопка "QUEUE" на странице библиотеки
const renderQueueBtn = document.querySelector('button#queue-btn'); 

//список фильмов для рендера странички
const queueList = JSON.parse(localStorage.getItem("queueList")) || [];


//функция добавления фильма в очередь 
addToQueueBtn.addEventListener('click', addMovieToQueue);
export function addMovieToQueue (object) {
    //console.log(object);  //проверить, что приходит
        
   // const newMovie = {...object};  
    const newMovie = ({poster_path, title, genre_ids, release_date, vote_average} = object);
    //console.log(newMovie); // проверить, что создано

    queueList.push(newMovie);
    localStorage.setItem('queueList', JSON.stringify(queueList));
}

renderQueueBtn.addEventListener('click', queueMarkup);
export function queueMarkup (evt) {
    evt.preventDefault();
    container.innerHTML = '';

    //ЗДЕСЬ МОЖНО ВСТАВИТЬ ФУНКЦИЮ СПИННЕРА, ПОКА РЕНДЕРИТСЯ РАЗМЕТКА

    const queueList = JSON.parse(localStorage.getItem("queueList"));
    if(!queueList) {
        Notiflix.Notify.info('Your queue is empty. You can add movies to queue on main page.');

        return;
    }
    
    return createMarkup(queueList);
}




