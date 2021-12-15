import React from 'react';
import { isEqual } from 'lodash';
import { Pagination, Tooltip } from 'antd';
import styles from './index.less';

// 案件相关内容-列表
const dataList = [
];

const dataHead = [
  { name: '序号', dataIndex: 'dataIndex', style: { width: '4%' } },
  { name: '街道', dataIndex: 'streetName', style: { width: '15%' } },
  { name: '商业综合体及重要景点', dataIndex: 'importantPoint', style: { width: '15%' } },
  { name: '实时客流数', dataIndex: 'passengerFlow', style: { width: '16%' } },
  { name: '昨比', dataIndex: 'zuobi', style: { width: '16%' } },
  { name: '环比', dataIndex: 'huanbi', style: { width: '16%' } },
  { name: '同比', dataIndex: 'tongbi', style: { width: '16%' } }
]

/**
 * 疾控中心table
 * _cnyw_grid_list
 * 6182*1724
 *
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
      saveFilter: []
    }
    this.ref = React.createRef();
  }

  componentDidMount() {
    let data = [...dataList];
    const datalist = this.getDataProvider(this.props);
    if (datalist.length) {
      data = datalist;
    }
    const columns = dataHead.map(item => {
      return { title: item.dataIndex, hidden: item.hidden, tooltip: item.tooltip }
    })

    data = data.map((item, index) => {
      return { ...item, dataIndex: index + 1 }
    })
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
      columns
    })
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
        nextPropsData = nextPropsData.map((item, index) => {
          return { ...item, dataIndex: index + 1 }
        })
        this.setState({
          data: nextPropsData,
          filterData: nextPropsData
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
    const { style } = this.props;
    const text = name;
    const type = record.dataIndex || '';
    const { deg, handlers, data, saveFilter = [] } = this.state;

    const queryString = style && style.queryString ? style.queryString : '';
    const filterStyleList = style && style.filter && style.filter.length ? style.filter : [];
    let filterValueList = [...saveFilter];
    filterValueList = filterValueList.filter(item => item.type !== type);

    if (type && text) {
      filterValueList.push({ type, value: text });
    }

    let list = data;
    // 根据筛选条件过滤
    filterValueList.map(ele => {
      if (ele.value.includes('全部')) {
        list = [...list];
        return;
      }
      list = list.filter(item => item[ele.type].toString().trim() === ele.value)
    })
    // 根据上行的tab过滤
    const bigTypes = filterStyleList.map(e => e.value.toString().trim());
    if (bigTypes && bigTypes.length > 0) {
      list = list.filter(e => bigTypes.includes(e.btype.toString().trim()));
    }
    // 根据queryString过滤
    list = this.filterListSearch(queryString, list);
    list = list.map((item, index) => {
      return { ...item, dataIndex: index + 1 }
    })
    this.setState({
      deg: deg === 180 ? 0 : 180,
      visible: deg === 180 ? '' : type,
      filterData: list,
      saveFilter: filterValueList
    })
    handlers && handlers.onClick && handlers.onClick({ filterName: record, filterValue: text });
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
                item.dataIndex === title && <li key={item.dataIndex}>{item.name}：{data[item.dataIndex] || '-'}</li>
              );
            })}
          </ul>
        </div>
      );
    }

    return null;
  }

  render() {
    const { visible, deg, data = [], active, tableHead = [], columns = [], filterData = [], current = 1, total = 0 } = this.state;
    const newData = Array.isArray(filterData) && filterData.map((item, index) => {
      return { ...item, id: `${item.name}-${index}` }
    })

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
                        <div className={styles.line_flex} onClick={this.onDropDown.bind(this, item.name)}>
                          <div>{item.name}</div>
                          {
                            children.length ? <div
                              className={styles.triangle}
                              style={{
                                transform: visible === item.name ? `rotate(${deg}deg)` : 'rotate(0deg)',
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
          <tbody onClick={this.onClose}>
            {
              newData.map((item, index) => {
                const active_line = item.id === active ? styles.active_line : styles.line;

                return (
                  <tr key={index} className={active_line} >
                    {
                      columns.map((key, i) => {
                        const active_color = (item[key.title] === '在岗') || (item[key.title] === '运输中') ? styles.stage_color_act :
                          (item[key.title] === '离岗') || (item[key.title] === '停泊') ? styles.stage_color : '';
                        
                        return (
                          !key.hidden ?
                            <td key={i} className={active_color} style={{ ...tableHead[i].style }}>
                              {key.tooltip ?
                                <Tooltip
                                  overlayClassName={[styles.pop_card_class, styles[`drop_down_${i}`]].join(' ')}
                                  placement='top'
                                  title={this.tooltip(dataHead, item, key.title)}
                                  trigger='click'
                                  getPopupContainer={() => { if (this.ref.current) return this.ref.current; return document.body; }}
                                >
                                  {item[key.title]}
                                </Tooltip> :
                                item[key.title]
                              }
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

export default Index;
