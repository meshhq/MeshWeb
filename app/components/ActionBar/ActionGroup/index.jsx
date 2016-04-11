
import React, { Component } from 'react'
import Button from './Button'
import DropdownButton from './DropdownButton'

class ActionGroup extends Component {
  render() {
    return (
      <div className="action-group">
        <Button title="New"/>
        <Button title="Merge"/>
        <Button title="Publish"/>
        <DropdownButton title="More" />
      </div>
    )
  }
}

ActionGroup.displayName = 'Action Group';

export default ActionGroup
