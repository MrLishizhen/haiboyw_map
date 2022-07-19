import React, { Component } from 'react'
import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/legend';
import {getDataProvider, getDateDistance} from '../../../utils/DataUtils';
import { isEqual } from 'lodash';

const colors = ['#BF7BFF', '#3FFFF5', '#36B1FF', '#4ACE6E', '#E5B545', '#DAD968', '#B8E986', '#417505', '#50E3C2', '#A9CDBE', '#D6C191', '#97BBE8', '#ABBA9B'];

export default class index extends Component {

  state = {
  }

  getOption = (data = []) => {
    const {source = [], count = [], colors = []} = data[0] || {};

    return {
      color: colors? colors: colors,
      series:[{
        name:'1',
        type:'pie',
        label: {
          show: false,
          color: 'white',
          fontSize: 14
        },
        data: [1,2,3,4,5]
      }]
    }
  }

componentDidMount() {


  this.myChart = echarts.init(this.node);
  this.myChart.on('click', params => {
    this.state.handlers.onBarClick && this.state.handlers.onBarClick(params);
  })


  const {buffEvent = [{type: 'click'}, {type: 'pieClick'}]} = this.props;
    let eventValue = {};
    for (let i = 0; i < buffEvent.length; i++) {
        const eventObj = buffEvent[i];
        const {type, method, bindedComponents} = eventObj;
        if (type === 'click') {
            eventValue['onClick'] = (data) => {
              method && method({...data}, bindedComponents)
          }
        }

        if (type === 'pieClick') {
          eventValue['onPieClick'] = (data) => {
            method && method({...data}, bindedComponents);
          }
        }
    }
    this.setState({
        handlers: Object.assign({}, eventValue)
    })

}


  render() {

    const data = getDataProvider(this.props);
    const option = this.getOption(data);
    if (this.myChart) this.myChart.setOption(option);

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={{width: '100%', height: '100%'}} ref={node => this.node = node}></div>
      </div>
    )
  }
}
