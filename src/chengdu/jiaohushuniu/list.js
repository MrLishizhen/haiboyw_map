import React, { PureComponent } from 'react';
import { Select,Pagination, DatePicker,Tooltip, Empty } from 'antd';
import axios from 'axios';
import { isEqual, isEmpty } from 'lodash';
import moment from 'moment';
import style from './index.less'
const {RangePicker } = DatePicker
import locale from 'antd/es/date-picker/locale/zh_CN';
// import data from './data/data';
// import Pagination from './FuckPagination.js'

const { Option } = Select;
const eventTypeUrl = ips => `http://${ips}/cmdbApp/api/cidata/getMultiLevelData`;
const flowSourceUrl = ips => `http://${ips}/cmdbApp/api/cidata/getCiData`;


const codes = {"100": "待分派", "102": "待审核", "103": "待开单", "104": "处置中", "105": "待核查", "107": "已结案", "111": "已取消"}


export default class List extends PureComponent {
  constructor(props) {
    super(props);
    this.region = this.getQueryVariable('area') || '成都市';
    const data = this.getDataProvider(props);
    const { gteDate, lteDate, classA } = data[0] || {};

    this.state = {
      current: 1,
      total: 0,
      pageSize: 10,
      dataList: [],
      pagedate: [],
      streetOptions: [],
      flowSourceOptions: [],
      istimeout:[{name:'是',value:true},{name:'否',value:false}],//是否超时
      eventStatusOptions: [],
      eventSourceOptions: [],
      searchValue: '',
      filter: {
        action:'all',
        type: this.type,
        city: undefined,
        street: undefined,
        isSlaOverTime:undefined,
        gteDate: gteDate ? gteDate : moment().add(-7, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        lteDate: lteDate ? lteDate : moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
        classA: classA ? classA : undefined,
      }
    };
  }

  componentDidMount() {
    if (this.region === '成都市') {
      this.getCity();
    } else {
      this.getStreet(this.region);
    }
    this.getEventStatus();
    this.getEventSource();
    this.getDatalist();
    this.getFlowSource();

    this.timer = setInterval(() => {
      this.getDatalist();
    }, 1000 * 60 * 5);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps', this.props.dataProvider, nextProps.dataProvider);
    if (!isEqual(this.props, nextProps)) {
      if (!isEqual(this.props.searchValue, nextProps.searchValue)) {
        this.setState({searchValue: nextProps.searchValue, current: 1}, () => this.getDatalist());
      }

      if (!isEqual(this.props.resetFlag, nextProps.resetFlag)) {
        // console.log("...this.state.filter: ", this.state.filter)
        this.setState({searchValue: '', current: 1, filter: {...this.state.filter, city: undefined, street: undefined}}, () => this.getDatalist())
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
  getCity = () => {
    const {addrIp} = this.props;
    const params = {
      'otherColumns': ['CITY_NAME'],
      'selectColumn': 'CITY_NAME',
      'ciId': 1306
    }
    axios.post(eventTypeUrl(addrIp), params, {
      headers: {
        checkToken: 'no'
      }
    }).then(({ data: res }) => {
      const { data } = res;
      if (data && data.length) {
        this.setState({
          streetOptions: data,
          city: this.region
        })
      }
    });
  }

  // 获取街道
  getStreet = (value) => {
    const {addrIp} = this.props;
    const params = {
      'otherColumns': ['STREET_NAME'],
      'selectColumn': 'STREET_NAME',
      'params': { 'CITY_NAME': value },
      'ciId': 1306
    }
    axios.post(eventTypeUrl(addrIp), params, {
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

  /**
   * 获取事件来源
   */

  getFlowSource = async () => {
    const {addrIp} = this.props;
    const params = {
      "pageSize": 999999,
      "ciId": 1272
    };
    const result = await axios.post(flowSourceUrl(addrIp), params, {
      headers: {
        checkToken: 'no'
      }
    })
    const list = result?.data?.data?.data || [];
    this.setState({flowSourceOptions: list})
  }

  /*
    获取事件状态
  */
  getEventStatus = () => {
    const {addrIp} = this.props;
    const params = new FormData();
    params.append('codeGroup', 'SYS_FLOW_STATUS');
    axios.post(
        // window.origin === 'http://localhost:8080' ?
        // 'http://119.3.53.170:9527/userOrg/api/org/dict/dictByCodeGroup' :
        `http://${addrIp}/userOrg/api/org/dict/dictByCodeGroup`, params, {
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
    const {addrIp} = this.props;
    const params = {
      'otherColumns': ['CLASS_1_NAME'],
      'selectColumn': 'CLASS_1_NAME',
      'ciId': 100001
    }
    axios.post(eventTypeUrl(addrIp), params, {
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
    const {addrIp, onGetJobStatistics} = this.props;
    const { current, pageSize, searchValue, filter = {} } = this.state;
    const { type, city, gteDate,lteDate,action,isSlaOverTime, flowStatus, $class_1$, flowSource, street, ...extra } = filter;

    let dataFilter = {};
    // if (city !== '成都市') {
    //   dataFilter['city'] = city;
    // }

    if (city) {
      dataFilter['city'] = city;
    } else {
      if (this.region && this.region !== '成都市') {
        dataFilter['city'] = this.region;
      }
    }

    if (street) {
      dataFilter['street'] = street;
    }

    if (flowStatus) {
      dataFilter['flowStatus'] = flowStatus;
    }
    
    if ($class_1$) dataFilter['$class_1$'] = $class_1$;
    if (flowSource) dataFilter['flowSource'] = flowSource;

    const params = {
      modelKey:'CN_IT',
      field_flag: 1,
      'page': current,
      'size': pageSize,
      flowNo:'',
      "dataFilter":{
        ...dataFilter
      }
    }
    if (searchValue !== '') {
      params['likeQuery'] = {questionTitle: searchValue}
    }
    
    // {"mapVo":{"page":1,"size":4,"modelKey":"CN_IT","dataFilter":{"city":"青羊区"}}}
    axios.post(
        // window.origin === 'http://localhost:8080' ?
        // 'http://119.3.53.170:9527/itsmApp/visData/getFlowInfoList' :
        `http://${addrIp}/wechatApp/api/wechat/flow/findFlowList`,{mapVo:{...params}}, {
          headers: {

            // "Content-Type": "application/x-www-form-urlencoded; charset=utf-8;"
            token:this.props.token,
            // checkToken: 'no'
          }
        }).then(({ data: res }) => {
          if (res && res.code === 200) {
            const { rows = [], page, size, total } = res.data;
            this.setState({ dataList: [...rows], total });
            onGetJobStatistics && onGetJobStatistics({total: total});
          }
      });
  }

  // // 选项变化
  filterFieldChange(field, value) {
    const { filter = {} } = this.state;
    let { type,isSlaOverTime } = filter;
    this.setState({ current: 1, filter: { ...this.state.filter, type, [field]: value } }, () => {
      this.getDatalist();
    });
  }

  pageChange(action, current,g) {
    // console.info(action, current,g);

    this.setState({ current:action }, () => {
      this.getDatalist();
    });
  }

  render() {
    const { filter = {}, streetOptions = [],istimeout=[], eventStatusOptions = [], eventSourceOptions = [], flowSourceOptions = [] } = this.state;
    const { dataList = [], current, pageSize, total } = this.state;

    for(let j = 0;j<dataList.length;j++){

      for(let i = 0;i<eventStatusOptions.length;i++){
        if(dataList[j].flowStatus==eventStatusOptions[i].codeKey){
          dataList[j].flowStatusName = eventStatusOptions[i].codeVal;
          break;
        }
      }
    }
    const bindAreaCode = streetOptions[0] !== undefined && streetOptions[0] !== null? Object.keys(streetOptions[0])[0]: '';
    
    const tableWidth = ['8%','8%','8%','10%','30%','22%','14%',]
    return (
        <div className={style.table_wrapper}>
          <div className={style.table_columns}>
            {/* <div className={style.table_columns_cell}>事件工单号</div> */}
            <div className={style.table_columns_cell} style = {{width: tableWidth[0]}}>
              地域分布
              <Select
                  size='large'
                  allowClear={true}
                  onChange={this.filterFieldChange.bind(this, bindAreaCode === 'STREET_NAME'? 'street': 'city')}
                  dropdownClassName={style.select_dropdown}
                  className={style.select_design}
                  value={bindAreaCode === 'STREET_NAME'? filter.street: filter.city}
              >
                {
                  streetOptions.map(item => {
                    return (
                        <Option value={item[this.region === '成都市' ? 'CITY_NAME' : 'STREET_NAME']} key={item[this.region === '成都市' ? 'CITY_NAME' : 'STREET_NAME']}>
                          {item[this.region === '成都市' ? 'CITY_NAME' : 'STREET_NAME']}
                        </Option>
                    )
                  })
                }
              </Select>
            </div>
            <div className={style.table_columns_cell} style = {{width: tableWidth[3]}}>
              事件类型
              <Select
                  size='large'
                  allowClear={true}
                  onChange={this.filterFieldChange.bind(this, '$class_1$')}
                  dropdownClassName={style.select_dropdown}
                  className={style.select_design}
                  value={filter['$class_1$']}
              >
                {
                  eventSourceOptions.map(item => {
                    return (
                        <Option
                            value={item.CLASS_1_NAME}
                            key={item.CLASS_1_NAME}
                        >
                          {item.CLASS_1_NAME}
                        </Option>
                    )
                  })
                }
              </Select>
            </div>
            <div className={style.table_columns_cell} style = {{width: tableWidth[4]}}>事件名称</div>
            <div className={style.table_columns_cell} style = {{width: tableWidth[5]}}>发生地址</div>
            <div className={style.table_columns_cell} style = {{width: tableWidth[6]}}>受理时间</div>
            <div className={style.table_columns_cell}style = {{width: tableWidth[1]}}>
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
            <div className={style.table_columns_cell} style = {{width: tableWidth[2]}}>
              事件来源
              <Select
                  size='large'
                  allowClear={true}
                  onChange={this.filterFieldChange.bind(this, 'flowSource')}
                  dropdownClassName={style.select_dropdown}
                  className={style.select_design}
                  value={filter.flowSource}
              >
                {
                  flowSourceOptions.map(item => {
                    return (
                        <Option
                            value={item.QUES_FROM}
                            key={item.QUES_FROM}
                        >
                          {item.QUES_FROM}
                        </Option>
                    )
                  })
                }
              </Select>
            </div>
          </div>
          <div className={style.table_rows}>
            {
              this.state.dataList.length === 0 ?
                  <div className={style.empty}>
                    暂无数据
                  </div> :
                  this.state.dataList.map((item, i) => {
                    return (
                        <React.Fragment key={item.id}>
                          <div className={style.table_row} onClick={() => { if (typeof this.props.onDialogEvent === 'function') this.props.onDialogEvent(item) }}>
                            {item.isSlaOverTime && <div style={{width: '100%', height: '100%', position: 'absolute', zIndex: -1, background: 'linear-gradient(90deg, #FF626210 0%, #FF626270 50%, #FF626210 100%)'}}></div>}
                            {/* <Tooltip title={item.flowNo} overlayClassName={style.ant_tooltip}> */}
                            {/* <div className={style.rows_cell}>{item.flowNo}</div> */}
                            {/* </Tooltip> */}
                            {/* <Tooltip title={item.street} overlayClassName={style.ant_tooltip}> */}
                            <div className={style.rows_cell} style = {{width: tableWidth[0]}}>{this.region === '成都市' ? item.city : item.street}</div>
                            {/* </Tooltip> */}
                            {/* <Tooltip title={item.flowStatus} overlayClassName={style.ant_tooltip}> */}

                            

                            {/* </Tooltip> */}
                            {/* <Tooltip title={item.classA} overlayClassName={style.ant_tooltip}> */}
                            <div className={style.rows_cell} style = {{width: tableWidth[3]}}>{item['$class_1$']}</div>
                            {/* </Tooltip> */}
                            {/* <Tooltip title={item.classC} overlayClassName={style.ant_tooltip}> */}
                            <div className={style.rows_cell} style = {{width: tableWidth[4]}} title = {item['questionTitle']}>{item['questionTitle']}</div>
                            {/* </Tooltip> */}
                            {/* <Tooltip title={item.addr} overlayClassName={style.ant_tooltip}> */}
                            <div className={style.rows_cell} style = {{width: tableWidth[5]}} title = {item.hadress}>{item.hadress}</div>
                            {/* </Tooltip> */}
                            {/* <Tooltip title={item.creatDate} overlayClassName={style.ant_tooltip}> */}
                            <div className={style.rows_cell} style = {{width: tableWidth[6]}}>{item.creatDate}</div>
                            <div className={style.rows_cell} style = {{width: tableWidth[1]}}>{codes[item.flowStatus] || ''}</div>
                            <div className={style.rows_cell} style = {{width: tableWidth[2]}}>{item.flowSource}</div>

                            {/* </Tooltip> */}
                          </div>
                        </React.Fragment>
                    )
                  })
            }
          </div>
          <div className={style.list_pagination}>
            <Pagination

                current={current}
                pageSize={pageSize}
                total={total}
                onChange={this.pageChange.bind(this)}
            />

            {/* <div className={'paginationtotal'}>
              总计：{total}
            </div> */}
          </div>

        </div>
    )
  }
}

