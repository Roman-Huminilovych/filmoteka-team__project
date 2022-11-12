import makeCard from '../templates/card-template.hbs';
import { makeYears } from './secondary-functions/year';
import { makeGenres } from './secondary-functions/genres';

const refs = {
  container: document.querySelector('.films'),
};

export async function createMarkup(array) {
  const markup = makeCard(array);
  refs.container.innerHTML = markup;
  makeYears('.films__date');
  await makeGenres('.films__genre');
}
