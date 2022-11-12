import { getMovies } from '../fetch-functions/get-movies';
import makeCard from '../../templates/card-template-homepage.hbs';
import { makeGenres } from '../secondary-functions/genres';
import { makeYears } from '../secondary-functions/year';

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

export async function renderSearchingWithScroll(path, page, query) {
  console.log(`path ${path} \n`, `page  ${page} \n`, `query  ${query} \n`);
  await renderMarkup(path, page, query);
  srchObserver.observe(refs.guard);
}

function renderNextPages(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      renderMarkup(path, page, query);
    }
  });
}

async function renderMarkup(path, page, query) {
  const searching = await (await getMovies(path, page, query)).data;
  refs.container.insertAdjacentHTML('beforeend', makeCard(searching.results));
  makeYears('.films__date');
  makeGenres('.films__genre');
}
