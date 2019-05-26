import React, { Component } from "react";

import Energy from "./components/Energy";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Food Tracker</h1>
        </div>
        <Energy />
      </div>
    );
  }
}

export default App;
