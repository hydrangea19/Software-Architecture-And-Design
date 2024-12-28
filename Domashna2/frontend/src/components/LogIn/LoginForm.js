import React from 'react';
import Footer from './Footer/Footer';
import  './LoginForm.css';
import {useNavigate} from "react-router-dom";

function LoginForm() {
     const navigate = useNavigate();

  const handleClick = () => {
    navigate('/issuers');
  };
    return (

        <div className="loginContainer">
            <img
                loading="lazy"
                src="/logo.png"
                alt="Company logo"
                className="logo"
            />
            <h1 className="title">Log In</h1>

            <form className="formContainer">
                <div className="formGrid">
                    <div className="labelColumn">
                        <label htmlFor="email" className="label">Email</label>
                        <label htmlFor="password" className="label">Password</label>
                    </div>
                    <div className="inputColumn">
                        <input
                            type="email"
                            id="email"
                            className="input"
                            placeholder="emmawilliams@gmail.com"
                            aria-label="Email input"
                        />
                        <input
                            type="password"
                            id="password"
                            className="input"
                            placeholder="************"
                            aria-label="Password input"
                        />
                    </div>
                </div>
                <button type="submit" className="submitButton" onClick={handleClick}>Log In</button>
            </form>

            <Footer/>
        </div>
    );
}

export default LoginForm;
