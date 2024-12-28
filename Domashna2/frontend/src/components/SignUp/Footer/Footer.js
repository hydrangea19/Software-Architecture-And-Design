import React from 'react';
import './Footer.css';

const Footer = () => {
  const socialIcons = [
    { icon: "/icons/footer-facebook.png", alt: "Facebook" },
    { icon: "/icons/footer-twitter.png", alt: "Twitter" },
    { icon: "/icons/footer-instagram.png", alt: "Instagram" },
  ];

  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="copyright">
          © 2024 Macedonian Stock Exchange. All rights reserved.
        </div>
        <div className="socialIcons">
          {socialIcons.map((iconData, index) => (
            <img
              key={index}
              loading="lazy"
              src={iconData.icon}
              className="socialIcon"
              alt={iconData.alt}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
