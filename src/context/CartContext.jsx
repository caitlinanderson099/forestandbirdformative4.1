// Base Import
import { createContext, useState } from "react";
// Base Exports
export const CartContext = createContext();

// Exported Component
export const CartProvider = ({children}) => {
    // State
    const [cart, setCart] = useState([]);

    // Add To Cart Component Function
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                // if product exists, update the qunatity
                return prevCart.map(item =>
                    item.id === product.id ? {...item, quantity: item.quantity + 1} : item
                );
            }

            // if product doesnt exist, add it to cart with quantity of 1
            return [...prevCart, {...product, quantity: 1}];
        });
    };

    // Update Cart Component Function
    const updateCart = (itemId, newQuantity) => {
        setCart((prevCart) => {
            return prevCart.map((item) => {
                if(item.id === itemId) {
                    return {...item, quantity: newQuantity};
                };
                return item;
            });
        });
    };

    // Remove From Cart Component Function
    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    };

    // Master Return
    return (
        <CartContext.Provider value={{ cart, addToCart, updateCart, removeFromCart}}>
            {children}
        </CartContext.Provider>
    );
};