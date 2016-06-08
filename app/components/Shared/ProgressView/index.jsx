
import React, { PropTypes, Component } from 'react'

class Spinner extends Component {
  displayName: "App Spinner";
  constructor(props) {
    super(props);
    this.state = {
      displayHUD: this.props.loadText.length > 0
    }
  }

  // Called when an update to the props occurs
  componentWillReceiveProps(nextProps) {
    this._loadingTextWasSet(nextProps.loadingText)
  }

  _loadingTextWasSet(loadingText) {
    this.setState({
      displayHUD: loadingText && loadingText.length > 0
    })  
  }

  _contentForComponent() {
    const { displayHUD } = this.state
    const { loadText } = this.props

    const normalLoading = (
      <div className="mesh-loader">
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1"></div>
          <div className="sk-cube sk-cube2"></div>
          <div className="sk-cube sk-cube3"></div>
          <div className="sk-cube sk-cube4"></div>
          <div className="sk-cube sk-cube5"></div>
          <div className="sk-cube sk-cube6"></div>
          <div className="sk-cube sk-cube7"></div>
          <div className="sk-cube sk-cube8"></div>
          <div className="sk-cube sk-cube9"></div>
        </div>
        <h1 className="loading-text">{loadText}</h1>
      </div>
      )

    const errorLoading = (
      <div className="mesh-loader">
        <h1 className="loading-error">{'error'}</h1>
        <h2 className="loading-text">{'there was an error loading Mesh, please try again'}</h2>
      </div>
      )

    let content
    if (this.props.loadError == true) {
      content = errorLoading
    } else if (displayHUD) {
      content = normalLoading
    } else {
      content = (
        <div></div>
      )
    }

    return content
  }

  render() {
    const content = this._contentForComponent()
    return (
      content
    )  
  }
}

Spinner.propTypes = {
  loadError: PropTypes.bool.isRequired,
  loadText: PropTypes.string
}

export default Spinner