import React, { Component } from 'react'
import searchImage from './images/search.png';
import close from './images/close.png';
import reset from './images/reset.png';
import styles from './index.less'

export default class CustomSearch extends Component {

  state = {
    value: '',
    showClose: false
  }
  
  handleKeyDown = evt => {
    const {onChange} = this.props;
    const e = window.event || evt;
    if (e.keyCode === 13) {
      const value = e.target.value;
      // if (value === '') return;
      onChange && onChange(value);
    }
  }

  handleValueChange = evt => {
    const val = evt.target.value;
    this.setState({value: val});
    if (!this.state.showClose && val !== '') {
      this.setState({showClose: true})
    } 
  }

  handleClose = evt => {
    const {onChange} = this.props;
    this.setState({value: '', showClose: false});
    onChange && onChange('');
  }

  handleSearch = () => {
    const {onChange} = this.props;
    onChange && onChange(this.state.value);
  }

  handleReset = () => {
    this.setState({value: "", showClose: false});
    this.props.onReset && this.props.onReset();
  }

  render() {
    return (
      <div style={{display: 'flex', padding: '10px 0', justifyContent: 'flex-end'}}>
        <div style={{position:'relative'}}>
          <div style={{background: `url(${searchImage})`, width: 320, height: 40, userSelect: 'none'}}></div>
          <input className={styles.search_input} onKeyDown = {this.handleKeyDown} value = {this.state.value} onChange = {this.handleValueChange}></input>
          { this.state.showClose && <div style={{
            background: `url(${close})`, 
            width: 20, 
            height: 20, 
            userSelect: 'none', 
            backgroundSize: '100% 100%', 
            position: 'absolute',
            cursor: 'pointer', 
            left: 250, 
            top: 10}} onClick = {this.handleClose}></div>}
          <div className={styles.search_enter} onClick = {this.handleSearch}></div>
        </div>
        <div  style={{background: `url(${reset})`, width: 80, height: 40, marginLeft: 10, userSelect: 'none', cursor: 'pointer'}} onClick = {this.handleReset}></div>
      </div>
    )
  }
}
