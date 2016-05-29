import React, { Component, PropTypes } from 'react'
import { Glyphicon, Button } from 'react-bootstrap'

class ActionButton extends Component {
  render() {
    return (
      <Button onClick={this.props.onButtonClick}>
        <Glyphicon glyph={this.props.glyph} />
        {this.props.title}
      </Button>
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
