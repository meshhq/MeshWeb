
import React, { Component, PropTypes } from 'react'
import ActionButton from './ActionButton'
import Dropdown from './DropdownButton'

// Button type enum.
let buttonType = {
    DEFAULT: 0,
    DROPDOWN: 1,
    RADIO: 2
};

class ActionGroup extends Component {
  render() {
    // Itterate over all button supplied to the class to build the action group.
    let providers = this.props.providers
    let actionButtons = this.props.actions.map(function(action) {
      let type = action.type
      switch (type) {
        case buttonType.DEFAULT:
          return (<ActionButton glyph={action.glyph} key={action.title} onButtonClick={action.handler} title={action.title}/>)

        case buttonType.DROPDOWN:
          return (<Dropdown glyph={action.glyph} key={action.title} onClick={action.handler} providers={providers} title={action.title}/>)

        case buttonType.RADIO:
            break;
      }
    });
    return (
      <div className="action-group">
        {actionButtons}
      </div>
    )
  }
}

ActionGroup.displayName = 'Action Group';

ActionGroup.propTypes = {
  actions: PropTypes.array.isRequired,
  providers: PropTypes.array.isRequired
}

export default ActionGroup
