import { renderTrending } from './js/trending/render-trending';
import { onSubmit } from './js/onSubmit';
import debounce from 'lodash.debounce';
import { onMovieCardClick } from './js/modal-movie-info';

$('.carousel').slick({
  dots: true,
  arrows: false,
  speed: 1000,
  easing: 'ease',
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnFocus: true,
  pauseOnHover: true,
  pauseOnDotsHover: true,
});

const refs = {
  searchForm: document.querySelector('#search-form'),
  searchInput: document.querySelector('[name="searchQuery"]'),
  searchBtn: document.querySelector('.submit-btn'),
  films: document.querySelector('.films'),
};

renderTrending();

refs.searchInput.addEventListener('input', debounce(onInput, 300));
refs.searchForm.addEventListener('submit', onSubmit);
refs.films.addEventListener('click', onMovieCardClick);

function onInput() {
  if (this.value.trim()) {
    refs.searchBtn.disabled = false;
  } else {
    refs.searchBtn.disabled = true;
  }
}
