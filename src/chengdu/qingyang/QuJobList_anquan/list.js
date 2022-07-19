import React, { PureComponent } from 'react';
import { Select,Pagination, DatePicker,Tooltip, Empty } from 'antd';
import axios from 'axios';
import { isEqual, isEmpty } from 'lodash';
import moment from 'moment';
import style from './index.less'
const {RangePicker } = DatePicker
import {getDateDistance} from '../../../utils/DataUtils'
// import data from './data/data';
// import Pagination from './FuckPagination.js'

const { Option } = Select;
const eventTypeUrl = ips => `http://${ips}/cmdbApp/api/cidata/getMultiLevelData`;
const flowSourceUrl = ips => `http://${ips}/cmdbApp/api/cidata/getCiData`;


const codes = {"100": "待分派", "102": "待审核", "103": "待开单", "104": "处置中", "105": "待核查", "107": "已结案", "111": "已取消"}


export default class List extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      current: 1,
      total: 10,
      pageSize: 8,
      dataList: [],
      pagedate: []
    };

    this.tabId = 0;
  }

  componentDidMount() {
    this.getDataInfo(this.props);
    // this.getEventStatus();
  }

  /*
    获取事件状态
  */
    getEventStatus = () => {
      const params = new FormData();
      params.append('codeGroup', 'SYS_FLOW_STATUS');
      axios.post(
          // window.origin === 'http://localhost:8080' ?
          // 'http://119.3.53.170:9527/userOrg/api/org/dict/dictByCodeGroup' :
          `http://${this.ip}:${this.port}/userOrg/api/org/dict/dictByCodeGroup`, params, {
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

  getDatalist = props => {
   
    const {current, pageSize, filter} = this.state;

    const params = {
      pageNum: current,
      pageSize: pageSize,
      city: "青羊区",
      "$class_1$": '安全应急',
      ...filter
    }

    if (this.flowSource !== '全部') {
      params["$class_2$"] = this.flowSource;
    }

    axios.post(
        `http://${this.ip}:${this.port}/wechatApp/api/wechat/screen/flow/getFlowList`,{...params}, {
          headers: {
            token:this.token
          }
        }).then(({ data: res }) => {
          const { rows = [], page = 1, size = 10, total } = res.data || {};
          this.setState({ dataList: [...rows], total });
      });
  }

  // // 选项变化
  filterFieldChange(field, value) {
    const { filter = {} } = this.state;
    this.setState({ current: 1, filter: { ...filter, [field]: value } }, () => {
      this.getDatalist();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      this.getDataInfo(nextProps);
    }
  }

  getDataInfo = props => {
    const conditions = props['conditions'];
      this.ip = conditions['address'] || '';
      this.port = conditions['port'] || '';
      this.stats = conditions['stats'] || '';
      this.flowSource = conditions['type1'] || '';
      this.token = props['token'];
      this.setState({current: 1, total: 0}, () => this.getDatalist()) 
  }

  render() {
    let { dataList = [], current, pageSize, total, eventStatusOptions = [] } = this.state;
    const {dealing = 0, dealed = 0} = this.props;
    const {
      onPageChange
    } = this.props;

    const tableWidth = ['10%','25%','25%','10%','20%','10%']
    return (
        <div className={style.table_wrapper}>
          <div className={style.table_columns}>
            <div className={style.table_columns_cell} style = {{width: tableWidth[0]}}>
              事件类型
            </div>
            <div className={style.table_columns_cell} style = {{width: tableWidth[1]}}>事件名称</div>
            <div className={style.table_columns_cell} style = {{width: tableWidth[2]}}>事件所在地</div>
            <div className={style.table_columns_cell} style = {{width: tableWidth[3]}}>在办时长</div>
            <div className={style.table_columns_cell} style = {{width: tableWidth[4]}}>受理时间</div>
            <div className={style.table_columns_cell}style = {{width: tableWidth[5]}}>
            事件状态
              {/* <Select
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
              </Select> */}
            </div>
          </div>
          <div className={style.table_rows}>
            {
              dataList.length === 0 ?
                  <div className={style.empty}>
                    暂无数据
                  </div> :
                  dataList.map((item, i) => {
                    return (
                        <React.Fragment key={item.id}>
                          <div className={style.table_row} onClick={() => { if (typeof this.props.onDialogEvent === 'function') this.props.onDialogEvent(item) }}>
                            {/* {item.isSlaOverTime && <div style={{width: '100%', height: '100%', position: 'absolute', zIndex: -1, background: 'linear-gradient(90deg, #FF626210 0%, #FF626270 50%, #FF626210 100%)'}}></div>} */}
                            {/* <Tooltip title={item.flowNo} overlayClassName={style.ant_tooltip}> */}
                            {/* <div className={style.rows_cell}>{item.flowNo}</div> */}
                            {/* </Tooltip> */}
                            {/* <Tooltip title={item.street} overlayClassName={style.ant_tooltip}> */}
                            {/*<div className={style.rows_cell} style = {{width: tableWidth[0]}}>{this.region === '成都市' ? item.city : item.street}</div>*/}
                            {/* </Tooltip> */}
                            {/* <Tooltip title={item.flowStatus} overlayClassName={style.ant_tooltip}> */}

                            

                            {/* </Tooltip> */}
                            {/* <Tooltip title={item.classA} overlayClassName={style.ant_tooltip}> */}
                            <div className={style.rows_cell} style = {{width: tableWidth[0]}}>{item['$class_1$']}</div>
                            {/* </Tooltip> */}
                            {/* <Tooltip title={item.classC} overlayClassName={style.ant_tooltip}> */}
                            <div className={style.rows_cell} style = {{width: tableWidth[1]}} title = {item['questionTitle']}>{item['questionTitle']}</div>
                            {/* </Tooltip> */}
                            {/* <Tooltip title={item.addr} overlayClassName={style.ant_tooltip}> */}
                            <div className={style.rows_cell} style = {{width: tableWidth[2]}} title = {item.hadress}>{item.hadress}</div>
                            {/* </Tooltip> */}
                            {/* <Tooltip title={item.creatDate} overlayClassName={style.ant_tooltip}> */}
                            <div className={style.rows_cell} style = {{width: tableWidth[3]}}>{item.workingOnTime}</div>
                            <div className={style.rows_cell} style = {{width: tableWidth[4]}}>{item.creatDate}</div>
                            <div className={style.rows_cell} style = {{width: tableWidth[5]}}>{codes[item.flowStatus] || ''}</div>
                            {/*<div className={style.rows_cell} style = {{width: tableWidth[2]}}>{item.flowSource}</div>*/}

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
                onChange={(val) => {
                  this.setState({ current:val }, () => {
                    this.getDatalist();
                  });
                }}
            />

            <div className={'paginationtotal'}>
              <div>总计：{total}</div>
            </div>
          </div>

        </div>
    )
  }
}

