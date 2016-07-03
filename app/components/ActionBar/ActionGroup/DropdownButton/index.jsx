
import React, { Component, PropTypes } from 'react'
import { DropdownButton, MenuItem } from 'react-bootstrap'

class Dropdown extends Component {

  _onSelection(event, eventKey) {
    if (eventKey == 'All') {
      this.props.onClick(null)
    } else {
      this.props.onClick(eventKey)
    }
  }

  render() {
    let providers = [];
    for (let idx = 0; idx < this.props.providers.length; idx++) {
      let provider = this.props.providers[idx]
      let item = (<MenuItem eventKey={provider.type} key={provider.name} >{provider.name} </MenuItem>)
      providers.push(item)
    }

    let onSelection = this._onSelection.bind(this)
    return (
      <DropdownButton bsStyle={'default'} id={'dropdown-size-medium'} onSelect={onSelection} pullRight={true} title={this.props.title} >
        {providers}
        <MenuItem divider={true} />
        <MenuItem eventKey={'All'}>{'All'}</MenuItem>
      </DropdownButton>
    )
  }
}

Dropdown.displayName = 'Dropdown';

Dropdown.propTypes = {
  onClick: PropTypes.func.isRequired,
  providers: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

export default Dropdown
