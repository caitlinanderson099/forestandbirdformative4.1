// Basic Imports
import { Routes, Route} from 'react-router-dom'
// Page Imports
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Shop from '../pages/Shop'
import EventsAndVolunteer from '../pages/EventsAndVolunteer'
import Event from './Event'
import Volunteer from './Volunteer'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import ConfirmationPage from '../pages/ConfirmationPage'

// Links Component (main)
const Links = () => {
    // Master Return
    return (
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/events-and-volunteer" element={<EventsAndVolunteer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/confirmation" element={<ConfirmationPage/>}/>
        {/* single pages */}
        <Route path="/event/:id" element={<Event />} />
        <Route path="/volunteeropportunity/:id" element={<Volunteer />} />
    </Routes>
    );
};

export default Links