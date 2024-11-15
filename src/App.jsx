// Base Imports
import {useEffect} from 'react';
import {HashRouter} from 'react-router-dom';
import './App.css'
import useCustomizer from './hooks/useCustomizer';
import Navbar from './components/Navbar';
import Links from './components/Links';
import Footer from './components/Footer';

// App Component
const App = () => {

  // Variables
  const {bgColor, fontFamily, navColor, footerColor, buttonColor, buttonTextColor} = useCustomizer();

  // UseEffect
  useEffect(() => {
    document.body.style.backgroundColor = `#${bgColor}`
    if (fontFamily === "Arial") {
      document.body.style.fontFamily = `"Arial", sans-serif`;
    }
    if (fontFamily === "Roboto") {
      document.body.style.fontFamily = `"Roboto", sans-serif`;
    }
    if (fontFamily === "Poppins") {
      document.body.style.fontFamily = `"Poppins", sans-serif`;
    }
    if (fontFamily === "DotGothic16") {
      document.body.style.fontFamily = `"DotGothic16", sans-serif`;
    }
    if (fontFamily === "Montserrat") {
      document.body.style.fontFamily = `"Montserrat", sans-serif`;
    }

    document.querySelector('nav').style.backgroundColor = navColor;
    document.querySelector('footer').style.backgroundColor = footerColor;
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.style.backgroundColor = buttonColor;
      button.style.color = buttonTextColor;
  })

  },[bgColor, fontFamily, navColor, footerColor, buttonColor, buttonTextColor])
  
  // Master Return
  return (
    <HashRouter>
      <Navbar/>
      <Links/>
      <Footer/>
    </HashRouter>
  )
}

export default App;
