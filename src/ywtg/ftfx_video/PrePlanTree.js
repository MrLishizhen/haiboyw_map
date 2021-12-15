import React from 'react'
import axios from 'axios'
import { Tree, Button, message } from 'antd';
import styles from './index.less'

const { TreeNode } = Tree;
let arr = [
    {title: 'a',key: '1001', level: 1, parents: ''},
    {title: 'b',key: '1002', level: 1, parents: ''},
    {title: 'c',key: '1003', level: 2, parents: '1001'},
    {title: 'd',key: '1004', level: 2, parents: '1001'},
    {title: 'e',key: '1005', level: 2, parents: '1002'},
    {title: 'f',key: '1006', level: 3, parents: '1003'},
    {title: 'g',key: '1007', level: 3, parents: '1003'},
    {title: 'h',key: '1008', level: 3, parents: '1004'},
    {title: 'i',key: '1009', level: 3, parents: '1004'},
    {title: 'j',key: '1010', level: 2, parents: '1002'},
    {title: 'k',key: '1011', level: 2, parents: '1001'}
]
class PrePlanTree extends React.Component {
  // state = {
  //   treeData: [
  //     { title: '基础预案', key: '50898ca521c3418da24dd8a1f7436d80' },
  //     { title: '长宁单兵视频', key: '00d0f934de8548b0945e70878efe939f', children: [
  //       { title: '疫苗接种点', key: '997b3a5ca0804f7bb13aa9ca8ce3e3d0', isLeaf: true },
  //       { title: '五一劳动节保障', key: 'ff2fcda26388467b9e7db4d50ce961e4', isLeaf: true },
  //       { title: '长宁区客流', key: 'ed7321f4ce5c4d6faf6a0644b7bef696', isLeaf: true }
  //     ] },
  //     { title: 'Tree Node', key: '2', isLeaf: true },
  //   ],
  // };
  constructor(props) {
    super(props)
    this.state = {
      treeData: []
    }
  }

  componentDidMount() {
    const { prePlanType } = this.props
    this.getPrePlanTree(prePlanType)
  }

  getPrePlanTree = (catalogType) => {
    axios.post(
        'http://10.207.204.33:5479/sign/vedioservice/tree',
        { catalogType }
    )
    .then((response) => {
        const { status, data } = response
        if( status == 200 ) {
            const { result } = data
            const { data: list } = result
            let treeData = this.filterTreeNode(list)
            treeData = this.getFangTai(treeData)
            this.setState({treeData})
        }
    })
    .catch((error) => {
        message.error('tree接口请求失败');
        console.error('tree\'s api is error')
    })
  }

  getFangTai = (obj) => {
    const ft = obj[0].children;
    const filterFt = ft.filter(q => q.title == "防台防汛");
    obj[0].children = filterFt;
    return obj;
  }

  getTreeNode = ( planId, node ) => {
    axios.post(
      'http://10.207.204.33:5479/sign/vedioservice/planDeviceId',
      { planId }
    )
    .then((response) => {
        const { status, data } = response
        if( status == 200 ) {
            const { result } = data
            const { data: prePlanVideoLists } = result
            if(prePlanVideoLists.length) {
              const { onChangeVideosData, onClose } = this.props
              onChangeVideosData(prePlanVideoLists, node)
              onClose()
            } else {
              message.warning('该预案没有相关视频点位');
            }
        }
    })
    .catch((error) => {
        message.error('planDeviceId接口请求失败');
        console.error('planDeviceId\'s api is error')
    })
  }

  // 过滤数据
  filterTreeNode = (list) => {
    let result = []
    for (let i = 0; i < list.length; i++) {
      let temp = this.deepCopy(list[i])
      result.push(temp)
    }

    function pointFormateData(obj, index, list) {
      let tempArr = list.filter(item => obj.id == item.parentId)
      if(tempArr.length){
        result[index].children = tempArr
      } else {
        result[index].isLeaf = true
      }
    }

    for(let i = 0; i< result.length; i++) {
      pointFormateData(result[i], i, result)
    }

    result = result.filter(item => !item.parentId)
    return result
  }

  // 深拷贝
  deepCopy = (itemObj) => {
    //是否存在
    if(!itemObj) {
        console.error('itemObj is not defined')
        return
    }
    //定义变量
    let deepObj = {};

    //是否为空
    if(Object.keys(itemObj).length <= 0) return deepObj

    //遍历对象
    for(let key in itemObj) {
      // 判断是否是对象
      if(typeof itemObj[key] === 'object') {
          if(itemObj[key] instanceof Array) {
            deepObj[key] = [...itemObj[key]]
          } else {
            deepObj[key] = deepCopy(itemObj[key])
          }
      } else {
        deepObj[key] = itemObj[key]
      }
    }

    return deepObj
  }



  onPlayerStart = (planId, e) => {
    if(!planId[0]) return
    this.getTreeNode(planId[0], e.node.props.dataRef)
  }
  //异步加载
  // onLoadData = treeNode =>
  //   new Promise(resolve => {
  //     if (treeNode.props.children) {
  //       resolve();
  //       return;
  //     }
  //     setTimeout(() => {
  //       treeNode.props.dataRef.children = [
  //         { title: 'Child Node', key: `${treeNode.props.eventKey}-0` },
  //         { title: 'Child Node', key: `${treeNode.props.eventKey}-1` },
  //       ];
  //       this.setState({
  //         treeData: [...this.state.treeData],
  //       });
  //       resolve();
  //     }, 1000);
  //   });
    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                <TreeNode title={`${item.title}[${item.deviceCount}]`} key={item.id} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
                );
            }
        return <TreeNode key={item.id} title={`${item.title}[${item.deviceCount}]`} dataRef={item} />;
    });

  render() {
    return (
        <Tree 
          onSelect={(selectedKeys, e) => this.onPlayerStart(selectedKeys, e)}
            // loadData={this.onLoadData}
        >
            {this.renderTreeNodes(this.state.treeData)}
        </Tree>
    )
  }
}

export default PrePlanTree;