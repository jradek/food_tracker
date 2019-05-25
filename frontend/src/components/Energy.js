import React, { Component } from "react";
// import PropTypes from "prop-types";

import axios from "axios";

const dummyResult = {
  kcal: {
    fats: 100.45,
    carbs: 34,
    prots: 12,
    total: 333.2
  }
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
        this.setState({ result: res.data });
      });
  };

  renderResult() {
    if (this.state.result !== null) {
      const calories = this.state.result["kcal"];
      const header = ['total', 'fats', 'carbs', 'proteins'];
      const cols = ['total', 'fats', 'carbs', 'prots']
      return (
        <table style={tblStyle}>
          <thead>
          <tr>
            {header.map(e => {
              return (<th key={e}>{e}</th>)
            })
            }
          </tr>
          </thead>
          <tbody>
            <tr>
            {
              cols.map(e => {
                return (<td style={tdStyle} key={e}>{calories[e]}</td>)
              })
            }
            </tr>
          </tbody>
        </table>
      );
    }
  }

  render() {
    return (
      <div style={{padding: '20px'}}>
        <h2>Energy</h2>
        <form onSubmit={this.onSubmit}  style={{padding: "20px", backgroundColor: '#f2f2f2', margin: '5px', borderRadius: '5px'}}>
          <label htmlFor="fats">Fats [g]</label>
          <input
            style={inputStyle}
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
            style={inputStyle}
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
            style={inputStyle}
            type="number"
            name="proteins"
            min="0"
            step="0.1"
            placeholder="proteins"
            value={this.state.proteins}
            onChange={this.onChange}
          />
          <input style={submitStyle}
            type="submit"
            value="Submit"
            className="btn"
          />
        </form>
        <br />
        {this.renderResult()}
      </div>
    );
  }
}

const inputStyle = {
  width: '100%',
  padding: '5px 5px',
  marging: '8px 0',
  display: 'inline-block',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
  textAlign: 'right'
}

const submitStyle = {
  width: '100%',
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '14px 20px',
  margin: '8px 0',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
}

const tblStyle = {
  width: '100%',
  border: '1px solid black',
}

const tdStyle = {
  padding: '5px',
  textAlign: 'right',
  width: '50px'
}

export default Energy;
