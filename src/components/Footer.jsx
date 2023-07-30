import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faSquareGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-links">
        <a href="https://github.com/unm07" target="_blank" rel="noopener noreferrer">
         <FontAwesomeIcon icon={faSquareGithub} style={{ color: "#808080", fontSize: "20px" }} />
        </a>
        <a href="https://www.linkedin.com/in/unmesh07/" target="_blank" rel="noopener noreferrer">
         <FontAwesomeIcon icon={faLinkedin} style={{ color: "#808080", fontSize: "20px" }} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
