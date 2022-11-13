import { getMovies } from '../fetch-functions/get-movies';
import makeCard from '../../templates/card-template-homepage.hbs';
import { makeGenres } from '../secondary-functions/genres';
import { makeYears } from '../secondary-functions/year';
import { query } from './onSubmit';

const refs = {
  container: document.querySelector('.films'),
  pagination: document.querySelector('.pagination'),
  guard: document.querySelector('.guard'),
};

const options = {
  root: null,
  rootMargin: '30%',
  treshhold: 0,
};

const srchObserver = new IntersectionObserver(renderNextPages, options);
const PATH = '/search/movie';
let page = 1;

export async function renderSearchingWithScroll(totalPages) {
  // console.log(`path ${PATH} \n`, `page  ${page} \n`, `query  ${query} \n`);
  await renderMarkup();


  if(totalPages > 1) {
    srchObserver.observe(refs.guard);}
}

function renderNextPages(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      renderMarkup();
    }
  });
}

async function renderMarkup() {

  if(page === 1) {
    refs.container.innerHTML = '';
  }
  const searching = await (await getMovies(PATH, page, query)).data;
  refs.container.insertAdjacentHTML('beforeend', makeCard(searching.results));
  if(page > 1) {
    makeYears('.films__date', page);
    makeGenres('.films__genre', page);
    return;
  }
  makeYears('.films__date');
  makeGenres('.films__genre');
}
