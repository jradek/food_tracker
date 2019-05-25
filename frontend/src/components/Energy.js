import * as R from "ramda";
import React, { Component } from "react";
// import PropTypes from "prop-types";

import axios from "axios";

const dummyResult = {
  grams: {
    fats: 10,
    carbs: 0.1,
    prots: 8
  },
  kcal: {
    fats: 10 * 9,
    carbs: 0.1 * 4,
    prots: 8 * 4
  }
};

function engeryRow(f, c, p) {
  const total = f + c + p;
  const values = [
    ["total_cal", total],
    ["f_cal", f],
    ["c_cal", c],
    ["p_cal", p]
  ];

  return (
    <tr>
      <th scope="row">Energy [kcal]</th>
      {values.map(e => {
        return (
          <td key={e[0]} className="number">
            {e[1].toFixed(2)}
          </td>
        );
      })}
    </tr>
  );
}

function tdBarChart(percent, colorName) {
  // see: http://jsfiddle.net/ojLf5ap6/1/
  const classNames = "percentage-bar " + colorName;
  return (
    <td className="number td-bar">
      <div className={classNames} style={{ width: percent.toString() + "%" }} />
      {percent.toFixed(2)}
    </td>
  );
}

function percentRow(label, f, c, p) {
  const total = f + c + p;
  const f_percent = (f * 100.0) / total;
  const c_percent = (c * 100.0) / total;
  const p_percent = 100.0 - (f_percent + c_percent);

  return (
    <tr>
      <th scope="row">{label}</th>
      <td />
      {tdBarChart(f_percent, "fat-bg-color")}
      {tdBarChart(c_percent, "carb-bg-color")}
      {tdBarChart(p_percent, "protein-bg-color")}
    </tr>
  );
}

class Energy extends Component {
  state = {
    fats: 0,
    carbs: 0,
    proteins: 0,
    result: dummyResult
  };

  onChange = e =>
    this.setState({ [e.target.name]: parseFloat(e.target.value) });

  onSubmit = e => {
    e.preventDefault();

    const params = {
      fats: this.state.fats,
      carbs: this.state.carbs,
      prots: this.state.proteins
    };

    console.log(params);

    axios
      .get("http://localhost:5000/api/v1/energy", { params: params })
      .then(res => {
        console.log(res.data);
        this.setState({ result: { kcal: res.data.kcal, grams: params } });
      });
  };

  renderResult() {
    if (this.state.result === null) {
      return;
    }

    const cal = this.state.result.kcal;
    const grams = this.state.result.grams;

    const header = ["Fats", "Carbs", "Proteins"];

    return (
      <table>
        <thead>
          <tr>
            <th />
            <th />
            {R.map(e => {
              return <th key={e}>{e}</th>;
            }, header)}
          </tr>
        </thead>
        <tbody>
          {engeryRow(cal.fats, cal.carbs, cal.prots)}
          {percentRow("Energy [%]", cal.fats, cal.carbs, cal.prots)}
          {percentRow("Size [%]", grams.fats, grams.carbs, grams.prots)}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Energy</h2>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="fats">Fats [g]</label>
          <input
            type="number"
            name="fats"
            min="0"
            step="0.01"
            placeholder="fats"
            value={this.state.fats}
            onChange={this.onChange}
          />
          <label htmlFor="carbs">Carbs [g]</label>
          <input
            type="number"
            name="carbs"
            min="0"
            step="0.1"
            placeholder="carbohydrates"
            value={this.state.carbs}
            onChange={this.onChange}
          />
          <label htmlFor="proteins">Proteins [g]</label>
          <input
            type="number"
            name="proteins"
            min="0"
            step="0.1"
            placeholder="proteins"
            value={this.state.proteins}
            onChange={this.onChange}
          />
          <input type="submit" value="Submit" className="btn" />
        </form>
        <br />
        {this.renderResult()}
      </div>
    );
  }
}

export default Energy;
