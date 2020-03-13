import React, { Component } from 'react';
import axios from 'axios';
import Suggestions from 'components/Suggestions';


class Search extends Component {
  state = {
    query: '',
    results: []
  }

  getResults = async (query) => {
    try {
      const search = await axios.post("v1/cocktails", {
        query: query
      });

      await searchResults(search);
      return results.data.drinks;
    } catch (error) {
      return { message: error.response.data.errors };
    }
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } else if (!this.state.query) {
      }
    })
  }

  render() {
    return (
      <form id='search-by-name'>
        <input
          name='search-by-name'
          type='text'
          id='name-search'
          className="prompt"
          placeholder="search-by-name"
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <Suggestions results={this.state.results} />
      </form>
    )
  }
}

export default Search