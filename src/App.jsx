import React, { Component } from "react";
import axios from "axios";
class App extends Component {
  state = {
    query: "",
    results: [],
    message: "",
    details: [],
    details_error_message: ""
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

  onClickHandler = async e => {
    e.preventDefault();
    debugger
    let details = await axios.get("/cocktails", {
      params: {
        q: e.target.query.value
      }
    });
    debugger
    if (details.status === 200) {
      this.setState({
        details: details.data.drinks
      });
      debugger
    } else {
      this.setState({
        details_error_message: details.data.message
      })
    }
  }


  render() {
    let renderResults
      , renderDetails;

    if (Array.isArray(this.state.results) && this.state.results.length > 0) {
      renderResults = (
        <div id="result-list">
          {this.state.results.map(item => {
            return (
              <div key={item.id}>
                <h4>{item.name}</h4>
                <button id="details-button" onClick={this.onClickHandler} key={item.id}>Details</button>
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
      renderDetails = (
        <div id="details">
          {this.state.details.map(item => {
            debugger
            return (
              <div key={item.id}>
                {item.name}
                {item.category}
                {item.glass}
                {item.ingredients}
                {item.instructions}
              </div> 
            )
          })}
        </div>
      )
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
