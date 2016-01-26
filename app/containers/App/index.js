
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SampleTable from '../../components/UserTable/userTable'
import Navbar from '../../components/Navbar'
import * as TodoActions from '../../actions/todos'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 500
    };

  }

  componentDidMount() {
    let dom = ReactDOM.findDOMNode(this);
    let width = dom.querySelectorAll('div.table-wrapper')[0].clientWidth - 15;
    this.setState({width: width});
  }

  render() {
    const { todos, actions, children } = this.props
    return (
      <div className="react-root">
        <Navbar />
        <div className="container">
          <div className="row table-wrapper">
            <SampleTable todos={todos} actions={actions} width={this.state.width}/>
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
