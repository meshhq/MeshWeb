
import React, { Component, PropTypes  } from 'react'

class SearchBar extends Component {
  render() {
    const placeholder = this.props.placeholder || 'Search'
    return (
      <div className="search-box">
        <div className="input-group">
          <input
            aria-describedby="basic-addon1"
            className="form-control search"
            onChange={this.props.onSearchInput}
            placeholder={placeholder}
            type="text"
          />
        </div>
      </div>
    )
  }
}

SearchBar.displayName = 'Search Bar';

SearchBar.propTypes = {
  onSearchInput: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}

export default SearchBar
