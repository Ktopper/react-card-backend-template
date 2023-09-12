function validateEventData(eventData) {
    if (!eventData) {
      return "Event data is undefined or null";
    }
    
    const allowedFields = [
      "title", "image", "backgroundClass", "backgroundClassIndex", 
      "dateMonth", "dateDay", "day", "startTime", 
      "endTime", "markdown", "presetTitle", "background"
    ];
  
    for (let field of allowedFields) {
      if (typeof eventData[field] === 'undefined') {
        return `Field ${field} is missing`;
      }
    }
  
    return null;
  }
  
  export { validateEventData };
  