
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import * as SessionActions from '../../actions/session'

class Login extends Component {
  displayName: "Login Component";
  constructor(props) {
    super(props);
    this.state = {
      loginError: false
    };

    // Binding these to the current class
    this.handleSignIn = this._handleSignIn.bind(this)
  }

  /**
   * HANDLERS
   */

  /**
   * Attempts to log the user in
   * @param  {e} event
   */
  _handleSignIn(e) {
    // Prevent the redirect
    e.preventDefault()    
    const email = this.emailInput.value
    const pass = this.passInput.value
    if (email.length > 0 && pass.length > 0) {
      const { location } = this.props

      // Only handling a successful signin now
      this.props.sessionActions.submitLogin(email, pass)
      .then(() => {
        // If we have a next state supplied, route to that
        if (location.state && location.state.nextPathname) {
          this.props.router.replace(location.state.nextPathname)
        } else {
          this.props.router.replace('/')
        }
      }, () => {
        this.setState({ loginError: true })
      })
    }
  }

  render() {
    // Making a ref for email and pass
    const emailRef = (ref) => {
      this.emailInput = ref
    }
    const passRef = (ref) => {
      this.passInput = ref
    }

    let errorFlash
    if (this.state.loginError) {
      errorFlash = (
        <div className="alert alert-danger" 
          role="alert"
        >
          <span
            aria-hidden="true" 
            className="glyphicon glyphicon-exclamation-sign"
          />
          <span className="sr-only">{'Error:'}</span>{' There was an issue logging you in'}
        </div>
      )
    }

    return (
      <div className="react-root">
        <div className="container login-container">
          <div className="row vertical-center-row">
            <div className="text-center col-md-4 col-md-offset-4">
              <div className="row login-row">
                {errorFlash}
                <div className="col-sm-2 vcenter">
                  <p className='brand'>{'MeshData.io'}</p>
                </div>
                <div className="col-sm-9 col-sm-offset-1 vcenter">
                  <form className="form-horizontal">
                    <div className="form-group">
                      <div className="col-sm-10">
                        <input className="form-control email-form"  
                          id="inputEmail3" 
                          placeholder="Email" 
                          ref={emailRef}
                          type="email" 
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-10">
                        <input className="form-control pass-form" 
                          id="inputPassword3" 
                          placeholder="Password" 
                          ref={passRef}
                          type="password" 
                        />
                      </div>
                    </div>
                  </form>
                  <div className="form-group">
                    <div className="col-sm-10">
                      <a className="sign-in" 
                        href=""
                        onClick={this.handleSignIn}
                      >
                        {'Sign In'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  sessionActions: PropTypes.object.isRequired
}

Login.defaultProps = {
}

function mapStateToProps(state) {
  return {
    sessionState: state.session
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sessionActions: bindActionCreators(SessionActions, dispatch)
  }
}

// Using a HOC to inject the router into the login for access
// to nagivaiton and location
const wRouterHawkedLogin = withRouter(Login)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wRouterHawkedLogin)
