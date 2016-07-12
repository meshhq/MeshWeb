
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import LoadingText from '../../components/Shared/LoadingText'
import validator from 'validator'
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import * as SessionActions from '../../actions/session'

import { trackVisitedLogin, trackSuccessfulSignIn, trackClickedSignUpUser } from '../../helpers/tracking'
import { trackClickedSignUpCompany, trackSuccessfulSignUp } from '../../helpers/tracking'

class Login extends Component {
  displayName: "Login Component";
  constructor(props) {
    super(props);
    const signUpUserMode = props.startInSignupMode == true
    this.state = {
      signUpUserMode: signUpUserMode,
      signUpCompanyMode: false,
      loginErrorText: ''
    };

    // Tracking
    trackVisitedLogin()

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
        // Tracking
        trackSuccessfulSignIn()

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
        // Tracking
        trackSuccessfulSignUp()
        
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
    // Tracking
    trackClickedSignUpUser()

    // Prevent the redirect
    e.preventDefault()    
    this.setState({ signUpUserMode: true })
  }

  /**
   * Changes the login mode to Sign Up User
   * @param {e} event
   */
  _handleSignUpCompanyMode(e) {
    // Tracking
    trackClickedSignUpCompany()

    // Prevent the redirect
    e.preventDefault()
    const email = this.emailInput.value
    const pass = this.passInput.value
    const firstName = this.firstNameInput.value
    const lastName = this.lastNameInput.value
    if (firstName.length == 0) {
      this.setLoginError('Please enter a first name')
    } else if (lastName.length == 0) {
      this.setLoginError('Please enter a last name')
    } else if (!validator.isEmail(email)) {
      this.setLoginError('Please enter a valid email')
    } else if (pass.length < 4) {
      this.setLoginError('Please enter a password with at least 4 characters')
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
            <span className="sr-only">{'Error:'}</span><span>{' ' + this.state.loginErrorText}</span>
          </div>
        </div>
      )
    }

    const { signUpUserMode, signUpCompanyMode } = this.state
    let loginContent = null
    let actionButtons = null
    if (signUpUserMode) {
      loginContent = (
        <div>
          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-xs-12 form-column">
                <input className="form-control firstname-form"  
                  id="signUpFirstName" 
                  key="firstName"
                  placeholder="First Name"
                  ref={firstNameRef}
                  value={this.firstName}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12 form-column">
                <input className="form-control lastname-form"  
                  id="signUpLastName" 
                  key="lastName"
                  placeholder="Last Name"
                  ref={lastNameRef}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12 form-column">
                <input className="form-control email-form"  
                  id="signUpEmail"
                  key="signUpEmail" 
                  placeholder="Email" 
                  ref={emailRef}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12 form-column">
                <input className="form-control pass-form" 
                  id="signUpPass" 
                  key="signUpPass" 
                  placeholder="Password"
                  ref={passRef}
                  type="password" 
                />
              </div>
            </div>
          </form>
        </div>
      )

      actionButtons = (
        <div className="login-button-container">
          <div className="btn-container">
            <Button className="login-btn-right" id="sign-in-button" onClick={this.handleSignUpCompanyMode}>{'Continue'}</Button>
          </div>
          <div className="btn-container">
            <Button className="login-btn-left back-btn" id="sign-in-button" onClick={this.handleBackPressed}>{'Back'}</Button>
          </div>
        </div>
      )

    } else if (signUpCompanyMode) {
      loginContent = (
        <div>
          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-xs-12 form-column">
                <input className="form-control company-name-form"  
                  id="signUpCompanyName"
                  placeholder="Company Name" 
                  ref={companyNameRef}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12 form-column">
                <input className="form-control company-site-form"  
                  id="signUpCompanySite"
                  placeholder="Company Site"
                  ref={comanySiteRef}
                />
              </div>
            </div>
          </form>
        </div>
      )

      // Action Buttons
      if (this.props.sessionState.isLoading) {
        actionButtons = (
          <LoadingText loadText='Signing Up'/>
        )
      } else {
        // Action Buttons
        actionButtons = (
          <div className="login-button-container">
            <div className="btn-container">
              <Button className="login-btn-right" id="sign-in-button" onClick={this.handleSignUp}>{'Sign Up'}</Button>
            </div>
            <div className="btn-container">
              <Button className="login-btn-left back-btn" id="sign-in-button" onClick={this.handleBackPressed}>{'Back'}</Button>
            </div>
          </div>
        )
      }

    } else {
      // Form Content
      loginContent = (
        <div>
          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-xs-12 form-column">
                <input className="form-control email-form"  
                  id="signInEmail" 
                  key="signInEmail"
                  placeholder="Email" 
                  ref={emailRef}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-12 form-column">
                <input className="form-control pass-form" 
                  id="signInPass" 
                  key="signInPass"
                  placeholder="Password"
                  ref={passRef}
                  type="password"
                />
              </div>
            </div>
          </form>
        </div>
      )
      
      // Action Buttons
      if (this.props.sessionState.isLoading) {
        actionButtons = (
          <LoadingText loadText='Signing Up'/>
        )
      } else {
        actionButtons = (
          <div className="login-button-container">
            <div className="btn-container">
              <Button className="login-btn-right" id="sign-in-button" onClick={this.handleSignIn}>{'Sign In'}</Button>
            </div>
            <p className="sign-up-block">
              {'Don\'t have an account?  '}<a href="" onClick={this.handleSignUpUserMode}>{'Sign Up'}</a>
            </p>
          </div>
        )
      }
      
    }

    return (
      <div className="react-root">
        <div className="container login-container">
          <div className="row vertical-center-row">
            <div className="text-center col-md-6 col-md-offset-3">
              <div className="row flash-row">
                <div className="col-xs-12">
                  <ReactCSSTransitionGroup transitionEnterTimeout={500} transitionLeaveTimeout={300} transitionName="error-flash">
                    {errorFlash}
                  </ReactCSSTransitionGroup>
                </div>
              </div>
              <div className="row login-row">
                <div className="col-xs-12 brand-column">
                  <div>
                    <span className='brand'>{'Mesh'}</span>
                  </div>
                </div>
                <div className="col-xs-12">
                  {loginContent}
                </div>
              </div>
              <div className="row action-button-row">
                <div className="col-xs-12">
                  {actionButtons}
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
  sessionActions: PropTypes.object.isRequired,
  sessionState: PropTypes.object.isRequired,
  startInSignupMode: PropTypes.bool
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
