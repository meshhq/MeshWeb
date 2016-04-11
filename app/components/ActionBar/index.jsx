
import React, { Component, PropTypes } from 'react'
import ActionGroup from './ActionGroup'
import SearchBar from './SearchBar'

class ActionBar extends Component {
  constructor(props) {
    super(props);

    // Binding these to the current class
    this.handleActionClick = this._handleActionClick.bind(this)
  }

  _handleActionClick(idx) {
    this.props.onActionClick(idx)
  }

  render() {
    return (
      <div className="action-bar">
        <SearchBar onSearch={this._handleSearchInput}/>
        <ActionGroup onActionClick={this.handleActionClick}/>
      </div>
    )
  }
}

ActionBar.displayName = 'Action Bar';

ActionBar.propTypes = {
  onActionClick: PropTypes.func.isRequired
}

export default ActionBar
