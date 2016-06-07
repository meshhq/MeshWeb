import React, { Component, PropTypes } from 'react'
import { Glyphicon, Button } from 'react-bootstrap'

class ActionButton extends Component {
  render() {
    return (
      <div className="action-button-container">
        <Button onClick={this.props.onButtonClick}>
          <Glyphicon glyph={this.props.glyph} />
          {this.props.title}
        </Button>
      </div>
    )
  }
}

ActionButton.displayName = 'Action Button';

ActionButton.propTypes = {
  glyph: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default ActionButton
