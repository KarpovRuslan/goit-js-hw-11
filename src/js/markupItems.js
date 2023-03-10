export default function renderSearch(hits) {
    const markup = hits
        
        .map(({ tags, webformatURL, likes, views, comments, downloads, largeImageURL }) => {
            return `
            <a class='gallery-item' href='${largeImageURL}'>
        <div class="photo-card">
  <img class='photo-card__img' src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>
</a>
`;
        }).join('');
    return markup;
};

