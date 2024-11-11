// Basic Imports
import { useEffect, useState } from "react";
import axios from "axios";
import Seo from "../components/Seo"

// Base URL Variable
const baseURL = import.meta.env.VITE_WP_API_BASEURL;

// Events And Volunteer Component (main)
const EventsAndVolunteer = () => {

  // Variables
  const [events, setEvents] = useState([]);
  const [volunteerOpportunities, setVolunteerOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Endpoint Variables
  const eventsEndpoint = `${baseURL}/events?_embed`;
  const volunteerEndpoint = `${baseURL}/volunteeropportunity?_embed`;

  // Events Component UseEffect
  useEffect (() => {
    axios.get(`${eventsEndpoint}`)
    .then((res) => {
        console.log(res);
        setEvents(res.data);
        setLoading(false);
    })
    .catch((error) => console.log(error))
}, []);

  // Mapped Events Component
  const Events = ({events}) => {
    const mappedEvents = events.map((event, index) => {
      return(
          <div key={event.slug + "-" + index} className='event-container'>
              <img src={getFeaturedImage(event)} alt={event.title.rendered} />
              <div className="event-details">
                <h3 className='title'> {event.title.rendered} </h3>
                <h5> {event.acf.event_type}</h5>
                <div dangerouslySetInnerHTML={{__html: event.excerpt.rendered}}/>
                <h5> {event.acf.dates} </h5>      
                <button> <a href={`#event/${event.id}`}> Read More </a> </button>   
            </div>
          </div>
      );
    });

  return (
    <>
        {/* this is returning all of our posts */}
        {mappedEvents}
    </>
  )
};

// Volunteers Component UseEffect
useEffect (() => {
  axios.get(`${volunteerEndpoint}`)
  .then((res) => {
      console.log(res);
      setVolunteerOpportunities(res.data);
      setLoading(false);
  })
  .catch((error) => console.log(error))
}, []);

// Mapped Volunteers Component
const Volunteers = ({volunteerOpportunities}) => {
  const mappedVolunteers = (volunteerOpportunities || []).map((volunteerOpportunity, index) => {
      return(
          <div key={volunteerOpportunity.slug + "-" + index} className='volunteer-container'>
              <img src={getFeaturedImage(volunteerOpportunity)} alt={volunteerOpportunity.title.rendered} />
              <div className="volunteer-details">
                <h3 className='title'> {volunteerOpportunity.title.rendered} </h3>
                <h5> {volunteerOpportunity.acf.volunteer_type} </h5>
                <div dangerouslySetInnerHTML={{__html: volunteerOpportunity.excerpt.rendered}}/>
                <h5> {volunteerOpportunity.acf.dates} </h5>      
                <button> <a href={`#volunteerOpportunity/${volunteerOpportunity.id}`}> Read More </a> </button>         
              </div>
          </div>
      );
  });

  return (
    <>
        {/* this is returning all of our posts */}
        {mappedVolunteers}
    </>
)
};

// Get Featured Image Function (Events & Volunteers)
function getFeaturedImage(event) {
  if (event && event._embedded && event._embedded['wp:featuredmedia'] && event._embedded['wp:featuredmedia'][0].source_url) {
    return event._embedded['wp:featuredmedia'][0].source_url;
  } else {
    return 'https://via.placeholder.com/150';
  }
};

// Page Header Component
  const PageHeader = ({ title, image_url }) => {
    return (
      <div className='page-header' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${image_url})`}}>
        <h1> {title} </h1>
      </div>
    )
};


// Master Return
  return (
    <>
      {/* SEO */}
      <Seo title="Events & Volunteering - Forest and Bird" />

      {/* Events & Volunteering Page */}
      <div className='events-volunteer-page'>
        <PageHeader title="Events & Volunteering" image_url={'/events-bg.jpg'}/>
        <div className='events-volunteer-content'>
          <h2> Upcoming Events </h2>
          <div id="eventCont">
            {loading ? <p>Loading...</p> : <Events events={events}/>}
          </div>

          <h2> Upcoming Volunteer Opportunities </h2>
          <div id="volunteerCont">
            {loading ? <p> Loading... </p> : <Volunteers volunteerOpportunities={volunteerOpportunities}/>}
          </div>
        </div>
      </div>
    </>
   
  );
};

export default EventsAndVolunteer
