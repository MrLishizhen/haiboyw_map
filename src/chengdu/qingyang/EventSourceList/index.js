import React, { Component } from 'react'
import { getDataProvider } from '../../../utils/DataUtils'

const datalist  = [{
  source: '大联通平台',
  count: 1212
}, {
  source: '12345平台',
  count: 1212
}, {
  source: '12345平台',
  count: 12122
}, {
  source: '12345平台',
  count: 1212
}]

/**
 * _chengdu_qingyang_eventLegend
 * 城区事件模块，图例模块
 */
export default class index extends Component {

  state = {
    handlers: {}
  }


  componentDidMount() {

    let eventValue = {};

    const { buffEvent = [{type: 'click'}] } = this.props;
    for (let i = 0; i < buffEvent.length; i++) {
      const eventObj = buffEvent[i];
      const { type, method, bindedComponents } = eventObj;
      if (type === 'click') {
        eventValue = {
          onClick: (data) => {
            method && method({...data}, bindedComponents)
          }
        }
      }
    }

    this.setState({
      handlers: Object.assign({}, eventValue)
    });
  }

  render() {


    const data = getDataProvider(this.props);
    // const data = datalist;

    const total = data.reduce((a, b) => {
      return a = a + b.count
    }, 0);
    return (
      <div style={{width: 490, height: 302, overflowY: 'scroll'}}>
        {
          data.map((el, i) => {
            const per = total > 0 ? ((el.count / total) * 100).toFixed(0) : 0;
            const {color = '#BF7BFF', count} = el;
            return (
              <div onClick={() => this.state.handlers.onClick && this.state.handlers.onClick(el)} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 36, cursor: 'pointer'}}>
                <div style={{display: 'flex', alignItems: 'center', width: '50%'}}>
                  <div style={{width: 20, height: 20, background: color}}/> 
                  <div style={{color: 'white', marginLeft: 10, whiteSpace: 'nowrap'}}>{el.source}</div>
                </div>
                <div style={{color: '#7FC2FF', width: '25%', textAlign: 'center'}}>{count}</div>
                <div style={{color: '#7FEBFF', width: '25%', textAlign: 'center'}}>{per + '%'}</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
