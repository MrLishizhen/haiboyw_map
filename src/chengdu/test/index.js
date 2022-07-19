import React, { Component } from 'react'
import { getDataProvider } from '../../utils/DataUtils';


// _ch_test_div
export default class index extends Component {

  render() {
    const d = getDataProvider(this.props);
    console.log("getProps: ", this.props);
    return (
      <div style = {{color: 'white', fontSize: 80}}>test</div>
    )
  }
}
