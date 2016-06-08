
import React, { Component, PropTypes } from 'react'
import ActionGroup from './ActionGroup'
import SearchBar from './SearchBar'
import { Row, Col } from 'react-bootstrap'

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
      <div className='action-bar-container'>
        <Row>
          <Col className='search-column' key={'search'} md={6} >
            <SearchBar onSearchInput={this.handleSearchInput} />
          </Col>
          <Col className='action-column' key={'action'} md={6} >
            <ActionGroup actions={this.props.actions} providers={this.props.providers} />
          </Col>
        </Row>
      </div>
    )
  }
}

ActionBar.displayName = 'Action Bar';

ActionBar.propTypes = {
  actions: PropTypes.array.isRequired,
  onSearchInput: PropTypes.func.isRequired,
  providers: PropTypes.array.isRequired
}

export default ActionBar
