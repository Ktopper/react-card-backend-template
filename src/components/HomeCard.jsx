import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function HomeCard({ item}) {

  return (
    <Link to={item.target}>
      <div className="home-card-container">
        <div className="home-image-area">
          <img src={item.image} alt={item.alt} />
        </div>
        <div className="home-text-area">
          <div className="home-title"><h3>{item.title}</h3></div>
          <div className="home-text">{item.text}</div>
        </div>
      </div>
    </Link>
  );
}
HomeCard.propTypes = {
  item: PropTypes.shape({
    target: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};
export default HomeCard;
