import fetchArticles from './js/fetchSearch'
import LoadMoreBtn from './js/loadMoreBtn';
import renderSearch from './js/markupItems';
import { createGallerySimpleLightbox,refreshGallerySimpleLightbox } from './js/simpleLightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const galleryItem = document.querySelector('.gallery');
const form = document.querySelector('#search-form');
//const pixabaySearch = new PixabaySearch();
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden:true,
});

let searchQuery = '';

form.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

async function onSearch(e) {
    e.preventDefault();
    searchQuery = e.currentTarget.elements.searchQuery.value;
    currentPage = 1;

    if (searchQuery === '') {
        galleryItem.innerHTML = '';
        loadMoreBtn.hide();
        return Notiflix.Notify.warning('Please paste some info to find')
    }

    const response = await fetchArticles(searchQuery, currentPage);
    currentHits = response.hits.length;
    console.log(response.totalHits)

    if (response.totalHits > 40) {
        loadMoreBtn.show();
    } else {
        loadMoreBtn.hide();
    }

    try {
        if (response.totalHits > 0){
            Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
            galleryItem.innerHTML = '';
            appendHitsMarkup(response.hits);
            createGallerySimpleLightbox();
        }
        if (response.totalHits === 0) {
            galleryItem.innerHTML = '';
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            loadMoreBtn.hide();
        }
    }
    catch (error) {console.log(error);}
}

function appendHitsMarkup(hits) {
    galleryItem.insertAdjacentHTML('beforeend', renderSearch(hits));
}

async function onLoadMore() {
    currentPage += 1;
    const response = await fetchArticles(searchQuery, currentPage);
    appendHitsMarkup(response.hits);
    smoothScroll();
    refreshGallerySimpleLightbox();
    currentHits += response.hits.length;

    if (currentHits === response.totalHits) {
        loadMoreBtn.disable();
    }
}

function smoothScroll() {
    const { height: cardHeight } = document
                .querySelector(".gallery")
                .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}
