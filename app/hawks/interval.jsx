
import React, { Component } from 'react'
import _ from 'underscore'

export const IntervalWrapper = ComposedComponent => class extends Component {
  displayName: 'Interval Wrapper'
  constructor(props, context) {
    super(props, context)
    this.intervals = []
    this.tokens = {}
    this.setIntervalWithToken = this._setIntervalWithToken.bind(this)
    this.removeIntervalWithToken = this._removeIntervalWithToken.bind(this)
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
    if (token && !this.tokens[token]) {
      const intervalID = this.setInterval(func, intervalTime)
      this.tokens[token] = intervalID
    }
  }

  /**
   * _removeIntervalWithToken removes any registered intervals w/ that token
   * Note: I know we're not removing it from the intervals array... thats ok
   * @param  {string} token
   */
  _removeIntervalWithToken(token) {
    const intervalID = this.tokens[token]
    if (intervalID) {
      clearInterval(intervalID)
      this.tokens[token] = undefined
    }
  }

  /**
   * _setInterval dispatches a function with an set interval and
   * stores the interval ID so that it can be cleared out on unmount
   * @param {func} func         
   * @param {number} intervalTime 
   * @return {string} intervalToken
   */
  _setInterval(func, intervalTime) {
    const intervalID = setInterval(func, intervalTime)
    this.intervals.push(intervalID)
    return intervalID
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
        removeIntervalWithToken={this.removeIntervalWithToken}
        setInterval={this.setInterval}
        setIntervalWithToken={this.setIntervalWithToken} 
      />
    )
  }
};