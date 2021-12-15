import React from 'react';
import SZH from './assets/SZH.svg';
import JZX from './assets/JZX.svg';
import {isEqual, find} from 'lodash';

// widgetName: _haiboyw_wharf_type_selector

const dataSampe = [
  {
    name: "集装箱码头",
    id: "JZX",
    icon: JZX
  },
  {
    name: "散杂货码头",
    id: "SZH",
    icon: SZH
  }
]

class index extends React.Component {
  state = {
    wharf: {}
  };

  getInitialState = props => {
    let state = Object.assign({}, dataSampe[0]);
    try {
      const {dataProvider = []} = props;
      if (dataProvider && Array.isArray(dataProvider)) {
        const whartName = dataProvider[0] ?  dataProvider[0]: '散杂货码头';
        const whartObj = find(dataSampe, {name: whartName});
        if (whartObj) state = Object.assign({}, whartObj);
      }
    } catch (error) {
      console.log(error)
    }
    return {wharf: state};
  }

  componentDidMount() {

    const { buffEvent = [{type: 'click'}] } = this.props;
    let eventValue = {};

    for (let i = 0; i < buffEvent.length; i++) {
      const eventObj = buffEvent[i];
      const { type, method, bindedComponents } = eventObj;
      if (type === 'click') {
        eventValue = {
          onClick: (name) => {
            const n = name === '集装箱码头'? '散杂货码头': '集装箱码头';
            const whartObj = find(dataSampe, {name: n});
            const valueObj = find(dataSampe, {name: name})
            if (whartObj) {
              this.setState({wharf: Object.assign({}, whartObj)});
            }
            method && method({value: valueObj || {}}, bindedComponents)
          }
        }
      }
    }

    const state = this.getInitialState(this.props);
    this.setState({...state, handlers: {...eventValue}}); 
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      const state = this.getInitialState(nextProps);
      this.setState({...state}); 
    }
  }

  handleClick = name => {
    
  }

  render() {
    const {name, id, active, icon} = this.state.wharf;
    return (
      <div style = {{position: 'relative', width: '100%', height: '100%'}}>
        <div
          onClick = {() => this.state.handlers.onClick && this.state.handlers.onClick(name)}
          style = {{
            width: '180px',
            height: '51px',
            lineHeight: '51px',
            textAlign: 'center',
            background: 'rgba(83,109,254,0.20)',
            fontSize: '20px',
            color: '#DDEAFF',
            display: 'flex',
            justifyContent: 'space-around',
            cursor: 'pointer',
            position: 'absolute'
          }}
        >
          <img src = {icon} style = {{marginLeft: '10px'}}></img>
          {name}</div>
      </div>
    )
  }
}

export default index;