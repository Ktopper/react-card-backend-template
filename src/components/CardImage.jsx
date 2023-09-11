
import { useState } from 'react';

function CardImage(props) {
  const { src, alt } = props; // Destructuring src and alt from props

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <>
      <img src={src} alt={alt} onClick={handleClick} /> {/* Use destructured src and alt */}
      {isOpen && (
        <div className="modal" onClick={handleClose}>
          <span className="close">&times;</span>
          <img className="modal-content" src={src} /> {/* Use destructured src */}
        </div>
      )}
    </>
  );
}



export default CardImage;

