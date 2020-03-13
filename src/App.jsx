import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    query: "",
    results: [],
    message: ""
  };

  onSubmitFormHandler = async e => {
    e.preventDefault();
    debugger
    let response = await axios.post(
      "https:localhost:3000/api/v1/cocktails",
      {
        params: {
          query: e.target.query.value
        }
      }
    );
    if (response.data.status === 400) {
      this.setState({
        message: response.data.message,
      });
    } else {
      this.setState({
        results: response.data.drinks
      });
    }
  };

  render() {
    let renderResults;
    if (Array.isArray(this.state.results) && this.state.results.length > 0) {
      renderResults = (
        <div id="result-list">
          {this.state.results.map(item => {
            return (
              <div key={item.idDrink}>
                {item.strDrink}
                {item.name}
                {item.strCategory} {item.strIBA}
              </div>
            );
          })}
        </div>
      );
    } else {
      renderResults = <div id="message">{this.state.message}</div>;
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
            <button id="search" type="submit" >
              Search
            </button>
          </div>
        </form>
        {renderResults}
      </>
    );
  }
}

export default App;
