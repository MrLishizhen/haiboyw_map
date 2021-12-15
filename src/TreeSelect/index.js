import React from 'react';
import { isEqual } from 'lodash';
import { Tree, Icon } from 'antd';
import car from './img/car.png';
import floor from './img/floor.png';
import near from './img/near.png';
import company from './img/company.png';
import savewater from './img/savewater.png';
import area from './img/area.png';
import getwater from './img/getwater.png';
import community from './img/community.png';
import nointernet from './img/nointernet.png';
import internet from './img/internet.png';
import usecar from './img/usecar.png';
import carport from './img/carport.png';
import firecopy from './img/firecopy.png';
import fire from './img/fire.png';

const imgList = [
  { name: '区消防救援站', icon: area },
  { name: '附近消防站', icon: near },
  { name: '社区微型消防站', icon: community },
  { name: '企业微型消防站', icon: company },
  { name: '地上消火栓', icon: floor },
  { name: '智能消火栓', icon: firecopy },
  { name: '取水点', icon: getwater },
  { name: '执勤车辆', icon: usecar },
  { name: '出动车辆', icon: car },
  { name: '物联网', icon: internet },
  { name: '未联网', icon: nointernet },
  { name: '智能车棚', icon: carport },
  { name: '积水点位', icon: savewater },
  { name: '历史火警', icon: fire },
]

import styles from './index.less';

const GRIDFLAG = "GRIDFLAG";
const SHOWNSTATE = "SHOWNSTATEARRAY";

const { TreeNode } = Tree;

const dataList = [
  { node: '消防机构', key: '消防机构' },
  { node: '区消防救援站', key: '消防机构', name: 'quxiaofangjiuyuanzhan', checked: false },
  { node: '附近消防站', key: '消防机构', name: 'fujinxiaofangzhan', checked: false },
  { node: '社区微型消防站', key: '消防机构', name: 'shequweixingxiaofangzhan', checked: false },
  { node: '企业微型消防站', key: '消防机构', name: 'qiyeweixingxiaofangzhan', checked: false },
  { node: '消防水源', key: '消防水源' },
  { node: '地上消火栓', key: '消防水源', name: 'dishangxiaohuoshuan', checked: false },
  { node: '智能消火栓', key: '消防水源', name: 'zhinengxiaohuoshuan', checked: false },
  // { node: '取水点', key: '消防水源', name: 'qushuidian', checked: false },
  { node: '消防车辆', key: '消防车辆' },
  { node: '执勤车辆', key: '消防车辆', name: 'zhiqincheliang', checked: false },
  { node: '出动车辆', key: '消防车辆', name: 'chudongcheliang', checked: false },
  { node: '重点单位', key: '重点单位' },
  { node: '物联网', key: '重点单位', name: 'wulianwang', checked: true },
  { node: '未联网', key: '重点单位', name: 'weilianwang', checked: false },
  { node: '社区防范', key: '社区防范' },
  { node: '智能车棚', key: '社区防范', name: 'zhinengchepeng', checked: false },
  { node: '积水点位', key: '社区防范', name: 'jishuidianwei', checked: false },
  { node: '历史火警', key: '社区防范', name: 'lishihuojing', checked: false }
]

const valuelist = [
  { "区消防救援站": '区消防救援站', total: 123 },
  { "区消防救援站": '附近消防站', total: 12 },
  { "区消防救援站": '社区微型消防站', total: 12 },
  { "区消防救援站": '企业微型消防站', total: 12 },
  { "区消防救援站": '地上消火栓', total: 12 },
  { "区消防救援站": '智能消火栓', total: 14 },
  // { "区消防救援站": '取水点', total: 11 },
  { "区消防救援站": '执勤车辆', total: 10 },
  { "区消防救援站": '出动车辆', total: 19 },
  { "区消防救援站": '物联网', total: 11 },
  { "区消防救援站": '未联网', total: 16 },
  { "区消防救援站": '智能车棚', total: 18 },
  { "区消防救援站": '积水点位', total: 10 },
  { "区消防救援站": '历史火警', total: 10 }
]

