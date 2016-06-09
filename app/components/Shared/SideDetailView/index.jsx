
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
    this.handleOnExitClicked = this._handleOnExitClicked.bind(this)
  }

  _handleOnExitClicked(e) {
    e.preventDefault()
    this.props.onExit()
  }

  _handleRefreshClicked(e) {
    e.preventDefault()
    this.props.onExit()
  }

  render() {
    return (
      <div className="side-detail" key="side-detail">
        <div className="container-fluid">
          <div className="row nav">
            <div className="col-xs-3 back-button">
              <div className="back-container">
                <a href="" onClick={this.handleOnExitClicked} >{'Exit'}</a>
              </div>
            </div>
            <div className="col-xs-6 title">
              <div className="title-wrapper"> 
                <p>{'User Detail'}</p>
              </div>
            </div>
            <div className="col-xs-3 refresh-button">
              <div className="refresh-container">
                <a href="" onClick={this.handleOnExitClicked} >{'Refresh'}</a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 spacer">
              <UserDetailForm
                displayActionButtons={false}
                onCancel={function(){}} 
                onChange={function(){}} 
                onUpdate={function(){}} 
                providers={this.props.providers}
                user={this.props.detailUser}
              />
            </div>
          </div>
        </div>
      </div>
    )  
  }
}

SideDetail.defautProps = {
  isFetchingDetailUser: false
}

SideDetail.propTypes = {
  detailUser: PropTypes.object.isRequired,
  isFetchingDetailUser: PropTypes.bool.isRequired,
  onExit: PropTypes.func.isRequired,
  providers: PropTypes.array,
  refreshUser: PropTypes.func
}

export default SideDetail