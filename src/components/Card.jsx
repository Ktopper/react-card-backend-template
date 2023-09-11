import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import CardImage from "./CardImage";
import { Link } from "react-router-dom";
import "../css/card.css";

function Card({ item, index }) {
  const cardRef = useRef();
  const [markdownText, setMarkdownText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const cardClass = index % 2 === 0 ? "even" : "odd";
  const cardBackgroundClass = item.background; // Use the background class from the item object
console.log(cardBackgroundClass);
  useEffect(() => {
    fetch(item.markdown)
      .then((response) => response.text())
      .then((text) => setMarkdownText(text))
      .catch((error) => console.error(error));
  }, [item]);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
    setTimeout(() => {
      const cardTop = cardRef.current.getBoundingClientRect().top;
      const screenHeight = window.innerHeight;
      window.scrollTo({
        top: window.scrollY + cardTop - screenHeight / 3,
        behavior: "smooth",
      });
    }, 0);
  };

  const components = {
    a: ({ href, children }) => {
      // If the link is internal, use a <Link>, else use <a>
      const isInternal = href.startsWith("/");
      if (isInternal) {
        return <Link to={href}>{children}</Link>;
      } else {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      }
    },
    img: CardImage,
  };

  return (
    <div
      ref={cardRef}
      className={`card-container ${cardClass} ${isExpanded ? "expanded" : ""} ${cardBackgroundClass}`}

      onClick={handleCardClick}
   
    >
      <img
        className={`card-image ${isExpanded ? "expanded" : ""}`}
        src={item.image}
        alt=""
      />
      <div className={`card-story-area ${isExpanded ? "expanded" : ""}`}>
        <h3 className="card-title">{item.title}</h3>
        {!isExpanded && <p>{item.description}</p>}
        {isExpanded && (
          <div className="card-md">
            <ReactMarkdown components={components}>
              {markdownText}
            </ReactMarkdown>
          </div>
        )}
        <p>{isExpanded ? "click to close" : "click to expand"}</p>
      </div>
    </div>
  );
}

export default Card;
