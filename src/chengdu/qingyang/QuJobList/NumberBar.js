import React, { Component } from 'react'

export default class NumberBar extends Component {

  render() {
    const {
      total = ''
    } = this.props;
    return (
      <div style={{fontSize: 22, color: 'white', marginLeft: 10}}>
        <div>总计: {total}</div>
      </div>
    )
  }
}
