import React, { Component } from 'react'
import { isEqual } from 'lodash';

/**
 * _chengdu_event_refreshTime
 */

export default class index extends Component {

  state = {
    content: ""
  }

  getFormatDate = () => {
    const startDate = new Date();
  
    const startY = startDate.getFullYear();
    const startM = ((startDate.getMonth() + 1) + "").length <= 1 ? ("0" + (startDate.getMonth() + 1) + "") : (startDate.getMonth() + 1) + "";
    const startD = (startDate.getDate() + "").length <= 1 ? ("0" + startDate.getDate() + "") : startDate.getDate() + "";
    
    const hours = (startDate.getHours() + "").length <= 1 ? ("0" + startDate.getHours() + "") : startDate.getHours() + "";
    const min = (startDate.getMinutes() + "").length <= 1 ? ("0" + startDate.getMinutes() + "") : startDate.getMinutes() + "";
    const sec = (startDate.getSeconds() + "").length <= 1 ? ("0" + startDate.getSeconds() + "") : startDate.getSeconds() + "";

    return `${startY}-${startM}-${startD} ${hours}:${min}:${sec}`
  }

  componentDidMount() {
    const date = this.getFormatDate();
    this.setState({content: date})
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      const date = this.getFormatDate();
      this.setState({content: date})
    }
  }


  render() {
    return (
      <div style={{color: 'white', fontSize: 20, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{this.state.content}</div>
    )
  }
}
