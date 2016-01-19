
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SampleTable from '../../components/SampleTable'
import Navbar from '../../components/Navbar'
import * as TodoActions from '../../actions/todos'
// import style from './style.css'

class App extends Component {
  render() {
    const { todos, actions, children } = this.props
    return (
      <div className="react-root">
        <Navbar />
        <div className="container">
          <div className="row">
            <SampleTable todos={todos} actions={actions} />
          </div>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
