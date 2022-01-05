import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <Link to="/" id="link-ap">
        Airpeace
      </Link>

      <Link to="/arik" id="link-ak">
        Arik
      </Link>
    </div>
  );
};

export default Navbar;
