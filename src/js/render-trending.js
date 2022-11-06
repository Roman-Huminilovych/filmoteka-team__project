import { getMovies } from "./get-movies";
import makeCard from '../templates/card-template.hbs';
import {activatePagination} from './pagination';

const refs = {
    container: document.querySelector('.films'),
    pagination: document.querySelector('.pagination')
}

export async function renderTrending() {
    
    const path = 'trending/movie/day';
    let trending = await (await getMovies(path)).data;
    let page = 1;
    refs.container.innerHTML = makeCard(trending.results);
    makeYears('.films__date');
    await makeGenres('.films__genre');

// дальше подключение пагинации

    async function renderPages(e) {
        if(!getPageFromPagination(e.target, page)) {
            return;
        }
        page = getPageFromPagination(e.target, page);
        trending = await (await getMovies(path, page)).data;
        refs.container.innerHTML = makeCard(trending.results);
        
    }


    if(trending.total_pages > 1) {
        const pages = trending.total_pages;
        
        activatePagination({current: 1, pages});
        refs.pagination.addEventListener('click', renderPages);
    }
} 

//экспорт на будущее, чтобы использовать в других разделах (+ подключение внутри функции выше)
export function getPageFromPagination(paginationItem, page){
    if (paginationItem.classList.contains('pagination__btn--page')) {
            return page = +paginationItem.textContent;
        }
        else if (paginationItem.classList.contains('pagination__btn--left')) {
            return page -= 1;
        }
        else if (paginationItem.classList.contains('pagination__btn--right')) {
            return page += 1;
        }
        return false;
}

function makeYears(selector) {
    const yearFields = document.querySelectorAll('.films__date');
    yearFields.forEach(item => {
        item.textContent = getYearFromDate(item.textContent);
    })
}

function makeGenres(selector) {
    const genreFields = document.querySelectorAll(selector);
    genreFields.forEach(item => { 
        getGenreFromId(item.textContent).then(result => item.textContent = result);
    });
}

async function getGenreFromId(id) {
    const path = 'genre/movie/list';
    const genres = await (await getMovies(path)).data.genres;

    const arrOfIds =id.split(',');
    const arrOfGenres = [];

    if (arrOfIds.length > 3) {
        arrOfIds.length = 3;
        arrOfIds[2] = 'Other';
    }

    arrOfIds.forEach(i => {
        if(i === 'Other') {
            arrOfGenres.push(i);
        }
        else {
            arrOfGenres.push(genres.find(genre => genre.id === +i).name);
        }
    });

    return arrOfGenres.join(', ');

}

function getYearFromDate(date) {
    return new Date(date).getFullYear();
}