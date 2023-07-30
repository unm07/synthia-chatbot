import React from 'react';
import "./styles.css"
const Header = () => {
  return (
    <div className="header">
      <img src={require("./logo.png")} alt="Logo" className="logo" />
      <h1>synthia</h1>
    </div>
  );
};

export default Header;