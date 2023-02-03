import React, { Component } from 'react';
import {getDataProvider} from '../../utils/DataUtils';
import { isEqual } from 'lodash';

// _xiangyang_traffic_table

const tranformUp = (time, distance) => {
  return {
    transition: `transform ${time * 1000}ms`,
    transform: `translateY(${distance}px)`,
  }
}

const LEVELS = {
  "拥堵": "#f8696580",
  "极度拥堵": "#b61f7e80",
  "畅通": "#00FF0080"
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
    level = "一般"
  } = props;
  const bg = LEVELS[level];
  return (
    <div style = {{width: 160, height: 48, background: bg, fontSize: 36, textAlign: 'center', color: 'white', lineHeight: '48px', borderRadius: 4}}>
      {level}
    </div>
  )
}

const TableItem = props => {
  const {
    level = '',
    road = '',
    speed = '',
    time = '',
    pos = '',
    style,
    onClick
  } = props;
  return (
    <div style = {{width: 780, height: 138, position: 'absolute', cursor: 'pointer', marginBottom: 0, ...style}} onClick = {() => {onClick && onClick(pos)}}>
      <div style = {{width: '100%', height: 128, background: '#009CFF08'}}>
        <div style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <StatsCard level = {level}/>
          <div style = {{fontSize: 36, color: 'white', marginLeft: 20, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', wordBreak: 'break-all'}}>{road}</div>
        </div>
        <div style = {{display: 'flex', marginTop: 15, width: '100%', marginLeft: 10}}>
          {/* <div style = {{color: '#5AB0FE', fontSize: 36, width: 440}}>预计通过时间: {time}</div>
          <div style = {{color: '#5AB0FE', fontSize: 36,}}>{speed}</div> */}
           <div style = {{color: 'white', fontSize: 36, width: 440}}>预计通过时间: {time}</div>
          <div style = {{color: 'white', fontSize: 36, flex: 1}}>时速: {speed}</div>
        </div>
      </div>
    </div>
  )
}

const INSTATE = {
  totalRowCount: 0,
  rowHeight: 138,
  rowStyle: {},
  data: [],
  duration: 1,
  defaultRowCount: 3
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
          onClick: (val) => {
            method && method({value: val || ''}, bindedComponents)
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
