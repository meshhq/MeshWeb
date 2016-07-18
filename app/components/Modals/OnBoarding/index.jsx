
import React, { Component, PropTypes } from 'react'
import { Modal, Button } from 'react-bootstrap'

class OnBoarding extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    return (
      <Modal 
        aria-labelledby="contained-modal-title-lg" 
        bsSize="large" 
        className='on-boarding' 
        onHide={this.props.onHide}
        show={this.props.show}
      > 
        <Modal.Header closeButton={true}>
          <Modal.Title id="contained-modal-title-lg">{'Welcome To Mesh'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-xs-12">
              <p className="title-section-info">{'Mesh is a dashboard and an API that allows you to connect your all of your customer data across all of your SaaS integrations.'}</p>
            </div>
          </div>

          <div className="row info-row">
            <div className="col-xs-12">
              <h4 className="section-sub-title">{'Take Me To'}</h4>
            </div>
          </div>
          <div className="row links-row">
            
            <div className="col-xs-4 btn-col col-xs-offset-1">
              <Button className="login-btn-left back-btn" id="integrations-button" onClick={this.props.onHide}>{'Integrations'}</Button>
            </div>
            <div className="col-xs-2">
              <p className="or-text">{'or'}</p>
            </div>
            <div className="col-xs-4 btn-col">
              <Button className="login-btn-left back-btn" id="api-button" onClick={this.props.onShowAccountModal}>{'API Token'}</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
} 

OnBoarding.propTypes = {
  onHide: PropTypes.func.isRequired,
  onShowAccountModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
}

OnBoarding.displayName = 'On Boarding Modal';

export default OnBoarding