
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
      <div className="row action-bar">
        <div className="col-md-6 col-sm-12">
          <SearchBar onSearchInput={this.handleSearchInput}/>
        </div>
        <div className="col-md-6 col-sm-12">
          <ActionGroup actions={this.props.actions} />
        </div>
      </div>
    )
  }
}

ActionBar.displayName = 'Action Bar';

ActionBar.propTypes = {
  actions: PropTypes.array.isRequired,
  onSearchInput: PropTypes.func.isRequired
}

export default ActionBar
