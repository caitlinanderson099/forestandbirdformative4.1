// Base Imports
import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";
import {CartContext} from "../context/CartContext";
import axios from "axios"

const baseURL = import.meta.env.VITE_WP_BASE_URL

// Navbar Component
const Navbar = () => {

    // Variables & States
    const {cart} = useContext(CartContext);
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [logoUrl, setLogoUrl] = useState("");

    // Logo Fetching UseEffect
    useEffect(() => {
        const fetchNavLogo = async () => {
            try {
                const response = await axios.get(`${baseURL}wp-json/custom/v1/nav-logo`)
                if (response.status === 200) {
                    const data = response.data;
                    setLogoUrl(data[0]);
                } else {
                    console.error('Failed to fetch logo URL');
                }
            } catch (error) {
                console.error('Error fetching logo', error)
            }
        };

        fetchNavLogo();
    }, [])

    // MobileMenu Function
    const toggleMenu = () => {
        setIsOpen(!isOpen);  // Toggle between true and false
        document.body.style.overflow = isOpen ? 'auto' : 'hidden'; // Disable page scroll when menu is open
    };

    // Open/Close MobileMenu
    const closeMenu = () => {
        setIsOpen(false);  // Set isOpen to false, closing the menu
        document.body.style.overflow = 'auto';  // Restore scroll functionality
    };

    // Open/Close Modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen); // Toggles modal visibility
    };

    // Modal
    const Modal = () => (
        <div className="modal-overlay" onClick={toggleModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Thank You For Your Donation!</h2>
                <p>Your support makes a huge difference!</p>
                <button onClick={toggleModal}>Close</button>
            </div>
        </div>
    );
    

    // Master Return
    return (
        <header>
            <nav className={`navbar ${isOpen ? "menu-open" : ""}`}>
                <NavLink to="/" className="logo">
                    <img src={logoUrl} alt="website logo" />
                </NavLink>
                <div className="menu-icon" onClick={toggleMenu}>
                    <div className={`bar bar1 ${isOpen ? "toggle" : ""}`}></div>
                    <div className={`bar bar2 ${isOpen ? "toggle" : ""}`}></div>
                    <div className={`bar bar3 ${isOpen ? "toggle" : ""}`}></div>
                </div>
                <ul className={`nav-links ${isOpen ? "active" : ""}`}>
                    {/* Home Link */}
                    <li>
                        <NavLink
                            to="/"
                            onClick={closeMenu}
                            className={({ isActive }) => (isActive ? "active-link" : "")}>
                                Home
                            </NavLink>
                    </li>

                    {/* Shop Link */}
                    <li>
                        <NavLink
                            to="/shop"
                            onClick={closeMenu}
                            className={({ isActive }) => (isActive ? "active-link" : "")}>
                                Shop
                            </NavLink>
                    </li>

                    {/* Events & Volunteering Link */}
                    <li>
                        <NavLink
                            to="/events-and-volunteer"
                            onClick={closeMenu}
                            className={({ isActive }) => (isActive ? "active-link" : "")}>
                                Events & Volunteer
                            </NavLink>
                    </li>

                    {/* Contact Us Link */}
                    <li>
                        <NavLink
                            to="/contact"
                            onClick={closeMenu}
                            className={({ isActive }) => (isActive ? "active-link" : "")}>
                                Contact Us
                            </NavLink>
                    </li>

                    {/* Cart Link */}
                    <li>
                        <NavLink
                            to='/cart'
                            onClick={closeMenu}
                            className={({isActive}) => (isActive ? "active-link" : "")}
                        > 
                        <FaCartPlus className="cart-icon" /> ({cartCount})
                        </NavLink>
                    </li>

                    {/* Donate Button */}
                    <button onClick={toggleModal}>
                        Donate Here
                    </button>
                </ul>
            </nav>
            {/* Open/Close MobileMenu & Modal */}
            {isOpen && <div className="overlay" onClick={closeMenu}></div>}
            {isModalOpen && <Modal />} 
      
        </header>
  )
}

export default Navbar
