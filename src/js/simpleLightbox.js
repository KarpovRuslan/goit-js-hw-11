import SimpleLightbox from "simplelightbox";

function createGallerySimpleLightbox() {
    let gallery = new SimpleLightbox('.gallery a', {
        captionsData: "alt",
        captionDelay: 250,
    });
gallery.on('show.simplelightbox', function () {});
}

function refreshGallerySimpleLightbox() {
    let gallery = new SimpleLightbox('.gallery a',{
        captionsData: "alt",
        captionDelay: 250,
    });
gallery.refresh('show.simplelightbox', function () {});
}

export {
    createGallerySimpleLightbox, refreshGallerySimpleLightbox
};
