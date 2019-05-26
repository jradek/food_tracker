import * as R from "ramda";
import React, { Component } from "react";
// import PropTypes from "prop-types";

import axios from "axios";

const dummyResult = {
  serving: {
    fats: 10,
    carbs: 10.1,
    proteins: 8
  },
  calories: {
    fats: 10 * 9,
    carbs: 10.1 * 4,
    proteins: 8 * 4
  }
};

function progressBar(valuePercent, label, cssClassExtra) {
  const cssClass = "progress-bar text-dark ".concat(cssClassExtra);
  return (
    <div className="progress" style={{ height: "30px" }}>
      <div
        className={cssClass}
        role="progressbar"
        style={{ width: String(valuePercent) + "%" }}
      >
        <b>{label}</b>
      </div>
    </div>
  );
}

function tableRow(label, f, c, p) {
  const total = f + c + p;
  const fPercent = (f * 100.0) / total;
  const cPercent = (c * 100.0) / total;
  const pPercent = 100.0 - (fPercent + cPercent);

  const fLabel = `${f.toFixed(2)} (${fPercent.toFixed(2)}%)`;
  const cLabel = `${c.toFixed(2)} (${cPercent.toFixed(2)}%)`;
  const pLabel = `${p.toFixed(2)} (${pPercent.toFixed(2)}%)`;

  return (
    <tr>
      <th scope="row">{label}</th>
      <td>{total.toFixed(2)}</td>
      <td>{progressBar(fPercent, fLabel, "bg-fat")}</td>
      <td>{progressBar(cPercent, cLabel, "bg-carb")}</td>
      <td>{progressBar(pPercent, pLabel, "bg-protein")}</td>
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
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "130px" }} />
              <th className="min">Total</th>
              {R.map(e => {
                return <th key={e}>{e}</th>;
              }, header)}
            </tr>
          </thead>
          <tbody>
            {tableRow("Serving [g]", grams.fats, grams.carbs, grams.proteins)}
            {tableRow("Energy [kcal]", cal.fats, cal.carbs, cal.proteins)}
          </tbody>
        </table>
      </div>
    );
  }

  macroFormInput(label, variable, name) {
    return (
      <div className="form-group col-md">
        <label htmlFor={name}>{label}</label>
        <input
          type="number"
          className="form-control"
          name={name}
          min="0"
          step="0.01"
          value={variable}
          onChange={this.onChange}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <h2>Energy</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-row">
            {this.macroFormInput("Fats [g] per 100g", this.state.fats, "fats")}
            {this.macroFormInput(
              "Carbs [g] per 100g",
              this.state.carbs,
              "carbs"
            )}
            {this.macroFormInput(
              "Proteins [g] per 100g",
              this.state.proteins,
              "proteins"
            )}
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="multiplier">
                Multiplier to adjust serving size
              </label>
              <input
                type="number"
                className="form-control"
                name="multiplier"
                min="0"
                step="0.01"
                value={this.state.multiplier}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col">
              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </div>
          </div>
        </form>
        <br />
        {this.renderResult()}
      </div>
    );
  }
}

export default Energy;
