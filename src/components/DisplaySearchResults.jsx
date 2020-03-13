import React, { Component } from "react";
import { getSearchResult } from "../modules/searchResult";

class DisplaySearchResults extends Component {
  state = {
    drinkData: []
  };
  componentDidMount() {
    this.getDrinkData();
  }
  async getDrinkData() {
    let result = await getSearchResult();
    this.setState({ drinkData: result.drinks });
  }

  render() {
    let listOfDrinks;

    if (Array.isArray(this.state.drinkData) && this.state.drinkData.length) {
      listOfDrinks = (
        <div id="result-list">
          {this.state.drinkData.map(item => {
            return (
              <div key={item.drinks.idDrink}>
                <h4>Margarita</h4>
                {item.drinks.strCategory} {item.drinks.strIBA}
              </div>
            );
          })}
        </div>
      );
   }
    return ( 
    <>
    {listOfDrinks}
    </>
    );
  }
}
export default DisplaySearchResults;
