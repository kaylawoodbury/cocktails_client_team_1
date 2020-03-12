import React, { Component } from "react";
import { getSearchResult } from "./modules/searchResult";

class DisplaySearchResults extends Component {
  state = {
    drinkData: []
  };
  componentDidMount() {
    this.getDrinkData();
  }
  async getDrinkData() {
    let result = await getSearchResult();
    this.setState({ drinkData: result.data.drinks });
  }

  render() {
    let listOfDrinks;

    if (Array.isArray(this.state.drinkData) && this.state.drinkData.length) {
      listOfDrinks = (
        <div id="result-list">
          {this.state.drinkData.map(item => {
            return (
              <div
                key={item.idDrink}
                id={`drink-${item.idDrink}`}
                data-id={item.idDrink}
              >
                <h4>{item.strDrink}</h4>
                {item.strCategory} {item.strIBA}
              </div>
            );
          })}
        </div>
      );
    }
    return(
      <>
      {listOfDrinks}
      </>
    )
  }
}
export default DisplaySearchResults;
