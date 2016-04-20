
import React, { Component, PropTypes } from 'react'
import ActionButton from './ActionButton'
import DropdownButton from './DropdownButton'

class ActionGroup extends Component {
  _handleActionItemWasClicked(idx) {
    this.props.onActionClick(idx)
  }

  render() {

    let onNewClick = this._handleActionItemWasClicked.bind(this, 1)
    let onMergeClick = this._handleActionItemWasClicked.bind(this, 2)
    let onPublishClick = this._handleActionItemWasClicked.bind(this, 3)
    let onDropdownClick = this._handleActionItemWasClicked.bind(this, 4)

    return (
      <div className="action-group">
        <ActionButton onButtonClick={onNewClick}
          title="New"
        />
        <ActionButton onButtonClick={onMergeClick}
          title="Merge"
        />
        <ActionButton onButtonClick={onPublishClick}
          title="Publish"
        />
        <DropdownButton onClick={onDropdownClick}
          title="More"
        />
      </div>
    )
  }
}

ActionGroup.displayName = 'Action Group';

ActionGroup.propTypes = {
  onActionClick: PropTypes.func.isRequired
}

export default ActionGroup
