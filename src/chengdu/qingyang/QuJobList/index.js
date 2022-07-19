import React, { PureComponent } from 'react';
import axios from 'axios';
import styles from './index.less';
import { getDataProvider } from '../../../utils/DataUtils';

import { isEqual } from 'lodash';
import List from './list.js';
/**
 * _chengdu_qingyangqu_eventlist
 * 青羊区-已处置、处置中工单查询列表
 */

let ip = '10.1.17.17:9527';

export default class Index extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      token:false,
      detail: {
        upPicture: []
      },
      logInfo: [],
      handlers: {},
      searchValue: '',
      total: '',
      hotIndex: 0,
      filterParam: ''
    }
  }

  componentDidMount() {


    this.getDefaultMessage(this.props);
    let eventValue = {};

    const { buffEvent = [{type: 'click'}, {type: 'rowClick'}] } = this.props;
    for (let i = 0; i < buffEvent.length; i++) {
      const eventObj = buffEvent[i];
      const { type, method, bindedComponents } = eventObj;
      if (type === 'click') {
        eventValue['onClick'] = (val) => {
          method && method({...val}, bindedComponents)
        }
      }
      if (type === 'rowClick') {
        eventValue['onRowClick'] = (val) => {
          method && method({...val}, bindedComponents)
        }
      }
    }

    this.setState({
      handlers: Object.assign({}, eventValue)
    });
  }

  componentWillReceiveProps(nextProps) {

    if (!isEqual(this.props, nextProps)) {
      
      const preDataProvider = getDataProvider(this.props);
      const nextDataProvider = getDataProvider(nextProps);

      const preAddress = preDataProvider.find(o => o && o.name === 'address');
      const nextAddress = nextDataProvider.find(o => o && o.name === 'address');

      if (!isEqual(preAddress, nextAddress)) {
        this.getDefaultMessage(nextProps);
      }

      const preFilterParam = preDataProvider.find(o => o && o.name === 'filter');
      const nextFilterParam = nextDataProvider.find(o => o && o.name === 'filter');

      // if (!isEqual(preFilterParam, nextFilterParam)) {
      //   const {param} = nextFilterParam;
      //   this.setState({filterParam: param});
      // }

    }
  }

  getDefaultMessage = props => {
    const dataProvider = getDataProvider(props);
    
    const address = dataProvider.find(o => o && o.name === 'address');
    if (address) {
      const {eventIp, eventPort} = address; 
      if (eventIp && eventPort) {
        this.addrIp = `${eventIp}:${eventPort}`;

        this.getToken();
        this.timer = setInterval(() => {
          this.getToken();
        }, 1000 * 60 * 20);

      }
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  getToken() {
    const params = {
      'loginType': 'sso',
      'password': '',
      'userKey': '',
      'username': 'sa1'
    }

    axios.post(
      // window.origin === 'http://localhost:8080' ?
      // 'http://119.3.53.170:9527/userOrg/api/org/login' :
      `http://${this.addrIp}/userOrg/api/org/login`, params)
      .then(({ data: res }) => {
        if (res && res.code === '0000') {
          this.setState({
            token:res.data.token,
          })
        }
      });
  }

  onDialogEvent = (val) => this.state.handlers.onRowClick && this.state.handlers.onRowClick(val);

  render() {
    const preDataProvider = getDataProvider(this.props);
    const filtersParams = preDataProvider.find(o => o && o.name === 'filter')|| {};
    const {param = ''} = filtersParams;
    return (
      <div className={styles.basic_wrapper}>
          <List
              addrIp = {this.addrIp}
              token = {this.state.token}
              filterParam = {param}
              dataProvider={this.props.dataProvider}
              style={this.props.style}
              searchValue = {this.state.searchValue}
              onDialogEvent={this.onDialogEvent}
          />

      </div>
    )
  }
}