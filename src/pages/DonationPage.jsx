import { useState } from "react";
import Seo from "../components/Seo";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Contact Form ENV Import
const formEndpoint = import.meta.env.VITE_APP_WP_API_DONATION_FORM_ENDPOINT;

const DonationPage = () => {

  // Page Header Component
  const PageHeader = ({ title, image_url }) => {
    return (
      <div className='page-header' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${image_url})`}}>
        <h1> {title} </h1>
      </div>
    )
  };

  // Donation Form Component
  const DonationForm = () => {

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [area, setArea] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

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

    const handleBackHome = () => {
      navigate('/');
    }

    // Success Message
    if (submitted) {
      return (
          <>
            <div className='donation-success-message'>
              <img src="/icons8-bird-100.png" alt="Singing Bird Icon" className='success-bird' />
              <h3>Thank you for your donation!</h3>
              <p>We really appreciate your support!</p>
              <button onClick={handleBackHome}> Back To Home </button>
            </div>
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
        className='donation-form'
      >

      <div className='form-groups'>
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

      <div className='donation-checkbox-groups'>
      <div className='donate-form-group'>
        <label htmlFor=""> Which conservation area are you most interested in donating to: </label>

        {/* Land Checkbox */}
        <div className='form-checkbox'>
          <label htmlFor="landcheckbox"> Land </label>
          <input 
              type="checkbox" 
              name="landcheckbox" 
              id="checkbox" 
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
              id="checkbox" 
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
              id="checkbox" 
              onChange={event => setArea(event.target.value)}
              value={area}
          />        </div>

        {/* Climate Checkbox */}
        <div className='form-checkbox'>
          <label htmlFor="climatecheckbox"> Climate </label>
          <input 
              type="checkbox" 
              name="climatecheckbox" 
              id="checkbox" 
              onChange={event => setArea(event.target.value)}
              value={area}
          />        </div>

        {/* All Areas Checkbox */}
        <div className='form-checkbox'>
          <label htmlFor="allareascheckbox"> All Areas </label>
          <input 
              type="checkbox" 
              name="allareascheckbox" 
              id="checkbox" 
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
              id="checkbox" 
              onChange={event => setAmount(event.target.value)}
              value={amount}
          />        
          </div>

        <div className='donate-checkbox'>
          <label htmlFor="50donate"> $50 </label>
          <input 
              type="checkbox" 
              name="50donate" 
              id="checkbox" 
              onChange={event => setAmount(event.target.value)}
              value={amount}
          />         </div>

        <div className='donate-checkbox'>
          <label htmlFor="100donate"> $100 </label>
          <input 
              type="checkbox" 
              name="100donate" 
              id="checkbox" 
              onChange={event => setAmount(event.target.value)}
              value={amount}
          />         </div>

        <div className='donate-checkbox'>
          <label htmlFor="200donate"> $200 </label>
          <input 
              type="checkbox" 
              name="200donate" 
              id="checkbox" 
              onChange={event => setAmount(event.target.value)}
              value={amount}
          />         </div>

      </div>
      </div>

      

      <div className='donate-form-group'>
        <label htmlFor=""> I would like to help because...  </label>
        <textarea
                name="message"
                onChange={event => setMessage(event.target.value)}
                value={message}
                required
            />      </div>
      </div>
      

      <button type="submit"> Send Donation! </button>
    </form>   
    )
  };

  // Master Return
  return (
    <>
      {/* SEO */}
      <Seo title="Make A Donation - Forest & Bird" description="Give Your Support To Our Cause"/>
    
      {/* Donation Page */}
      <div className='donation-page'>
        <PageHeader title="Make A Donation" image_url={'/donation-bg.jpg'}/>
        <h2 className="title"> Fill Out The Provided Form To Make A Donation </h2>
        <div className="donation-content">
          <div className="content-top">
            <DonationForm/>
          </div>
          <div className="content-bottom">
            <img src="/ferns.jpg" alt="New Zealand Green Ferns" />
            <img src="/bird-pic1.jpg" alt="New Zealand Green Bird" />
          </div>
        </div>
      </div>

    </>
  )
}

export default DonationPage;
