import React, { Component } from "react";
import axios from "axios";
class App extends Component {
  state = {
    query: "",
    results: [],
    message: "",
    details: {},
    boozeResults: []
  };
  onSubmitFormHandler = async e => {
    e.preventDefault();
    let response = await axios.get(`/cocktails/${e.target.query.value}`);
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

  async seeBoozeList(event) {
    let boozeType = event._targetInst.key;
    let booze;

    if (boozeType !== null) {
      booze = await axios.get(`/cocktails/${boozeType}`);
    }
    this.setState({
      boozeResults: booze.data.options
    });
  }

  render() {
    let renderResults, renderDetails, renderBoozeOptions;
    let drinkDetails = this.state.details;

    if (Array.isArray(this.state.results) && this.state.results.length > 0) {
      renderResults = (
        <div id="result-list">
          {this.state.results.map(item => {
            debugger
            return (
              <>
                <div id="drink-name" key={item.id} data-id={item.id}>
                  {item.name}
                  <button
                    id="details-button"
                    onClick={this.seeDetails.bind(this)}
                    key={item.id}
                  >
                    Details
                  </button>
                </div>
                <div id="category">
                  {item.category} {item.IBA}
                </div>
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
          Ingredients:{" "}
          {drinkDetails.ingredients.map(content => {
            return (
              <div key={content.name}>
                {content.name} {content.measure}
                <button
                  id="booze-button"
                  onClick={this.seeBoozeList.bind(this)}
                  key={content.name}
                >
                  Show Me The Booze!
                </button>
              </div>
            );
          })}
          Instruction: {drinkDetails.instructions}
        </div>
      );
    }
    if (
      Array.isArray(this.state.boozeResults) &&
      this.state.boozeResults.length > 0
    ) {
      renderBoozeOptions = (
        <div id="booze-options">
          {this.state.boozeResults.map(booze => {
            return (
              <div>
                <div id="booze-image">{booze.product_image}</div>
                <div id="title">
                  {booze.product_name}
                  {booze.product_name_2}
                </div>
                <div>
                  {booze.product_producer}
                  {booze.product_category}
                  {booze.product_type}
                  {booze.product_country}
                </div>
                <div>{booze.product_price} SEK</div>
                <div>{booze.product_volume}ml</div>
              </div>
            );
          })}
        </div>
      );
    } else {
      renderBoozeOptions = <div id="message">{this.state.message}</div>;
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
              placeholder="Search by cocktail name"
            ></input>
            <button id="search" type="submit">
              Search
            </button>
          </div>
        </form>
        {renderDetails}
        {renderResults}
        {renderBoozeOptions}
      </>
    );
  }
}
export default App;
