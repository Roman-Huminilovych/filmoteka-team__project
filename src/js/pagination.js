// generate pagination
import createPagination from '../templates/pagination.hbs';

const refs = {
    pagination: document.querySelector('.pagination'),
    pagesContainer: document.querySelector('.pagination__pages'),
};

const paginationGenerator = (current, last, delta = 2) => {
    const left = current - delta;
    const right = current + delta;
    const range = [];
    const rangeWithDots = [];
    const dots = '...';
    let previous = null;

    for (let i = 1; i <= last; i += 1) {
        if (i === 1 || i === last || (i >= left && i <= right)) {
            range.push(i);
        } 
        else if (i < left) {
            i = left - 1;
        } 
        else if (i > right) {
            range.push(last);
            break;
        }
    }

    range.forEach(page => {

        if (previous && page - previous !== 1) {            
            rangeWithDots.push({page: dots, current: false, dots: true});            
        }
        page === current ? rangeWithDots.push({page: page, current: true, dots: false}) : rangeWithDots.push({page: page, current: false, dots: false});
        previous = page;
    });

    return rangeWithDots;
};

function renderPagination(current, pages) {
    if (pages === 1) {
        refs.pagination.classList.add('visual-hidden');
        return;
    }
    refs.pagination.classList.remove('visual-hidden');
    refs.pagesContainer.innerHTML = createPagination(paginationGenerator(current, pages));
    disableUnnecessaryArrows(current, pages);
}

export function activatePagination({current, pages}) {
    renderPagination(current, pages);

    refs.pagination.addEventListener('click', (e) => {
        if (!e.target.classList.contains('pagination__btn')) {
            return;
        }
        if (e.target.classList.contains('pagination__btn--page')) {
            current = +e.target.textContent;
            renderPagination(current, pages);
            return;
        }
        if (e.target.classList.contains('pagination__btn--left')) {
            current -= 1;
            renderPagination(current, pages);
            return;
        }
        if (e.target.classList.contains('pagination__btn--right')) {
            current += 1;
            renderPagination(current, pages);
            return;
        }
    })
}

function disableUnnecessaryArrows (current, pages) {
    const arrows = {
        left: document.querySelector('.pagination__btn--left'),
        right:  document.querySelector('.pagination__btn--right'),
    }
    if (arrows.left.disabled === true || arrows.right.disabled === true) {
        arrows.left.disabled = false;
        arrows.right.disabled = false;
    }
    if (current === 1) {
        arrows.left.disabled = true;
        return;
    }
    if (current === pages) {
        arrows.right.disabled = true;
        return;
    }
}