// import * as R from "ramda";
import React from "react";
import PropTypes from "prop-types";

import axios from "axios";

import { API_ROOT } from "../api-config";

const EXAMPLE_CALORIES = {
  fats: 12,
  carbs: 3,
  proteins: 2
};

const EXAMPLE_PRODUCTS = [
  {
    name: "skyr",
    uuid: "030bf546-416e-4adf-9c55-d0e48c233d50",
    tags: "aldi, milbona",
    kcal: 123,
    macros: {
      fats: 0.4,
      carbs: 3.4,
      proteins: 12
    },
    calories: EXAMPLE_CALORIES
  },
  {
    name: "ei (groesse M)",
    uuid: "dd9b5c80-0d45-4c23-bf17-bd78d5306677",
    kcal: 123,
    macros: {
      fats: 20.6,
      carbs: 3.4,
      proteins: 10
    },
    calories: EXAMPLE_CALORIES
  },
  {
    name: "feta",
    uuid: "550ab788-59ae-4702-bcef-006f55d24c17",
    tags: "aldi",
    kcal: 123,
    calories: EXAMPLE_CALORIES
  },
  {
    name: "ei (groesse L)",
    uuid: "xxx1",
    tags: "kaufland",
    kcal: 23,
    macros: {
      fats: 20.6,
      carbs: 3.4,
      proteins: 10
    },
    calories: EXAMPLE_CALORIES
  },
  {
    name: "gorgonzola",
    uuid: "be614d04-dbe0-44fb-b8f7-2878831e9a64",
    tags: "penny",
    kcal: 123,
    calories: EXAMPLE_CALORIES
  }
];

function percentages(macros) {
  const total = macros.fats + macros.carbs + macros.proteins;

  const pF = (macros.fats / total) * 100;
  const pC = (macros.carbs / total) * 100;
  const pP = 100.0 - pF - pC;
  return {
    fats: pF,
    carbs: pC,
    proteins: pP
  };
}

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
      <div className="progress m-1 float-left" style={{ width: "100px" }}>
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

  const caloriePercentages = percentages(props.calories);

  return (
    <ul className="list-unstyled m-0">
      <li>
        {renderGrams(props.grams.fats, "bg-fat")}
        {renderGrams(props.grams.carbs, "bg-carb")}
        {renderGrams(props.grams.proteins, "bg-protein")}
      </li>
      <li>
        {renderEnergy(props.calories.fats, caloriePercentages.fats, "bg-fat")}
        {renderEnergy(
          props.calories.carbs,
          caloriePercentages.carbs,
          "bg-carb"
        )}
        {renderEnergy(
          props.calories.proteins,
          caloriePercentages.proteins,
          "bg-protein"
        )}
      </li>
    </ul>
  );
}

// see: https://fontawesome.com/icons?d=gallery&s=solid&c=status&m=free
const PRODUCT_GROUP_TO_AWESOME_ICON = new Map([
  ["cheese", "fa-cheese"],
  ["fish", "fa-fish"],
  ["fruit", "fa-apple-alt"],
  ["meat", "fa-drumstick-bite"],
  ["sweets", "fa-cookie-bite"],
  [("vegetable", "fa-leaf")]
]);

function awesomeIconForProductGroup(productGroups) {
  const groups = productGroups.split(",");

  for (var i in groups) {
    const group = groups[i].trim();

    if (PRODUCT_GROUP_TO_AWESOME_ICON.has(group)) {
      const icon = PRODUCT_GROUP_TO_AWESOME_ICON.get(group);

      return <i className={"text-primary fas " + icon} />;
    }
  }

  return <i className="text-primary fas fa-question" />;
}

function ProductTableRow(props) {
  return (
    <tr>
      <td className="align-middle">
        {props.productGroup && awesomeIconForProductGroup(props.productGroup)}
      </td>
      <td>
        <ul className="list-unstyled m-0">
          <li className="text-muted" style={{ fontSize: "0.6rem" }}>
            {props.uuid}
          </li>
          <li>
            <h4>{props.name}</h4>
          </li>
          {props.tags && (
            <li>
              <em>{props.tags}</em>
            </li>
          )}
        </ul>
      </td>
      <td className="align-middle">{props.kcal.toFixed(2)} kcal</td>
      <td className="align-middle">
        {props.macros && (
          <MacroValues grams={props.macros} calories={props.calories} />
        )}
      </td>
    </tr>
  );
}

function filterProducts(products, filterText, alsoSearchInTags = false) {
  if (filterText === "") {
    return products;
  }

  return products.filter(function(p) {
    if (p.name.includes(filterText)) {
      return true;
    }

    if (alsoSearchInTags) {
      return p.tags && p.tags.includes(filterText);
    }

    return false;
  });
}

function ProductTable(props) {
  const filteredProducts = filterProducts(
    props.products,
    props.filterText,
    props.alsoSearchInTags
  );

  const rows = filteredProducts.map(product => {
    return <ProductTableRow key={product.uuid} {...product} />;
  });

  return (
    <div className="table-responsive">
      <table className="table">
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

ProductTable.propTypes = {
  filterText: PropTypes.string.isRequired,
  alsoSearchInTags: PropTypes.bool.isRequired
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleAlsoSearchInTagsChange = e => {
    this.props.onAlsoSearchInTagsChange(e.target.checked);
  };

  render() {
    return (
      <form>
        <div className="form-row">
          <input
            type="text"
            className="form-control"
            name="searchBox"
            placeholder="Search..."
            value={this.props.filterText}
            onChange={this.handleFilterTextChange}
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="searchInTags"
            checked={this.props.alsoSearchInTags}
            onChange={this.handleAlsoSearchInTagsChange}
          />
          <label className="form-check-label" htmlFor="searchInTags">
            Also search in tags
          </label>
        </div>
      </form>
    );
  }
}

SearchBar.propTypes = {
  filterText: PropTypes.string.isRequired,
  onFilterTextChange: PropTypes.func.isRequired,
  alsoSearchInTags: PropTypes.bool.isRequired,
  onAlsoSearchInTagsChange: PropTypes.func.isRequired
};

class FilterableProductTable extends React.Component {
  state = {
    filterText: "",
    alsoSearchInTags: false,
    products: [],
    showsDefault: false,
    error: "Query database"
  };

  handleFilterTextChange = text => {
    this.setState({ filterText: text });
  };

  handleAlsoSearchInTagsChange = flag => {
    this.setState({ alsoSearchInTags: flag });
  };

  componentDidMount() {
    const endpoint = `${API_ROOT}/products`;

    axios
      .get(endpoint)
      .then(res => {
        // console.log(res.data);
        this.setState({
          products: res.data.data,
          showsDefault: false,
          error: null
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          products: EXAMPLE_PRODUCTS,
          showsDefault: true,
          error: String(err)
        });
      });
  }

  render() {
    const hasError = this.state.error !== null;

    return (
      <div className="container">
        <h2>Products</h2>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
          alsoSearchInTags={this.state.alsoSearchInTags}
          onAlsoSearchInTagsChange={this.handleAlsoSearchInTagsChange}
        />
        {hasError && (
          <div className="alert alert-danger" role="alert">
            {this.state.error}
          </div>
        )}
        {this.state.showsDefault && (
          <div className="alert alert-info" role="alert">
            Showing example product list
          </div>
        )}
        <ProductTable
          products={this.state.products}
          filterText={this.state.filterText}
          alsoSearchInTags={this.state.alsoSearchInTags}
        />
      </div>
    );
  }
}

export { ProductTable, FilterableProductTable };
