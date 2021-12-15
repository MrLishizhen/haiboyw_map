import React, { PureComponent } from 'react';
import { Select, Tooltip, Empty } from 'antd';
import axios from 'axios';
import { isEqual, isEmpty } from 'lodash';
import moment from 'moment';
import style from './index.less'

// import data from './data/data';
import Pagination from './FuckPagination.js'

const { Option } = Select;
const eventTypeUrl =
  // window.origin === 'http://localhost:8080' ?
  // 'http://119.3.53.170:9527/cmdbApp/api/cidata/getMultiLevelData' :
  'http://10.7.52.21:9527/cmdbApp/api/cidata/getMultiLevelData';

export default class List extends PureComponent {
  constructor(props) {
    super(props);
    this.region = this.getQueryVariable('region') || '襄阳市';
    this.type = isNaN(parseInt(this.getQueryVariable('type'))) ? 0 : parseInt(this.getQueryVariable('type'));
    const data = this.getDataProvider(props);
    const { gteDate, lteDate, classA } = data[0] || {};

    this.state = {
      current: 1,
      total: 0,
      pageSize: 7,
      dataList: [],
      pagedate: [],
      streetOptions: [],
      eventStatusOptions: [],
      eventSourceOptions: [],
      filter: {
        type: this.type,
        city: this.region,
        street: undefined,
        gteDate: gteDate ? gteDate : moment().add(-7, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        lteDate: lteDate ? lteDate : moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
        classA: classA ? classA : undefined
      }
    };
  }

  componentDidMount() {
    if (this.region === '襄阳市') {
      this.getCity();
    } else {
      this.getStreet(this.region);
    }
    this.getEventStatus();
    this.getEventSource();
    this.getDatalist();

    this.timer = setInterval(() => {
      this.getDatalist();
    }, 1000 * 60);
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', this.props.dataProvider, nextProps.dataProvider);
    if (!isEqual(this.props.dataProvider, nextProps.dataProvider)) {
      const data = this.getDataProvider(nextProps);
      const { gteDate, lteDate, classA } = data[0] || {};
      const { filter } = this.state;

      if ((gteDate && gteDate !== filter.gteDate) || (lteDate && lteDate !== filter.lteDate) || (classA && classA !== filter.classA)) {
        this.setState({
          current: 1,
          filter:
          {
            ...filter,
            gteDate: gteDate ? gteDate : filter.gteDate,
            lteDate: lteDate ? lteDate : filter.lteDate,
            classA: classA ? classA : filter.classA
          }
        }, () => {
          this.getDatalist();
        });
      }
    }
  }

  getDataProvider = props => {
    const { dataProvider } = props;

    if (dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && dataProvider[0] !== '') {
      return [...dataProvider]
    } else {
      return [];
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  getQueryVariable(variable) {
    try {
      // let query = window.location.search.substring(1);
      let query = window.location.href.substr(window.location.href.indexOf('?') + 1)
      if (query) {
        const vars = decodeURIComponent(query).split('&');
        for (let i = 0; i < vars.length; i++) {
          const pair = vars[i].split('=');
          if (pair[0] == variable) { return pair[1]; }
        }
        return (false);
      }
    } catch (e) {
      console.error(e)
    }
  }

  // 获取城区
  getCity() {
    const params = {
      'otherColumns': ['CITY_NAME'],
      'selectColumn': 'CITY_NAME',
      'ciId': 1306
    }
    axios.post(eventTypeUrl, params, {
      headers: {
        checkToken: 'no'
      }
    }).then(({ data: res }) => {
      const { data } = res;
      if (data && data.length) {
        this.setState({
          streetOptions: data
        })
      }
    });
  }

  // 获取街道
  getStreet(value) {
    const params = {
      'otherColumns': ['STREET_NAME'],
      'selectColumn': 'STREET_NAME',
      'params': { 'CITY_NAME': value },
      'ciId': 1306
    }
    axios.post(eventTypeUrl, params, {
      headers: {
        checkToken: 'no'
      }
    }).then(({ data: res }) => {
      const { data } = res;
      if (data && data.length) {
        this.setState({
          streetOptions: data
        })
      }
    });
  }

  /* 
    获取事件状态
  */
  getEventStatus() {
    const params = new FormData();
    params.append('codeGroup', 'SYS_FLOW_STATUS');
    axios.post(
      // window.origin === 'http://localhost:8080' ?
      // 'http://119.3.53.170:9527/userOrg/api/org/dict/dictByCodeGroup' :
      'http://10.7.52.21:9527/userOrg/api/org/dict/dictByCodeGroup', params, {
      headers: {
        checkToken: 'no'
      }
    }).then(({ data }) => {
      data = data.data;
      if (data && data.length) {
        this.setState({
          eventStatusOptions: data
        });
      }
    })
  }

  /* 
    获取事件归属
  */
  getEventSource() {
    const params = {
      'otherColumns': ['CLASS_A'],
      'selectColumn': 'CLASS_A',
      'ciId': 1304
    }
    axios.post(eventTypeUrl, params, {
      headers: {
        checkToken: 'no'
      }
    }).then(({ data: res }) => {
      const { data } = res;
      if (data && data.length) {
        this.setState({
          eventSourceOptions: data
        })
      }
    });
  }

  getDatalist() {
    const { current, pageSize, filter = {} } = this.state;
    const { type, city, ...extra } = filter;

    const params = {
      'page': current,
      'size': pageSize,
      'type': type,
      city: city === '襄阳市' ? undefined : city,
      ...extra
    }
    console.log('getDatalist', params);
    axios.post(
      // window.origin === 'http://localhost:8080' ?
      // 'http://119.3.53.170:9527/itsmApp/visData/getFlowInfoList' :
      'http://10.7.52.21:9527/itsmApp/visData/getFlowInfoList', params, {
      headers: {
        checkToken: 'no'
      }
    }).then(({ data: res }) => {
      if (res && res.code === '0000') {
        const { rows = [], page, size, total } = res.data;
        this.setState({ dataList: [...rows], total });
      }
    });
  }

  // 选项变化
  filterFieldChange(field, value) {
    console.info(field, value);
    const { filter = {} } = this.state;
    let { type } = filter;

    if (field === 'city') {
      if (value) {
        type = this.type + 1
      } else {
        type = this.type;
      }
      if (this.type === 1) {
        field = 'street';
      }
    }

    this.setState({ current: 1, filter: { ...this.state.filter, type, [field]: /*field === 'city' && !value ? this.region :*/ value } }, () => {
      this.getDatalist();
    });
  }

  pageChange(action, current) {
    console.info(action, current);

    this.setState({ current }, () => {
      this.getDatalist();
    });
  }

  render() {
    const { filter = {}, streetOptions = [], eventStatusOptions = [], eventSourceOptions = [] } = this.state;
    const { dataList = [], current, pageSize, total } = this.state;

    return (
      <div className={style.table_wrapper}>
        <div className={style.table_columns}>
          <div className={style.table_columns_cell}>事件工单号</div>
          <div className={style.table_columns_cell}>
            地域分布
              <Select
              size='large'
              allowClear={true}
              onChange={this.filterFieldChange.bind(this, 'city')}
              dropdownClassName={style.select_dropdown}
              className={style.select_design}
              value={filter.city}
            >
              {
                streetOptions.map(item => {
                  return (
                    <Option value={item[this.region === '襄阳市' ? 'CITY_NAME' : 'STREET_NAME']} key={item[this.region === '襄阳市' ? 'CITY_NAME' : 'STREET_NAME']}>
                      {item[this.region === '襄阳市' ? 'CITY_NAME' : 'STREET_NAME']}
                    </Option>
                  )
                })
              }
            </Select>
          </div>
          <div className={style.table_columns_cell}>
            事件状态
              <Select
              size='large'
              allowClear={true}
              onChange={this.filterFieldChange.bind(this, 'flowStatus')}
              dropdownClassName={style.select_dropdown}
              className={style.select_design}
            >
              {
                eventStatusOptions.map(item => {
                  return (
                    <Option
                      value={item.codeKey}
                      key={item.codeKey}
                    >
                      {item.codeVal}
                    </Option>
                  )
                })
              }
            </Select>
          </div>
          <div className={style.table_columns_cell}>
            事件归属
              <Select
              size='large'
              allowClear={true}
              onChange={this.filterFieldChange.bind(this, 'classA')}
              dropdownClassName={style.select_dropdown}
              className={style.select_design}
              value={filter.classA}
            >
              {
                eventSourceOptions.map(item => {
                  return (
                    <Option
                      value={item.CLASS_A}
                      key={item.CLASS_A}
                    >
                      {item.CLASS_A}
                    </Option>
                  )
                })
              }
            </Select>
          </div>
          <div className={style.table_columns_cell}>事件名称</div>
          <div className={style.table_columns_cell}>发生地址</div>
          <div className={style.table_columns_cell}>创建时间</div>
        </div>
        <div className={style.table_rows}>
          {
            this.state.dataList.length === 0 ?
              <div className={style.empty}>
                暂无数据
              </div> :
              this.state.dataList.map(item => {
                return (
                  <React.Fragment key={item.id}>
                    <div className={style.table_row} onClick={() => { if (typeof this.props.onDialogEvent === 'function') this.props.onDialogEvent(item.flowNo) }}>
                      {/* <Tooltip title={item.flowNo} overlayClassName={style.ant_tooltip}> */}
                      <div className={style.rows_cell}>{item.flowNo}</div>
                      {/* </Tooltip> */}
                      {/* <Tooltip title={item.street} overlayClassName={style.ant_tooltip}> */}
                      <div className={style.rows_cell}>{this.region === '襄阳市' ? item.city : item.street}</div>
                      {/* </Tooltip> */}
                      {/* <Tooltip title={item.flowStatus} overlayClassName={style.ant_tooltip}> */}
                      <div className={style.rows_cell}>{item.flowStatus}</div>
                      {/* </Tooltip> */}
                      {/* <Tooltip title={item.classA} overlayClassName={style.ant_tooltip}> */}
                      <div className={style.rows_cell}>{item.classA}</div>
                      {/* </Tooltip> */}
                      {/* <Tooltip title={item.classC} overlayClassName={style.ant_tooltip}> */}
                      <div className={style.rows_cell}>{item.classC}</div>
                      {/* </Tooltip> */}
                      {/* <Tooltip title={item.addr} overlayClassName={style.ant_tooltip}> */}
                      <div className={style.rows_cell}>{item.addr}</div>
                      {/* </Tooltip> */}
                      {/* <Tooltip title={item.creatDate} overlayClassName={style.ant_tooltip}> */}
                      <div className={style.rows_cell}>{item.creatDate}</div>
                      {/* </Tooltip> */}
                    </div>
                  </React.Fragment>
                )
              })
          }
        </div>
        <Pagination
          className={style.list_pagination}
          current={current}
          pageSize={pageSize}
          total={total}
          onChange={this.pageChange.bind(this)}
        />
      </div>
    )
  }
}