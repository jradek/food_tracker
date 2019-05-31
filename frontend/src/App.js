import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Energy from "./components/Energy";
import NavigationBar from "./components/NavigationBar";
import { FilterableProductTable } from "./components/ProductTable";

import "./App.css";

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
