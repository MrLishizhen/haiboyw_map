import React, { Component } from 'react'
import img1 from './assets/shangjijiaoban.png';
import img2 from './assets/shehuishuqiu.png';
import img3 from './assets/zhinengfaxian.png';
import img4 from './assets/richangxuncha.png';
import titleBg from './assets/title_bg.png';

import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import {getDataProvider} from '../../utils/DataUtils';


// _chengdu_event_type_block


const defaultData = [{name: '领导批示', bg: img1}, {name: '社会诉求', bg: img2}, {name: '智能发现', bg: img3}, {name: '日常巡查', bg: img4}];

const isRealNum = val => {

  // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除    
  if(val === "" || val === null || val === NaN) {
    return false;
  }

  if(!isNaN(val)) {
    //对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,   //所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
    return true; 
  } else {
    return false;
  }
}

const toMillion = val => {
  if (!isRealNum) return val;
  const value = val + '';
  if (value.length >= 7) { 
    const subNumber = value.substr(0, value.length - 4);
    const v = toThouands(subNumber);
    return v + '万'
  }
  return toThouands(val)
}

const toThouands = (n, digitCount = 3) => {
  if (!isRealNum(n)) return 0;
  var num = (n || 0).toString(), result = '';
  const i = num.indexOf('.') + 1;
  var decimal = '';
  if (i > 0) {
    //有小数位
    const nums = num.split('.');
    num = nums[0];
    decimal = nums[1];
  }
  while (num.length > digitCount) {
    result = ',' + num.slice(-digitCount) + result;
    num = num.slice(0, num.length - digitCount);
  }
  if (num) { result = num + result; }
  return `${result}${decimal ? '.' + decimal : ''}`;
}


class BlockItem extends React.Component {

  getOptions = (val = 0) => {
    const barColor = val < 0? 'gray': '#76B8FF'
    return {
      grid: {
        backgroundColor: 'gray'
      },
      xAxis: {
        show: false
      },
      yAxis: {
        data: [1],
        show: false
      },
      series: [
        {
          type: "bar",
          name: "dise",
          data: [100],
          itemStyle: {
            color: barColor
          },
          barWidth: 5
        },
        {
          type: "bar",
          barGap: '-100%',
          data: [val],
          label: {
            show: val < 0? false: true,
            color: '#3BFEB2',
            fontSize: 16,
            position: ['50%',12],
            formatter: '{c}%'
          },
          itemStyle: {
            color: '#3BFEB2'
          },
          barWidth: 5
        }
      ]
    }
  }


  componentDidMount() {
    this.myChart = echarts.init(this.node);


    const {
      percent = 0
    } = this.props;

    const options = this.getOptions(percent);
    if (this.myChart) this.myChart.setOption(options);
  }

  render() {
    const {
      bg = '',
      title = '',
      subTitle1 = '今日',
      total = '',
      totalPercent = '',
      dealingCount = '',
      dealedCount = '',
      percent = 0
    } = this.props;

    const options = this.getOptions(percent);
    if (this.myChart) this.myChart.setOption(options);

    return (
      <div style={{width: 225, height: 264, background: `url(${bg}) no-repeat`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '15px 0px', boxSizing: 'border-box'}}>
        <div style={{background: `url(${titleBg})`, width: 172, height: 36, textAlign: 'center', color: 'white', fontSize: 24, lineHeight: '36px'}}>
          {title}
        </div>
        <div style={{fontSize: 18, color: '#7EE1FF', height: 34, lineHeight: '34px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div>{subTitle1}</div>
          <div style={{ marginLeft: 8,fontSize: 28, color: 'transparent', fontWeight: 'bold', background: 'linear-gradient(to bottom, #FFFFFF, #6AF8FF)', WebkitBackgroundClip: 'text'}}>{total}</div>
        </div>
        <div style={{fontSize: 18, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div>占比</div>
          <div style={{marginLeft: 8, fontSize: 24, color: '#7EE1FF'}}>{totalPercent}</div>
        </div>
        <div style={{fontSize: 18, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%', height: '58.5px',position: 'relative'}}>
          <div style={{position: 'absolute', width: '100%', height: '58.5px', top: 12}}>
            <div style={{fontSize: 18, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent: 'center'}}>
                <div>在办</div>
                <div style={{fontSize: 24, color: '#76B8FF',  fontWeight: 'bold'}}>{dealingCount}</div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent: 'center'}}>
                <div>办结</div>
                <div style={{fontSize: 24, color: '#3BFEB2',  fontWeight: 'bold'}}>{dealedCount}</div>
              </div>
            </div>
            
          </div>
        </div>
        <div style={{ width: '100%', height: '50px' }}>
          <div style={{ width: '100%', height: '100%' }} ref={node => this.node = node}></div>
        </div>
      </div>
    )
  }
  
}



export default class index extends Component {

  render() {

    const data = getDataProvider(this.props);

    const titleFlag = data.slice(0, 1);
    const dataList = data.slice(1);

    const subTitle = titleFlag[0] + '' || '今日';

    const totalCount = dataList.reduce((a, b = {}) => {
      if (b) {
        const dealing = isRealNum(b.dealing)? parseFloat(b.dealing): 0;
        const dealed = isRealNum(b.end)? parseFloat(b.end): 0;
        return a += (dealing + dealed);
      }
      return a += 0;
    }, 0)


    const newData = defaultData.map(el => {
      if(el) {
        const {name = ''} = el || {};
        const obj = dataList.find(o => o && o.name === name);
        if (obj) {
          const {dealing = 0, end = 0} = obj;
          return {
            ...el,
            title: name,
            subTitle1: subTitle,
            total: toMillion(dealing + end),
            totalPercent: (((dealing + end) / totalCount) * 100).toFixed(0) + '%',
            dealingCount: toMillion(dealing),
            dealedCount: toMillion(end),
            percent: (end / (dealing + end) * 100).toFixed(0)
          }
        } else {
          return {...el, title: name, subTitle1: subTitle};
        }
      }
      return {};
      
    })

    return (
      <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'space-around'}}>
        {
          newData && Array.isArray(newData) && newData.map((el, i) => {
            return <BlockItem key = {i} {...el}/>
          })
        }
      </div>
    )
  }
}
