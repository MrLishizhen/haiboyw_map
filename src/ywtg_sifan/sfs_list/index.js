import React, { Fragment } from 'react';
import { Tooltip } from 'antd';
import { isEqual } from 'lodash';
import styles from './index.less';

import moment from 'moment';

// 案件相关内容-列表
const dataList = [
];

const dataHead = [
  { name: '序号', dataIndex: 'dataIndex', style: { width: '4%' } },
  { name: '姓名', dataIndex: 'E', style: { width: '12%' } },
  { name: '性别', dataIndex: 'F', style: { width: '12%' } },
  { name: '政治面貌', dataIndex: 'G', style: { width: '12%' } },
  { name: '出生年月', dataIndex: 'H', style: { width: '12%' } },
  { name: '学历', dataIndex: 'I', style: { width: '14%' } },
  // { name: '参加工作年月', dataIndex: 'J', style: { width: '12%' } },
  { name: '现任职务', dataIndex: 'K', style: { width: '17%' } },
  // { name: '任职时间', dataIndex: 'L', style: { width: '8%' } },
  // { name: '现任职级', dataIndex: 'M', style: { width: '11%' } },
  // { name: '任职时间', dataIndex: 'N', style: { width: '12%' } },
  { name: '联系电话', dataIndex: 'O', style: { width: '16%' } }
];

