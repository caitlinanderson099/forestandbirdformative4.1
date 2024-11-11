// Base Imports
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Seo from '../components/Seo';

// Cart Page Component
const Cart = () => {

    // Variables & States
    const {cart, updateCart, removeFromCart} = useContext(CartContext);
    const navigate = useNavigate();

    // Handle Increment Function
    const handleIncrement = (item) => {
        updateCart(item.id, item.quantity + 1);
    };

    // Handle Decrement Function
    const handleDecrement = (item) => {
        // If Statement
        if(item.quantity > 1) {
            updateCart(item.id, item.quantity - 1);
        } else {
            removeFromCart(item.id);
        };
    };

    // Handle Continue Shopping Navigation Function
    const handleContinueClick = (e) => {
        e.preventDefault();
        navigate('/shop');
    };

    // Handle Proceed To Checkout Navigation Function
    const handleProceedClick = (e) => {
        e.preventDefault();
        navigate('/checkout');
    };

    // Master Return
    return (
        <>
            {/* SEO */}
            <Seo title="My Cart - Forest and Bird"/>
            
            {/* Cart Page */}
            <div className="cart-page">
                <h1> My Cart </h1>
                {cart.length === 0 ? (
                    <p>  Your cart is empty! </p>
                ) : (
                    <ul className="cart-item-grid">
                        {cart.map((item) => (
                            <li key={item.id}>
                                {item.images && item.images.length > 0 && (
                                <img
                                    src={item.images[0].src}
                                    alt={item.images[0].alt || item.name}
                                />  
                            )} 
                                <div className="cart-item-details">
                                    <h2> {item.name} </h2>
                                    <p> {item.category} </p>
                                    {item.categories && item.categories.length > 0 && (
                                    <h4 className="category"> {item.categories.map(category => category.name).join(', ')} </h4> 
                                    )} 
                                    <h3 className="price"> ${(item.prices.price / 100).toFixed(2)} </h3>
                                    <p> Quantity: {item.quantity} </p>
                                    <div className="cart-item-buttons">
                                        <button onClick={() => handleDecrement(item)}>-</button>
                                        <button onClick={() => handleIncrement(item)}>+</button>
                                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                                    </div>
                            </div>                           
                        </li>
                    ))}
                </ul>
            )}
            <button className="checkout-btn" onClick={handleProceedClick}> Proceed To Checkout </button>
            <button className="checkout-btn" onClick={handleContinueClick}> Continue Shopping </button>
        </div>
        </>
    );
};

export default Cart;