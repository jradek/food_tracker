import React, { Component } from "react";

import Energy from "./components/Energy";
import ProductTable from "./components/ProductTable";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Food Tracker</h1>
        </div>
        {/* <Energy /> */}
        <ProductTable />
      </div>
    );
  }
}

export default App;
