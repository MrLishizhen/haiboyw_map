import React, { Component } from 'react';
import {getDataProvider} from '../../../utils/DataUtils';
import { isEqual } from 'lodash';
import caoshi from './assets/caoshi.png';

/**
 * _chengdu_qingyang_esTable
 * 青羊区_企业服务_ 列表
 */
 


const tranformUp = (time, distance) => {
  return {
    transition: `transform ${time * 1000}ms`,
    transform: `translateY(${distance}px)`,
  }
}


const LEVELS = {
  '一般': "#f8c21c50",
  "严重": "#f8696550",
  "紧急": "#e4387f50",
  "重大": "#b61f7e50",
}

const createRows = (
  totalRowCount,
  rowHeight, 
  rowStyle, 
  data, 
  duration, 
  dataIndex, 
  boundaryIndex
  ) => {
  const tableRows = [];
  for (let i = 0; i < totalRowCount; i++) {
    const index = totalRowCount - i;
    const tranformUpStyle = tranformUp(duration, rowHeight * i);
    const defaultStyle = {
      height: rowHeight,
      zIndex: index,
      ...tranformUpStyle
    };

    if (dataIndex > boundaryIndex) {
      dataIndex = 0;
    }
    tableRows.push({
      data: data[dataIndex] || {},
      y: rowHeight * i,
      style: Object.assign({}, defaultStyle)
    });
    dataIndex ++;
  }
  return tableRows;
}

const createRollRows = (timer2Ref, rowCount, rollCount, boundaryIndex, rows, rowStyle, rowHeight, duration, endDelay, data, dataIndex, _this) => {
  const newRows = rows.map((el, i) => {
    const y = el['y'] - rowHeight * rollCount;
    return {
      ...el,
      y: y,
      style: {
        ...el['style'],
        ...tranformUp(duration, y)
      }
    }
  })
  _this.setState({rows: [].concat(newRows)});
  
  timer2Ref = setTimeout(() => {
    var tempIndex = 0;
    const endRows = newRows.map(el => {
      const {y} = el;
      var zIndex = el['style']['zIndex'];
      zIndex ++;
      if (zIndex > rows.length) zIndex = 1;
      if (y < 0) {
        // get new data

        if (_this.dataIndex > boundaryIndex) {
          _this.dataIndex = 0;
        }

        const newData = data[_this.dataIndex] || {};
        const resetY = rowHeight * (rowCount + tempIndex);
        tempIndex ++;
        _this.dataIndex ++;

        return {
          ...el,
          data: newData,
          y: resetY,
          style: {
            ...el['style'],
            zIndex: zIndex,
            ...tranformUp(0, resetY)
          }
        }
      }
      return {...el, style: {...el['style'], zIndex: zIndex}};
    })

    _this.setState({rows: [].concat(endRows)})
  }, endDelay)
}

const StatsCard = props => {
  const {
    level = "一般",
    color = '#f8c21c50'
  } = props;
  // const bg = LEVELS[level];
  return (
    <div style = {{width: 128, height: 48, background: color, fontSize: 36, textAlign: 'center', color: 'white', lineHeight: '48px', borderRadius: 4}}>
      {level}
    </div>
  )
}

const TableItem = props => {
  const {
    level = '',
    title = '',
    type = '',
    time = '',
    no = '',
    lng = '',
    lat = '',
    color = '',
    flowStatus = '',
    isOverTime = false,
    marginBottom = 0,
    style,
    onClick
  } = props;

  return (
    <div style = {{width: 780, height: 138, backfaceVisibility: 'hidden', perspective: 1000, position: 'absolute', cursor: 'pointer', marginBottom: 0, ...style}} onClick = {() => {onClick && onClick(no, lat, lng, flowStatus)}}>
      <div style = {{width: '100%', height: 128, background: '#009CFF08'}}>
        <div style = {{display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative'}}>
          <StatsCard level = {level} color = {color}/>
          <div style = {{color: '#5AB0FE', fontSize: 36, marginLeft: 32}}>{type}</div>
          <div style = {{color: '#5AB0FE', fontSize: 28, marginLeft: 32}}>{time}</div>
          {isOverTime && <div style = {{fontSize: 28, color: 'red', position: 'absolute', right: 0, background: `url(${caoshi})`, width: 124, height: 54, transform: 'scale(0.8)'}}></div>}
        </div>
        <div style = {{fontSize: 36, color: 'white', marginTop: 15, marginLeft: 20, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', wordBreak: 'break-all'}}>{title}</div>
      </div>
    </div>
  )
}

let INSTATE = {
  totalRowCount: 0,
  rowHeight: 138,
  rowStyle: {},
  data: [],
  duration: 1,
  defaultRowCount: 4
}


export default class index extends Component {

  state = {
    rows: []
  }

  init = (props) => {
    this.dataIndex = 0;
    this.timer2 = 0;

    clearInterval(this.timer1);
    clearTimeout(this.timer2);

    const data = getDataProvider(props);
    // const data = [{
    //   level: '一般',
    //   color: "#f8696550",
    //   title: "1111",
    //   time: '2022-01-02',
    //   type: 'aaa',
    //   no: '12',
    //   lat: 12,
    //   lng: 23,
    //   flowStatus: "chuzhizhong",
    //   isOverTime: true,
    //   defaultRowCount: 2
    // }]

    const defaultInfo = data[0] || {};
    if (defaultInfo.defaultRowCount) {
      INSTATE.defaultRowCount = defaultInfo.defaultRowCount;
    }

    const rowCount = data.length;
    const boundaryIndex = data.length - 1;

    if (rowCount > INSTATE['defaultRowCount']) {
      this.timer1 = setInterval(() => {
        createRollRows(
          this.timer2, 
          INSTATE['defaultRowCount'],
          1,
          boundaryIndex,
          this.state.rows, 
          INSTATE['rowStyle'], 
          INSTATE['rowHeight'], 
          INSTATE['duration'], 
          1000, 
          data, 
          this.dataIndex, 
          this);
      }, 10 * 1000);
      
    }

    const genRowCount = data.length <= INSTATE['defaultRowCount']? data.length: INSTATE['defaultRowCount'] + 1;
    const defaultRows = createRows(
      genRowCount,
      INSTATE['rowHeight'], 
      INSTATE['rowStyle'], 
      data, 
      INSTATE['duration'], 
      this.dataIndex, 
      boundaryIndex);
    this.setState({rows: defaultRows})
  }

  componentDidMount() {
    this.init(this.props);

    let eventValue = {};

    const { buffEvent = [{type: 'click'}] } = this.props;
    for (let i = 0; i < buffEvent.length; i++) {
      const eventObj = buffEvent[i];
      const { type, method, bindedComponents } = eventObj;
      if (type === 'click') {
        eventValue = {
          onClick: (no = '', lat = '', lng = '', flowStatus = '') => {
            method && method({value: {no, lat, lng, flowStatus}}, bindedComponents)
          }
        }
      }
    }

    this.setState({
      handlers: Object.assign({}, eventValue)
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer1);
    clearTimeout(this.timer2);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      this.init(nextProps);
    }
  }

  render() {
    return (
      <div style = {{height: INSTATE.rowHeight * INSTATE.defaultRowCount, overflow: 'hidden', position: 'relative'}}>
        {
          this.state.rows.map((el, i) => {
            const {data = {}, style} = el || {};
            return (
              <TableItem 
                key = {i} 
                style = {style} 
                onClick = {this.state.handlers.onClick}
                {...data}/>
            )
          })
        }
      </div>
    )
  }
}
