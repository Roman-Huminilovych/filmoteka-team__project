import makeCard from '../../templates/card-template.hbs';
import { makeYears } from '../secondary-functions/year';
import { makeGenres } from '../secondary-functions/genres';

const refs = {
  container: document.querySelector('.films'),
};

export function createMarkup(array, page) {
  const markup = makeCard(array);
  refs.container.innerHTML = markup;
  makeYears('.films__date');
  makeGenres('.films__genre');
}
