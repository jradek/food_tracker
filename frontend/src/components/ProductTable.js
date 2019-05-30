// import * as R from "ramda";
import React, { Component } from "react";

const PRODUCTS = [
  {
    name: "skyr",
    uuid: "030bf546-416e-4adf-9c55-d0e48c233d50",
    store: "Aldi",
    macros: {
      fats: 0.4,
      carbs: 3.4,
      proteins: 12
    }
  },
  {
    name: "feta",
    uuid: "550ab788-59ae-4702-bcef-006f55d24c17"
  },
  {
    name: "ei",
    uuid: "dd9b5c80-0d45-4c23-bf17-bd78d5306677",
    macros: {
      fats: 20.6,
      carbs: 3.4,
      proteins: 10
    }
  }
];

function MacroValues(props) {
  const renderGrams = (value, css) => {
    return (
      <span className={"badge m-1 " + css} style={{ width: "100px" }}>
        {value.toFixed(1)}g
      </span>
    );
  };

  const renderEnergy = (value, percent, css) => {
    return (
      <div className="progress m-1" style={{ width: "100px", float: "left" }}>
        <div
          className={"progress-bar text-dark " + css}
          role="progressbar"
          style={{ width: String(percent) + "%" }}
        >
          <b>
            {value.toFixed(1)}kcal ({percent.toFixed(0)}%)
          </b>
        </div>
      </div>
    );
  };

  return (
    <ul className="list-unstyled" style={{ margin: "0px" }}>
      <li>
        {renderGrams(props.fats, "bg-fat")}
        {renderGrams(props.carbs, "bg-carb")}
        {renderGrams(props.proteins, "bg-protein")}
      </li>
      <li>
        {renderEnergy(100, 33, "bg-fat")}
        {renderEnergy(0, 0, "bg-carb")}
        {renderEnergy(200, 66, "bg-protein")}
      </li>
    </ul>
  );
}

function ProductTableRow(props) {
  return (
    <tr>
      <td>
        <ul className="list-unstyled m-0">
          <li className="text-muted" style={{ fontSize: "0.6rem" }}>
            {props.uuid}
          </li>
          <li>
            <h4>{props.name}</h4>
          </li>
          {props.store && (
            <li>
              <em>{props.store}</em>
            </li>
          )}
        </ul>
      </td>
      <td>xxx kCal</td>
      <td>{props.macros && <MacroValues {...props.macros} />}</td>
    </tr>
  );
}

class ProductTable extends Component {
  state = {};
  render() {
    const rows = PRODUCTS.map(product => {
      return <ProductTableRow key={product.uuid} {...product} />;
    });

    return (
      <div className="container">
        <h2>Products</h2>
        <div className="table-responsive">
          <table className="table">
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ProductTable;
