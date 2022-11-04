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
    refs.pagesContainer.innerHTML = createPagination(paginationGenerator(current, pages));
    disableUnnecessaryArrows(current, pages);
}

export function activatePagination({current, pages}) {
    renderPagination(current, pages);

    refs.pagination.addEventListener('click', (e) => {
        e.preventDefault();
        if (!e.target.classList.contains('pagination__link')) {
            return;
        }
        if (e.target.classList.contains('pagination__link--page')) {
            renderPagination(+e.target.textContent, pages);
            return;
        }
        if (e.target.classList.contains('pagination__link--start')) {
            renderPagination(1, pages);
            return;
        }
        if (e.target.classList.contains('pagination__link--end')) {
            renderPagination(pages, pages);
            return;
        }
    })
}

function disableUnnecessaryArrows (current, pages) {
    const arrows = {
        start: document.querySelector('.pagination__link--start'),
        end:  document.querySelector('.pagination__link--end'),
    }
    if (document.querySelector('.disabled')) {
        document.querySelector('.disabled').classList.remove('disabled');
    }
    if (current === 1) {
        arrows.start.classList.add('disabled');
        return;
    }
    if (current === pages) {
        arrows.end.classList.add('disabled');
        return;
    }
}