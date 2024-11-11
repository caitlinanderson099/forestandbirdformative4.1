// Base Imports
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import Seo from "../components/Seo"

// Home Page Component
const Home = () => {

  // Variables & States
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Shop Navigation Function
  const handleShopClick = (event) => {
    event.preventDefault();
    navigate('/shop');
  };

  // Events & Volunteer Navigation Function
  const handleEventClick = (event) => {
    event.preventDefault();
    navigate('/events-and-volunteer');
  };

  // Open/Close Mobile Menu Function
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Modal Component
  const Modal = () => (
    <div className="modal-overlay" onClick={toggleModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Donate</h2>
            <p>Your support makes a difference!</p>
            <button onClick={toggleModal}>Close</button>
        </div>
    </div>
  );

  // Page Header Component
  const PageHeader = ({ title, image_url }) => {
    return (
      <div className='page-header' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${image_url})`}}>
        <h1> {title} </h1>
      </div>
    )
  }

  // Master Return
  return (
    <>
      {/* SEO */}
      <Seo title="Home - Forest and Bird" description="Browse my amazing redesign of their website" url={window.location.href}/>

      {/* Home Page */}
      <div className='home-page'>
        <PageHeader title="Forest & Bird" image_url={'/home-bg.jpg'}/>
        <div className='home-content'>

          <div className='home-top'>
            <div className='top-left'>
              <h2> Who Is Forest & Bird?</h2>
              <img src="/staff.jpg" alt="Forest & Bird Staff at Auckland birthday party" />
            </div>
            <div className='top-right'>
              <p> Forest & Bird NZ is New Zealand’s leading independent conservation organization, dedicated to protecting and restoring the natural landscapes, wildlife, and ecosystems unique to Aotearoa. Established in 1923, Forest & Bird works tirelessly to safeguard native forests, birds, marine life, and endangered species, advocating for policies and actions that ensure the preservation of New Zealand's precious biodiversity. Through community-driven conservation efforts, education, and scientific research, Forest & Bird inspires Kiwis to cherish and actively protect their environment, creating a legacy of thriving nature for future generations.  </p>
              <sup> Image Shown: Forest & Bird staff at the Big Birthday Bash in Auckland celebrating 100 years of Forest & Bird </sup>
            </div>
          </div>

          <div className='home-middle'>
            <h2> Forest & Bird is protecting our lands across Aotearoa New Zealand </h2>
            <div className='protection-images'>
              <div className="protection-image">
                <img src="/land.jpg" alt="" />
                <h4> Land </h4>
                <p> Te Whenua </p>
              </div>
              <div className="protection-image">
              <img src="/fresh-water.jpg" alt="" />
              <h4> Fresh Water </h4>
              <p> Te Wai Māori </p>
              </div>
              <div className="protection-image">
              <img src="/oceans.jpg" alt="" />
              <h4> Oceans </h4>
              <p> Ngā Moana </p>
              </div>
              <div className="protection-image">
              <img src="/climate.jpg" alt="" />
              <h4> Climate </h4>
              <p> Te āhuarangi </p>
              </div>
            </div>
          </div>

          <div className='home-bottom'>
            <h2 className='subtitle'> Want To Help Us Continue Our Mission? </h2>
            <h3 className='subtitle'> Donate Right Here To Our Beautiful Cause </h3>
            <div className='donate-buttons'>
              <div className="donate-button">
                <h3> $25 </h3>
              </div>
              <div className="donate-button">
                <h3>$50</h3>
              </div>
              <div className="donate-button">
                <h3>$100</h3>
              </div>
              <div className="donate-button">
                <h3> $200 </h3>
              </div>
              <button className='confirm-button'> Confirm Donation </button>

            </div>
          </div>
         
        </div>
        {/* Modal */}
        {isModalOpen && <Modal />} 

      </div>
    </>
   
  )
}

export default Home
