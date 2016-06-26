
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import LoadingText from '../../components/Shared/LoadingText'
import validator from 'validator'
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import * as SessionActions from '../../actions/session'

class Login extends Component {
  displayName: "Login Component";
  constructor(props) {
    super(props);
    this.state = {
      signUpUserMode: false,
      signUpCompanyMode: false,
      loginErrorText: ''
    };

    // Binding these to the current class
    this.handleSignIn = this._handleSignIn.bind(this)
    this.handleSignUp = this._handleSignUp.bind(this)
    this.handleSignUpUserMode = this._handleSignUpUserMode.bind(this)
    this.handleSignUpCompanyMode = this._handleSignUpCompanyMode.bind(this)
    this.handleBackPressed = this._handleBackPressed.bind(this)
    this.setLoginError = this._setLoginError.bind(this)
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
    if (!validator.isEmail(email)) {
      this.setLoginError('Please enter a valid email')
    } else if (pass.length < 3) {
      this.setLoginError('Please enter a password with at least 4 characters')
    } else {
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
      }, (err) => {
        this.setLoginError('There was an issue logging you in: ' + err)
      })
    }
  }

  _handleSignUp(e) {
    e.preventDefault()
    const email = this.email
    const pass = this.pass
    const firstName = this.firstName
    const lastName = this.lastName
    const companyName = this.companyNameInput.value
    const companySite = this.companySiteInput.value
    if (companyName.length == 0) {
      this.setLoginError('Please enter a valid company name')
    } else if (companySite.length == 0) {
      this.setLoginError('Please enter a valid url for your company')
    } else if (!validator.isURL(companySite)) {
      this.setLoginError('Please enter a valid url for your company')
    } else {
      // Only handling a successful signin now
      this.props.sessionActions.submitSignUp(email, pass, firstName, lastName, companyName, companySite)
      .then(() => {
        // If we have a next state supplied, route to that
        if (location.state && location.state.nextPathname) {
          this.props.router.replace(location.state.nextPathname)
        } else {
          this.props.router.replace('/')
        }
      }, (err) => {
        this.setLoginError('There was an issue signing you up: ' + err)
      })
    }
  }

  /**
   * Changes the login mode to Sign Up User
   * @param {e} event
   */
  _handleSignUpUserMode(e) {
    // Prevent the redirect
    e.preventDefault()    
    this.setState({ signUpUserMode: true })
  }

  /**
   * Changes the login mode to Sign Up User
   * @param {e} event
   */
  _handleSignUpCompanyMode(e) {
    // Prevent the redirect
    e.preventDefault()
    const email = this.emailInput.value
    const pass = this.passInput.value
    const firstName = this.firstNameInput.value
    const lastName = this.lastNameInput.value
    if (!validator.isEmail(email)) {
      this.setLoginError('Please enter a valid email')
    } else if (pass.length < 4) {
      this.setLoginError('Please enter a password with at least 4 characters')
    } else if (firstName.length == 0) {
      this.setLoginError('Please enter a first name')
    } else if (lastName.length == 0) {
      this.setLoginError('Please enter a last name')
    } else {
      this.email = email
      this.pass = pass
      this.firstName = firstName
      this.lastName = lastName
      this.setState({ signUpUserMode: false, signUpCompanyMode: true })
    }
  }

  /**
   * Changes the login mode to Sign Up
   * @param {e} event
   */
  _handleBackPressed(e) {
    e.preventDefault()    
    if (this.state.signUpCompanyMode) {
      this.setState({ signUpUserMode: true, signUpCompanyMode: false })
    } else (
      // Hase to be in sign up user mode
      this.setState({ signUpUserMode: false })
    )
  }

  _setLoginError(errorText) {
    this.setState({ loginErrorText: errorText })
    setTimeout(() => this.setState({ loginErrorText: '' }), 3000)
  }

  render() {
    // Making a ref for email and pass
    const emailRef = (ref) => {
      this.emailInput = ref
    }
    const passRef = (ref) => {
      this.passInput = ref
    }

    const firstNameRef = (ref) => {
      this.firstNameInput = ref
    }
    const lastNameRef = (ref) => {
      this.lastNameInput = ref
    }

    const companyNameRef = (ref) => {
      this.companyNameInput = ref
    }
    const comanySiteRef = (ref) => {
      this.companySiteInput = ref
    }

    let errorFlash = null
    if (this.state.loginErrorText && this.state.loginErrorText.length > 0) {
      errorFlash = (
        <div className="flash-container">
          <div className="alert alert-danger" key="error-alert" role="alert">
            <span
              aria-hidden="true" 
              className="glyphicon glyphicon-exclamation-sign"
            />
            <span className="sr-only">{'Error:'}</span>{' ' + this.state.loginErrorText}
          </div>
        </div>
      )
    }

    const { signUpUserMode, signUpCompanyMode } = this.state
    let loginContent = null
    if (signUpUserMode) {
      loginContent = (
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
                <input className="form-control pass-form" 
                  id="signUpForm" 
                  placeholder="Password" 
                  ref={passRef}
                  type="password" 
                />
                <input className="form-control firstname-form"  
                  id="signUpForm" 
                  placeholder="First Name" 
                  ref={firstNameRef}
                  type="firstName" 
                />
                <input className="form-control lastname-form"  
                  id="signUpForm" 
                  placeholder="Last Name" 
                  ref={lastNameRef}
                  type="lastName" 
                />
              </div>
            </div>
          </form>
          <div className="form-group">
            <div className="col-sm-10 button-group">
              <a className="login-a" 
                href=""
                onClick={this.handleBackPressed}
              >
                <span className="login-button">{'Back'}</span>
              </a>
              <span className="or-span">{' - or - '}</span>
              <a className="login-a" 
                href=""
                onClick={this.handleSignUpCompanyMode}
              >
                <span className="login-button">{'Next'}</span>
              </a>
            </div>
          </div>
        </div>
      )
    } else if (signUpCompanyMode) {
      loginContent = (
        <div className="col-sm-9 col-sm-offset-1 vcenter">
          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-sm-10">
                <input className="form-control name-form"  
                  id="signUpForm" 
                  placeholder="Company Name" 
                  ref={companyNameRef}
                  type="companyName" 
                />
                <input className="form-control name-form"  
                  id="signUpForm" 
                  placeholder="Company Site" 
                  ref={comanySiteRef}
                  type="companySite" 
                />
              </div>
            </div>
          </form>
          <div className="form-group">
            <div className="col-sm-10 button-group">
              <a className="login-a"
                href=""
                onClick={this.handleBackPressed}
              >
                <span className="login-button">{'Back'}</span>
              </a>
              <span className="or-span">{' - or - '}</span>
              <a a className="login-a" 
                href=""
                onClick={this.handleSignUp}
              >
                <span className="login-button">{'Sign Up'}</span>
              </a>
            </div>
          </div>
        </div>
      )
    } else {
      // Sign In
      let actionButtons = null
      if (this.props.sessionState.isLoading) {
        actionButtons = (
          <LoadingText loadText='Signing Up'/>
        )
      } else {
        actionButtons = (
          <div className="action-buttons">
            <a className="login-a" 
              href=""
              onClick={this.handleSignIn}
            >
              <span className="login-button">{'Sign In'}</span>
            </a>
            <span className="or-span">{' - or - '}</span>
            <a className="login-a" 
              href=""
              onClick={this.handleSignUpUserMode}
            >
              <span className="login-button">{'Sign Up'}</span>
            </a>
          </div>
        )
      }

      loginContent = (
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
            <div className="col-sm-10 button-group">
              {actionButtons}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="react-root">
        <div className="container login-container">
          <div className="row vertical-center-row">
            <div className="text-center col-md-4 col-md-offset-4">
              <div className="row login-row">
                <ReactCSSTransitionGroup transitionEnterTimeout={500} transitionLeaveTimeout={300} transitionName="error-flash">
                  {errorFlash}
                </ReactCSSTransitionGroup>
                <div className="col-sm-2 vcenter">
                  <p className='brand'>{'Mesh.io'}</p>
                </div>
                {loginContent}
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
  sessionActions: PropTypes.object.isRequired,
  sessionState: PropTypes.object.isRequired
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
