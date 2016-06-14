
import React, { PropTypes, Component } from 'react'

// Transitions
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class LoadingText extends Component {
  displayName: "App Loading Text";
  constructor(props) {
    super(props);
  }

  _contentForComponent() {
    const { loadText } = this.props

    const loadingText = (
      <div className="loading-text-content">
        <div className="sk-fading-circle">
          <div className="sk-circle1 sk-circle"></div>
          <div className="sk-circle2 sk-circle"></div>
          <div className="sk-circle3 sk-circle"></div>
          <div className="sk-circle4 sk-circle"></div>
          <div className="sk-circle5 sk-circle"></div>
          <div className="sk-circle6 sk-circle"></div>
          <div className="sk-circle7 sk-circle"></div>
          <div className="sk-circle8 sk-circle"></div>
          <div className="sk-circle9 sk-circle"></div>
          <div className="sk-circle10 sk-circle"></div>
          <div className="sk-circle11 sk-circle"></div>
          <div className="sk-circle12 sk-circle"></div>
          <p className='progress-text'>{loadText}</p>
        </div>
      </div>
    )

    return loadingText
  }

  render() {
    const content = this._contentForComponent()
    return (
      <div className="loading-text">
        <ReactCSSTransitionGroup transitionEnterTimeout={900} transitionLeaveTimeout={500} transitionName="loading-text">
          {content}
        </ReactCSSTransitionGroup>
      </div>
    )  
  }
}

LoadingText.propTypes = {
  loadText: PropTypes.string
}

export default LoadingText