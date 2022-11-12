const searchBtn = document.querySelector('.submit-btn');

export function chekInputQuery() {
  if (this.value.trim()) {
    searchBtn.disabled = false;
  } else {
    searchBtn.disabled = true;
  }
}
