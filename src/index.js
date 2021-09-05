import PixabayApiService from './js/fetchImage';
import { renderListImages, clearMarkup } from './js/renderImages';
import refs from '../src/js/refs'
import { error, notice } from '@pnotify/core/dist/PNotify';
import * as basicLightbox from 'basiclightbox';
 
refs.searchForm.addEventListener('submit', onSubmit);
refs.gallery.addEventListener('click', onClick);


const pixabayApiService = new PixabayApiService();

const options = {
  rootMargin: '200px'
};





async function onSubmit(e) {
    e.preventDefault();
    pixabayApiService.searchQuery = e.currentTarget.elements.query.value;
    if (pixabayApiService.searchQuery.trim() === '') {
          notice({
              text: 'Enter your request',
              delay: 2000
  });
        return;
    }
    clearMarkup();
  pixabayApiService.resetPage();
  try {
    const response = await pixabayApiService.fetchImage();
    if (response.length === 0) {
              error({
              text: 'oops, any images are not found',
              delay: 2000
  });
    }
    renderListImages(response);
  }
  catch(error) {
    console.log(error);
  }

}


const onEntry = (entries) => {
    entries.forEach(async entry => {
      if (entry.isIntersecting && pixabayApiService.searchQuery !== '') {
        try {
              const response = await pixabayApiService.fetchImage();
              renderListImages(response);
        } catch (error) {
          console.log(error);
        }
    }
  });
};
const observer = new IntersectionObserver(onEntry, options);

observer.observe(refs.observable);

function onClick(e) {
  if (e.target.classList.contains('image')) {
    const instance = basicLightbox.create(`
    <img src= ${e.target.dataset.url} width="800" height="600">
`)
    instance.show()
  }
}





