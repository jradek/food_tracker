import React, { Component } from "react";
import { NavLink } from "react-router-dom";

/**
 * Collapsable navigation bar
 *
 * Original code from
 *
 *    https://getbootstrap.com/docs/4.0/components/navbar/#toggler
 *
 * does not work in react. The solution is described here:
 *
 *    https://www.bennettnotes.com/bootstrap-navbar-collapse-reactjs/
 *
 *    code:
 *
 *    https://github.com/DaveBben/bootstrap-navbar-collapse-reactjs
 */
class NavigationBar extends Component {
  state = {
    collapsed: true
  };

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  closeNavbar = () => {
    // console.log("close");
    this.setState({ collapsed: true });
  };

  render() {
    const collapsed = this.state.collapsed;
    const classToggle = collapsed
      ? "collapse navbar-collapse"
      : "collapse navbar-collapse show";
    const classTogglerButton = collapsed
      ? "navbar-toggler navbar-toggler-right collapsed"
      : "navbar-toggler navbar-toggler-right";

    return (
      <div className="container">
        <nav className="navbar fixed-top navbar-dark bg-dark navbar-expand-sm">
          <button
            onClick={this.toggleNavbar}
            className={`${classTogglerButton}`}
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <span className="navbar-brand mb-0 h1">Food Tracker</span>
          <div className={`${classToggle}`} id="navbarResponsive">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <NavLink
                  exact
                  className="nav-link"
                  activeClassName="active"
                  to="/"
                  onClick={this.closeNavbar}
                >
                  home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/energy"
                  onClick={this.closeNavbar}
                >
                  energy
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/products"
                  onClick={this.closeNavbar}
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
}

export default NavigationBar;
