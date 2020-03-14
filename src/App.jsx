import React, { Component } from "react";
import axios from "axios";
class App extends Component {
  state = {
    query: "",
    results: [],
    message: "",
    details: [],
    details_error_message: "",
    ingredients: []
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
    debugger
    this.setState({
      ingredients: details.data.drink.ingredients,
      details: details.data.drink
    });
  }

  render() {
    let renderResults, renderDetails;

    if (Array.isArray(this.state.results) && this.state.results.length > 0) {
      renderResults = (
        <div id="result-list">
          {this.state.results.map(item => {
            return (
              <div key={item.id} data-id={item.id}>
                <h4>{item.name}</h4>
                <button
                  id="details-button"
                  onClick={this.seeDetails.bind(this)}
                  key={item.id}
                >
                  Details
                </button>
                {item.category} {item.IBA}
              </div>
            );
          })}
        </div>
      );
    } else {
      renderResults = <div id="message">{this.state.message}</div>;
    }
    if (Array.isArray(this.state.details) && this.state.details.length > 0) {
      debugger

      renderDetails = (
        <div id="details">
          {this.state.details.map(item => {
            debugger;
            return (
              <div key={item.id}>
                {item.name}
                {item.category}
                {item.glass}
                {[item.ingredients]}
                {item.instructions}
              </div>
            );
          })}
        </div>
      );
    }
    return (
      <>
        <form id="search-by-name" onSubmit={this.onSubmitFormHandler}>
          <div className="ui search">
            <input
              name="query"
              type="text"
              id="name-search"
              className="prompt"
              placeholder="Search by drink name"
            ></input>
            <button id="search" type="submit">
              Search
            </button>
          </div>
        </form>
        {renderResults}
        {renderDetails}
      </>
    );
  }
}
export default App;
