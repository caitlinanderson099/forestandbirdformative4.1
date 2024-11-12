// Base Imports
import { useState, useEffect } from "react";
import axios from "axios";

// useCustomizer Component
const useCustomizer = () => {
    // States

    // Background
    const [bgColor, setBgColor] = useState("");
    const [footerColor, setFooterColor] = useState("");
    // Fonts
    const [fontFamily, setFontFamily] = useState("");
    // Navbar & MobileMenu
    const [navColor, setNavColor] = useState("");
    // Buttons
    const [buttonColor, setButtonColor] = useState("");
    const [buttonTextColor, setButtonTextColor] = useState("");
  
    // ENV Import
    const baseURL = import.meta.env.VITE_WP_BASE_URL;

    // UseEffect Function
    useEffect(() => {
        axios.get(`${baseURL}wp-json/custom-theme/v1/customizer-settings`)
        .then((response) => {
            const {backgroundColor, fontFamily, navbarColor, footerColor, buttonColor, buttonTextColor} = response.data;
            setBgColor(backgroundColor);
            setFontFamily(fontFamily);
            setNavColor(navbarColor);
            setButtonColor(buttonColor);
            setFooterColor(footerColor);
            setButtonTextColor(buttonTextColor);
        })
        .catch((error) => {
            console.error('Error Fetching customizer settings: ', error)
        })
    }, [baseURL]);

    // Customizer Return
    return {bgColor, fontFamily, navColor, buttonColor, footerColor, buttonTextColor};
};

export default useCustomizer;