const MailButton = ({ recipient, subject }) => {
  return (
    <a
      className="mail-button"
      href={`mailto:${recipient}?subject=${encodeURIComponent(subject)}`}
    >
    <span className="visually-hidden">Fervor Life email</span>
      <img src="../images/home/email_logo.png" alt="email button" />
    </a>
  );
};
export default MailButton;
