import axios from "axios";

export default async function fetchArticles(value, page) {
    const url = 'https://pixabay.com/api/';
    const key = '32152972-b0c98a7cb53bef05c50b77987';
  const filter = `?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

  return await axios.get(`${url}${filter}`).then(response => response.data);
}