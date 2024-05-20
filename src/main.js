import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { searchPictures } from './js/pixabay-api.js';
import { listPictures } from './js/render-functions.js';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="text"]');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

let searchTerm = '';
let page = 1;
const limit = 15;
let totalHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();
  searchTerm = input.value.trim();
  if (searchTerm !== '') {
    page = 1;
    gallery.innerHTML = '';
    hideLoadMoreButton();
    showLoader();
    await fetchAndRenderPictures();
  } else {
    event.target.reset();
    iziToast.info({
      message: 'Please enter the value',
      position: 'center',
    });
  }
});

loadMoreButton.addEventListener('click', async () => {
  page += 1;
  showLoader();
  await fetchAndRenderPictures();
});

async function fetchAndRenderPictures() {
  try {
    const pictures = await searchPictures(searchTerm, page, limit);
    totalHits = pictures.totalHits;

    if (pictures.hits.length === 0 && page === 1) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'center',
      });
      hideLoadMoreButton();
    } else {
      listPictures(gallery, pictures, lightbox);
      if (page * limit < totalHits) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();

        if (page * limit >= totalHits && page > 1) {
          iziToast.error({
            message:
              "We're sorry, but you've reached the end of search results.",
            position: 'bottomCenter',
          });
        }
      }
      smoothScroll();
    }
  } catch (error) {
    console.log(error);
    iziToast.error({
      message: 'Sorry, there was an error processing your request.',
      position: 'center',
    });
  } finally {
    hideLoader();
  }
}

function showLoadMoreButton() {
  loadMoreButton.style.display = 'block';
}

function hideLoadMoreButton() {
  loadMoreButton.style.display = 'none';
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
