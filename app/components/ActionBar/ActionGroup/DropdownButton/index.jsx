
import React, { Component, PropTypes } from 'react'

class DropdownButton extends Component {
  render() {
    let providers = this.props.providers.map(function(provider) {
      return (<li><a href="#">{provider.name}</a></li>)
    });

    // TODO; Add action handler.
    let dropdown = (<ul className="dropdown-menu">{providers}</ul>)
    return (
      <div className="btn-group">
        <button
          aria-expanded="false"
          aria-haspopup="true"
          className="btn btn-default dropdown-toggle"
          data-toggle="dropdown"
          type="button"
        >
          {this.props.title}
          <span className="caret"></span>
          <span className="sr-only">{"Toggle Dropdown"}</span>
        </button>
        {dropdown}
      </div>
    )
  }
}

DropdownButton.displayName = 'Dropdown Button';

DropdownButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  providers: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

export default DropdownButton
