import React from 'react';
import { isEqual } from 'lodash';
import { Pagination, Tooltip } from 'antd';
import styles from './index.less';

// function tooltip(data) {
//   if (data) {
//     return (
//       <div className={styles.pop_box}>
//         <ul>
//           <li>分类：{data.type}</li>
//           <li>来电时间：{data.time}</li>
//           <li>来电类型（一级分类）：{data.cell}</li>
//           <li>来电类型（二级分类）：{data.callType}</li>
//           <li>姓名：{data.name}</li>
//           <li>联系方式：{data.phone}</li>
//           <li>内容：{data.content}</li>
//           <li>状态：{data.status}</li>
//           <li>反馈结果：{data.feedback}</li>
//           <li>标签：{data.label}</li>
//         </ul>
//       </div>
//     );
//   }
//   return null;
// }
function tooltip(data) {
  if (data) {
    return (
      <div className={styles.pop_box}>
        <ul>
          <li>分类：{data.A}</li>
          <li>来电时间：{data.B}</li>
          <li>来电类型（一级分类）：{data.C}</li>
          <li>来电类型（二级分类）：{data.D}</li>
          <li>姓名：{data.E}</li>
          <li>联系方式：{data.F}</li>
          <li>内容：{data.G}</li>
          <li>状态：{data.H}</li>
          <li>反馈结果：{data.I}</li>
          <li>标签：{data.J}</li>
        </ul>
      </div>
    );
  }
  return null;
}

const columns = [
  { title: 'F', style: { width: 330 } },
  { title: 'E', style: { width: 330 } },
  { title: 'time', style: { width: 330 } },
  { title: 'O', style: { width: 330 } },
  { title: 'A', style: { width: 330 } }
];

// const columns2 = [
//   { title: 'name', style: { width: 550 } },
//   { title: 'type', style: { width: 550 } },
//   { title: 'phone', style: { width: 550 } }
// ];
const columns2 = [
  { title: 'A', style: { width: 550 } },
  { title: 'B', style: { width: 550 } },
  { title: 'C', style: { width: 550 } }
];

// const columns3 = [
//   { title: 'type', style: { width: 326 }, tooltip },
//   { title: 'time', style: { width: 326 }, tooltip },
//   { title: 'cell', style: { width: 326 }, tooltip },
//   { title: 'content', style: { width: 326 }, tooltip },
//   { title: 'status', style: { width: 326 }, tooltip }
// ];
const columns3 = [
  { title: 'A', style: { width: 276.6 }, tooltip: false },
  { title: 'B', style: { width: 276.6 }, tooltip: false },
  { title: 'C', style: { width: 276.6 }, tooltip: false },
  { title: 'D', style: { width: 276.6 }, tooltip: false },
  { title: 'G', style: { width: 276.6 }, tooltip },
  { title: 'H', style: { width: 276.6 }, tooltip: false }
];

// const columns4 = [
//   { title: 'type' },
//   { title: 'number' },
//   { title: 'total' },
//   { title: 'status' }
// ];
const columns4 = [
  { title: 'A' },
  { title: 'B' },
  { title: 'C' },
  { title: 'D' }
];

// const columns5 = [
//   { title: 'name', style: { width: 550 } },
//   { title: 'total', style: { width: 550 } },
//   { title: 'unit', style: { width: 550 } }
// ];
const columns5 = [
  { title: 'A', style: { width: 550 } },
  { title: 'B', style: { width: 550 } },
  { title: 'C', style: { width: 550 } }
];

const columns6 = [
  { title: 'A', style: { width: 250 } },
  { title: 'B', style: { width: 858 } },
  { title: 'C', style: { width: 300 } },
  { title: 'D', style: { width: 250 } }
];

const dataHead = [
  { name: '案件名称', dataIndex: 'F', style: { width: 330 } },
  { name: '案件类型', dataIndex: 'E', children: [], style: { width: 330 } },
  { name: '发现时间', dataIndex: 'time', children: [], style: { width: 330 } },
  { name: '发现位置', dataIndex: 'O', style: { width: 330 } },
  { name: '处置阶段', dataIndex: 'A', children: [], style: { width: 330 } }
]

