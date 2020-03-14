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
    let response = await axios.post("/cocktails",
      {
        params: {
          q: e.target.query.value
        }
      }
    );
    if (response.status === 400) {
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
              <div key={item.id}>
                <h4>{item.name}</h4>
                {item.category} {item.IBA}
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
        {renderResults}
      </>
    );
  }
}

export default App;
