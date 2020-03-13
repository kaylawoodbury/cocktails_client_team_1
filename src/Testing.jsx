import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import {searchByDrinkName} from "./modules/Test";


class Testing extends Component {
  state = {
    query: '',
    results: [],
    renderSearchBar: true
  };

  onSubmitFormHandler = async e => {
    e.preventDefault();
    let response = await searchByDrinkName(
       e.target.query.value
    );
    if (response.status === 200) {
      this.setState({
        drinks: response.data.drinks
      });
    }
    else {
      this.setState({
        drink_not_found: "No drinks found"
      })
    }
  };

  render() {
    const {
      renderSearchBar,
      results
    } = this.state;

    let renderResults

    switch (true) {
      case renderSearchBar:
        renderResults =
          <SearchBar submitFormHandler={this.state.results.map(item => {
            return (
              <div key={item.drinks.idDrink}>
                <h4>Margarita</h4>
                {item.drinks.strCategory} {item.drinks.strIBA}
              </div>
            );
          })}
          />;
    }

    return (
      <>
        {renderSearchBar}
        <h3>Results</h3>
        {renderResults}
      </>
    )
  };
}

export default Testing