// const dataHead2 = [
//   { name: '姓名', dataIndex: 'name', style: { width: 557 } },
//   { name: '岗位', dataIndex: 'type', children: [], style: { width: 557 } },
//   { name: '电话', dataIndex: 'phone', style: { width: 557 } }
// ];
const dataHead2 = [
  { name: '姓名', dataIndex: 'A', style: { width: 557 } },
  { name: '岗位', dataIndex: 'B', children: [], style: { width: 557 } },
  { name: '电话', dataIndex: 'C', style: { width: 557 } }
];

// const dataHead3 = [
//   { name: '分类', dataIndex: 'type', children: [], style: { width: 332 } },
//   { name: '来电时间', dataIndex: 'time', style: { width: 332 } },
//   { name: '来电类型', dataIndex: 'cell', children: [], style: { width: 332 } },
//   { name: '内容', dataIndex: 'content', style: { width: 332 } },
//   { name: '状态', dataIndex: 'status', children: [], style: { width: 332 } }
// ];
const dataHead3 = [
  { name: '分类', dataIndex: 'A', children: [], style: { width: 276.6 } },
  { name: '来电时间', dataIndex: 'B', style: { width: 276.6 } },
  { name: '一级分类', dataIndex: 'C', children: [], style: { width: 276.6 } },
  { name: '二级分类', dataIndex: 'D', children: [], style: { width: 276.6 } },
  { name: '内容', dataIndex: 'G', style: { width: 276.6 } },
  { name: '状态', dataIndex: 'H', children: [], style: { width: 276.6 } }
];

// const dataHead4 = [
//   { name: '车辆型号', dataIndex: 'type', children: [] },
//   { name: '车牌', dataIndex: 'number' },
//   { name: '乘员数', dataIndex: 'total' },
//   { name: '状态', dataIndex: 'status', children: [] }
// ]
const dataHead4 = [
  { name: '车辆型号', dataIndex: 'A', children: [] },
  { name: '车牌', dataIndex: 'B' },
  { name: '乘员数', dataIndex: 'C' },
  { name: '状态', dataIndex: 'D', children: [] }
]

// const dataHead5 = [
//   { name: '物资名称', dataIndex: 'name', style: { width: 557 } },
//   { name: '库存数量', dataIndex: 'total', style: { width: 557 } },
//   { name: '统计单位', dataIndex: 'unit', children: [], style: { width: 557 } }
// ]
const dataHead5 = [
  { name: '物资名称', dataIndex: 'A', style: { width: 557 } },
  { name: '库存数量', dataIndex: 'B', style: { width: 557 } },
  { name: '统计单位', dataIndex: 'C', children: [], style: { width: 557 } }
]

const dataHead6 = [
  { name: '排名', dataIndex: 'A', style: { width: 250 } },
  { name: '话题', dataIndex: 'B', style: { width: 858 } },
  { name: '最高热度', dataIndex: 'C', style: { width: 300 } },
  { name: '最高排名', dataIndex: 'D', style: { width: 250 } }
]

// 案件相关内容-列表
const dataList = [
  // { name: '名称', type: '疾病类1', time: '2020/08/05', address: '新泾镇社区', phase: '核查' },
  // { name: '名称2', type: '疾病类3', time: '2020/08/05', address: '新泾镇社区', phase: '核查' },
  // { name: '名称', type: '疾病类4', time: '2020/08/04', address: '新泾镇社区', phase: '核查' },
  // { name: '名称', type: '疾病类5', time: '2020/08/05', address: '新泾镇社区', phase: '核查' },
  // { name: '名称', type: '疾病类6', time: '2020/08/05', address: '新泾镇社区', phase: '核查' },
  // { name: '名称2', type: '疾病类3', time: '2020/08/05', address: '新泾镇社区', phase: '核查' },
  // { name: '名称', type: '疾病类7', time: '2020/08/04', address: '新泾镇社区', phase: '核查' },
  // { name: '名称', type: '疾病类', time: '2020/08/05', address: '新泾镇社区', phase: '核查' },
  // { name: '名称', type: '疾病类', time: '2020/08/05', address: '新泾镇社区', phase: '核查' },
  // { name: '名称2', type: '疾病类3', time: '2020/08/05', address: '新泾镇社区', phase: '核查' },
  // { name: '名称', type: '疾病类', time: '2020/08/04', address: '新泾镇社区', phase: '核查' },
  // { name: '名称', type: '疾病类', time: '2020/08/05', address: '新泾镇社区', phase: '核查' },
  // { name: '名称', type: '疾病类', time: '2020/08/05', address: '新泾镇社区', phase: '核查' }
];

