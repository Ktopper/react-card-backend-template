
import "../css/gallery.css";

const GalleryCard = ({ images, onImageClick }) => {
  return (
    <div className="gallery">
      {images.map((image) => (
        <div className="gallery-item" key={image.id} onClick={() => onImageClick(image)}>
          <img className="gallery-image" src={image.url} alt={image.alt} />
          <p className="gallery-caption">{image.caption}</p>
        </div>
      ))}
    </div>
  );
};

export default GalleryCard;

