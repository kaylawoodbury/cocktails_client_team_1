import React from 'react'

const searchByNamePlaceholder = "Enter Cocktail Name"

const SearchBar = ({ submitFormHandler }) => {
  return (
    <form onSubmit={submitFormHandler} id='search-by-name'>
      <div className="ui search">
        <input
          name='search-by-name'
          type='text'
          id='name-search'
          className="prompt"
          placeholder={searchByNamePlaceholder}
        ></input>
        <button
          id="search"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;


