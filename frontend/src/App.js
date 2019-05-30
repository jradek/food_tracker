import React, { Component } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";

import Energy from "./components/Energy";
import { FilterableProductTable } from "./components/ProductTable";

import "./App.css";

function NavigationBar(props) {
  return (
    <div className="container">
      <ul className="nav nav-fill nav-pills">
        <li className="nav-item">
          <NavLink exact className="nav-link" activeClassName="active" to="/">
            home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/energy">
            energy
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/products">
            products
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

function WelcomePage(props) {
  return (
    <div className="container">
      <p>Welcome to the food tracker</p>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavigationBar />
          <div className="container">
            <h1>Food Tracker</h1>
          </div>
          <Route exact path="/" render={props => <WelcomePage />} />
          <Route path="/energy" render={props => <Energy />} />
          <Route
            path="/products"
            render={props => <FilterableProductTable />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
