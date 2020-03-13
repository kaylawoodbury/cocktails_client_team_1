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
    let response = await axios.post("http://localhost:3000/api/v1/cocktails", {
      params: {
        query: "name"
      }
    });
    if (response.data.status === 400) {
      debugger;
      this.setState({
        message: response.data.message,
        results: null
      });
    } else {
      debugger;
      this.setState({
        results: response.data.drinks
      });
    }
  };

  render() {
    let renderResults;
    if (Array.isArray(this.state.results) && this.state.results.length > 0) {
      debugger;
      renderResults = (
        <div id="result-list">
          {this.state.results.map(item => {
            debugger;
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
        <form id="search-by-name">
          <div className="ui search">
            <input
              name="search-by-name"
              type="text"
              id="name-search"
              className="prompt"
              placeholder="Search by drink name"
            ></input>
            <button id="search" onClick={this.onSubmitFormHandler}>
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
