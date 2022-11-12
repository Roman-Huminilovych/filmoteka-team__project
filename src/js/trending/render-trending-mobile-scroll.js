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

const observer = new IntersectionObserver(renderNextPages, options);
const path = 'trending/movie/day';
let page = 1;
let trending = null;

export async function renderTrendingWithScroll() {
  await renderMarkup();
  observer.observe(refs.guard);
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
  trending = await (await getMovies(path, page)).data;
  refs.container.insertAdjacentHTML('beforeend', makeCard(trending.results));
  makeYears('.films__date', page);
  makeGenres('.films__genre', page);
}
