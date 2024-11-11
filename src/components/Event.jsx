// Basic Imports
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Seo from "./Seo";

// Base URL Variable
const baseURL = import.meta.env.VITE_WP_API_BASEURL;

// Single Page Event Component (main)
const Event = () => {

      // Variables
      const [taxonomies, setTaxonomies] = useState([])
      const {id} = useParams();
      const [event, setEvent] = useState(null);
      const [loading, setLoading] = useState(true);
      const navigate = useNavigate();
      // Endpoint Variable
      const endpoint = `${baseURL}/events/${id}?_embed`;

      // Event UseEffect
      useEffect(() => {
          axios.get(`${endpoint}`)
          .then((response) => {
              console.log(response.data);
              setEvent(response.data);
              setLoading(false); 
          })
          .catch((error) => console.log(error))
      }, [id]);

      // Location Taxonomy 
      const Locations = () => {
        const taxonomyEndpoint = event._links['wp:term'][0].href;

        useEffect(() => {
          axios.get(`${taxonomyEndpoint}`)
          .then((res) => {
            setTaxonomies(res.data)
          })
          .catch((err) => console.log(err))
        }, []);
    
        const renderedTaxonomies = taxonomies.map((taxonomy, index) => {
          return (
            <div key={index}>
              <h3 className="taxonomy-term-pill">
                {taxonomy.name}
              </h3>
            </div>
          )
        })

        return (
          <div>
            {renderedTaxonomies}
          </div>
        )
      };

      // Get Featured Image Function (Events)
      function getFeaturedImage(event) {
          if (event && event._embedded && event._embedded['wp:featuredmedia'] && event._embedded['wp:featuredmedia'][0].source_url) {
            return event._embedded['wp:featuredmedia'][0].source_url;
          } else {
            return 'https://via.placeholder.com/150';
          }
      };

    // Back Button Function
      const handleBack = (e) => {
        e.preventDefault();
        navigate(-1);
      };
    
      // Loading Conditional
      if (loading) {
        return <>Loading...</>
      };

      // Single Page Header Component
      const SingleHeader = ({title, image_url}) => {
        return (
            <div className="single-page-header" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${image_url})`}}>
                <button onClick={handleBack}> Back </button>
                <h1> {title} </h1>
            </div>
        )
      };

      // Master Return
      return (
        <>
          {/* SEO */}
          <Seo title="Events - Forest & Bird" description="This is all the information for Forest & Bird events" />

          {/* Single Page */}
          <div className='single-page'>
            <SingleHeader title={event.title.rendered} image_url={getFeaturedImage(event)}/> 
            {/* Single Page Content Container */}
            <div className='single-container'>
              <h1 className='title'>{event.title.rendered} </h1>
              <Locations/>
              <div dangerouslySetInnerHTML={{__html: event.content.rendered}}/>
            </div>
          </div>
        </>
      );
};

export default Event;