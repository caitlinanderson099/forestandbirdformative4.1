// Base Imports
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import Seo from "../components/Seo"
import axios from 'axios';

// Contact Form ENV Import
const formEndpoint = import.meta.env.VITE_APP_WP_API_DONATION_FORM_ENDPOINT;

// Home Page Component
const Home = () => {

  // Variables & States
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Donation Form Component
  const DonationForm = () => {

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [area, setArea] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

     // Handle Submit Form Function
     const handleSubmit = (event) => {
      // stop page refreshing
      event.preventDefault();
      const testForm = new FormData();
        testForm.append('your-name', name)
        testForm.append('your-email', email)
        testForm.append('your-message', message)
        testForm.append('your-area', area)
        testForm.append('your-amount', amount)

        axios.post(formEndpoint, testForm, {
          // include headers to tell the mail service we're sending a form
          // headers tell the server what to expect
          headers: {
              "Content-Type": "application/x-www-form-urlencoded",
          }
      })
      
      .then(function (response) {
        console.log(response);
        // update state to show submitted
        setSubmitted(true);
      })
      .catch(function (error) {
        console.log(error);
        // update state to show error
        setError(true);
      });
    };

    // Success Message
    if (submitted) {
      return (
          <>
              <h3>Thank you for your donation!</h3>
              <p>We really appreciate your help!</p>
          </>
      );
    };
    // Error Message
    if (error) {
      return (
          <>
              <h3>Error!</h3>
              <p>Sorry, we were unable to send your donation.</p>
          </>
      );
    };

    return (
      <form
        onSubmit={handleSubmit}
        method="POST"
      >

      <div className='donate-form-group'>
        <label htmlFor=""> Full Name: </label>
        <input  
          type="text"
          name="name"
          onChange={(event) => setName(event.target.value)}
          value={name}
          required
        />
      </div>

      <div className='donate-form-group'>
        <label htmlFor=""> Email Address: </label>
        <input  
          type="email"
          name="email"
          onChange={event => setEmail(event.target.value)}
          value={email}
          required
        />
      </div>

      <div className='donate-form-group'>
        <label htmlFor=""> Which conservation area are you most interested in donating to: </label>

        {/* Land Checkbox */}
        <div className='form-checkbox'>
          <label htmlFor="landcheckbox"> Land </label>
          <input 
              type="checkbox" 
              name="landcheckbox" 
              id="landcheckbox" 
              onChange={event => setArea(event.target.value)}
              value={area}
          />
        </div>

        {/* Fresh Water Checkbox */}
        <div className='form-checkbox'>
          <label htmlFor="freshcheckbox"> Fresh Water </label>
          <input 
              type="checkbox" 
              name="freshcheckbox" 
              id="freshcheckbox" 
              onChange={event => setArea(event.target.value)}
              value={area}
          />
        </div>

        {/* Oceans Checkbox */}
        <div className='form-checkbox'>
          <label htmlFor="oceanscheckbox"> Oceans </label>
          <input 
              type="checkbox" 
              name="oceanscheckbox" 
              id="oceanscheckbox" 
              onChange={event => setArea(event.target.value)}
              value={area}
          />        </div>

        {/* Climate Checkbox */}
        <div className='form-checkbox'>
          <label htmlFor="climatecheckbox"> Climate </label>
          <input 
              type="checkbox" 
              name="climatecheckbox" 
              id="climatecheckbox" 
              onChange={event => setArea(event.target.value)}
              value={area}
          />        </div>

        {/* All Areas Checkbox */}
        <div className='form-checkbox'>
          <label htmlFor="allareascheckbox"> All Areas </label>
          <input 
              type="checkbox" 
              name="allareascheckbox" 
              id="allareascheckbox" 
              onChange={event => setArea(event.target.value)}
              value={area}
          />        </div>
      </div>

      <div className="donate-form-group">
        <label htmlFor=""> Donation Amount: </label>

        <div className='donate-checkbox'>
          <label htmlFor="20donate"> $20 </label>
          <input 
              type="checkbox" 
              name="20donate" 
              id="20donate" 
              onChange={event => setAmount(event.target.value)}
              value={amount}
          />        
          </div>

        <div className='donate-checkbox'>
          <label htmlFor="50donate"> $50 </label>
          <input 
              type="checkbox" 
              name="50donate" 
              id="50donate" 
              onChange={event => setAmount(event.target.value)}
              value={amount}
          />         </div>

        <div className='donate-checkbox'>
          <label htmlFor="100donate"> $100 </label>
          <input 
              type="checkbox" 
              name="100donate" 
              id="100donate" 
              onChange={event => setAmount(event.target.value)}
              value={amount}
          />         </div>

        <div className='donate-checkbox'>
          <label htmlFor="200donate"> $200 </label>
          <input 
              type="checkbox" 
              name="200donate" 
              id="200donate" 
              onChange={event => setAmount(event.target.value)}
              value={amount}
          />         </div>

      </div>

      <div className='donate-form-group'>
        <label htmlFor=""> I would like to help because...  </label>
        <textarea
                name="message"
                onChange={event => setMessage(event.target.value)}
                value={message}
                required
            />      </div>

      <button type="submit"> Send Donation! </button>
    </form>   
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
            <DonationForm/>          
          </div>
         
        </div>
        {/* Modal */}
        {isModalOpen && <Modal />} 

      </div>
    </>
   
  )
}

export default Home
