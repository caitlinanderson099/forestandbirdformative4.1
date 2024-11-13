// Base Import
import React from 'react';

import { FaFacebook } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
// Footer Component
const Footer = () => {
    // Master Return
    return (
        <footer>
            <div className='left'>
                <img src="/logo.png" alt='forest and bird logo' />
            </div>

            <div className='connect'>
                <a href="https://www.facebook.com/forestandbird/" className='icon-sub'><FaFacebook className='icon'/> Join us on Facebook </a>
                <a href="https://x.com/Forest_and_Bird" className='icon-sub'><FaTwitter className='icon'/> Follow us on Twitter </a>
                <a href="https://www.youtube.com/user/forestandbird" className='icon-sub'><FaYoutube className='icon'/> Learn with us on Youtube </a>
                <a href="https://www.instagram.com/forestandbird/?hl=en" className='icon-sub'> <FaInstagramSquare className='icon'/> Check us out on Instagram </a>
                <a href="https://www.linkedin.com/company/forest-&-bird/" className='icon-sub'><FaLinkedin className='icon'/> Find us on LinkedIn </a>
            </div>

            <h5> © Forest & Bird NZ 2024 </h5>
        </footer>
  )
}

export default Footer
