// Base Imports
import { useState, useEffect } from "react";
import axios from "axios";

// useCustomizer Component
const useCustomizer = () => {
    // States

    // Background
    const [bgColor, setBgColor] = useState("");
    // Fonts
    const [fontFamily, setFontFamily] = useState("");
    // Navbar & MobileMenu
    const [mobileMenu, setMobileMenu] = useState("");
    const [navColor, setNavColor] = useState("");
    // Buttons
    const [buttonColor, setButtonColor] = useState("");
    const [buttonTextColor, setButtonTextColor] = useState("");
    const [buttonBorderColor, setButtonBorderColor] = useState("");
  
    // ENV Import
    const baseURL = import.meta.env.VITE_WP_BASE_URL;

    // UseEffect Function
    useEffect(() => {
        axios.get(`${baseURL}wp-json/custom-theme/v1/customizer-settings`)
        .then((response) => {
            const {backgroundColor, fontFamily, mobileMenu, navbarColor, buttonColor, buttonTextColor, buttonBorderColor} = response.data;
            setBgColor(backgroundColor);
            setFontFamily(fontFamily);
            setMobileMenu(mobileMenu);
            setNavColor(navbarColor);
            setButtonColor(buttonColor);
            setButtonTextColor(buttonTextColor);
            setButtonBorderColor(buttonBorderColor);
        })
        .catch((error) => {
            console.error('Error Fetching customizer settings: ', error)
        })
    }, [baseURL]);

    // Customizer Return
    return {bgColor, fontFamily, mobileMenu, navColor, buttonColor, buttonTextColor, buttonBorderColor};
};

export default useCustomizer;