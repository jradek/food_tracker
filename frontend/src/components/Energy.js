import * as R from "ramda";
import React, { Component } from "react";
// import PropTypes from "prop-types";

import axios from "axios";

const dummyResult = {
  serving: {
    fats: 10,
    carbs: 0.1,
    proteins: 8
  },
  calories: {
    fats: 10 * 9,
    carbs: 0.1 * 4,
    proteins: 8 * 4
  }
};

function absoluteRow(label, f, c, p) {
  const total = f + c + p;
  const values = [
    ["total_cal", total],
    ["f_cal", f],
    ["c_cal", c],
    ["p_cal", p]
  ];

  return (
    <tr>
      <th scope="row">{label}</th>
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
    multiplier: 1.0,
    result: dummyResult
  };

  onChange = e =>
    this.setState({ [e.target.name]: parseFloat(e.target.value) });

  onSubmit = e => {
    e.preventDefault();

    const params = {
      fats: this.state.fats,
      carbs: this.state.carbs,
      proteins: this.state.proteins,
      multiplier: this.state.multiplier
    };

    console.log(params);

    axios
      .get("http://localhost:5000/api/v1/energy/calculate", { params: params })
      .then(res => {
        console.log(res.data);
        this.setState({ result: res.data.data });
      });
  };

  renderResult() {
    if (this.state.result === null) {
      return;
    }

    const cal = this.state.result.calories;
    const grams = this.state.result.serving;

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
          {absoluteRow("Serving [g]", grams.fats, grams.carbs, grams.proteins)}
          {percentRow("Serving [%]", grams.fats, grams.carbs, grams.proteins)}
          {absoluteRow("Energy [kcal]", cal.fats, cal.carbs, cal.proteins)}
          {percentRow("Energy [%]", cal.fats, cal.carbs, cal.proteins)}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Energy</h2>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="fats">Fats [g] per 100g</label>
          <input
            type="number"
            name="fats"
            min="0"
            step="0.01"
            placeholder="fats"
            value={this.state.fats}
            onChange={this.onChange}
          />
          <label htmlFor="carbs">Carbs [g] per 100g</label>
          <input
            type="number"
            name="carbs"
            min="0"
            step="0.01"
            placeholder="carbohydrates"
            value={this.state.carbs}
            onChange={this.onChange}
          />
          <label htmlFor="proteins">Proteins [g] per 100g</label>
          <input
            type="number"
            name="proteins"
            min="0"
            step="0.01"
            placeholder="proteins"
            value={this.state.proteins}
            onChange={this.onChange}
          />
          <label htmlFor="multiplier">Multiplier to adjust serving size</label>
          <input
            type="number"
            name="multiplier"
            min="0"
            step="0.01"
            placeholder="proteins"
            value={this.state.multiplier}
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
