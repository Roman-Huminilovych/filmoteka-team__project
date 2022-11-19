import trendsInLibraryMarkup from '../../templates/library-trends-item.hbs';
import { getMovies } from '../fetch-functions/get-movies';
import { path } from '../trending/render-trending';
const refs = {
  trendsList: document.querySelector('.library__trends-list'),
};

const page = 1;

export async function addTrendsToLibrary() {
  try {
    const trending = await (await getMovies(path, page)).data;
    refs.trendsList.innerHTML = trendsInLibraryMarkup(trending.results);

    $('.library__trends-list').slick({
      arrows: true,
      slidesToShow: 7,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 920,
          settings: {
            arrows: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
          },
        },
        {
          breakpoint: 767,
          settings: {
            arrows: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
          },
        },
        {
          breakpoint: 426,
          settings: {
            mobileFirst: true,
            arrows: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
          },
        },
      ],
    });
  } catch (error) {
    console.log(error.message);
  }
}
