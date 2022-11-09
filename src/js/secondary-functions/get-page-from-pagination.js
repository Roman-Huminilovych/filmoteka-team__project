//экспорт на будущее, чтобы использовать в других разделах (+ подключение внутри функции выше)
export function getPageFromPagination(paginationItem, page) {
  if (paginationItem.classList.contains('pagination__btn--page')) {
    return (page = +paginationItem.textContent);
  } else if (paginationItem.classList.contains('pagination__btn--left')) {
    return (page -= 1);
  } else if (paginationItem.classList.contains('pagination__btn--right')) {
    return (page += 1);
  }
  return false;
}
