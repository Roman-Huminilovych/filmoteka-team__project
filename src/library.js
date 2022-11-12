import { renderQueue } from './js/library/queue-render';
import { renderWatched } from './js/library/watched-render';
import { onMovieCardClick } from './js/modal-movie-info';

renderQueue();
renderWatched();

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
  films: document.querySelector('.films'),
};

refs.films.addEventListener('click', onMovieCardClick);
