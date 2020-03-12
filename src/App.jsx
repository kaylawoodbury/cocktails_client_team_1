import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import DisplaySearchResults from "./components/DisplaySearchResults";

class App extends Component {
  state = {
    renderSearchResults: false
  };

  render() {
    let renderSearchResults;

    renderSearchResults = <DisplaySearchResults />;

    return (
      <div>
        <SearchBar />
        <button
          id="search"
          onClick={() => this.setState({ renderSearchResults: true })}
        >
          Search
        </button>
      </div>
    );
  }
}

export default App;
