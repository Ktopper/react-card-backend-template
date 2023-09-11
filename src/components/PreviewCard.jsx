import "../css/card.css";


function PreviewCard({ event, onEdit, onDelete }) {
  function formatTime(timeStr) {
    const [hour, minute] = timeStr.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute < 10 ? '0' : ''}${minute} ${period}`;
  }
  
  return (
    
      <div className={`preview-card ${event.backgroundClass}`}>
        <div className="preview-image">
          <img src={`${event.image}`} alt={`${event.title}`} />
        </div>
        <div className="preview-title">{event.title}</div>
        <div className="preview-date">{`${event.dateMonth}/${event.dateDay}${" "}${event.day}`}
        
          <br />{`${formatTime(event.startTime)} to ${formatTime(event.endTime)}`}
        </div>
        <div className="preview-actions">
          <button onClick={() => onEdit(event)}>Edit</button>
          <button onClick={() => onDelete(event.id)}>Delete</button>
        </div>
      </div>
   
  );
}

export default PreviewCard;
