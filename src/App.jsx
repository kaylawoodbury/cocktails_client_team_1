import React, { Component } from "react";
import axios from "axios";
class App extends Component {
  state = {
    results: [],
    message: "",
    details: {},
    boozeResults: []
  };
  onSubmitFormHandler = async e => {
    e.preventDefault();
    let response = await axios.get('/cocktails', {
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

  async seeBoozeList(event) {
    let boozeType = event._targetInst.key;
    let booze;
    if (boozeType !== null) {
      booze = await axios.get('/products', {
        params: {
          q: boozeType
        }
      });
    }
    this.setState({
      boozeResults: booze.data.results
    });
  }

  render() {
    let renderResults, renderDetails, renderBoozeOptions;
    let drinkDetails = this.state.details;

    if (Array.isArray(this.state.results) && this.state.results.length > 0) {
      renderResults = (
        <div id="result-list">
          {this.state.results.map(item => {
            return (
              <>
                <div id="drink-name" key={item.id} data-id={item.id}>
                  {item.name}
                  <button
                    className="ui yellow button"
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
          <div id="details-side">
          <h4 id="details-title">{drinkDetails.name}</h4>
          <img id="drink-image" src={drinkDetails.image} alt="Drink Image"/> <br />
          <u id="glass-text">Glass:</u> {drinkDetails.glass} <br />
          <u id="ingredient-text">Ingredients:</u>{" "}
          {drinkDetails.ingredients.map(content => {
            return (
              <div id="ingredient-details">
                <div id="details-name" key={content.name}>
                  <button
                    id="booze-button"
                    onClick={this.seeBoozeList.bind(this)}
                    key={content.name}
                    className="ui yellow button"
                  >
                    Show the Booze!
                </button>  
                {content.name}: {content.measure}
                </div>
              </div>
            );
          })}
          </div>
          <div id="instructions">
            <u>Instructions:</u> {drinkDetails.instructions}
          </div>
        </div>
      );
    }
    if (
      Array.isArray(this.state.boozeResults) &&
      this.state.boozeResults.length > 0
    ) {
      renderBoozeOptions = (
        <div id="booze-options">
          <h2>Booze Options</h2>
          {this.state.boozeResults.map(booze => {
            return (
              <div>
                <div id="title">
                  {booze.name} 
                </div>
                {booze.name_2}
                <div>
                  {booze.producer} | {booze.country}
                </div>
                <div>{booze.price} SEK | {booze.volume}ml</div><br/>
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
          <div className="ui input focus">
            <input
              name="query"
              type="text"
              id="name-search"
              className="prompt"
              placeholder="Search by cocktail name"
            ></input>
            <div>
              <button id="search" type="submit" className="ui yellow button">
                Search
              </button>
            </div>
          </div>
        </form>
        <div id="shadow">
        {renderDetails}
        {renderBoozeOptions}
        {renderResults}
        </div>
      </>
    );
  }
}
export default App;
