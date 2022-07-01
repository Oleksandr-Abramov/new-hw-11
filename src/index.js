import ApiService from './js/apiService';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const Api = new ApiService();
let formValue;
let lightbox = new SimpleLightbox('.gallery a');

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
form.addEventListener('submit', onInputForm);

function onInputForm(evt) {
  evt.preventDefault();
  gallery.innerHTML = '';
  formValue = form.searchQuery.value;
  Api.getData(formValue).then(response => {
    marcup(response);
    if (response.hits.length > 0) {
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
    }
  });
  form.reset();
}

function marcup({ hits, totalHits }) {
  console.log('~ totalHits', totalHits);
  if (totalHits === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  if (Api.page === 1) {
  }
  if (hits.length === 0) {
    Notify.failure(
      `We're sorry, but you've reached the end of search results.`
    );
    return;
  }
  const cards = hits.map(
    ({
      largeImageURL,
      webformatURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return `<a class="gallery__item" href="${largeImageURL}">
      <div class="photo-card"><div class="img-container">
      <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" /></div>
      <div class="info"><p class="info-item"><b>Likes</b><br>${likes}</p>
      <p class="info-item"><b>Views</b><br>${views}</p>
      <p class="info-item"><b>Comments</b><br>${comments}</p>
      <p class="info-item"><b>Downloads</b><br>${downloads}</p>
      </div></div></a>`;
    }
  );
  gallery.insertAdjacentHTML('beforeend', cards.join(''));
  scrollByInput();
  observer.observe(document.querySelector('a:last-child'));
  lightbox.refresh();
}

const observer = new IntersectionObserver(
  (entries, observer) => {
    console.log('~ entries', entries);
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        Api.incrementPage();
        Api.getData(formValue).then(marcup);
        lightbox.refresh();
      }
    });
  },
  {
    threshold: 0.5,
  }
);
function scrollByInput() {
  if (Api.page === 1) {
    const { height: formHeight } = form.getBoundingClientRect();

    window.scrollBy({
      top: formHeight * 1.5,
      behavior: 'smooth',
    });
  }
}
