import { useEffect, useState } from 'react';
import GalleryCard from './GalleryCard';
import GalleryModal from './GalleryModal';
import "../css/gallery.css";

function Gallery({url}) {
  const [images, setImages] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState({});

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error(error));
    }, [url]);
  
    const openModal = (image) => {
      setCurrentImage(image);
      setIsOpen(true);
      console.log('open');
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };
    const nextImage = () => {
        const currentIndex = images.indexOf(currentImage);
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentImage(images[nextIndex]);
      };
    
      const prevImage = () => {
        const currentIndex = images.indexOf(currentImage);
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentImage(images[prevIndex]);
      };
  
      return (
        <div className="gallery-container">
          <GalleryCard images={images} onImageClick={openModal} />
          <GalleryModal modalIsOpen={modalIsOpen} closeModal={closeModal} image={currentImage} nextImage={nextImage} prevImage={prevImage}/>
        </div>
  
  )  
}
  
  export default Gallery;
  

