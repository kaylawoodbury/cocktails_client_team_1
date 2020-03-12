import React, { Component } from 'react';
import axios from 'axios';
import Suggestions from 'components/Suggestions';

const { API_KEY } = process.env
const API_URL = '' //need to get this from the backend

class Search extends Component {
  state = {
    query: '',
    results: []
  }

  getResults = () => {
    axios.get(`${API_URL}?api_key=${API_KEY}&prefix=${this.state.query}&limit=5`)
      .then(({ data }) => {
        this.setState({
          results: data.data // Need to determine what the cocktails api returns, the example returned an object called data, 
                             // as did the example axios. So... data.data, but we will need to update this for ours                             
        })
      })
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