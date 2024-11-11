// Base Imports
import { useNavigate } from 'react-router-dom';
import Seo from '../components/Seo';

// Checkout Page Component
const Checkout = () => {

    // Variable
    const navigate = useNavigate();

    // Navigate Back Function
    const handleBack = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    // Handle Confirm Function
    const handleConfirm = (e) => {
        e.preventDefault();
        navigate('/confirmation');
    };

    // Master Return
    return (
        <>
            {/* SEO */}
            <Seo title="Checkout - Forest and Bird"/>

            {/* Checkout Page */}
            <div className='checkout-page'>
                <div className='checkout-box'>
                    <h1> Checkout </h1>
                    <h3> Are You Sure You Want To Purchase? </h3>
                    <div className='checkout-buttons-cont'>
                        <button onClick={handleConfirm}> Yes </button>
                        <button onClick={handleBack}> No </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout;