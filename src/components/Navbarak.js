import React from "react";
import { Link } from "react-router-dom";
import "./Navbarak.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <Link to="/" id="link-app">
        Airpeace
      </Link>

      <Link to="/arik" id="link-akp">
        Arik
      </Link>
    </div>
  );
};

export default Navbar;
