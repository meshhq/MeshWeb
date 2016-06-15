
import React, { Component } from 'react'
import _ from 'underscore'

export const IntervalWrapper = ComposedComponent => class extends Component {
  displayName: 'Interval Wrapper'
  constructor(props, context) {
    super(props, context)
    this.intervals = []
    this.tokens = []
    this.setIntervalWithToken = this._setIntervalWithToken.bind(this)
    this.setInterval = this._setInterval.bind(this)
  }

  /**
   * _setIntervalWithToken takes a token, along with func and interval time
   * If the token does not exist in the token set, it will set off the 
   * timed execution of the function
   * @param {string} token        
   * @param {func} func         
   * @param {number} intervalTime 
   */
  _setIntervalWithToken(token, func, intervalTime) {
    // Check if there's a token, and if it 
    // is not in the existing collection
    if (token && !_.contains(this.tokens, token)) {
      this.tokens.push(token)
      this.setInterval(func, intervalTime)
    }
  }

  /**
   * _setInterval dispatches a function with an set interval and
   * stores the interval ID so that it can be cleared out on unmount
   * @param {func} func         
   * @param {number} intervalTime 
   */
  _setInterval(func, intervalTime) {
    this.intervals.push(setInterval(func, intervalTime))
  }

  // Using this CB to clear the intervals
  componentWillUnmount() {
    _.each(this.intervals, (intervalID) => {
      clearInterval(intervalID)
    })
  }

  render() {
    return (
      <ComposedComponent {...this.props} 
        setInterval={this.setInterval}
        setIntervalWithToken={this.setIntervalWithToken} 
      />
    )
  }
};