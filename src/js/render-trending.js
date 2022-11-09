import { getMovies } from './get-movies';
import makeCard from '../templates/card-template-homepage.hbs';
import { activatePagination } from './pagination';
import { getPageFromPagination } from './secondary-functions/get-page-from-pagination';
import { makeGenres } from './secondary-functions/genres';
import { makeYears } from './secondary-functions/year';

const refs = {
  container: document.querySelector('.films'),
  pagination: document.querySelector('.pagination'),
};

const path = 'trending/movie/day';
let page = 1;
let trending = null;

export async function renderTrending() {
  await renderMarkup();

  if (trending.total_pages > 1) {
    const pages = trending.total_pages;

    activatePagination({ current: 1, pages });
    refs.pagination.addEventListener('click', renderPages);
  }
}

// дальше подключение пагинации
function renderPages(e) {
  if (!getPageFromPagination(e.target, page)) {
    return;
  }
  page = getPageFromPagination(e.target, page);
  renderMarkup();
}

async function renderMarkup() {
  trending = await (await getMovies(path, page)).data;
  refs.container.innerHTML = makeCard(trending.results);

  await makeGenres('.films__genre');
  makeYears('.films__date');
}
