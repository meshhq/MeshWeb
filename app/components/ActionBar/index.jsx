
import React, { Component } from 'react'
import SelectionBox from './SelectionBox'
import ActionGroup from './ActionGroup'
import SearchBar from './SearchBar'

class ActionBar extends Component {
  render() {
    return (
      <div className="action-bar">
        <SelectionBox />
        <ActionGroup />
        <SearchBar />
      </div>
    )
  }
}

ActionBar.displayName = 'Action Bar';

export default ActionBar
