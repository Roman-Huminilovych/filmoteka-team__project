import { renderTrending } from './js/render-trending';
import { onSubmit } from './js/onSubmit';
import { renderTrendingWithScroll } from './js/render-trending-mobile-scroll';
import debounce from 'lodash.debounce';

const refs = {
  searchForm: document.querySelector('#search-form'),
  searchInput: document.querySelector('[name="searchQuery"]'),
  searchBtn: document.querySelector('.submit-btn'),
};

if (screen.width <= 768) {
  renderTrendingWithScroll();
} else {
  renderTrending();
}

refs.searchInput.addEventListener('input', debounce(onInput, 300));
refs.searchForm.addEventListener('submit', onSubmit);

function onInput() {
  if (this.value.trim()) {
    refs.searchBtn.disabled = false;
  } else {
    refs.searchBtn.disabled = true;
  }
}
