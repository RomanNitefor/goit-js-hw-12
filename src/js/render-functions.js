export function listPictures(gallery, pictures, lightbox) {
  const result = pictures.hits
    .map(picture => {
      return `<li class="gallery-item">
                    <a class="gallery-link" href="${picture.largeImageURL}">
                        <img class="gallery-image" src="${picture.webformatURL}" alt="${picture.tags}">
                    </a>
                    <ul class="info">
                        <li class="info-list">Likes: <span>${picture.likes}</span></li>
                        <li class="info-list">Views: <span>${picture.views}</span></li>
                        <li class="info-list">Comments: <span>${picture.comments}</span></li>
                        <li class="info-list">Downloads: <span>${picture.downloads}</span></li>
                    </ul>
                </li>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', result);
  lightbox.refresh();
}
