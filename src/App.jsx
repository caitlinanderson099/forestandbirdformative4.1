// Base Imports
import {useEffect} from 'react';
import {HashRouter} from 'react-router-dom';
import './App.css'
import useCustomizer from './hooks/useCustomizer';
import Navbar from './components/Navbar';
import Links from './components/Links';
import Footer from './components/Footer';

// App Componet
const App = () => {

  // Variables
  const {bgColor, fontFamily, navColor, buttonColor, buttonTextColor, buttonBorderColor} = useCustomizer();

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
    if (fontFamily === "DotGothic") {
      document.body.style.fontFamily = `"DotGothic16", sans-serif`;
    }

    document.querySelector('nav').style.backgroundColor = navColor;
    document.querySelector('footer').style.backgroundColor = navColor;
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.style.backgroundColor = buttonColor;
      button.style.color = buttonTextColor;
      button.style.border = buttonBorderColor;
  })

  },[bgColor, fontFamily, navColor, buttonColor, buttonTextColor, buttonBorderColor])
  
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
