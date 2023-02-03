import React, { PureComponent } from 'react';
import { Select,Pagination, DatePicker,Tooltip, Empty } from 'antd';
import axios from 'axios';
import { isEqual, isEmpty } from 'lodash';
import moment from 'moment';
import style from './index.less'
const {RangePicker } = DatePicker



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
      buddle:{
        cludove:'fusion'
      },
      catalog:{
        cludove:'share.qyq.eleesszdxm.mwbb.process',
      },
      pageNumber:{
        cludove:current-1
      },
      recordNumber:{
        cludove:pageSize,
      },
      IS_ACTIVE:true,
      XYFL:encodeURI(encodeURI(this.props.XYFL||'全部'))
      // ...filter
    }

    // if (this.flowSource === '企业诉求') {
    //   params['flowSource'] = '区县自建';
    // }
    //     , {
    //       // headers: {
    //       //   token:this.token
    //       // }
    //     }
    axios.get(
        `http://10.1.213.4:8089/s`,{params},{
          headers:{
            'Access-Control-Allow-Origin':'*',
            "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
            "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"
          }
        }).then(({ records=[],pagination={} }) => {
          // const { records = [], page = 1, size = 10, total } = res.data || {};
          this.setState({ dataList: [...records], total:pagination?.totalNumber||0 });
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
    // const conditions = props['conditions'];
      // this.ip = conditions['address'] || '';
      // this.port = conditions['port'] || '';
      // this.stats = conditions['stats'] || '';
      // this.flowSource = conditions['type1'] || '';
      // this.token = props['token']
      this.setState({current: 1, total: 0}, () => this.getDatalist())
  }

  render() {
    let { dataList = [], current, pageSize, total, eventStatusOptions = [] } = this.state;
    const {dealing = 0, dealed = 0} = this.props;
    const {
      onPageChange
    } = this.props;

    const tableWidth = ['9.9%','7.9%','11.9%']
    return (
        <div className={style.table_wrapper}>
          <div className={style.table_columns}>
            <div className={style.table_columns_cell} style = {{width: tableWidth[1]}}>
              建设地址
            </div>
            <div className={style.table_columns_cell} style = {{width: tableWidth[0]}}>计划开工时间</div>
            <div className={style.table_columns_cell} style = {{width: tableWidth[0]}}>计划竣工时间</div>
            <div className={style.table_columns_cell} style = {{width: tableWidth[1]}}>行业分类</div>
            <div className={style.table_columns_cell} style = {{width: tableWidth[0]}}>建设内容及规模</div>
            <div className={style.table_columns_cell}style = {{width: tableWidth[0]}}>总投资总计</div>

            <div className={style.table_columns_cell}style = {{width: tableWidth[2]}}>2022年计划投资总计</div>
            <div className={style.table_columns_cell}style = {{width: tableWidth[0]}}>2022年建设批次</div>
            <div className={style.table_columns_cell}style = {{width: tableWidth[2]}}>2022年工程形象进度</div>
            <div className={style.table_columns_cell}style = {{width: tableWidth[0]}}>项目业主单位</div>
            <div className={style.table_columns_cell}style = {{width: tableWidth[1]}}>形象进度</div>
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


                            <div className={style.rows_cell} style = {{width: tableWidth[1]}} title = {item['JSDZ']}>{item['JSDZ']}</div>
                            <div className={style.rows_cell} style = {{width: tableWidth[0]}} title = {item['JHKGSJ']}>{item['JHKGSJ']}</div>
                            <div className={style.rows_cell} style = {{width: tableWidth[0]}} title = {item['JHJGSJ']}>{item['JHJGSJ']}</div>
                            <div className={style.rows_cell} style = {{width: tableWidth[1]}} title = {item['XYFL']}>{item['XYFL']}</div>
                            <div className={style.rows_cell} style = {{width: tableWidth[0]}} title = {item['JSNRJGM']}>{item['JSNRJGM']}</div>
                            <div className={style.rows_cell} style = {{width: tableWidth[0]}} title = {item['ZTZZJ']}>{item['ZTZZJ']}</div>
                            <div className={style.rows_cell} style = {{width: tableWidth[2]}} title = {item['ELEENJHTZZJ']}>{item['ELEENJHTZZJ']}</div>
                            <div className={style.rows_cell} style = {{width: tableWidth[0]}} title = {item['ELEENJSPC']}>{item['ELEENJSPC']}</div>
                            <div className={style.rows_cell} style = {{width: tableWidth[2]}} title = {item['ELEENGCXXJD']}>{item['ELEENGCXXJD']}</div>
                            <div className={style.rows_cell} style = {{width: tableWidth[0]}} title = {item['XMYZDW']}>{item['XMYZDW']}</div>
                            <div className={style.rows_cell} style = {{width: tableWidth[1]}} title = {item['XXJD']}>{item['XXJD']}</div>

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
                  this.setState({ current:val-1 }, () => {
                    this.getDatalist();
                  });
                }}
            />

            {/*<div className={'paginationtotal'}>*/}
            {/*  <div style={{marginRight: 30}}>待处置：{dealing}</div>*/}
            {/*  <div style={{marginRight: 30}}>已处置：{dealed}</div>*/}
            {/*  <div>总计：{total}</div>*/}
            {/*</div>*/}
          </div>

        </div>
    )
  }
}

