import { useState, useEffect, useRef } from "react";
import "../css/card.css";
import "../css/event-manager.css";
import "../css/preview_card.css";
import PreviewCard from "./PreviewCard";
function EventManager() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const editorRef = useRef(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const presetTitleMarkdown = {
    "Bobby Freeman": {
      title: "Bobby Freeman",
      markdown: "../markdown/events/bobby_freeman.md",
    },
    "Name that Tune": {
      title: "Name that Tune",
      markdown: "../markdown/events/name_that_tune.md",
    },
    "Trivia Night": {
      title: "Trivia Night",
      markdown: "../markdown/events/trivia_night.md",
    },
    'Dan "the Man" Carter': {
      title: 'Dan "the Man" Carter',
      markdown: "../markdown/events/dan_the_man_carter.md",
    },
  };

  const defaultMarkdown = "../markdown/events/temp.md";

  const backgroundClasses = [
    "card-red",
    "card-pink",
    "card-light-blue",
    "card-blue",
    "card-olive",
    "card-purple",
    "card-purp",
    "card-gold",
    "card-brown",
    "card-dark-blue",
    "card-black",
  ];
  const [imageCategory, setImageCategory] = useState("Events"); // setting a default category
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // setting a default index

  const imageCategories = {
    Events: [
      "./images/events/trivia1.webp",
      "./images/events/music_bingo1.webp",
      "../images/events/tune1.webp",
    ],
    Artists: [
      "../images/events/bonoli.webp",
      "../images/events/.boothwebp",
      "../images/events/carter2.webp",
    ],
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/.netlify/functions/readEvents");
  
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
  
        const data = await response.json();
        setEvents(sortEvents(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchData();
  }, []);
  
  

  const sortEvents = (events) => {
    console.log(events)
    // Function to sort events by date
    return events.sort((a, b) => {
      const dateA = new Date(
        2023,
        parseInt(a.dateMonth) - 1,
        parseInt(a.dateDay)
      );
      const dateB = new Date(
        2023,
        parseInt(b.dateMonth) - 1,
        parseInt(b.dateDay)
      );
      
      return dateA - dateB;
    });
  };

  useEffect(() => {
    // Display popup message for 1 second then hide it
    if (popupMessage) {
      const timer = setTimeout(() => setPopupMessage(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [popupMessage]);

  const handleCategoryChange = (e) => {
    setImageCategory(e.target.value);
    setCurrentImageIndex(0);
  };
  useEffect(() => {
    if (selectedEvent) {
      const category = Object.keys(imageCategories).find((cat) =>
        imageCategories[cat].includes(selectedEvent.image)
      );
      const index = imageCategories[category]?.indexOf(selectedEvent.image);

      if (category && index !== undefined) {
        setImageCategory(category);
        setCurrentImageIndex(index);
      }
    }
  }, [selectedEvent]);

  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % imageCategories[imageCategory].length;
      setEventForm((prevForm) => ({
        ...prevForm,
        image: imageCategories[imageCategory][newIndex],
      }));
      return newIndex;
    });
  };

  const handleAddEvent = (newEvent) => {
    fetch("/.netlify/functions/createEvent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        setEvents((prevEvents) => sortEvents([...prevEvents, data]));
        setPopupMessage("Event added successfully!"); // Setting a success message
      })
      .catch((error) => {
        console.error("Error adding event:", error);
        setPopupMessage("Error adding event"); // Setting an error message
      });
  };

  const handleUpdateEvent = (updatedEvent) => {
    fetch(`/.netlify/functions/updateEvent/${selectedEvent.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        setEvents((prevEvents) =>
          sortEvents(
            prevEvents.map((event) => (event.id === data.id ? data : event))
          )
        );
        setSelectedEvent(null);
        setEventForm(initEventForm);
        setPopupMessage("Event updated successfully!"); // Setting a success message
      })
      .catch((error) => {
        console.error("Error updating event:", error);
        setPopupMessage("Error updating event"); // Setting an error message
      });
  };

  const handleDeleteEvent = (id) => {
    fetch(`/.netlify/functions/deleteEvent/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setEvents((prevEvents) =>
          sortEvents(prevEvents.filter((event) => event.id !== id))
        );
      })
      .catch((error) => console.error("Error deleting event:", error));
  };

  const initEventForm = {
    title: "",
    image: "./images/events/trivia1.webp",
    backgroundClass: "card-red",
    backgroundClassIndex: 0,
    dateMonth: "9",
    dateDay: "1",
    day: "",
    startTime: "19:00",
    endTime: "22:00",
    markdown: "../markdown/events/temp.md",
    presetTitle: "",
  };

  const [eventForm, setEventForm] = useState(initEventForm);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEventForm((prevForm) => {
      const updatedForm = { ...prevForm, [name]: value };

      // logic for handling changes to the background class
      if (name === "background") {
        const currentClassIndex = backgroundClasses.indexOf(
          prevForm.backgroundClass
        );
        const newClassIndex =
          (currentClassIndex + 1) % backgroundClasses.length;
        const newBackgroundClass = backgroundClasses[newClassIndex];
        updatedForm.backgroundClass = newBackgroundClass;
        return updatedForm;
      }

      // logic for handling changes to the date fields
      if (name === "dateMonth" || name === "dateDay") {
        const month = updatedForm["dateMonth"] || 1;
        const day = updatedForm["dateDay"] || 1;
        const date = new Date(Date.UTC(2023, month - 1, day));
        const dayOfWeek = date.toLocaleDateString("en-US", {
          weekday: "long",
          timeZone: "UTC",
        });
        updatedForm["day"] = dayOfWeek;
      }

      // logic for handling changes to the presetTitleMarkdown and markdown fields
      if (name === "presetTitle") {
        updatedForm.title = value;
        updatedForm.markdown =
          presetTitleMarkdown[value]?.markdown || defaultMarkdown;
      }

      if (name === "title") {
        const matchingPreset = Object.values(presetTitleMarkdown).find(
          (preset) => preset.title === value
        );
        updatedForm.markdown = matchingPreset?.markdown || defaultMarkdown;
      }

      return updatedForm;
    });
  };

  const scrollToEditor = () => {
    editorRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = () => {
    // Validate form fields

    const requiredFields = [
      "title",
      "image",
      "backgroundClass",
      "dateMonth",
      "dateDay",
      "day",
      "startTime",
      "endTime",
      "markdown",
    ];
    const isValid = requiredFields.every((field) => eventForm[field]);

    if (isValid) {
      if (selectedEvent) {
        handleUpdateEvent(eventForm);
      } else {
        handleAddEvent(eventForm);
      }
    } else {
      setPopupMessage("All fields must be filled out before submitting");
    }
  };

  return (
    <div className="content-area">
      {/* Event Form */}
      <div className="input-container" ref={editorRef}>
        <h2 className="input-mode-title">
          {selectedEvent ? "Edit Event" : "Add Event"}
        </h2>
        <div className="title-input-area">
          <div className="title-preset">
            <div className="input-label">Preset Titles</div>
            <select
              name="presetTitle"
              value={eventForm.presetTitle}
              onChange={handleInputChange}
            >
              <option value="">Select a preset title...</option>
              {Object.keys(presetTitleMarkdown).map((key) => (
                <option value={key} key={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          <div className="text-input">
            <div className="input-label">Edit Title</div>
            <input
              type="text"
              name="title"
              placeholder="choose preset or type title"
              value={eventForm.title}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="design-input-area">
          {/* Image Category Dropdown */}

          <div className="image-input">
            <span className="input-label">Select Image</span>
            <select
              name="imageCategory"
              value={imageCategory}
              onChange={handleCategoryChange}
            >
              {Object.keys(imageCategories).map((category, index) => (
                <option value={category} key={index}>
                  {category}
                </option>
              ))}
            </select>

            {imageCategory && (
              <div className="selected-image" onClick={handleImageClick}>
                <img
                  src={imageCategories[imageCategory][currentImageIndex]}
                  alt={event.title}
                />
              </div>
            )}
          </div>
          <div className="background-input">
            <div className="input-label">Click to choose</div>
            <button
              className={eventForm.backgroundClass}
              name="background"
              onClick={handleInputChange}
            >
              Background Color
            </button>
          </div>
        </div>
        <div className="date-time-input-area">
          <div className="date-input">
            <div className="input-label">Month / Day</div>
            {/* Month Dropdown */}
            <select
              name="dateMonth"
              value={eventForm["dateMonth"]}
              onChange={handleInputChange}
            >
              {[...Array(12).keys()].map((_, index) => (
                <option value={index + 1} key={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            {/* Day Number Field */}
            <input
              type="number"
              name="dateDay"
              min="1"
              max="31"
              placeholder="Day (1-31)"
              value={eventForm["dateDay"]}
              onChange={handleInputChange}
            />
          </div>
          <div className="day-input">
            <div className="input-label">Day of Week</div>
            {/* Day of Week (Automated) */}
            <input
              type="text"
              name="day"
              placeholder="Day of the week"
              value={eventForm.day}
              readOnly
            />
          </div>

          <div className="start-time-input">
            <div className="input-label">Start</div>
            <input
              type="time"
              name="startTime"
              placeholder="Start Time"
              value={eventForm.startTime}
              onChange={handleInputChange}
            />
          </div>
          <div className="end-time-input">
            <div className="input-label">End</div>
            <input
              type="time"
              name="endTime"
              placeholder="End Time"
              value={eventForm.endTime}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <button onClick={handleSubmit}>
          {selectedEvent ? "Save Changes" : "Add Event"}
        </button>
      </div>

      {/* List of events */}
      <div className="preview-card-container">
        {events.map((event) => (
          <PreviewCard
            key={event.id}
            event={event}
            onEdit={(event) => {
              setSelectedEvent(event);
              setEventForm(event);
              scrollToEditor();
            }}
            onDelete={(id) => handleDeleteEvent(id)}
          />
        ))}
      </div>
      {popupMessage && (
        <div className={`popup ${popupMessage ? "show" : ""}`}>
          {popupMessage}
        </div>
      )}
    </div>
  );
}

export default EventManager;
