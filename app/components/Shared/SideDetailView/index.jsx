
import React, { PropTypes, Component } from 'react'

// Components
import UserDetailForm from '../../Forms/UserForm/UserDetailForm'

// Assets
// import avatar from '../assets/images/default-avatar-1.png'


class SideDetail extends Component {
  displayName: "App Side Detail View";
  constructor(props) {
    super(props);
    this.state = {
    }

    this.handleOnExitClicked = this._handleOnExitClicked.bind(this)
  }

  _handleOnExitClicked(e) {
    e.preventDefault()
    this.props.onExit()
  }


  render() {
    const fakeUser = {
      first_name: 'Bob',
      last_name: 'Bob',
      email: 'Bob',
      phone: 'Bob',
      website: 'Bob',
      organization_name: 'Bob'
    }


    return (
      <div className="side-detail" key="side-detail">
        <div className="container-fluid">
          <div className="row nav">
            <div className="col-xs-1 back-button">
              <div className="back-container">
                <a href="" onClick={this.handleOnExitClicked} >{'Exit'}</a>
              </div>
            </div>
            <div className="col-xs-10 title">
              <div className="title-wrapper"> 
                <p>{'User Detail'}</p>
              </div>
            </div>
            <div className="col-xs-1 spacer">
            </div>
          </div>
          <div className="row">
            <UserDetailForm 
              displayActionButtons={false}
              onCancel={function(){}} 
              onChange={function(){}} 
              onUpdate={function(){}} 
              user={fakeUser}
            />
          </div>
        </div>
      </div>
    )  
  }
}

SideDetail.propTypes = {
  onExit: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default SideDetail

/**
 * Shelved code - to delete
 *           <div className="row user-hero">
            <div className="col-xs-3 profile-pic-container">
              <img alt={avatar} className="img-responsive img-circle avatar" src={avatar}/>
            </div>
            <div className="col-xs-9 profile-info-container">
              <dl className="user-info">
                <dt>{'Name / Email'}</dt>
                <dd>{'Taylor'}</dd>
                <dd>{'Taylor@gmail.com'}</dd>
              </dl>
            </div>
          </div>
          <div className="row mesh-details">
            <div className="col-xs-12">
              <strong>Contact Details</strong>
            </div>
            <div className="col-xs-6">
              <address>
                <strong>Full Name</strong><br></br>
                <a href="mailto:#">first.last@example.com</a>
              </address>
              <address>
                <strong>Full Name</strong><br></br>
                <a href="mailto:#">first.last@example.com</a>
              </address>
              <address>
                <strong>Full Name</strong><br></br>
                <a href="mailto:#">first.last@example.com</a>
              </address>
              <address>
                <strong>Full Name</strong><br></br>
                <a href="mailto:#">first.last@example.com</a>
              </address>
            </div>
            <div className="col-xs-6">
              <address>
                <strong>Full Name</strong><br></br>
                <a href="mailto:#">first.last@example.com</a>
              </address>
              <address>
                <strong>Full Name</strong><br></br>
                <a href="mailto:#">first.last@example.com</a>
              </address>
              <address>
                <strong>Full Name</strong><br></br>
                <a href="mailto:#">first.last@example.com</a>
              </address>
              <address>
                <strong>Full Name</strong><br></br>
                <a href="mailto:#">first.last@example.com</a>
              </address>
            </div>
          </div>

 */