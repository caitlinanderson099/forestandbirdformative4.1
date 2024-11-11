// Basic Imports
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Seo from '../components/Seo'

// Base URL Variable
const baseURL = import.meta.env.VITE_WP_API_BASEURL;

// Single Page Volunteer Component (main)
const Volunteer = () => {

    // Variables
    const {id} = useParams();
    const [volunteerOpportunities, setVolunteerOpportunities] = useState(null);
    const [taxonomies, setTaxonomies] = useState([])
    const [loading, setLoading] = useState(true);
    const [seoData, setSeoData] = useState(null);
    const navigate = useNavigate();
    // Endpoint Variable
    const endpoint = `${baseURL}/volunteeropportunity/${id}?_embed`;

    // Volunteer UseEffect
    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((response) => {
            console.log(response.data);
            setVolunteerOpportunities(response.data);
            setSeoData(response.data.yoast_head_json);
            setLoading(false); 
        })
        .catch((error) => console.log(error))
    }, [id]);

    // Locations Taxonomy
    const Locations = () => {
        const taxonomyEndpoint = volunteerOpportunities._links['wp:term'][0].href;
  
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

    // Get Featured Image Function (Volunteers)
    function getVolunteerFeaturedImage(volunteerOpportunities) {
        if (volunteerOpportunities && volunteerOpportunities._embedded && volunteerOpportunities._embedded['wp:featuredmedia'] && volunteerOpportunities._embedded['wp:featuredmedia'][0].source_url) {
          return volunteerOpportunities._embedded['wp:featuredmedia'][0].source_url;
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
            <SingleHeader title={volunteerOpportunities.title.rendered} image_url={getVolunteerFeaturedImage(volunteerOpportunities)}/>    
            <div className='single-container'>
              <h1 className='title'>{volunteerOpportunities.title.rendered}</h1>
              <Locations/>
              <div dangerouslySetInnerHTML={{__html: volunteerOpportunities.content.rendered}}/>
            </div>
          </div>
        </>
    );   
};

export default Volunteer;