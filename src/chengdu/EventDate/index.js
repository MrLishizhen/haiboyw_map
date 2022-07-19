import React, { Component } from 'react'

// _chengdu_event_date

export default class index extends Component {

  state = {
    date: ''
  }

  getDate = () => {
    const d = new Date();

    const yyyy = d.getFullYear();
    const month = d.getMonth() + 1 + '';
    const day = d.getDate() + '';
    
    this.setState({date: `${yyyy}年${month.length <= 1? "0" + month: month}月${day.length <= 1? "0" + day: day}日`})
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
  }

  componentDidMount() {
    this.getDate();
    this.timer = setInterval(this.getDate(), 1000);
  }

  render() {
    return (
      <div style={{color: 'white', fontSize: 25}}>{this.state.date}</div>
    )
  }
}
