import React, { PureComponent } from 'react';
import axios from 'axios';
import styles from './index.less';
import { getDataProvider } from '../../../utils/DataUtils';

import { isEqual } from 'lodash';
import List from './list.js';
/**
 * _chengdu_qingyangqu_eventlist_es_1
 * 青羊区-企业服务_已处置、处置中工单查询列表
 * 接口不一致，暂时功能一致
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

      if (type === 'pageChange') {
        eventValue['onPaginationClick'] = (val) => {
          method && method(val, bindedComponents)
        }
      }
    }

    this.setState({
      handlers: Object.assign({}, eventValue)
    });
  }

  onDialogEvent = (val) => this.state.handlers.onRowClick && this.state.handlers.onRowClick(val);
  handlePageChange = val => this.state.handlers.onPaginationClick && this.state.onPaginationClick(val);

  render() {

    const data = getDataProvider(this.props);
    const token = data[0] || '';
    const info = data[1] || {};
    const dealing = data[2] || 0;
    const dealed = data[3] || 0;
 
    return (
      <div className={styles.basic_wrapper}>
          <List
              onPageChange = {this.handlePageChange}
              token = {token}
              style={this.props.style}
              conditions = {info}
              dealing = {dealing}
              dealed = {dealed}
              searchValue = {this.state.searchValue}
              onDialogEvent={this.onDialogEvent}
          />

      </div>
    )
  }
}