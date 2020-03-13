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
    let response = await axios.get("/cocktails",
      {
        params: {
          q: e.target.query.value
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
                <h4>{item.name}</h4>
                {item.Category} {item.IBA}
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
