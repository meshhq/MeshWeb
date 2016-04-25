
import React, { Component, PropTypes  } from 'react'

class SearchBar extends Component {
  render() {
    return (
      <div className="search-box">
        <div className="input-group">
          <input
            aria-describedby="basic-addon1"
            className="form-control"
            onChange={this.props.onSearchInput}
            placeholder="Search"
            type="text"
          />
        </div>
      </div>
    )
  }
}

SearchBar.displayName = 'Search Bar';

SearchBar.propTypes = {
  onSearchInput: PropTypes.func.isRequired
}

export default SearchBar
