
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
      <Row className='action-bar' key={'action'}>
        <Col className='search-column' key={'search'} md={6} ref={'kev'}>
          <SearchBar onSearchInput={this.handleSearchInput}/>
        </Col>
        <Col className='action-column' key={'action'} md={6} ref={'test'}>
          <ActionGroup actions={this.props.actions} providers={this.props.providers} />
        </Col>
      </Row>
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
