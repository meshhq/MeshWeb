
import React, { Component, PropTypes } from 'react'
import { Modal, Button } from 'react-bootstrap'

class OnBoarding extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    const showAccountModalHit = () => {
      setTimeout(() => this.setState({ showCopiedText: false }), 3000)
    }

    const showIntegrationsHit = () => {
      setTimeout(() => this.setState({ showCopiedText: false }), 3000)
    }

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
              <h4 className="section-sub-title">{'How To Get Started'}</h4>
            </div>
            <div className="col-xs-12">
              <div className="instuctions">
                <p className="section-info">{'When you sign up for mesh, you get access to both the API and a dashboard to explore all of your data. The first step is to activate integrations with your SaaS providers. From there, you can either use our dashboard to see all of your customer data, or use the API to query it in a consistent manor.'}</p>
              </div>
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
              <Button className="login-btn-left back-btn" id="api-button" onClick={this.props.onShowAccountModal}>{'API Access'}</Button>
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
