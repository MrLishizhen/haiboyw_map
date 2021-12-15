import React from 'react';
import '../iconfont';
import {isEqual, filter} from 'lodash';

// widgetName: _haiboyw_wharf_selector

const dataSampe = [
  {
    name: "浦东",
    id: "浦东",
    active: false,
    type: 'JZX'
  },
  {
    name: "振东",
    id: "振东",
    active: false,
    type: 'JZX'
  },
  {
    name: "沪东",
    id: "沪东",
    active: false,
    type: 'JZX'
  },
  {
    name: "明东",
    id: "明东",
    active: false,
    type: 'JZX'
  },
  {
    name: "盛东",
    id: "盛东",
    active: false,
    type: 'JZX'
  }, {
    name: "冠东",
    id: "冠东",
    active: false,
    type: 'JZX'
  },
  {
    name: "尚东",
    id: "尚东",
    active: false,
    type: 'JZX'
  }, {
    name: "宜东",
    id: "宜东",
    active: false,
    type: 'JZX'
  },
  {
    "name": "罗泾",
    "id": '罗泾',
    "active": false,
    type: 'SZH'
  },
  {
    "name": "罗矿",
    "id": '罗矿',
    "active": false,
    type: 'SZH'
  },
  {
    "name": "罗煤",
    "id": '罗煤',
    "active": false,
    type: 'SZH'
  },
  {
    "name": "张华浜",
    "id": '张华浜',
    "active": false,
    type: 'SZH'
  },
  {
    "name": "共青",
    "id": '共青',
    "active": false,
    type: 'SZH'
  },
  {
    "name": "浦远",
    "id": '浦远',
    "active": false,
    type: 'SZH'
  },
  {
    "name": "海通",
    "id": '海通',
    "active": false,
    type: 'SZH'
  },
  {
    "name": "龙吴",
    "id": '龙吴',
    "active": false,
    type: 'SZH'
  },
  {
    "name": "洋油",
    "id": '洋油',
    "active": false,
    type: 'SZH'
  }
]

const normalStyle = {
  border: '2px solid #DDEAFF'
}

const selectedStyle = {
  background: '#40A163',
  boxShadow: '0 16px 7px 3px rgba(7,30,69,0.05)'
}

class index extends React.Component {
  state = {
    id: -1, 
    visible: false, 
    handlers: {}, 
    data: []
  };

  getInitialState = props => {
    let dataMap = [];
    try {
      const {dataProvider = []} = props;
      if (dataProvider && Array.isArray(dataProvider)) {
        const {type = 'JZX', name: wharfName} = dataProvider[0] || {};
        const wharfList = filter(dataSampe, {type: type});
        dataMap = wharfList.map((item) => {
          const {name} = item;
          if (name === wharfName) {
            return {...item, active: true};
          } else {
            return {...item, active: false};
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
    return {data: [].concat(dataMap)};
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      const dataMap = this.getInitialState(nextProps);
      this.setState({...dataMap});
    }
  }

  componentDidMount() {
    const dataMap = this.getInitialState(this.props);

    const { buffEvent = [{type: 'click'}] } = this.props;
    let eventValue = {};

    for (let i = 0; i < buffEvent.length; i++) {
      const eventObj = buffEvent[i];
      const { type, method, bindedComponents } = eventObj;
      if (type === 'click') {
        eventValue = {
          onClick: (evt) => {
            this.setState({visible: false});
            const selectedEl = dataMap['data'][this.state.id] || {};
            method && method({value: selectedEl['id'] || ''}, bindedComponents)
          }
        }
      }
    }

    this.setState({
      handlers: Object.assign({}, eventValue),
      ...dataMap
    })
  }


  handleCancel = evt => {
    this.setState({visible: false})
  }

  render() {
    
    return (
      <div style = {{position: 'relative', width: '100%', height: '100%'}}>
        <div style = {{position: 'relative', height: '10%'}} onClick = {() => this.setState({visible: true})}>
          <svg className={""} style = {{width: '20px', height: '20px', fill: 'white', position: 'absolute', right: '20px', cursor: 'pointer'}} aria-hidden="true">
            <use xlinkHref="#icon-add"></use>
          </svg>
        </div>
        {
          this.state.visible ? (
            <div style = {{position: 'relative', height: '90%', background: 'rgba(28,82,173,0.1)', backdropFilter: `blur(20px)`, borderRadius: '5px'}}>
              {/* <div onClick = {()=> this.setState({visible: false})} style = {{ background: 'pink',position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, zIndex: 0}}/> */}
              <div style = {{position: 'relative', height: '80%'}}>
              {
                this.state.data && this.state.data.map((item, i) => {
                  let {name, active} = item;
                  const boxW = 110, boxH = 42, marginX = 25, marginY = 30;
                  var row = parseInt( i / 3); // 行数除以列数  求出行数
                  var col = parseInt( i % 3); // 行数对列数取余  求出列数
                  
                  const left = 38 + col * (boxW + marginX) + 'px'; // 左边位置
                  const top = 40 + row * (boxH + marginY) + 'px';  // 上边位置 
      
                  if (this.state.id === i) active = true;
                  const styles = active ? selectedStyle: normalStyle;
                  
                  return (
                    <div
                      key = {i}
                      style = {{
                        position: 'absolute',
                        left: left,
                        top: top,
                        fontSize: '22px',
                        color: 'white',
                        width: `${boxW}px`,
                        height: `${boxH}px`,
                        textAlign: 'center',
                        lineHeight: `${boxH}px`,
                        cursor: 'pointer',
                        ...styles
                      }}
                      onClick = {() => {
                        this.setState({id: i})
                      }}
                    >{name}</div>
                  )
                })
              }
              </div>
              <div style = {{display: 'flex', justifyContent: 'flex-end', marginRight: '40px', zIndex: 2000}}>
                <div 
                onClick = {this.handleCancel}
                style = {{
                  backgroundImage: 'linear-gradient(180deg, rgba(240,246,255,0.40) 0%, rgba(221,234,255,0.40) 100%)',
                  borderRadius: '6px',
                  width: '120px',
                  height: '42px',
                  lineHeight: '42px',
                  fontSize: '22px',
                  color: '#DDEAFF',
                  cursor: 'pointer',
                  textAlign: 'center',
                  marginRight: '25px'
                }}>取消</div>
                <div 
                {...this.state.handlers}
                style = {{
                  backgroundImage: 'linear-gradient(180deg, rgba(240,246,255,0.40) 0%, rgba(221,234,255,0.40) 100%)',
                  borderRadius: '6px',
                  width: '120px',
                  height: '42px',
                  lineHeight: '42px',
                  fontSize: '22px',
                  color: '#ffffff',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}>确定</div>
              </div>
            </div>
          ): null
        }
       
      </div>
    )
  }
}

export default index;