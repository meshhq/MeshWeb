
import React, { Component, PropTypes } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Clipboard from 'clipboard'

// Assets
import clippy from '../../../assets/images/clippy.png'

// Transition Group
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class AccountInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {
    const clipboardWidth = { width: 13 }
    new Clipboard('.btn');

    const copyTextHit = () => {
      this.setState({ showCopiedText: true })
      setTimeout(() => this.setState({ showCopiedText: false }), 3000)
    }

    let copiedText
    if (this.state.showCopiedText) {
      copiedText = (
        <p className="copied-success">
          {'Copied!'}
        </p>
      )
    }

    return (
      <Modal 
        aria-labelledby="contained-modal-title-lg" 
        bsSize="large" 
        className='account-modal' 
        onHide={this.props.onHide}
        show={this.props.show}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title id="contained-modal-title-lg">{'Mesh Account'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="section-title">{'API Access'}</h4>
          <div className="instuctions">
            <p className="section-info">{'This is your app\'s access token that can be used for platform API access.'}</p>
            <p className="section-info">{'The relevant documentation can be found here: '}</p>
          </div>
          <div className="link">
            <blockquote>
              <a href="http://docs.meshdata.io">{'Mesh API Documentation'}</a>
            </blockquote>
          </div>
          <div className="instuctions">
            <p className="section-info">{'Acces Token: '}</p>
          </div>
          <div className="input-group api-token-input-group">
            <span className="input-group-addon">
              <button className="btn" data-clipboard-target="#disabledTextInput" onClick={copyTextHit}>
                <img alt="Copy to clipboard" src={clippy} style={clipboardWidth} />
              </button>
            </span>
            <input 
              aria-describedby="inputGroupSuccess4Status" 
              className="form-control" 
              id="disabledTextInput" 
              readOnly={true} 
              type="text" 
              value={this.props.appToken} 
            />
            <ReactCSSTransitionGroup transitionEnterTimeout={500} transitionLeaveTimeout={300} transitionName="coppied-success">
              {copiedText}
            </ReactCSSTransitionGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>{'Close'}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
} 

AccountInfo.propTypes = {
  appToken: PropTypes.string,
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool
}

AccountInfo.displayName = 'Account Info Form';

export default AccountInfo
