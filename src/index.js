import PixabaySearch from './js/fetchSearch';
import LoadMoreBtn from './js/loadMoreBtn';
import renderSearch from './js/markupItems';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const galleryItem = document.querySelector('.gallery');
const form = document.querySelector('#search-form');
const pixabaySearch = new PixabaySearch();
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden:true,
});

form.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

//let searchQuery = '';

function onSearch(e) {
    e.preventDefault();

    pixabaySearch.query = e.currentTarget.elements.searchQuery.value;
    if (pixabaySearch.query === '') {
        return Notiflix.Notify.warning('Please paste some info to find')
    }
    loadMoreBtn.show();
    pixabaySearch.resetPage();
    clearSearchContainer();
    loadMoreBtn.disable();
    fetchItems();
}

function appendHitsMarkup(hits) {
    galleryItem.insertAdjacentHTML('beforeend', renderSearch(hits));
}

function fetchItems() {
    pixabaySearch.fetchArticles().then((items) => {
        appendHitsMarkup(items);
        loadMoreBtn.enable();
    });
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

function onLoadMore() {
    loadMoreBtn.disable();
    fetchItems();
    smoothScroll()
}

function clearSearchContainer() {
    galleryItem.innerHTML = '';
}

let modal = new SimpleLightbox('.gallery a', {
    captionsData: "alt",
    captionDelay: 250,
});