/**
 * 4200*1586
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      deg: 0,
      visible: '',
      active: '',
      tableHead: dataHead,
      columns: [],
      filterData: [],
      current: 1,
      total: 0,
      saveFilter: [],
      pageSize: 20,
      order: { field: '登记日期', order: 'asc' }
    }
    this.ref = React.createRef();
  }

  componentDidMount() {
    let data = [...dataList];
    const datalist = this.getDataProvider(this.props);
    if (datalist.length) {
      data = datalist.sort((a, b) => {
        if (this.state.order.order === 'asc') {
          return moment(a['登记日期'], 'YYYY-MM-DD').diff(moment(b['登记日期'], 'YYYY-MM-DD'), 'days')
        } else {
          return moment(b['登记日期'], 'YYYY-MM-DD').diff(moment(a['登记日期'], 'YYYY-MM-DD'), 'days')
        }
      });
    }
    const columns = dataHead.map(item => {
      return { title: item.dataIndex, hidden: item.hidden, tooltip: item.tooltip, render: item.render }
    })

    // data = data.map((item, index) => {
    //   return { ...item, dataIndex: index + 1 }
    // })
    const { buffEvent = [{ type: 'click' }], style = {} } = this.props;
    let eventValue = {};

    for (let i = 0; i < buffEvent.length; i++) {
      const eventObj = buffEvent[i];
      const { type, method, bindedComponents } = eventObj;
      if (type === 'click') {
        eventValue = {
          onClick: (record) => {
            method && method({ ...record }, bindedComponents)
          }
        }
      }
    }
    this.setState({
      data,
      filterData: data,
      handlers: Object.assign({}, eventValue),
      total: data.length || 0,
      columns,
      i: -1,
      j: -1
    });

    const dom = document.getElementById('shzz-tbody');
    if (dom) {
      dom.onscroll = () => {
        const { pageSize } = this.state;

        if (pageSize / 2 * (dom.clientHeight / 11) < dom.scrollTop) {
          this.setState({ pageSize: pageSize + 20 });
        }
      }
    }
  }

  componentWillUnmount() {
    const dom = document.getElementById('shzz-tbody');
    if (dom) {
      dom.onscroll = null;
    }
  }

  // 校验dataProvider
  getDataProvider = props => {
    const { dataProvider } = props;
    if (dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && dataProvider[0] !== '') {
      return [...dataProvider]
    } else {
      return [];
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextState, this.state);
  }

  componentWillReceiveProps(nextProps) {
    console.info(nextProps);
    try {
      if (!isEqual(this.props, nextProps)) {
        let nextPropsData = this.getDataProvider(nextProps);
        // nextPropsData = nextPropsData.map((item, index) => {
        //   return { ...item, dataIndex: index + 1 }
        // });
        nextPropsData = nextPropsData.sort((a, b) => {
          if (this.state.order.order === 'asc') {
            return moment(a['登记日期'], 'YYYY-MM-DD').diff(moment(b['登记日期'], 'YYYY-MM-DD'), 'days')
          } else {
            return moment(b['登记日期'], 'YYYY-MM-DD').diff(moment(a['登记日期'], 'YYYY-MM-DD'), 'days')
          }
        });

        this.setState({
          data: nextPropsData,
          filterData: nextPropsData,
          i: -1,
          j: -1
        }, () => {
          this.onClickItem('', '');
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  // 下拉菜单
  onDropDown = type => {
    const { deg } = this.state;
    this.setState({
      deg: deg === 180 ? 0 : 180,
      visible: deg === 180 ? '' : type,
    })
  }

  onOrder = type => {
    const { order = {}, data = [], filterData = [] } = this.state;

    this.setState({
      order: { field: type, order: order.order === 'asc' ? 'desc' : 'asc' },
      data: data.sort((a, b) => {
        if (this.state.order.order === 'asc') {
          return moment(b['登记日期'], 'YYYY-MM-DD').diff(moment(a['登记日期'], 'YYYY-MM-DD'), 'days')
        } else {
          return moment(a['登记日期'], 'YYYY-MM-DD').diff(moment(b['登记日期'], 'YYYY-MM-DD'), 'days')
        }
      }),
      filterData: filterData.sort((a, b) => {
        if (this.state.order.order === 'asc') {
          return moment(b['登记日期'], 'YYYY-MM-DD').diff(moment(a['登记日期'], 'YYYY-MM-DD'), 'days')
        } else {
          return moment(a['登记日期'], 'YYYY-MM-DD').diff(moment(b['登记日期'], 'YYYY-MM-DD'), 'days')
        }
      })
    });
  }

  /**
  * 搜索当前表格中的所有字段，进行模糊匹配
  *
  */
  filterListSearch = (value, list) => {
    const inputValue = value ? value.trim() : '';
    const currList = Array.isArray(list) ? list : [];
    let filterList = [...list];
    if (inputValue) {
      filterList = currList.filter(item => {
        for (let key in item) {
          const str = `${item[key]}`;
          if (str.indexOf(inputValue) !== -1) {
            return item;
          }
        }
      });
    }
    return filterList;
  }

  // 当前选中的文本
  onClickItem = (record, name) => {
    const { deg, handlers, tableHead = [], data = [], saveFilter = [] } = this.state;
    const { style } = this.props;
    // const btype = style && style.btype && style.btype.length ? style.btype : [];
    // const stype = style && style.stype && style.stype.length ? style.stype : [];
    const query = style && style.query ? style.query : { all: '' };
    const type = record.dataIndex || '';
    let list = [...data];
    let flag = false;

    // if (btype && btype.length) {
    //   list = this.filterData(list, btype, false);
    //   flag = true;
    // }
    // if (stype && stype.length) {
    //   list = this.filterData(list, stype, false);
    //   flag = true;
    // }
    if (query) {
      if (query && query.all) {
        list = this.filterData(list, tableHead.filter(item => !item.hidden && item.dataIndex !== 'dataIndex').map(item => ({ type: item.dataIndex, value: query.all })), false);
        flag = true;
      } else if (query) {
        const keys = Object.keys(query);

        if (keys && keys[0] && query[keys[0]]) {
          list = this.filterData(list, [{ type: keys[0], value: query[keys[0]] }], false);
          flag = true;
        }
      }
    }

    let filterValueList = [...saveFilter];
    if (name) {
      if (name === '全部') {
        filterValueList = filterValueList.filter(item => item.type !== type)
      } else {
        filterValueList = [...filterValueList, { type, value: name }];
      }
    }

    if (filterValueList && filterValueList.length > 0) {
      list = this.filterData(list, filterValueList, true);
      flag = true;
    }

    this.setState({
      deg: deg === 180 ? 0 : 180,
      filterData: flag ? list : data,
      saveFilter: filterValueList,
      visible: deg === 180 ? '' : type
    });
    handlers && handlers.onClick && handlers.onClick({ filterName: type, filterValue: name });
  }

  // 当前选中的行
  onActiveLine = record => {
    const { active, handlers } = this.state;
    this.setState({
      active: active === record.id ? '' : record.id
    })
    if (active !== record.id) {
      handlers.onClick && handlers.onClick({ ...record });
    }
  }

  // 更改分页
  // onChangePagination = page => {
  //   const { data = [] } = this.state;
  //   const list = data.slice(10*(Number.parseFloat(page) - 1));
  //   this.setState({
  //     current: page,
  //     filterData: list,
  //     total: data.length
  //   })
  // }

  // 关闭
  onClose = () => {
    this.setState({
      deg: 0,
      visible: ''
    });
  }

  tooltip = (heads, data, title) => {
    if (heads && data) {
      return (
        <div className={styles.pop_box}>
          <ul>
            {heads.map(item => {
              return (
                (Array.isArray(title) ? title.includes(item.dataIndex) : item.dataIndex === title) && <li key={item.dataIndex}>{item.name}：{data[item.dataIndex] || '-'}</li>
              );
            })}
          </ul>
        </div>
      );
    }

    return null;
  }

  tdClick = (i, j) => {
    this.setState({ i, j });
  }

  filterData = (data, filter = [], and = true) => {
    if (filter && filter.length > 0) {
      return data.filter(item => {
        let cnt = 0;

        filter.forEach(f => {
          if ((and && item[f.type] === f.value) || (!and && item[f.type] && item[f.type].indexOf(f.value) !== -1)) {
            cnt += 1;
          }
        });
        if (and && cnt === filter.length) {
          return true;
        } else if (!and && cnt > 0) {
          return true;
        }

        return false;
      });
    }

    return data;
  }

  render() {
    const { visible, deg, data = [], active, tableHead = [], columns = [], filterData = [], current = 1, total = 0, pageSize } = this.state;
    const newData = Array.isArray(filterData) && filterData.map((item, index) => {
      return { ...item, id: `${item.name}-${index}` }
    });

    return (
      <div ref={this.ref} style={{ width: '100%', height: '100%', position: 'relative' }} className={styles.table_layout_case}>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              {
                Array.isArray(tableHead) && tableHead.map((item, index) => {
                  let children = [];
                  let count = 0;
                  if (item.children) {
                    newData.map(key => {
                      if (children.indexOf(key[item.dataIndex]) === -1) {
                        children.push(key[item.dataIndex]);
                      }
                    })
                  }
                  children = children.map(e => {
                    let count = 0;
                    newData.map(k => {
                      if (k[item.dataIndex] === e) {
                        count++;
                      }
                    })
                    return { name: e, count }
                  })
                  let sum = 0;
                  children.map(item => {
                    sum += item.count;
                  })
                  const color = children.length ? 'rgb(34, 255, 189)' : '#00F0FF';

                  return (
                    !item.hidden ?
                      <td key={index} style={{ color: color, ...item.style }}>
                        <div className={styles.line_flex} onClick={this.state.order.field === item.name ? this.onOrder.bind(this, item.name) : this.onDropDown.bind(this, item.name)}>
                          <div>{item.name}</div>
                          {
                            children.length || this.state.order.field === item.name ? <div
                              className={styles.triangle}
                              style={{
                                transform: visible === item.name ? `rotate(${deg}deg)` : this.state.order.field === item.name && this.state.order.order === 'desc' ? 'rotate(180deg)' : 'rotate(0deg)',
                                borderBottom: `20px solid ${color}`
                              }}
                            ></div> : null
                          }
                        </div>
                        {
                          (visible === item.name) && children.length ? <div className={styles.drop_layout}>
                            <ul>
                              <li style={{ color: '#fff' }} onClick={this.onClickItem.bind(this, item, '全部')}>{`全部 ${sum}`}</li>
                              {
                                children.map((ele, i) => {
                                  return <li key={i} onClick={this.onClickItem.bind(this, item, ele.name)}>
                                    <span style={{ color: '#fff' }}>{`${ele.name ? ele.name : '空'}`}</span>
                                    <span style={{ color: 'rgb(29, 238, 255)' }}>{` (${ele.count})`}</span>
                                  </li>
                                })
                              }
                            </ul>
                          </div> : null
                        }
                      </td> : null
                  )
                })
              }
            </tr>
          </thead>
          <tbody id='shzz-tbody' onClick={this.onClose}>
            {
              [...newData].slice(0, pageSize).map((item, i) => {
                const active_line = item.id === active ? styles.active_line : styles.line;

                return (
                  <tr key={i} className={active_line}>
                    {
                      columns.map((key, j) => {
                        const active_color = (item[key.title] === '在岗') || (item[key.title] === '运输中') ? styles.stage_color_act :
                          (item[key.title] === '离岗') || (item[key.title] === '停泊') ? styles.stage_color : '';

                        return (
                          !key.hidden ?
                            <td key={j} className={active_color} style={{ ...tableHead[j].style }} onClick={key.tooltip ? this.tdClick.bind(this, i, j) : undefined}>
                              {/* {key.tooltip ?
                                <Tooltip
                                  overlayClassName={[styles.pop_card_class, styles[`drop_down_${j}`]].join(' ')}
                                  placement='top'
                                  title={this.tooltip(dataHead, item, key.title)}
                                  trigger='click'
                                  getPopupContainer={() => { if (this.ref.current) return this.ref.current; return document.body; }}
                                >
                                  {item[key.title]}
                                </Tooltip> :
                                item[key.title]
                              } */}
                              <TdItem dataHead={dataHead} item={item} dataKey={key} i={i} j={j} parentRef={this.ref} tooltip={this.state.i === i && this.state.j === j} tooltipFunction={this.tooltip} />
                            </td> : null
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        {/* <div className={styles.pagination_layout}>
          <Pagination
            size='small'
            total={total}
            current={current}
            pageSize={10}
            onChange={this.onChangePagination}
          />
        </div> */}
      </div>
    );
  }
}

class TdItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextState, this.state) || !_.isEqual(nextProps, this.props);
  }

  render() {
    const { visible } = this.state;
    const { dataHead, item, dataKey, i, j, parentRef, tooltip, tooltipFunction } = this.props;
    const dom = document.getElementById('shzz-tbody');
    let top = 0;
    if (dom) {
      const rowHeight = dom.clientHeight / 10;
      const scrollTop = dom.scrollTop;
      top = 144 + rowHeight * (i + 1) - scrollTop;
      if (top > dom.clientHeight) {
        top = top - rowHeight * 2
      }
    }

    return (
      <Fragment>
        {dataKey.tooltip ?
          // <Tooltip
          //   overlayClassName={[styles.pop_card_class, styles[`drop_down_${j}`]].join(' ')}
          //   placement='top'
          //   title={tooltipFunction(dataHead, item, dataKey.title)}
          //   trigger='hover'
          //   getPopupContainer={() => { if (parentRef.current) return parentRef.current; return document.body; }}
          // >
          //   {typeof dataKey.render === 'function' ? dataKey.render(item[dataKey.title]) : item[dataKey.title]}
          // </Tooltip> :
          <div onMouseEnter={() => this.setState({ visible: true })} onMouseLeave={() => this.setState({ visible: false })} className={styles.pop_card_class_wrapper}>
            {visible &&
              <div className={[styles.pop_card_class, styles[`drop_down_${j}`]].join(' ')} style={{ top }}>
                {tooltipFunction(dataHead, item, ['saturationQuantity'])}
              </div>
            }
            {typeof dataKey.render === 'function' ? dataKey.render(item[dataKey.title]) : item[dataKey.title]}
          </div> :
          <Fragment>
            {typeof dataKey.render === 'function' ? dataKey.render(item[dataKey.title], item) : dataKey.title === 'dataIndex' ? `${i + 1}` : item[dataKey.title]}
            {dataKey.title === 'O' &&
              <Fragment>
                <div className={[styles['phone-icon'], styles['phone-call']].join(' ')}></div>
                <div className={[styles['phone-icon'], styles['phone-off-disabled']].join(' ')}></div>
              </Fragment>
            }
          </Fragment>
        }
      </Fragment>
    );
  }
}

export default Index;
