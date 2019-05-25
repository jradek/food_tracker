import React, { Component } from "react";

import Energy from "./components/Energy";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>App</h1>
        <Energy />
      </div>
    );
  }
}

export default App;
