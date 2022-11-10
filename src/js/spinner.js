export function spinner() {
  const refs = {
    spinner: document.querySelector('[data-slider]'),
    body: document.querySelector('body'),
  };

  refs.spinner.classList.toggle('is-hidden');
  refs.body.classList.toggle('no-scrool');
}
