import Notiflix from "notiflix";
const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = `32152972-b0c98a7cb53bef05c50b77987`;
const TASK_FEATURES = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

export default class PixabaySearch {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    fetchArticles() {
    return fetch (`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&${TASK_FEATURES}&page=${this.page}`)
        .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
            }       
            return response.json();
        })
        .then(data => {
            if (data.totalHits > 0) {
                this.page += 1;
                const totalHits = data.totalHits;
                this.totalHits = totalHits;
                Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
                return data.hits;
            }
            
        })
    
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
    
}   
