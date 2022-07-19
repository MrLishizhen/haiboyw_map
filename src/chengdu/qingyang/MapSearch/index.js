import React, { Component } from 'react'
import styles from './styles.less'
import searchImage from './images/search.png';
import close from './images/close.png';
import loadingStyle from './loading.less'

// _chengdu_qingyang_map_search

export default class index extends Component {

  state = {
    value: '',
    showClose: false,
    addressList: [],
    showList: true,
    selectedId: -1,
    showLoading: false,
    handlers: {}
  }

  fetchData = val => {
    fetch('https://gisserver.chengdumap.cn/CDServer/rest/services/GeocodeKeyWord/Transferx', {
      body: JSON.stringify({"address":val,"page":"1","limit":"10"}), // must match 'Content-Type' header
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json',
        token: '7YhXk_h6JhqT9hfyvyLhXOhj_vt3zKjAukOcwkyKtrq9tuD1IUhIHDTz_tAqS-hu4EUDsUyRgwfZpKb8y8EvpSWUahgZagkn55_80v0UpNJ3v2k7EVIA-a2ZpkH3sQsZUTEb5WOTocgbf98UIDvjz0iC_4z6QMtA84BeJZS6Cls5CP4GhFXHB7xPJJsCaPFC'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
    })
    .then(response => response.json()) // parses response to JSON
    .then(responseData => {
      const {data = {}} = responseData || {};
      const {rows = []} = data;
      this.setState({addressList: [...rows], showLoading: false});
    }) // JSON from `response.json()` call
    .catch(error => {
      console.error(error);
      this.setState({showLoading: false});
    })
  }

  componentDidMount() {

    let eventValue = {};

    const { buffEvent = [{type: 'click'}, {type: 'clear'}] } = this.props;
    for (let i = 0; i < buffEvent.length; i++) {
      const eventObj = buffEvent[i];
      const { type, method, bindedComponents } = eventObj;
      if (type === 'click') {
        eventValue['onClick'] = (val) => {
          method && method({...val}, bindedComponents)
        }
      }

      if (type === 'clear') {
        eventValue['onClear'] = val => {
          method && method({...val}, bindedComponents)
        }
      }
    }

    this.setState({
      handlers: Object.assign({}, eventValue)
    });
  }

  handleKeyDown = evt => {
    const {onChange} = this.props;
    const e = window.event || evt;
    if (e.keyCode === 13) {
      const value = e.target.value;
      onChange && onChange(value);
      this.setState({showLoading: true})
      this.fetchData(value);
    }
  }

  handleValueChange = evt => {
    const val = evt.target.value;
    this.setState({value: val});
    if (!this.state.showClose && val !== '') {
      this.setState({showClose: true})
    }
    if (val === '') this.setState({showClose: false})
  }

  handleClose = evt => {
    const {onChange} = this.props;
    this.setState({value: '', showClose: false, addressList: [], showList: true, selectedId: -1});
    onChange && onChange('');
  }

  handleSearch = () => {
    const {onChange} = this.props;
    onChange && onChange(this.state.value);
    this.setState({showLoading: true})
    this.fetchData(this.state.value);
  }

  handleReset = () => {
    this.setState({value: "", showClose: false});
    this.props.onReset && this.props.onReset();
  }

  handleSelectItem = (id, data) => {
    this.setState({selectedId: id, showList: false, value: data.name});
    this.state.handlers.onClick && this.state.handlers.onClick(data);
  }

  handleFoucs = evt => {
    // evt.nativeEvent.stopImmediatePropagation();
    // evt.stopPropagation();
    this.setState({showList: true})
  }

  render() {
    return (
      <div>
        <div style={{width: 560, height: 80, borderRadius: 40, background: '#1C4382', position: 'relative'}}>
          <input placeholder = "请输入地址" className={styles.search_input} onKeyDown = {this.handleKeyDown} onFocus = {this.handleFoucs} value = {this.state.value} onChange = {this.handleValueChange}></input>
          {
            this.state.showLoading && <div style = {{transform: 'scale(1)', position: 'absolute', top: 37, right: 130}}>
              <div className={loadingStyle.loader}></div>
            </div>
            
          }
          { this.state.showClose && <div style={{
            background: `url(${close})`, 
            width: 36, 
            height: 36, 
            userSelect: 'none', 
            backgroundSize: '100% 100%', 
            position: 'absolute',
            cursor: 'pointer', 
            right: 70, 
            top: 22}} onClick = {this.handleClose}></div>}
          <div style={{background: `url(${searchImage}) no-repeat`, width: 42, height: 42, userSelect: 'none', cursor: 'pointer', position: 'absolute', top: 19, right: 20}} onClick = {this.handleSearch}></div>
        </div>
        {
          this.state.showList && this.state.addressList.length > 0 && (
            <div style={{background: '#1C438260', width: 540, marginTop: 6, marginLeft: 10}}>
            {
              this.state.addressList.map((el, i) => {
                return (
                  <div className={styles.search_item}
                    style = {i === this.state.selectedId?{background: '#91d5ff5a'}:{}}
                    onClick = {() => this.handleSelectItem(i, el)}>
                    {el.name}
                  </div>
                )
              })
            }
          </div>
          )
        }
        
      </div>
    )
  }
}
