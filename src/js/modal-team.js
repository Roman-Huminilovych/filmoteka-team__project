const crossBtn = document.querySelector('[data-team-modal-close]');
const openTeamModal = document.querySelector('.open-team-modal');
const modalTeam = document.querySelector('div[data-modal-team]')

crossBtn.addEventListener("click", toggleMenu);
openTeamModal.addEventListener("click", toggleMenu);

function toggleMenu(e) {
  e.preventDefault();
  modalTeam.classList.toggle("is-hidden");
}