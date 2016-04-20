
import React, { Component, PropTypes } from 'react'
import ActionGroup from './ActionGroup'
import SearchBar from './SearchBar'

class ActionBar extends Component {
  constructor(props) {
    super(props);

    // Binding these to the current class
    this.handleSearchInput = this._handleSearchInput.bind(this)
    this.handleActionClick = this._handleActionClick.bind(this)
  }

  _handleSearchInput(text) {
    this.props.onSearchInput(text)
  }

  _handleActionClick(idx) {
    this.props.onActionClick(idx)
  }

  render() {
    return (
      <div className="action-bar">
        <SearchBar onSearchInput={this.handleSearchInput}/>
        <ActionGroup onActionClick={this.handleActionClick}/>
      </div>
    )
  }
}

ActionBar.displayName = 'Action Bar';

ActionBar.propTypes = {
  onActionClick: PropTypes.func.isRequired,
  onSearchInput: PropTypes.func.isRequired
}

export default ActionBar
