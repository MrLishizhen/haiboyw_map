import React from 'react';
import {getEventType} from '../../utils/ToolUtils';
import { isEqual } from 'lodash';

import zhongda from './img/zhongda.png';
import chaoshi from './img/chaoshi.png';
import jinri from './img/jinri.png';
import zhiliu from './img/zhiliu.png';
import shijianleixing from './img/shijianleixing.png'


class TypeItem extends React.Component {

  state = {
    checked: false
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selected !== nextProps.selected) {
      this.setState({checked: nextProps.selected});
    }
  }

  render() {
    const {
      index = 0,
      title = '',
      icon = '',
      onSelect,
      selected = false,
      algin = 'left'
    } = this.props;
  
    const normalStyle = {cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '5px 0', justifyContent: algin};
    const selectedStyle = {background: 'linear-gradient(90deg, #33509110 0%, #335091 50%, #33509110 100%)'};
  
    const rootStyle = this.state.checked? {...normalStyle, ...selectedStyle}: {...normalStyle};
  
    return (
      <div style = {rootStyle} onClick = {() => {
        this.setState({checked: !this.state.checked})
        onSelect && onSelect({title: title, selected: !this.state.checked});
      }}>
        {icon && <div style={{width: 32, height: 32, background: `url(${icon}) no-repeat`}}></div>}
        <div style={{color: 'white', userSelect: 'none', fontSize: 18, whiteSpace: 'nowrap', overflow: 'hidden', wordBreak: 'break-all', textOverflow: "ellipsis", textAlign: 'center'}}>{title}</div>
      </div>
    )
  }
}

const IMPORTANTICONS = [{title: '今日工单', icon: jinri}, {title: '今日重大工单', icon: zhongda}, {title: '滞留工单', icon: zhiliu}, {title: '超时工单', icon: chaoshi}]
class ImportTypePanel extends React.Component {
  
  state = {
    selectedId: -1
  }

  componentDidMount(){
    this.props.onRef&&this.props.onRef(this);
   }

  handleReset = () => {
    this.setState({selectedId: -1});
  }

  render() {
    const {
      onSelect
    } = this.props;
    return (
      <div style={{width: 143, height: 168, background: 'linear-gradient(180deg, #10234880, #14346B80)', padding: '10px 0', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
        {
          IMPORTANTICONS.map((el, i) => {
            let selected = false;
            if (i === this.state.selectedId) selected = true;
            return <TypeItem key = {i} selected = {selected} index = {i} onSelect = {props => {
              this.setState({selectedId: i});
              onSelect && onSelect(props)
            }} {...el}/>
          })
        }
      </div>
    )
  }
}

class NormalTypePanel extends React.Component {

  state = {
    list: [],
    selectedId: -1
  }

  handleReset = () => {
    this.setState({selectedId: -1});
  }

  getEventType = async props => {
    const params = {
      'otherColumns': ['CLASS_1_NAME'],
      'selectColumn': 'CLASS_1_NAME',
      'ciId': 100001
    }

    const [ip, port] = props.addr;

    const result = await getEventType(`http://${ip}:${port}/cmdbApp/api/cidata/getMultiLevelData`, {
      method: 'POST', 
      headers: {
        checkToken: 'no'
      }, 
      body: JSON.stringify(params)});
    const typeList = result?.data || [];
    this.setState({list: typeList.map(el => {return {title: el['CLASS_1_NAME']}})});
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      if (!isEqual(this.props.addr, nextProps.addr)) {
        this.getEventType(nextProps);
      }
    }
  }

  componentDidMount(){
    this.props.onRef&&this.props.onRef(this)
   }

  render() {
    const {
      onSelect
    } = this.props;
    return (
      <div style={{width: 170, height: 428, background: `url(${shijianleixing})`, padding: '10px 0', boxSizing: 'border-box', position: 'relative'}}>
        <div style={{color: 'white', fontSize: 24, marginLeft: 38}}>事件分类</div>
        <div style={{width: 140, height: 350, position: 'absolute', overflowY: 'scroll', top: 60, left: 22, whiteSpace: 'nowrap'}}>
        {
          this.state.list.map((el, i) => {
            let selected = false;
            if (i === this.state.selectedId) selected = true;

            return <TypeItem selected = {selected} algin = 'center' key = {i} index = {i} onSelect = {props => {
              this.setState({selectedId: i})
              onSelect && onSelect(props);
            }} {...el}/>
          })
        }
        </div>
      </div>
    )
  }
}


class ControlPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  handleRef1 = ref => this.child1 = ref;
  handleRef2 = ref => this.child2 = ref;


  render() {
    const {
      addr
    } = this.props;
    
    return (
      <>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <ImportTypePanel
            onRef = {this.handleRef1}
            onSelect = {val => {
              this.props.onSelectImportType && this.props.onSelectImportType(val);
              this.child2.handleReset && this.child2.handleReset()
          }}/>
          <NormalTypePanel
            onRef = {this.handleRef2} 
            onSelect = {val => {
              this.props.onSelectType && this.props.onSelectType(val);
              this.child1.handleReset && this.child1.handleReset()
            }} 
            
            addr = {addr}/>
        </div>
      </>
    )
  }
}

export {
  ImportTypePanel,
  NormalTypePanel,
  ControlPanel
}