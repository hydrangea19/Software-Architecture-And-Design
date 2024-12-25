import React from 'react';
import { SocialButton } from './SocialButtons';
import './SignUpForm.css';
import Footer from './Footer/Footer';
import {useNavigate} from "react-router-dom";


const socialIcons = [
  { icon: "/icons/facebook.png", alt: "Facebook login" },
  { icon: "/icons/google.png", alt: "Google login" },
  { icon: "/icons/twitter.png", alt: "Twitter login" },
];



 function Signup() {
         const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };
  return (
    <div className="signupContainer">
      <img
        loading="lazy"
        src="/logo.png"
        alt="Company Logo"
        className="logo"
      />
      <h1 className="title">Sign Up</h1>

      <form className="formContainer">
        <div className="formGrid">
          <div className="labelColumn">
            <label htmlFor="name" className="formLabel">Name</label>
            <label htmlFor="email" className="formLabel">Email</label>
            <label htmlFor="password" className="formLabel">Password</label>
          </div>
          <div className="inputColumn">
            <input
              type="text"
              id="name"
              className="formInput"
              defaultValue="Emma Wiilliams"
            />
            <input
              type="email"
              id="email"
              className="formInput"
              defaultValue="emmawilliams@gmail.com"
            />
            <input
              type="password"
              id="password"
              className="formInput"
              defaultValue="************"
            />
            <span className="orText">or with</span>
          </div>
        </div>
      </form>

      <div className="socialButtonsContainer">
        {socialIcons.map((social, index) => (
          <SocialButton key={index} {...social} />
        ))}
      </div>

      <button className="signupButton" onClick={handleClick}>Sign Up</button>

    <Footer/>
    </div>
  );
}
export default Signup