import { renderQueue } from './js/library/queue-render';
import { renderWatched } from './js/library/watched-render';
import { onMovieCardClick } from './js/modal-movie-info';
import { addTrendsToLibrary } from './js/library/add-trends-to-library';
import { headerObserver, animateUpButton } from './js/up-button';

const refs = {
  films: document.querySelector('.films'),
  libraryTrends: document.querySelector('.library__trends-list'),
  header: document.querySelector('#header'),
};

addTrendsToLibrary();
renderQueue();
renderWatched();
headerObserver.observe(refs.header);

$('.carousel').slick({
  dots: true,
  arrows: false,
  speed: 1000,
  easing: 'ease',
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnFocus: true,
  pauseOnHover: true,
  pauseOnDotsHover: true,
});

refs.films.addEventListener('click', onMovieCardClick);
refs.libraryTrends.addEventListener('click', onMovieCardClick);
window.addEventListener('scroll', animateUpButton);
