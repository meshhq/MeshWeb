
import React, { Component, PropTypes } from 'react'
import ActionGroup from './ActionGroup'
import SearchBar from './SearchBar'

class ActionBar extends Component {
  constructor(props) {
    super(props);

    // Binding these to the current class
    this.handleSearchInput = this._handleSearchInput.bind(this)
  }

  _handleSearchInput(text) {
    this.props.onSearchInput(text)
  }

  render() {
    return (
      <div className="action-bar">
        <SearchBar onSearchInput={this.handleSearchInput}/>
        <ActionGroup actions={this.props.actions} />
      </div>
    )
  }
}

ActionBar.displayName = 'Action Bar';

ActionBar.propTypes = {
  actions: PropTypes.array.isRequired
}

export default ActionBar
