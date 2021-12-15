import React from 'react';
import { isEqual } from 'lodash';
import { Pagination, Tooltip } from 'antd';
import _ from 'lodash';
import styles from './index.less';

// 案件相关内容-列表
const dataList = [
  { 'btype': '社会管理类', 'stype': '食品药品安全', 'subclass': '安全管理', 'point': '医疗器械管理', 'zrdepartment': '街镇园区', 'basis': '', 'cztime': '15天' },
  { 'btype': '社会管理类', 'stype': '食品药品安全', 'subclass': '安全管理', 'point': '化妆品管理', 'zrdepartment': '街镇园区', 'basis': '', 'cztime': '15天' },
  { 'btype': '社会管理类', 'stype': '食品药品安全', 'subclass': '安全管理', 'point': '资质认证', 'zrdepartment': '街镇园区', 'basis': '', 'cztime': '15天' },
  { 'btype': '社会管理类', 'stype': '食品药品安全', 'subclass': '广告审批', 'point': '广告审批', 'zrdepartment': '街镇园区', 'basis': '', 'cztime': '15天' },
  { 'btype': '社会管理类', 'stype': '食品药品安全', 'subclass': '其他', 'point': '其他', 'zrdepartment': '街镇园区', 'basis': '', 'cztime': '15天' }
];

const dataHead = [
  { name: '序号', dataIndex: 'dataIndex', style: { width: '4%' } },
  { name: '大类', dataIndex: 'btype', hidden: true },
  { name: '二级分类', dataIndex: 'stype', hidden: true },
  { name: '子类', dataIndex: 'subclass', children: [], style: { width: '10%' } },
  { name: '管理要点', dataIndex: 'point', children: [], style: { width: '10%' } },
  { name: '承办单位', dataIndex: 'zrdepartment', children: [], style: { width: '10%' } },
  { name: '法律依据', dataIndex: 'basis', tooltip: true, style: { width: '50%' } },
  { name: '处置时限（自然日）', dataIndex: 'cztime', children: [], style: { width: '14%' } }
]

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
    // 获取数据
    let data = [...dataList];
    const datalist = this.getDataProvider(this.props);
    if (datalist && datalist.length) {
      data = [...datalist]
    }
    // if (data) {
    //   data = data.map((item, index) => {
    //     return { ...item, dataIndex: index + 1 }
    //   });
    // }

    // 构造表头
    const columns = dataHead.map(item => {
      return { title: item.dataIndex, hidden: item.hidden, tooltip: item.tooltip }
    });

    // 构造事件
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

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextState, this.state);
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

  componentWillReceiveProps(nextProps) {
    console.info(nextProps);
    try {
      if (!isEqual(this.props, nextProps)) {
        let nextPropsData = this.getDataProvider(nextProps);
        // nextPropsData = nextPropsData.map((item, index) => {
        //   return { ...item, dataIndex: index + 1 }
        // });
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

  // 关闭
  onClose = () => {
    this.setState({
      deg: 0,
      visible: ''
    });
  }

  tooltip = (heads, data, index, title) => {
    if (heads && data) {
      return (
        <div className={styles.pop_box}>
          <ul>
            {heads.map(item => {
              return (
                item.dataIndex === title && <li key={item.dataIndex}>{item.name}：{item.dataIndex === 'dataIndex' ? index : data[item.dataIndex] || '-'}</li>
              );
            })}
          </ul>
        </div>
      );
    }

    return null;
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
    const { active, visible, deg, filterData = [], saveFilter = [], tableHead = [], columns = [] } = this.state;
    const newData = this.filterData(filterData, saveFilter).map((item, index) => {
      return { ...item, id: `${item.name}-${index}` }
    });

    return (
      <div ref={this.ref} style={{ width: '100%', height: '100%' }} className={styles.table_layout_case}>
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
                  });
                  let sum = 0;
                  children.map(item => {
                    sum += item.count;
                  });
                  // const color = children.length ? 'rgb(34, 255, 189)' : '#00F0FF';
                  const color = '#36CAFF';

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
                            key.tooltip ?
                              <Tooltip
                                overlayClassName={styles.pop_card_class}
                                placement='bottom'
                                title={this.tooltip(dataHead, item, index + 1, key.title)}
                                trigger='click'
                                getPopupContainer={() => { if (this.ref.current) return this.ref.current; return document.body; }}
                              >
                                <td key={i} className={active_color} style={{ ...tableHead[i].style }}>
                                  {key.title === 'dataIndex' ? index + 1 : item[key.title]}
                                </td>
                              </Tooltip> :
                              <td key={i} className={active_color} style={{ ...tableHead[i].style }}>
                                {key.title === 'dataIndex' ? index + 1 : item[key.title]}
                              </td> :
                            null
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
