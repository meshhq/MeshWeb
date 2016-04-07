
import React, { PropTypes, Component } from 'react'

class Spinner extends Component {
  displayName: "App Spinner";
  constructor(props) {
    super(props);
  }

  _contentForComponent() {
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
        <h1 className="loading-text">{'Loading Mesh...'}</h1>
      </div>
      )

    const errorLoading = (
      <div className="mesh-loader">
        <h1 className="loading-error">{'Error'}</h1>
        <h2 className="loading-text">{'There was an error loading Mesh, please try again.'}</h2>
      </div>
      )

    let content
    if (this.props.loadError == true) {
      content = errorLoading
    } else {
      content = normalLoading
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
  loadError: PropTypes.bool.isRequired
}

export default Spinner