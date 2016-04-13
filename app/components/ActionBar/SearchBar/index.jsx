
import React, { Component } from 'react'

class SearchBar extends Component {
  render() {
    return (
      <div className="search-box">
        <div className="input-group">
          <input
            aria-describedby="basic-addon1"
            className="form-control"
            placeholder="Search"
            type="text"
          />
        </div>
      </div>
    )
  }
}

export default SearchBar
