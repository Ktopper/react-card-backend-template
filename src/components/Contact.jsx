

import Footer from './Footer';
import { useState, useEffect } from "react";
import Card from './Card.jsx';

function Gallery(){
  const [data, setData] = useState([]);
  
  useEffect(() => {
      fetch("../json/contact_cards.json")
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []); 

  return(
  <div className='container'>
    <div className='title-area'><h2>contact</h2></div>
    <div className='card-content-area'>
    {data.map((item, index)=> (
      <Card key={item.id} item={item} index={index} />
  ))}
    
    </div>

    <Footer/>
  </div>
);
  }
export default Gallery;