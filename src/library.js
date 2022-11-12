import { renderQueue } from './js/queue-render';
import { renderWatched } from './js/watched-render';
import { onOpenModal } from './js/modalOpenClose';

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

refs.films.addEventListener('click', onOpenModal);
