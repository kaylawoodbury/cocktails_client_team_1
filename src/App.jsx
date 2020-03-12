import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import DisplaySearchResults from "./components/DisplaySearchResults";

class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <DisplaySearchResults />
      </div>
    );
  }
}

export default App;
