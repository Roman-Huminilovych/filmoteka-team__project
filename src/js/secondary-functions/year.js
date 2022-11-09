export function makeYears(selector, page) {
  const yearFields = document.querySelectorAll(selector);
  yearFields.forEach((item, idx) => {
    if (!page) {
      item.textContent = getYearFromDate(item.textContent) || '';
    }
    if (idx >= (page - 1) * 20) {
      item.textContent = getYearFromDate(item.textContent) || '';
    }
  });
}

function getYearFromDate(date) {
  return new Date(date).getFullYear();
}
