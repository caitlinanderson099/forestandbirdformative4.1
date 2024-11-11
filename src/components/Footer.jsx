// Base Import
import React from 'react';

// Footer Component
const Footer = () => {
    // Master Return
    return (
        <footer>
            <div className='left'>
                <img src="/logo.svg" alt='forest and bird logo' />
                <h5> © Forest & Bird NZ 2024 </h5>
            </div>

            <div className='middle'>
                <h5> &#9990; : 0800 200 064 </h5>
                <h4> Email Address: office@forestandbird.org.nz </h4>
                <h4> Location: Ground Floor, 205 Victoria Street, Te Aro, Wellington 6011 </h4>
            </div>

            <div className='right'>
                <label htmlFor="email"> Subscribe to our mailing address: </label>
                <div className='input-btn'>
                    <input type="text" name='email' placeholder='Enter Email Here...'/>
                    <button> Subscribe </button>
                </div>
            </div>
        </footer>
  )
}

export default Footer
