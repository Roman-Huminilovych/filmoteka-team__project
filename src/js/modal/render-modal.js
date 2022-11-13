import modalFilm from '../../templates/modalFilm.hbs';

export function renderModalFilm(film) {
  const backdrop = document.querySelector('.backdrop__movie-info');
  backdrop.innerHTML = modalFilm(film);
  const votes = document.querySelector('.modal__attributes-vote');
  const popularity = document.querySelector('.modal__attributes-text--popular');
  votes.textContent =
    votes.textContent % 1 === 0
      ? votes.textContent
      : (+votes.textContent).toFixed(1);
  popularity.textContent =
    popularity.textContent % 1 === 0
      ? popularity.textContent
      : (+popularity.textContent).toFixed(1);
  backdrop.classList.remove('is-hidden');
}