/**
 * 树型控件
 *  _cnyw_tree_list3
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      checkedKeys: [],
      expendKeys: [],
      allKeys: [],
      valueList: [],
      height: '100%'
    }
  }

  componentDidMount() {
    const { style } = this.props;
    let list = [...dataList];

    let valueList = [...valuelist];
    const data = this.getDataProvider(this.props);
    if (data.length) {
      valueList = data;
    }
    const useData = [];
    const allKeys = [];
    // 将
    list.map((item, index) => {
      if (item.node === item.key) {
        useData.push({ ...item, title: item.node, key: `0-${index}`, index, children: [] })
      } else {
        useData.map(ele => {
          if (ele.title === item.key) {
            allKeys.push(item.name);
            const keys = valueList.find(key => key["区消防救援站"] === item.node);
            if (keys) {
              ele.children.push({ ...item, title: item.node, key: `0-${ele.index}-${ele.children.length}`, value: (keys && keys.total) || 0 })
            }
          }
        })
      }
    })

    const expendKeys = [];
    const checkedKeys = [];
    useData.map(item => {
      const propsData = valueList.find(key => key.node === item.node);
      expendKeys.push(item.key);
      if (item.children) {
        item.children.map(ele => {
          let propsItem = propsData && Array.isArray(propsData.children) ? propsData.children : [];
          propsItem = propsItem.find(key => key.node === ele.node);
          ele.checked = (propsItem && propsItem.checked) || ele.checked;
          if (ele.checked) {
            checkedKeys.push(ele.key)
          }
        })
      }
    })

    // 绑定事件
    const { buffEvent = [{ type: 'click' }] } = this.props;
    let eventValue = {};

    for (let i = 0; i < buffEvent.length; i++) {
      const eventObj = buffEvent[i];
      const { type, method, bindedComponents } = eventObj;
      if (type === 'click') {
        eventValue = {
          onClick: (list, data) => {
            method && method({ list, data }, bindedComponents)
          }
        }
      }
    }

    useData && useData.map(item => {
      if (style && Array.isArray(style.data)) {
        const data = style.data.find(ele => ele.node === item.node);
        item.children.map(ele => {
          const childeNode = (data && data.children) || [];
          const node = childeNode.find(e => e.node === ele.node);
          ele.checked = node ? node.checked : ele.checked;
          if (ele.checked) {
            checkedKeys.push(ele.key)
          }
        })
      }
    })
    console.log('componentDidMount', useData)
    this.setState({
      data: useData,
      expendKeys,
      checkedKeys,
      allKeys,
      height: style && style.height,
      handlers: Object.assign({}, eventValue)
    })
  }

  componentWillReceiveProps(nextProps) {
    try {
      const { data = [] } = this.state;
      const { style } = nextProps;
      console.info('componentWillReceiveProps new', this.props, nextProps);
      if (!isEqual(this.props, nextProps)) {
        const nextPropsData = this.getDataProvider(nextProps);

        let list = [...dataList];
        const useData = [];
        list.map((item, index) => {
          if (item.node === item.key) {
            useData.push({ ...item, title: item.node, key: `0-${index}`, index, children: [] })
          } else {
            useData.map(ele => {
              if (ele.title === item.key) {
                const obj = nextPropsData.find(key => key["区消防救援站"] === item.node);
                if (obj) {
                  ele.children.push({ ...item, title: item.node, key: `0-${ele.index}-${ele.children.length}`, value: obj.total })
                }
              }
            })
          }
        })
        let expendKeys = [];
        let checkedKeys = [];
        useData.map(item => {
          const propsData = nextPropsData.find(key => key.node === item.node);
          expendKeys.push(item.key);
          if (item.children) {
            item.children.map(ele => {
              let propsItem = propsData && Array.isArray(propsData.children) ? propsData.children : [];
              propsItem = propsItem.find(key => key.node === ele.node);
              ele.checked = (propsItem && propsItem.checked) || ele.checked;
              if (ele.checked) {
                checkedKeys.push(ele.key)
              }
            })
          }
        })

        useData && useData.map(item => {
          if (style && Array.isArray(style.data)) {
            const data = style.data.find(ele => ele.node === item.node);
            item.children.map(ele => {
              const childeNode = (data && data.children) || [];
              const node = childeNode.find(e => e.node === ele.node);
              ele.checked = node ? node.checked : ele.checked;
              if (ele.checked) {
                checkedKeys.push(ele.key)
              }
            })
          }
        })
        console.log('componentWillReceiveProps', useData, !isEqual(this.props.dataProvider, nextProps.dataProvider))

        if (!isEqual(this.props.dataProvider, nextProps.dataProvider)) {
          this.setState({
            data: useData,
            expendKeys,
            height: style && style.height,
            checkedKeys
          })
        } else {
          this.setState({
            // data: useData,
            // expendKeys,
            height: style && style.height,
            // checkedKeys
          })
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  // 校验dataProvider
  getDataProvider = props => {
    const { dataProvider } = props;
    if (dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && dataProvider[0] !== "") {
      return [...dataProvider]
    } else {
      return [];
    }
  }

  // 展开
  onExpand = (value) => {
    this.setState({
      expendKeys: value
    })
  }

  // 选中
  onCheck = (value, e) => {
    const nodeProps = e.node.props;
    // 将父节点的节点去掉
    const filterValue = [];
    Array.isArray(value) && value.map(item => {
      const arr = item.split("-");
      if (arr.length > 2) {
        filterValue.push(item);
      }
    })

    const { data = [], checkedKeys = [], handlers, allKeys } = this.state;
    const list = [];
    data.map(item => {
      item.children.map(ele => {
        const isContains = filterValue.includes(ele.key);
        ele.checked = isContains;
        if (filterValue.includes(ele.key)) {
          list.push(ele.name);
        }
      })
    })

    let newData = {
      type: SHOWNSTATE,
      checkedList: list,
      flag: GRIDFLAG,
      all: allKeys
    };

    window.postMessage(newData, "*");
    this.setState({
      checkedKeys: value,
      data
    })

    handlers.onClick && handlers.onClick(list, data);
  }

  render() {
    const { data = [], expendKeys = [], checkedKeys = [], height } = this.state;

    return <div style={{ width: '100%', height: height || '100%', overflowY: 'auto', overflowX: 'hidden' }} className={styles.tree}>
      <Tree
        checkable={true}
        selectable={false}
        showIcon={true}
        // defaultExpandedKeys={expendKeys}
        expandedKeys={expendKeys}
        checkedKeys={checkedKeys}
        switcherIcon={<Icon type="down" />}
        onExpand={this.onExpand}
        onCheck={this.onCheck}
      // onSelect={this.onSelect}
      >
        {
          data.map(item => {
            return <TreeNode title={item.title} key={item.key}>
              {
                item.children.map(ele => {
                  const img = imgList.find(key => key.name === ele.title);
                  return <TreeNode
                    icon={<img src={img.icon || ''} style={{ width: 28, height: 28 }} />}
                    title={`${ele.title}     (${ele.value})`} key={ele.key} />
                })
              }
            </TreeNode>
          })
        }
      </Tree>
    </div>
  }
}

export default Index;
