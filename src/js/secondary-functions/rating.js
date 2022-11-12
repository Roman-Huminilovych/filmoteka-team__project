export function makeRating(selector, page) {
  const ratingFields = document.querySelectorAll(selector);

  ratingFields.forEach((item, idx) => {
    // обрабатывает только новые карточки
    if (idx >= (page - 1) * 20 && item.textContent !== '0') {
      item.textContent = (+item.textContent).toFixed(1);
    }
  });
}
