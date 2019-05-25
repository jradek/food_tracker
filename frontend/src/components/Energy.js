import React, { Component } from "react";
// import PropTypes from "prop-types";

import axios from 'axios';

class Energy extends Component {

  state = {
    fats: 0,
    carbs: 0,
    proteins: 0,
    result: null
  }

  onChange = (e) => this.setState({ [e.target.name]: parseFloat(e.target.value) })

  onSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    console.log(this.state);


    const f = this.state.fats.toString();
    const c = this.state.carbs.toString();
    const p = this.state.proteins.toString();

    axios.get('http://localhost:5000/api/v1/energy?fats=' + f + '&carbs=' + c + '&prots=' + p).then(res => {
      console.log(res.data);
      this.setState({ 'result': res.data })
  });
  }

  renderResult() {
    if (this.state.result !== null) {
      const calories = this.state.result['kcal'];
      return (<span>fats = {calories['fats']}, carbs = {calories['carbs']}, proteins = {calories['prots']} (Overall: {calories['total']}) </span>);
    }
  }

  render() {
    return (
      <div>
        <h2>Energy</h2>
        <form onSubmit={this.onSubmit}>
          <input type="number" name="fats" min="0" step="0.01" placeholder="fats" value={this.state.fats} onChange={this.onChange}
          />
          <input type="number" name="carbs" min="0" step="0.1" placeholder="carbohydrates" value={this.state.carbs} onChange={this.onChange}
          />
          <input type="number" name="proteins" min="0" step="0.1" placeholder="proteins" value={this.state.proteins} onChange={this.onChange}
          />
          <input
            type="submit"
            value="Submit"
            className="btn"
            style={{flex: "1"}}
        />
        </form>
        <br/>
        { this.renderResult() }
      </div>
    );
  }
}

export default Energy;
