import cardTemplate from '../templates/cardTemplate.hbs';


const refs = {
  gallery: document.querySelector('.gallery'),
};
export function  createMarkup(objects) {
  const markup = cardTemplate(objects);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}


