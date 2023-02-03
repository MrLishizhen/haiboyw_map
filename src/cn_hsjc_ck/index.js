import React, { Component } from 'react';
import { ReactDOM } from 'react';
import styles from './index.less'
import { Table, Tooltip, Icon } from 'antd';
import _ from 'lodash';
// import { color } from 'highcharts';
import { Row, Col } from 'antd';

//cn_hsjc_ck
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handlers: '',
      filter: [],
    }
  }

  componentDidMount() {
    try {
      const { buffEvent = [{ type: 'click' }] } = this.props;
      let eventValue = {};

      for (let i = 0; i < buffEvent.length; i++) {
        const eventObj = buffEvent[i];
        const { type, method, bindedComponents } = eventObj;
        if (type === 'click') {
          eventValue = {
            onClick: (data) => {
              method && method({ ...data }, bindedComponents)
            }
          }
        }
      }
      this.setState({
        handlers: Object.assign({}, eventValue)
      })

      // this.generatorTimer(this.props, this.state);
      // this.cnt = 1, this.scrollTop = 0;

      // var wrapper = document.getElementById('cn_renliu_wrapper').getElementsByClassName('ant-table-body')[0];
      // wrapper.onmouseenter = () => {
      //   this.clearTimer();
      // };
      // wrapper.onmouseleave = () => {
      //   this.generatorTimer(this.props, this.state)
      // }
    } catch (e) {
      console.log(e)
    }
  }

  onChange = (pagination, filters, sorter, extra) => {
    try {
      // console.log('params', pagination, filters, sorter, extra);
      let filter = [];
      if (filters.unit_type && filters.unit_type.length) {
        filter = filters.unit_type;
        // console.log("filter", filter);
        this.setState({ filter });
      } else {
        this.setState({ filter: [] });
      }
    } catch (error) {
      console.log(e)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    try {
      // if (!_.isEqual(nextProps.dataProvider, this.props.dataProvider) || !_.isEqual(nextState.filter, this.state.filter)) {
      //   var wrapper = document.getElementById('cn_renliu_wrapper').getElementsByClassName('ant-table-body')[0];
      //   wrapper.scrollTop = 0;
      //   this.cnt = 1, this.scrollTop = 0;
      // this.clearTimer();
      // this.generatorTimer(nextProps, nextState);
      // }

      return true;
    } catch (error) {
      console.log(e)
    }
  }

  // generatorTimer(props, state) {
  //   const { filter = {} } = state;
  //   const { dataProvider = [] } = props;
  //   const data = filter && filter.length > 0 ? dataProvider.filter(item => filter && filter.includes(item.unit_type)) : dataProvider;

  //   // console.log(dataProvider.filter(item => filter && filter.includes(item.unit_type)), 'item')

  //   if (data && data.length > 0) {
  //     var wrapper = document.getElementById('cn_renliu_wrapper').getElementsByClassName('ant-table-body')[0];
  //     var table = document.getElementById('cn_renliu_wrapper').getElementsByClassName('ant-table-tbody')[0];
  //     let speed = 8 * 1000 / (8 * height);
  //     const height = table.offsetHeight / data.length;
  //     console.info(height);
  //     console.info(table.offsetHeight);

  //     this.timerA = setInterval(() => {
  //       if (this.timer) {
  //         clearInterval(this.timer);
  //         this.timer = undefined;
  //       }

  //       this.timer = setInterval(() => {
  //         // console.info(this.cnt, Math.ceil(dataProvider.length / 8),(dataProvider.length - 8) * 164.1 - (dataProvider.length % 8 === 0 ? 0 : 80));
  //         if (this.cnt == Math.ceil(data.length / 8)) {
  //           this.cnt = 1, this.scrollTop = 0;
  //           wrapper.scrollTop = 0;
  //           this.clearTimer();
  //           this.generatorTimer(props, state);
  //         }
  //         if (wrapper.scrollTop < this.cnt * 8 * height) {
  //           if (wrapper.scrollTop > (data.length - 8) * height - (data.length % 8 === 0 ? 0 : 80)) {
  //             clearInterval(this.timer);
  //             this.timer = undefined;
  //             this.cnt++;
  //           } else {
  //             this.scrollTop = this.scrollTop + 2;
  //             wrapper.scrollTop = this.scrollTop;
  //           }
  //         } else {
  //           clearInterval(this.timer);
  //           this.timer = undefined;
  //           this.cnt++;
  //         }
  //       }, speed)
  //     }, 8 * 1000);
  //   }
  // }

  // clearTimer() {
  //   clearInterval(this.timerA);
  //   clearInterval(this.timer);
  //   this.timerA = null;
  //   this.timer = null;
  // }

  render() {
    const { dataProvider } = this.props;
    const { filter } = this.state;
    const isHasData = dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && Boolean(dataProvider[0])
    const data = isHasData ? dataProvider : [];
    let datalist = [{"ID":3865,"A":"6","B":"长宁区","C":"新华","D":"36000","E":"28526","F":"79%","G":"1682","H":"6%","I":"872","J":"3%","K":"0","L":"0%","M":"2022-04-27 11:00:00"},{"ID":3866,"A":"8","B":"长宁区","C":"江苏","D":"40000","E":"21029","F":"53%","G":"3757","H":"18%","I":"919","J":"4%","K":"2","L":"0%","M":"2022-04-27 11:00:00"},{"ID":3867,"A":"3","B":"长宁区","C":"华阳","D":"24200","E":"14597","F":"60%","G":"1542","H":"11%","I":"3","J":"0%","K":"3","L":"0%","M":"2022-04-27 11:00:00"},{"ID":3868,"A":"4","B":"长宁区","C":"周家桥","D":"20700","E":"9564","F":"46%","G":"625","H":"7%","I":"265","J":"3%","K":"0","L":"0%","M":"2022-04-27 11:00:00"},{"ID":3869,"A":"5","B":"长宁区","C":"天山","D":"38000","E":"25419","F":"67%","G":"1481","H":"6%","I":"790","J":"3%","K":"0","L":"0%","M":"2022-04-27 11:00:00"},{"ID":3870,"A":"1","B":"长宁区","C":"仙霞","D":"40000","E":"28005","F":"70%","G":"2375","H":"8%","I":"17","J":"0%","K":"0","L":"0%","M":"2022-04-27 11:00:00"},{"ID":3871,"A":"10","B":"长宁区","C":"虹桥","D":"18000","E":"13007","F":"72%","G":"1596","H":"12%","I":"557","J":"4%","K":"0","L":"0%","M":"2022-04-27 11:00:00"},{"ID":3872,"A":"2","B":"长宁区","C":"程家桥","D":"19000","E":"15824","F":"83%","G":"204","H":"1%","I":"204","J":"1%","K":"0","L":"0%","M":"2022-04-27 11:00:00"},{"ID":3873,"A":"9","B":"长宁区","C":"北新泾","D":"31000","E":"19564","F":"63%","G":"6960","H":"36%","I":"1945","J":"10%","K":"0","L":"0%","M":"2022-04-27 11:00:00"},{"ID":3874,"A":"7","B":"长宁区","C":"新泾镇","D":"70000","E":"48375","F":"69%","G":"1483","H":"3%","I":"142","J":"0%","K":"0","L":"0%","M":"2022-04-27 11:00:00"},{"ID":3875,"A":"11","B":"长宁区","C":"医疗机构","D":"/","E":"115","F":"0%","G":"0","H":"0%","I":"0","J":"0%","K":"0","L":"0%","M":"2022-04-27 11:00:00"},{"ID":3876,"A":"合计","B":"","C":"合计","D":"336900","E":"223910","F":"66%","G":"21705","H":"10%","I":"5714","J":"3%","K":"5","L":"0%","M":"2022-04-27 11:00:00"}]
    let lastdata = []
    if(data && data.length > 0){
      data.map((item,index)=>{
        if(index != data.length - 1){
          datalist.push(item)
        }
      })
      lastdata = [data[data.length-1]]
    }
    // console.log(data, 'datasss')

    const columns = [
      {
        title: '街镇',
        dataIndex: 'C',
        width: '5%',
        // key:'C',
        // fixed: 'left',
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }
          }
        },
        render: (text, record) => {
          const { C } = record
          return <Tooltip placement="topLeft" title={C} overlayClassName={styles.ant_tooltip}>{C}</Tooltip>
        }
      },
      {
        title: '计划人数',
        dataIndex: 'D',
        // width: 469.2,
        width: '5%',
        // key:'D',
        // fixed:'left',
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',

            }
          }
        },
        render: (text, record) => {
          const { D } = record
          return <Tooltip placement="topLeft" title={D} overlayClassName={styles.ant_tooltip}>{D}</Tooltip>
        }
      },
      {
        title: '采集人数',
        dataIndex: 'E',
        // width:469.2,
        width: '5%',
        key:'E',
        // fixed:'left',
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }
          }
        },
        render: (text, record) => {
          const { E } = record
          return <Tooltip placement="topLeft" title={E} overlayClassName={styles.ant_tooltip}>{E}</Tooltip>
        }
      },
      {
        title: '采集率',
        dataIndex: 'F',
        width: '5%',
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              fontWeight: 700,
              color:'#8AC6FF'
            }
          }
        },
        render: (text, record) => {
          const { F } = record
          return <Tooltip placement="topLeft" title={F} overlayClassName={styles.ant_tooltip}>{F}</Tooltip>
        }
      },
      {
        title: '送检人数',
        dataIndex: 'G',
        width: '5%',
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }
          }
        },
        render: (text, record) => {
          const { G } = record
          return <Tooltip placement="topLeft" title={G} overlayClassName={styles.ant_tooltip}>{G}</Tooltip>
        }
      },
      {
        title: '送检率',
        dataIndex: 'H',
        width: '5%',
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              fontWeight: 700,
              color:'#8AC6FF'
            }
          }
        },
        render: (text, record) => {
          const { H } = record
          return <Tooltip placement="topLeft" title={H} overlayClassName={styles.ant_tooltip}>{H}</Tooltip>
        }
      },
      {
        title: '接收人数',
        dataIndex: 'I',
        width: '5%',
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }
          }
        },
        render: (text, record) => {
          const { I } = record
          return <Tooltip placement="topLeft" title={I} overlayClassName={styles.ant_tooltip}>{I}</Tooltip>
        }
      },
      {
        title: '接收率',
        dataIndex: 'J',
        width: '5%',
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              fontWeight: 700,
              color:'#8AC6FF'
            }
          }
        },
        render: (text, record) => {
          const { J } = record
          return <Tooltip placement="topLeft" title={J} overlayClassName={styles.ant_tooltip}>{J}</Tooltip>
        }
      },
      {
        title: '检测人数',
        dataIndex: 'K',
        width: '5%',
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }
          }
        },
        render: (text, record) => {
          const { K } = record
          return <Tooltip placement="topLeft" title={K} overlayClassName={styles.ant_tooltip}>{K}</Tooltip>
        }
      },
      {
        title: '检测率',
        dataIndex: 'L',
        width: '5%',
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              fontWeight: 700,
              color:'#8AC6FF'
            }
          }
        },
        render: (text, record) => {
          const { L } = record
          return <Tooltip placement="topLeft" title={L} overlayClassName={styles.ant_tooltip}>{L}</Tooltip>
        }
      },

    ];

    const columnss = [
      {
        dataIndex: 'C',
        width: '5%',
        onHeaderCell: () => {
          return {
            style: {
              display:"none",
            }
          }
        },
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }
          }
        },
        render: (text, record) => {
          const { C } = record
          return <Tooltip placement="topLeft" title={C} overlayClassName={styles.ant_tooltip}>{C}</Tooltip>
        }
      },
      {
        dataIndex: 'D',
        width: '5%',
        onHeaderCell: () => {
          return {
            style: {
              display:"none",
            }
          }
        },
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',

            }
          }
        },
        render: (text, record) => {
          const { D } = record
          return <Tooltip placement="topLeft" title={D} overlayClassName={styles.ant_tooltip}>{D}</Tooltip>
        }
      },
      {
        title: '采集人数',
        dataIndex: 'E',
        // width:469.2,
        width: '5%',
        key:'E',
        // fixed:'left',
        onHeaderCell: () => {
          return {
            style: {
              display:"none",
            }
          }
        },
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }
          }
        },
        render: (text, record) => {
          const { E } = record
          return <Tooltip placement="topLeft" title={E} overlayClassName={styles.ant_tooltip}>{E}</Tooltip>
        }
      },
      {
        title: '采集率',
        dataIndex: 'F',
        width: '5%',
        onHeaderCell: () => {
          return {
            style: {
              display:"none",
            }
          }
        },
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              fontWeight: 700,
              color:'#8AC6FF'
            }
          }
        },
        render: (text, record) => {
          const { F } = record
          return <Tooltip placement="topLeft" title={F} overlayClassName={styles.ant_tooltip}>{F}</Tooltip>
        }
      },
      {
        title: '送检人数',
        dataIndex: 'G',
        width: '5%',
        onHeaderCell: () => {
          return {
            style: {
              display:"none",
            }
          }
        },
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }
          }
        },
        render: (text, record) => {
          const { G } = record
          return <Tooltip placement="topLeft" title={G} overlayClassName={styles.ant_tooltip}>{G}</Tooltip>
        }
      },
      {
        title: '送检率',
        dataIndex: 'H',
        width: '5%',
        onHeaderCell: () => {
          return {
            style: {
              display:"none",
            }
          }
        },
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              fontWeight: 700,
              color:'#8AC6FF'
            }
          }
        },
        render: (text, record) => {
          const { H } = record
          return <Tooltip placement="topLeft" title={H} overlayClassName={styles.ant_tooltip}>{H}</Tooltip>
        }
      },
      {
        title: '接收人数',
        dataIndex: 'I',
        width: '5%',
        onHeaderCell: () => {
          return {
            style: {
              display:"none",
            }
          }
        },
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }
          }
        },
        render: (text, record) => {
          const { I } = record
          return <Tooltip placement="topLeft" title={I} overlayClassName={styles.ant_tooltip}>{I}</Tooltip>
        }
      },
      {
        title: '接收率',
        dataIndex: 'J',
        width: '5%',
        onHeaderCell: () => {
          return {
            style: {
              display:"none",
            }
          }
        },
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              fontWeight: 700,
              color:'#8AC6FF'
            }
          }
        },
        render: (text, record) => {
          const { J } = record
          return <Tooltip placement="topLeft" title={J} overlayClassName={styles.ant_tooltip}>{J}</Tooltip>
        }
      },
      {
        title: '检测人数',
        dataIndex: 'K',
        width: '5%',
        onHeaderCell: () => {
          return {
            style: {
              display:"none",
            }
          }
        },
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }
          }
        },
        render: (text, record) => {
          const { K } = record
          return <Tooltip placement="topLeft" title={K} overlayClassName={styles.ant_tooltip}>{K}</Tooltip>
        }
      },
      {
        title: '检测率',
        dataIndex: 'L',
        width: '5%',
        onHeaderCell: () => {
          return {
            style: {
              display:"none",
            }
          }
        },
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              fontWeight: 700,
              color:'#8AC6FF'
            }
          }
        },
        render: (text, record) => {
          const { L } = record
          return <Tooltip placement="topLeft" title={L} overlayClassName={styles.ant_tooltip}>{L}</Tooltip>
        }
      },

    ];

    return (
      <div id='cn_renliu_wrapper' className={styles.MaxBox}>
        <Table
          // generatorTimer={this.generatorTimer.bind(this)}
          rowKey={(record) => record.point_name}
          columns={columns} pagination={false}
          dataSource={datalist}
          onChange={this.onChange}
          scroll={{ x:3600,y: 1400}}
        />
        {/*<Table*/}
        {/*  // generatorTimer={this.generatorTimer.bind(this)}*/}
        {/*  rowKey={(record) => record.point_name}*/}
        {/*  columns={columnss} pagination={false}*/}
        {/*  dataSource={lastdata}*/}
        {/*  onChange={this.onChange}*/}
        {/*/>*/}
      </div>
    )
  }
}
