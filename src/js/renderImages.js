import cardTemplate from '../templates/cardTemplate.hbs';
import refs from './refs';

export function renderListImages(arr) {
    const markup = cardTemplate(arr)

    refs.gallery.insertAdjacentHTML('beforeend',markup)
}

export function clearMarkup() {
    refs.gallery.innerHTML = '';
}


