
import React, { PropTypes, Component } from 'react'

// Components
import UserDetailForm from '../../Forms/UserForm/UserDetailForm'
import OrgDetailForm from '../../Forms/OrganizationForm/OrganizationDetailForm'

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
    let detailForm = null
    let titleLabel = ''
    if (this.props.detailUser) {
      titleLabel = 'User Detail'
      detailForm = (
        <UserDetailForm
          displayActionButtons={false}
          onCancel={function(){}} 
          onChange={function(){}} 
          onUpdate={function(){}} 
          providers={this.props.providers}
          user={this.props.detailUser}
        />
      )
    } else if (this.props.detailOrg) {
      titleLabel = 'Organization Detail'
      detailForm = (
        <OrgDetailForm
          displayActionButtons={false}
          onCancel={function(){}} 
          onChange={function(){}}
          onSelectOrgUser={this.props.onSelectOrgUser} 
          onUpdate={function(){}}
          organization={this.props.detailOrg}
          providers={this.props.providers}
          users={this.props.users}
        />
      )
    }

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
                <p>{titleLabel}</p>
              </div>
            </div>
            <div className="col-xs-3 refresh-button">
              <div className="refresh-container">
                <a href="" onClick={this.handleOnExitClicked} >{'Refresh'}</a>
              </div>
            </div>
          </div>
          <div className="row content-container">
            <div className="col-xs-12 spacer">
              {detailForm}
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
  detailOrg: PropTypes.object,
  detailUser: PropTypes.object,
  isFetchingDetailUser: PropTypes.bool,
  onExit: PropTypes.func.isRequired,
  onSelectOrgUser: PropTypes.func,
  providers: PropTypes.array.isRequired,
  refreshResource: PropTypes.func,
  users: PropTypes.array
}

export default SideDetail