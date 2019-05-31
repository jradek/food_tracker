import React from "react";
import { NavLink } from "react-router-dom";

function NavigationBar(_props) {
  return (
    <div className="container">
      <nav className="navbar fixed-top navbar-dark bg-dark navbar-expand-sm">
        <span className="navbar-brand mb-0 h1">Food Tracker</span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-sm-0">
            <li className="nav-item">
              <NavLink
                exact
                className="nav-link"
                activeClassName="active"
                to="/"
              >
                home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/energy"
              >
                energy
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/products"
              >
                products
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavigationBar;
