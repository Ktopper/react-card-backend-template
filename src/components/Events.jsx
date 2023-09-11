import{ useEffect, useState } from 'react';

function Events() {
 
  const [error, setError] = useState(null);
  const [events, setEvents] = useState(null);
  useEffect(() => {
    fetch('/.netlify/functions/fetch-events')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => setEvents(data))
      .catch(error => setError(error.message));
  }, []);
  

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {Array.isArray(events) && events.map(event => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Events;
