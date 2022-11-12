import { activatePagination } from './pagination';
import { renderPages } from './render-trending';
import { getMovies } from './get-movies';
import { createMarkup } from './render-searchQuery';
import { getPageFromPagination } from './secondary-functions/get-page-from-pagination';
import Notiflix from 'notiflix';
import { spinner } from './spinner';

Notiflix.Notify.init({
  width: '280px',
  position: 'center-top',
  distance: '150px',
});

const refs = {
  searchInput: document.querySelector('[name="searchQuery"]'),
  searchBtn: document.querySelector('.submit-btn'),
  container: document.querySelector('.films'),
  pagination: document.querySelector('.pagination'),
};

const PATH = '/search/movie';
let page = 1;
let pages = 1;
let query = '';

function resetRequest() {
  refs.container.innerHTML = '';
  refs.searchInput.value = '';
  refs.searchBtn.disabled = true;
  page = 1;
}

export async function onSubmit(e) {
  e.preventDefault();
  query = e.currentTarget.elements.searchQuery.value;
  resetRequest();

  try {
    spinner();
    const getFetchMovieResponse = await getMovies(PATH, page, query);
    const moviesArray = await getFetchMovieResponse.data.results;
    createMarkup(moviesArray);

    if (!moviesArray.length) {
      refs.pagination.classList.add('visual-hidden');
      spinner();
      return Notiflix.Notify.failure(
        'Search result not successful. Enter the correct movie name and try againe.'
      );
    } else {
      Notiflix.Notify.success(
        `Hooray! We found ${getFetchMovieResponse.data.total_results} movies.`
      );

      if (getFetchMovieResponse.data.total_pages > 1) {
        pages = getFetchMovieResponse.data.total_pages;
        activatePagination({ current: 1, pages });
        refs.pagination.removeEventListener('click', renderPages);
        refs.pagination.addEventListener('click', renderSearchPages);
      } else {
        refs.pagination.classList.add('visual-hidden');
      }
    }
    spinner();
  } catch (error) {
    Notiflix.Notify.failure(`Something is wrong. ${error.message}`);
  }
}

export function renderSearchPages(e) {
  if (!getPageFromPagination(e.target, page)) {
    return;
  }
  page = getPageFromPagination(e.target, page);
  getSearchFetch();
}

async function getSearchFetch() {
  const getFetchMovieResponse = await getMovies(PATH, page, query);
  const moviesArray = await getFetchMovieResponse.data.results;
  createMarkup(moviesArray);
}
