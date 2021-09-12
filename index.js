import galleryItems from './app.js'
// console.log(galleryItems);

import refs from './refs.js'
// console.log(refs);

const { gallery, modal, lightboxImage, modalCloseButton, modalCloseOverlay } = refs
// console.log(gallery, button, lightbox);


// SAMPLE MARUP
const sample = `
<li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li>`


// MARKUP
function createItem(array) {
    return array
        .map((elem) => {
            const { preview, original, description } = elem
            return `
                <li class="gallery__item">
                <a class="gallery__link"
                href=${original}>
                <img
                class="gallery__image"
                src=${preview}
                data-source=${original}
                alt=${description}/></a>
                </li>`
        })
        .join('')
}
const markup = createItem(galleryItems)
// console.log(markup);
gallery.insertAdjacentHTML('afterbegin', markup)


// OBSERVER
gallery.addEventListener('click', onGallery)
function onGallery(event) {
    const imagesGallery = event.target.classList.contains('gallery__image');
    if (!imagesGallery) {
        return;
    }
    event.preventDefault();

    modal.classList.add('is-open');
    lightboxImage.src = event.target.dataset.source;
    lightboxImage.alt = event.target.alt;
}


// MODAL
modalCloseOverlay.addEventListener('click', modalClose);
modalCloseButton.addEventListener('click', modalClose);
function modalClose() {
    modal.classList.remove('is-open');
    lightboxImage.src = "";
    lightboxImage.alt = "";
}
window.addEventListener('keydown', (key) => {
    if (key.key === 'Escape') {
        modalClose();
    }
});