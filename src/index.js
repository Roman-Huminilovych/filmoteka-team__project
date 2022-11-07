import { activatePagination } from "./js/pagination";
import { createMarkup } from './js/renderGallery.js';

createMarkup([
  {
    title: 'ababab',
    genre_ids: 'qweqwe',
    release_date: 2023,
    vote_average: 8,
  },
  {
    title: 'abasssb',
    genre_ids: 'qweqwe',
    release_date: 2023,
    vote_average: 8,
  },
  {
    title: 'ababdsdsdab',
    genre_ids: 'qweqwe',
    release_date: 2023,
    vote_average: 8,
  },
  {
    title: 'ababsdsab',
    genre_ids: 'qweqwe',
    release_date: 2023,
    vote_average: 8,
  },
  {
    title: 'ababab',
    genre_ids: 'qweqwe',
    release_date: 2023,
    vote_average: 8,
  },
  {
    title: 'ababab',
    genre_ids: 'qweqwe',
    release_date: 2023,
    vote_average: 8,
  },
]);

activatePagination({current: 15, pages: 50});



// import $ from 'jquery';
// import 'slick-carousel';


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

