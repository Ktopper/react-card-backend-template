import Footer from './Footer';
import { useState, useEffect } from "react";
import HomeCard from './HomeCard';

function Home(){
  const [data, setData] = useState([]);
  
  useEffect(() => {
      fetch("../json/home_cards.json")
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []); 

  return(
  <div className='container'>
    <div className='title-area'><h2>Wander and be Curious</h2></div>
    <div className='content-area'>
    {data.map(item => (
      <HomeCard key={item.id} item={item} />
  ))}
    
    </div>
    <Footer/>
    
  </div>
);
  }
export default Home;