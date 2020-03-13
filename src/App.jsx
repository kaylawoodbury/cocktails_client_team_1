import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    query: ""
  };

  onSubmitFormHandler = async e => {
    e.preventDefault();
    let response = await axios.post("http://localhost:3000/api/v1/cocktails", {
      params: {
        query: "name"
      }
    });
    if (response.status === 200) {
      this.setState({

        drinks: response.data.drinks
      });
    } else {
      this.setState({
        drink_not_found: "No drinks found"
      });
    }
  };
debugger
  render() {
    // const { results } = this.state;
    // debugger
    // let renderResults;

    //   if (query.length > 0) {
    //     renderResults = (
    //         submitFormHandler={this.state.results.map(item => {
    //           return (
    //             <div key={item.drinks.idDrink}>
    //               <h4>Margarita</h4>
    //               {item.drinks.strCategory} {item.drinks.strIBA}
    //             </div>
    //           );
    //         })}
    //     )
    // }

    return (
      <>
        <form onSubmit={this.onSubmitFormHandler} id="search-by-name">
          <div className="ui search">
            <input
              name="search-by-name"
              type="text"
              id="name-search"
              className="prompt"
              placeholder="Search by drink name"
            ></input>
            <button id="search">Search</button>
          </div>
        </form>

        {/* <h3 id="result-list">Margarita</h3> */}
        {/* {renderResults} */}
      </>
    );
  }
}

export default App;