// 资源保障-list
const dataList2 = [
  // { 'name': '赵文穗', 'type': '领导值班', 'phone': '' },
  // { 'name': '王苇沁', 'type': '业务值班', 'phone': '' },
  // { 'name': '蔡蔚', 'type': '专家组', 'phone': '' },
  // { 'name': '唐传喜', 'type': '专家组', 'phone': '' },
  // { 'name': '王震宇', 'type': '小分队', 'phone': '' },
  // { 'name': '刘晓祥', 'type': '小分队', 'phone': '' },
  // { 'name': '孙振海', 'type': '消毒', 'phone': '' },
  // { 'name': '梁卫久', 'type': '消毒', 'phone': '' },
  // { 'name': '王建雄', 'type': '驾驶员', 'phone': '' }
];

// 9595电话热线案件
const dataList3 = [
  // { 'type': '咨询', 'time': '8:00', 'cell': '个人', 'callType': '个人', 'name': '匿名', 'phone': '123456', 'content': '咨询集中隔离政策', 'status': '完成', 'feedback': '已告知相关政策', 'label': '新冠' },
  // { 'type': '咨询', 'time': '9:00', 'cell': '个人', 'callType': '个人', 'name': '匿名', 'phone': '123456', 'content': '咨询核酸检测', 'status': '完成', 'feedback': '已告知同仁医院检测', 'label': '新冠' }
];

const dataList4 = [
  // { 'type': '汇众', 'number': '沪J13050', 'total': '8', 'status': '待命' },
  // { 'type': '大通', 'number': '沪AUX115', 'total': '6', 'status': '出车' },
  // { 'type': '别克', 'number': '沪DQ0697', 'total': '7', 'status': '待命' },
  // { 'type': '荣威', 'number': '沪AFQ2110', 'total': '4', 'status': '待命' }
];

// 物资保障
const dataList5 = [
  // { 'name': '外科口罩', 'total': '8300', 'unit': '个' },
  // { 'name': '外科帽子', 'total': '2870', 'unit': '个' },
  // { 'name': '杜邦二级防护服', 'total': '569', 'unit': '件' },
  // { 'name': '一级手术衣', 'total': '879', 'unit': '件' },
  // { 'name': '橡胶外科手套', 'total': '425', 'unit': '副' },
  // { 'name': '护目镜（循环消毒使用）', 'total': '163', 'unit': '个' },
  // { 'name': 'N95口罩', 'total': '2370', 'unit': '个' },
  // { 'name': '面屏', 'total': '300', 'unit': '个' },
  // { 'name': '二级防护鞋套', 'total': '260', 'unit': '双' },
  // { 'name': '一级防护鞋套', 'total': '300', 'unit': '双' },
  // { 'name': '优洁手消毒液', 'total': '100', 'unit': '瓶' },
  // { 'name': '采样转运箱', 'total': '4', 'unit': '个' },
  // { 'name': 'B级转运箱', 'total': '6', 'unit': '个' }
];

const dataList6 = [];

