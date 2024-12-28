import React from 'react';
import './SignUpForm.css';

export const SocialButton = ({ icon, alt }) => (
  <div className="socialButton">
    <img
      loading="lazy"
      src={icon}
      alt={alt}
      className="socialIcon"
    />
  </div>
);