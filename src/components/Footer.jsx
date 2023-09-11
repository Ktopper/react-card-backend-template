import { useEffect, useState } from "react";
import "../css/footer.css";
import MailButton from "./MailButton";

function Footer() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowFooter(true);
    }, 1000);
  }, []);

  return (
    <div className={`footer-area ${showFooter ? "show" : ""}`}>
      <div className="footer-buttons">
        <a href="link of your choice">
          <img
            className="air-bnb-button"
            src="../images/home/air_bnb_logo.png"
            alt="air bnb logo"
          ></img>
        </a>
        <MailButton
          recipient={"Your name@.com"}
          subject={"Subject of Email"}
        />
      </div>
      <div className="footer-text">
        <p>© 2023 -name of biz-.<br/> All Rights Reserved.</p>
        <p> Website by -your biz- LLC. <br/>yourName@gmail.com</p>
      </div>
    </div>
  );
}

export default Footer;
