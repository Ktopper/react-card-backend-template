
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Services from './Services';
import Info from './Info';
import "../css/style.css"

 function App(){
  
  return(
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/info" element={<Info />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    
  </Router>
);
}

export default App;
