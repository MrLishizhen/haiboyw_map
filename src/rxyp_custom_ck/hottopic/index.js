import React, { Component } from 'react';
import { ReactDOM } from 'react';
import styles from './index.less'
import { Table, Tooltip, Icon } from 'antd';
import _ from 'lodash';
import xuhaoBg from './asstes/xuhaoBg.png'
import sheng from './asstes/sheng.png'
import jiang from './asstes/jiang.png'
//已被修改   原始文件看下面的压缩包
//hottopic_li
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

    } catch (e) {
      console.log(e)
    }
  }

  onChange = (pagination, filters, sorter, extra) => {
    try {
      let filter = [];
      if (filters.unit_type && filters.unit_type.length) {
        filter = filters.unit_type;
        this.setState({ filter });
      } else {
        this.setState({ filter: [] });
      }
    } catch (error) {
      console.log(e)
    }
  }

  // fixedBottom =(record,index)=>{
  //   // 检索每行数据，包含字段'总计'，返回固定行样式
  // if (Object.values(record).indexOf('合计') > -1) {
  //   // console.log(index)
  //   const undertake_company = 'fiexdTr'
  //   return undertake_company
  // } else {
  //   // if (index % 2 === 0) { // 隔行变色
  //   //   return 'singularRow'
  //   // } else {
  //   //   return 'quantityRow'
  //   // }
  // }
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   try {
  //     return true;
  //   } catch (error) {
  //     console.log(e)
  //   }
  // }

  render() {
    const { dataProvider } = this.props;
    // const { filter } = this.state;
    const isHasData = dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && Boolean(dataProvider[0])
    const data = isHasData ? dataProvider : [];
    // let datalist = []
    // let lastdata = []
    if (data && data.length > 0) {
      data.map((item, index) => {
        item['A'] = index + 1
      })
    }


    const columns = [
      {
        title:"",
        dataIndex: 'A',
        width: '6%',
        onHeaderCell: () => {
          return {
            style: {
              color: "#FFFFFF",
              // padding:16,

            }
          }
        },
        // key:'undertake_company',
        // fixed: 'left',
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              fontWeight: 400,
              // backgroundColor: 'red'
            }
          }
        },
        render: (text, record) => {
          const { A } = record
          return <Tooltip placement="topLeft"
          // title={undertake_company}
          overlayClassName={styles.ant_tooltip}><div style={{background:`url(${xuhaoBg}) no-repeat center`}}>{A}</div></Tooltip>
        }
      },
      {
        title:"话题名称",
        dataIndex: 'B',
        width: '18%',
        onHeaderCell: () => {
          return {
            style: {
              color: "#FFFFFF",

              // padding:16,
              // background:'red'
            }
          }
        },
        // key:'undertake_company',
        // fixed: 'left',
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              fontWeight: 400,
              // backgroundColor: '#0F2A59'
            }
          }
        },
        render: (text, record) => {
          const { B } = record
          return <Tooltip placement="topLeft"
          // title={undertake_company}
          overlayClassName={styles.ant_tooltip}>{B}</Tooltip>
        }
      },
      {
        title:"工单量",
        dataIndex: 'C',
        width: '10%',
        onHeaderCell: () => {
          return {
            style: {
              color: "#FFFFFF",

              // padding:16,
              // background:'red'
            }
          }
        },
        // key:'undertake_company',
        // fixed: 'left',
        onCell: () => {
          return {
            style: {
              height:116,
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              fontWeight: 400,
              // backgroundColor: '#0F2A59'
            }
          }
        },
        render: (text, record) => {
          const { C } = record
          return <Tooltip placement="topLeft"
          // title={undertake_company}
          overlayClassName={styles.ant_tooltip}>{C}</Tooltip>
        }
      },
      {
        title:"同比",
        dataIndex: 'D',
        width: '10%',
        onHeaderCell: () => {
          return {
            style: {
            }
          }
        },
        // key:'undertake_company',
        // fixed: 'left',
        onCell: (record) => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              fontWeight: 400,
              // backgroundColor: '#0F2A59'
              color:record.DD && record.DD == 1 ? '#FF5F5F' :'#58FF83'
            }
          }
        },
        render: (text, record) => {
          const { D,DD } = record
          return <Tooltip placement="topLeft"
          // title={undertake_company}
          overlayClassName={styles.ant_tooltip}><div><span>{D}</span><img style={{marginLeft:10,marginTop:-8}} src={DD&&DD==1 ? sheng : jiang}></img></div></Tooltip>
        }
      },
      {
        title:"办结率",
        dataIndex: 'E',
        width: '10%',
        onHeaderCell: () => {
          return {
            style: {

              // color: "#8AC6FF",
              // padding:16,
              // background:'red'
            }
          }
        },
        // key:'undertake_company',
        // fixed: 'left',
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              fontWeight: 400,

              // backgroundColor: '#0F2A59'
            }
          }
        },
        render: (text, record) => {
          const { E } = record
          return <Tooltip placement="topLeft"
          // title={undertake_company}
          overlayClassName={styles.ant_tooltip}>{E}</Tooltip>
        }
      },
      {
        title: "抽样回访",
        onHeaderCell: () => {
          return {
            style: {
              color: "#6AB8FF",
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              paddingBottom:0,
              paddingTop:12
            }
          }
        },
        children: [
          {
            title: '工单量',
            dataIndex: 'F',
            width: '12%',
            onHeaderCell: () => {
              return {
                style: {
                  // color: "#8AC6FF",
                  maxWidth: 170,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  // padding:4,

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
                  fontWeight: 400,
                }
              }
            },
            render: (text, record) => {
              const { F } = record
              return <Tooltip placement="topLeft" overlayClassName={styles.ant_tooltip}>{F}</Tooltip>
            }
          },
          {
            title: '解决率',
            dataIndex: 'G',
            width: '12%',
            onHeaderCell: () => {
              return {
                style: {
                  // color: "#8AC6FF",
                  maxWidth: 170,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  // padding:4,

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
                  fontWeight: 400,
                }
              }
            },
            render: (text, record) => {
              const { G } = record
              return <Tooltip placement="topLeft"  overlayClassName={styles.ant_tooltip}>{G}</Tooltip>
            }
          },
          {
            title: '满意率',
            dataIndex: 'H',
            width: '12%',
            onHeaderCell: () => {
              return {
                style: {
                  // color: "#8AC6FF",
                  maxWidth: 170,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  // padding:4,

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
                  fontWeight: 400,
                  // fontSize:64,
                  // color: "#8AC6FF"
                }
              }
            },
            render: (text, record) => {
              const { H } = record
              return <Tooltip placement="topLeft"  overlayClassName={styles.ant_tooltip}>{H}</Tooltip>
            }
          },
        ],
      },


    ];
    return (
      <div id='cn_rxyp_wrapper' className={styles.MaxBoxrxyp}>
        {/*<Table*/}
        {/*    style={{height:'116px'}}*/}
        {/*    columns={columns} pagination={false}*/}
        {/*/>*/}
        <Table
          // showHeader={false}
          rowKey={(record) => record.A}
          columns={columns} pagination={false}
          dataSource={data}
          onChange={this.onChange}
          scroll={{y:496}}
          // rowClassName={this.fixedBottom}
        />
      </div>

    )
  }
}
