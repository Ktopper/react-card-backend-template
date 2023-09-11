
import '../css/gallery.css';

const GalleryModal = ({ modalIsOpen, closeModal, image, prevImage, nextImage }) => {
  if (!modalIsOpen) {
    return null;
  }

  return (
    <div className="gallery-modal-overlay" onClick={closeModal}>
      <div className="gallery-modal-content" onClick={e => e.stopPropagation()}>
        <img src={image.url} alt="" />
        <p>{image.caption}</p>
        <button onClick={prevImage}>&lt;</button>
        <button onClick={closeModal}>close</button>
        <button onClick={nextImage}>&gt;</button>
      </div>
    </div>
  );
};

export default GalleryModal;
