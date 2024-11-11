// Base Imports
import { useNavigate } from 'react-router-dom'
import Seo from '../components/Seo';

// Confirmation Page Component
const ConfirmationPage = () => {

  // Variable
    const navigate = useNavigate();

    // Home Page Navigation Function
    const handleHome = () => {
        navigate('/');
    };

  // Master Return
  return (
    <>
      {/* SEO */}
      <Seo title="Order Confirmed! - Forest and Bird" />

      {/* Confirmation Page */}
      <div className='confirmation-page'>
        <div className='confirmation-box'>
            <h1> Good News! Your Order Has Been Confirmed! </h1>
            <h2> Check Your Inbox For Order Details </h2>
            <button onClick={handleHome}> Go To Home </button>
        </div>
      </div>
    </>
  )
}

export default ConfirmationPage
