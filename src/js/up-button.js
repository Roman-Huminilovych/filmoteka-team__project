const refs = {
  upButton: document.querySelector('#up-button'),
};

const options = {};

export const headerObserver = new IntersectionObserver(showUpButton, options);

function showUpButton([entry]) {
  console.log(entry);
  if (entry.isIntersecting) {
    refs.upButton.classList.remove('fixed');
  } else {
    refs.upButton.classList.add('fixed');
  }
}

export function animateUpButton() {
  const scrollValue = document.documentElement.scrollTop;
  // console.log('scrollValue', scrollValue);
  const documentHeight = document.documentElement.scrollHeight;
  // console.log('documentHeight', documentHeight);
  const viewportHeight = document.documentElement.clientHeight;
  // console.log('viewportHeight', viewportHeight);
  const height = documentHeight - viewportHeight;
  // console.log('height', height);
  const scrollPercent = Math.round((scrollValue / height) * 100);
  refs.upButton.style.background = `linear-gradient(
    var(--accent-color) ${scrollPercent}%,
    white ${scrollPercent}%    
  )`;
}