/**
 * 疾控中心table
 * _cnyw_dropdown_caselist
 * _cnyw_dropdown_reslist
 * _cnyw_dropdown_reslist2
 * _cnyw_dropdown_phonelist
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
      columns: columns,
      filterData: [],
      current: 1,
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
      handlers: Object.assign({}, eventValue)
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

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      const nextPropsData = this.getDataProvider(nextProps);
      this.setState({
        data: nextPropsData,
        filterData: nextPropsData
      })
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

  // 当前选中的文本
  onClickItem = (record, name) => {
    const text = name;
    const type = record.dataIndex || '';
    const { deg, handlers, data, filterData, saveFilter = [] } = this.state;

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

    this.setState({
      deg: deg === 180 ? 0 : 180,
      visible: deg === 180 ? '' : type,
      filterData: list,
      saveFilter: filterValueList
    })
    // handlers.onClick && handlers.onClick({ filterName: record, filterValue: text });
  }

  // 关闭
  onClose = () => {
    this.setState({
      deg: 0,
      visible: ''
    })
  }

  // 当前选中的行
  onActiveLine = record => {
    const { active, handlers } = this.state;
    this.setState({
      active: active === record.ID ? '' : record.ID
    })
    // if (active !== record.ID) {
    handlers.onClick && handlers.onClick({ data: { ...record }, active: active !== record.ID });
    // }
  }

  onOpen = () => {

  }

  render() {
    const { visible, deg, data = [], active, tableHead = [], columns = [], filterData = [], current = 1 } = this.state;
    // const newData = Array.isArray(filterData) && filterData.map((item, index) => {
    //   return { ...item, ID: `${item.name}-${index}` }
    // })

    return (
      <div ref={this.ref} style={{ width: '100%', height: '100%', position: 'relative' }} className={styles.table_layout_case}>
        <table style={{ width: '100%', height: '100%' }}>
          <thead>
            <tr>
              {
                Array.isArray(tableHead) && tableHead.map((item, index) => {
                  let children = [];
                  if (item.children) {
                    data.map(key => {
                      if (children.indexOf(key[item.dataIndex]) === -1) {
                        children.push(key[item.dataIndex])
                      }
                    })
                  }

                  return (
                    <th key={index} style={item.style}>
                      <div className={styles.line_flex} onClick={this.onDropDown.bind(this, item.name)}>
                        <div>{item.name}</div>
                        {
                          children.length ? <div
                            className={styles.triangle}
                            style={{ transform: visible === item.name ? `rotate(${deg}deg)` : 'rotate(0deg)' }}></div> : null
                        }
                      </div>
                      {
                        (visible === item.name) && children.length ? <div className={styles.drop_layout}>
                          <ul>
                            <li onClick={this.onClickItem.bind(this, item, '全部')}>全部</li>
                            {
                              children.map((ele, i) => {
                                return <li key={i} onClick={this.onClickItem.bind(this, item, ele)}>{ele}</li>
                              })
                            }
                          </ul>
                        </div> : null
                      }
                    </th>
                  )
                })
              }
            </tr>
          </thead>
          <tbody onClick={this.onClose}>
            {
              filterData.map((item, index) => {
                const active_line = item.ID === active ? styles.active_line : styles.line;

                return (
                  <tr key={index} id={`tr-${item.ID}`} className={active_line} onClick={this.onActiveLine.bind(this, item)}>
                    {
                      columns.map((column, i) => {
                        const active_color = (item[column.title] === '在岗') || (item[column.title] === '运输中') ? styles.stage_color_act :
                          (item[column.title] === '离岗') || (item[column.title] === '停泊') ? styles.stage_color : '';

                        return (
                          <td key={i} className={active_color} style={column.style}>
                            {column.tooltip ?
                              <Tooltip
                                overlayClassName={styles.pop_card_class}
                                placement='top'
                                title={column.tooltip(item)}
                                trigger='click'
                                getPopupContainer={() => { const dom = document.getElementById(`tr-${item.ID}`); if (dom) return dom; if (this.ref.current) return this.ref.current; return document.body; }}
                                onVisibleChange={(visible) => console.info(visible)}
                              >
                                <span>{item[column.title]}</span>
                              </Tooltip> :
                              <span>{item[column.title]}</span>
                            }
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Index;
