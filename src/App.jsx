import React, { Component } from "react";
import axios from "axios";
class App extends Component {
  state = {
    query: "",
    results: [],
    message: "",
    details: {},
  };
  onSubmitFormHandler = async e => {
    e.preventDefault();
    let response = await axios.post("/cocktails", {
      params: {
        q: e.target.query.value
      }
    });
    if (response.status === 400) {
      this.setState({
        message: response.data.message
      });
    } else {
      this.setState({
        results: response.data.drinks
      });
    }
  };

  async seeDetails(event) {
    let id = event.target.parentElement.dataset.id;
    let details;
    if (id > 0) {
      details = await axios.get(`/cocktails/${id}`);
    }
    this.setState({
      details: details.data.drink
    });
  }

  render() {
    let renderResults, renderDetails;
    let drinkDetails = this.state.details

    if (Array.isArray(this.state.results) && this.state.results.length > 0) {
      renderResults = (
        <div id="result-list">
          {this.state.results.map(item => {
            return (
              <>
                <div id="drink-name" key={item.id} data-id={item.id}>{item.name}
                  <button
                    id="details-button"
                    onClick={this.seeDetails.bind(this)}
                    key={item.id}
                  >
                    Details
                </button></div>
                <div id="category">{item.category} {item.IBA}</div>
              </>
            );
          })}
        </div>
      );
    } else {
      renderResults = <div id="message">{this.state.message}</div>;
    }
    if (drinkDetails.id > 0) {
      renderDetails = (
        <div id="details">
          <h4>{drinkDetails.name}</h4>
          <img src={drinkDetails.image} /> <br />
          Glass: {drinkDetails.glass} <br />
          Ingredients: {drinkDetails.ingredients.map(content => {
            return (
              <div key={content.name}>
                {content.name} {content.measure}
              </div>
            )
          })}
          Instruction: {drinkDetails.instructions}
        </div>
      );
    }

    return (
      <>
        <form id="search-by-name" onSubmit={this.onSubmitFormHandler}>
          <div className="ui input focus">
            <input
              name="query"
              type="text"
              id="name-search"
              className="prompt"
              placeholder="Search by drink name"
            ></input>
            <div>
            <button id="search" type="submit" className="ui inverted red button" >
              Search
            </button>
            </div>
          </div>
        </form>
        {renderDetails}
        {renderResults}
      </>
    );
  }
}
export default App;
