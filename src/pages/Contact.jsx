// Base Imports
import { useState } from 'react';
import Seo from "../components/Seo"
import axios from "axios"

// Contact Form ENV Import
const formEndpoint = import.meta.env.VITE_APP_WP_API_FORM_ENDPOINT;

// Main Contact Component
const Contact = () => {

  // Page Header Component
  const PageHeader = ({ title, image_url }) => {
    return (
      <div className='page-header' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${image_url})`}}>
        <h1> {title} </h1>
      </div>
    )
  }

  // Contact Form Component
  const ContactForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // Handle Submit Form Function
    const handleSubmit = (event) => {
      // stop page refreshing
      event.preventDefault();
      const testForm = new FormData();
        testForm.append('your-name', name)
        testForm.append('your-email', email)
        testForm.append('your-message', message)
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
              <h3>Thank you!</h3>
              <p>We'll be in touch soon.</p>
          </>
      );
    };
    // Error Message
    if (error) {
      return (
          <>
              <h3>Error!</h3>
              <p>Sorry, we were unable to send your message.</p>
          </>
      );
    };

    // Contact Form Return
    return (
    <form
        onSubmit={handleSubmit}
        method="POST"
    >
        <div className='form-input'>
            <label htmlFor="name">Name: <span>*</span></label>
            <input
                type="text"
                name="name"
                onChange={(event) => setName(event.target.value)}
                value={name}
                required
            />
        </div>
        <div className='form-input'>
            <label htmlFor="email">Email: <span>*</span></label>
            <input
                type="email"
                name="email"
                onChange={event => setEmail(event.target.value)}
                value={email}
                required
            />
        </div>
        <div className='form-input'>
            <label htmlFor="message">Message: <span>*</span></label>
            <textarea
                name="message"
                onChange={event => setMessage(event.target.value)}
                value={message}
                required
            />
        </div>
        <div>
            <button
                className="regular-button"
                type="submit"
            >
                Send a message
            </button>
        </div>
    </form>
    );
  };

  // Master Return
  return (
    <>
      {/* SEO */}
      <Seo title="Contact Us - Forest and Bird" />

      {/* Contact Page */}
      <div className='contact-page'>
        <PageHeader title="Contact Us" image_url={'/contact-bg.jpg'}/>
        {/* Contact Content */}
        <div className='contact-page-content'>
          <h2> Contact Forest & Bird </h2>
          <h3> National Office (Wellington) </h3>

          {/* Contact Details Container */}
          <div className='contact-details'>

            {/* Detail Group */}
            <div className='details'>
            <h4> Location: </h4> 
            <p> Ground Floor, 205 Victoria Street, Te Aro, Wellington 6011 </p>
            </div>

            {/* Detail Group */}
            <div className='details'>
              <h4> Postal Address: </h4>
              <p>  Forest & Bird, PO Box 631, Wellington 6140 </p>
            </div>

            {/* Detail Group */}
            <div className='details'>
              <h4> Free Phone Number: </h4>
              <p> 0800 200 064 </p>
              <li> Option 1 - Donation Enquiries including donation receipts </li>
              <li> Option 2 - Membership Enquiries or renewals (including Youth & KCC) and for updates to personal details </li>
              <li> Option 3 - Ruapehu Lodge bookings/general enquiries </li>
            </div>

          </div>

          <h3> Use our contact form below for all general enquiries to National Office or email us at <span className='email-link'> office@forestandbird.org.nz </span> </h3>
          <ContactForm />
      </div>
      
    </div>
    </>
    
  )
}

export default Contact
