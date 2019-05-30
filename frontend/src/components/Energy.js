import * as R from "ramda";
import React, { Component } from "react";
// import PropTypes from "prop-types";

import axios from "axios";

import { API_ROOT } from "../api-config";

function ProgressBar(props) {
  return (
    <div className="progress" style={{ height: "30px" }}>
      <div
        className={"progress-bar text-dark " + props.cssClass}
        role="progressbar"
        style={{ width: String(props.percent) + "%" }}
      >
        <b>{props.label}</b>
      </div>
    </div>
  );
}

function ResultTableRow(props) {
  const total = props.fats + props.carbs + props.proteins;
  const fPercent = (props.fats * 100.0) / total;
  const cPercent = (props.carbs * 100.0) / total;
  const pPercent = 100.0 - (fPercent + cPercent);

  const fLabel = `${props.fats.toFixed(2)} (${fPercent.toFixed(2)}%)`;
  const cLabel = `${props.carbs.toFixed(2)} (${cPercent.toFixed(2)}%)`;
  const pLabel = `${props.proteins.toFixed(2)} (${pPercent.toFixed(2)}%)`;

  return (
    <tr>
      <th scope="row">{props.label}</th>
      <td>{total.toFixed(2)}</td>
      <td>
        <ProgressBar label={fLabel} percent={fPercent} cssClass="bg-fat" />
      </td>
      <td>
        <ProgressBar label={cLabel} percent={cPercent} cssClass="bg-carb" />
      </td>
      <td>
        <ProgressBar label={pLabel} percent={pPercent} cssClass="bg-protein" />
      </td>
    </tr>
  );
}

function ResultTable(props) {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: "130px" }} />
            <th className="min">Total</th>
            {R.map(
              e => {
                return <th key={e}>{e}</th>;
              },
              ["Fats", "Carbs", "Proteins"]
            )}
          </tr>
        </thead>
        <tbody>
          <ResultTableRow label="Serving [g]" {...props.data.serving} />
          <ResultTableRow label="Energy [kcal]" {...props.data.calories} />
        </tbody>
      </table>
    </div>
  );
}

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

class Energy extends Component {
  state = {
    fats: 0,
    carbs: 0,
    proteins: 0,
    multiplier: 1.0,
    result: dummyResult,
    error: null
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

    const endpoint = `${API_ROOT}/energy/calculate`;
    // console.log(endpoint);
    // console.log(params);

    axios
      .get(endpoint, { params: params })
      .then(res => {
        // console.log(res.data);
        this.setState({ result: res.data.data, error: null });
      })
      .catch(err => {
        console.log(err);
        this.setState({ result: null, error: String(err) });
      });
  };

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
    const showError = this.state.error !== null;
    const showResult = !showError && this.state.result !== null;

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
        {showError && (
          <div className="alert alert-danger" role="alert">
            {this.state.error}
          </div>
        )}
        {showResult && <ResultTable data={this.state.result} />}
      </div>
    );
  }
}

export default Energy;
