import React, { PureComponent } from 'react';
import _, {find, groupBy, indexOf, sortBy} from 'lodash';
import styles from './index.less';


/**
 * 800*204
 * _chengdu_map_control_fc_new_1
 */

const layerSourceCount = {
  "ruleType": "专题图层",
  "layerNames": [
    "加油站","医院","学校","市区机关","区级机关","村社区","乡镇街道", "管理网格","消防救援站","消防救援大队","危化企业","派出所","地灾隐患点","公园","体育场馆","视频监控", "加气站", "酒店", "水系面"
  ],
  "queryList": [
    {
      "op": "and",
      "whereList": [
        {
          "where": {
            "key": "COUTRICT_CODE",
            "value": "510105",
            "op": "="
          }
        }
      ]
    }
  ]
}

const normalizeToArray = (value) => {
  return value instanceof Array ? value : value == null ? [] : [value];
}


export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          resourceCount: [],
          newData: [],
          list: []
        };
        this.ref = React.createRef();
        this.swiperRef = React.createRef();

        this.showDefaultLayers = false;
    }


    fireDefaultLayers = (actions = []) => {
      try {
        if (this.showDefaultLayers) return;
        let actionSet = [];
        for (let i = 0; i < actions.length; i++) {
          const el = actions[i];
          if (!el.active) continue;

          if (el.action) {
            const param = JSON.parse(el.action);
            const l = normalizeToArray(param);
            if (l) {
              const posted = {
                type: 'SHOWNSTATE',
                flag: 'GRIDFLAG',
                pinType: el.key,
                params: { type: 'fixed', action: JSON.stringify(l) },
                state: true
              }
      
              setTimeout(() => {
                // console.log('POSTED', JSON.stringify(posted));
                window.postMessage(posted, '*');
              }, 200);
            }
          }
          
        }

        
      } catch (error) {
        console.log(error)
      }

      if (actions.length > 0) this.showDefaultLayers = true;
    }

    componentDidMount() {
        try {
            const data = this.getDataProvider(this.props);
            // console.log('componentDidMount data: ',data)
            const list = [];
            let state = undefined;

            const { buffEvent = [{ type: 'click' }] } = this.props;
            let eventValue = {};

            for (let i = 0; i < buffEvent.length; i++) {
                const eventObj = buffEvent[i];
                const { type, method, bindedComponents } = eventObj;
                if (type === 'click') {
                    eventValue = {
                        onClick: (record, type) => {
                            method && method({ ...record, type }, bindedComponents)
                        }
                    }
                }
            }


            fetch('http://10.1.50.120/CoordReverse/mapTransform/layerCount', {method: 'POST', headers: {
              'Content-Type': 'application/json'
            }, body: JSON.stringify(layerSourceCount)})
            .then(res => {
              return res.json()
            }).then(res => {
              const dataCountObj = res?.data || {};
              
              const dataProvider = this.getDataProvider(this.props);

              const newData = dataProvider.map(el => {
                const obj = dataCountObj[el.name];
                if (el.count !== undefined && el.count !== null && el.count !== '') {
                  return {...el, count: el.count};
                }
                if (obj) {
                  return {...el, count: obj.totalCount || '-'};
                } else {
                  return {...el, count: '-'};
                }
              })
            this.dataCountObj = dataCountObj;


            this.fireDefaultLayers(newData);

            const groupedItems = _(newData).groupBy(item => item.group).sortBy(group => data.indexOf(group[0]))
            .map(o => {
              return {name: o[0] ? o[0]['group']: '', child: [...o]}
            })
            .value();

            this.setState({newData: [...newData], list: [...groupedItems]});
          })

            this.setState({ ...state, list, handlers: Object.assign({}, eventValue) });
            window.addEventListener('click', this.clickListener);
            window.addEventListener('message', this.mapClickRemove);
        } catch (e) {
            console.error('componentDidMount', e)
        }
      
    }

    mapClickRemove = (e) => {
      // console.log('接收postMessage', e)
      const data = e.data
      if (data === 'removeClickStr') {
        const params = JSON.parse(JSON.stringify(this.state.popverParams))
        for (let i in params) {
          params[i]['visible'] = false
        };
        this.setState({...this.state, popverParams: params})
      }
    }

    clickListener = (e) => {
      // const tabItemMap = e.target.className
      // const params = JSON.parse(JSON.stringify(this.state.popverParams))
      // // console.log(tabItemMap.indexOf('tab_item_map'))
      // if (tabItemMap.indexOf('tab_item_map') !== -1) {
      //   return
      // };
      // // params[name].visible = !params[name].visible
      // for (let i in params) {
      //   params[i]['visible'] = false
      // };
      // this.setState({...this.state, popverParams: params})
    };

    componentWillUnmount() {
      window.removeEventListener('click', this.clickListener);
      window.removeEventListener('message', this.mapClickRemove);
    }

    componentWillReceiveProps(nextProps) {
        try {
            if (!_.isEqual(nextProps, this.props)) {
                const data = this.getDataProvider(nextProps);
                const list = [];
                let state = undefined;

                let newData;
                if (this.dataCountObj) {
                  newData = data.map(el => {
                    const obj = this.dataCountObj[el.name];
                    if (obj) { 
                      return {...el, count: obj.totalCount || '-'};
                    } else {
                      return {...el, count: '-'};
                    }
                  })
                }
                console.log("componentWillReceiveProps newData: ", newData)
                this.fireDefaultLayers(newData);
                const groupedItems = _(newData).groupBy(item => item.group).sortBy(group => data.indexOf(group[0]))
                .map(o => {
                  return {name: o[0] ? o[0]['group']: '', child: [...o]}
                })
                .value();
    
                this.setState({ ...state, list: [...groupedItems], newData: newData? newData: [...data] });
                // if (data.length > 0 && !this.swiper) {
                //     this.swiper = new Swiper(this.swiperRef.current, {
                //         mousewheelControl: true,
                //         observer: true
                //     });
                // }
            }
        } catch (e) {
            console.error('componentDidMount', e)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        try {
            const { list: nl, handlers: nh, ...nextra } = this.state;
            const { list = [], handlers, ...extra } = nextState;
            // if (!_.isEqual(nextra, extra)) {
            //     console.info({ ...extra });
            //     handlers && handlers.onClick && handlers.onClick({ ...extra });
            // }
            if (!_.isEqual(nextProps, this.props) || !_.isEqual(nextra, extra)) {
                this.getDataProvider(this.props).filter(d => d && d.key).forEach(item => {
                    if (item.command === 'click') {
                        if (nextState[item.key] !== this.state[item.key]) {
                            handlers && handlers.onClick && handlers.onClick({ [item.key]: { state: nextState[item.key], data: item } });
                        }
                    } else {
                        if (nextState[item.key] !== this.state[item.key]) {
                            // let posted = {
                            //     type: 'SHOWNSTATE',
                            //     flag: 'GRIDFLAG',
                            //     pinType: item.key,
                            //     params: { type: 'fixed', action: item.action },
                            //     state: nextState[item.key]
                            // }

                            // setTimeout(() => {
                            //     // console.log('POST', JSON.stringify(posted));
                            //     window.postMessage(posted, '*');
                            // }, 200);
                        }
                    }
                });
            }
        } catch (e) {
            console.error('shouldComponentUpdate', e)
        }

        return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);
    }

    getDataProvider = props => {
        const { dataProvider } = props;

        if (dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && dataProvider[0] !== '') {
            return [...dataProvider]
        } else {
            return [];
        }
    }

    handleClickItem = (data, parentKey, activeKey) => {
        // console.log('点击=》〉', i, item, parent, e)
        // if (e && e.stopPropagation) {
        //     e.stopPropagation();
        // }
        
        // const { key } = item;
        // const filter = this.getDataProvider(this.props).filter(d => d && d.key).filter(item => item.key === key || item.key === parent.key);
        // if (filter[0]) {
            
            // const state = this.state[key];
            // const exclude = typeof filter[0].exclude === 'string' ? filter[0].exclude.split(',') : filter[0].exclude;
            // const exclude = null;

            try {
              const {list = []} = this.state;
              const newList = list.map((el, i) => {
                if (i === parentKey) {
                  const {child = []} = el;
                  const newChild = child.map((o, j) => {
                    if (j === activeKey) {

                      const posted = {
                        type: 'SHOWNSTATE',
                        flag: 'GRIDFLAG',
                        pinType: o.key,
                        params: { type: 'fixed', action: o.action },
                        state: !o.active
                      }

                      setTimeout(() => {
                        // console.log('POST', JSON.stringify(posted));
                        window.postMessage(posted, '*');
                      }, 200);

                      return {...o, active: !o.active}
                    }
                    return {...o}
                  })
                  return {...el, child: [...newChild]}
                }
                return {...el};
              })
              this.setState({list: [...newList]});


                // const params = JSON.parse(JSON.stringify(this.state.popverParams))
                // console.log('点击前：',this.state.newData)
                // params[item.group].child[i] = !params[item.group].child[i]
                // const res = params[item.group].child.filter(d=>!!d)
                // params[item.group].active = res.length > 0
                // if (Array.isArray(exclude)) {
                //     const excludes = {};

                //     exclude.forEach(value => {
                //         excludes[value] = false;
                //     });
                //     if (Array.isArray(filter[0].children)) {
                //         filter[0].children.forEach(value => {
                //             excludes[value.key] = false;
                //         });
                //     }

                //     this.setState({ ...this.state, ...excludes, [key]: !state, [parent.key]: true, popverParams: params });
                // } else {
                //     this.setState({ ...this.state, [key]: !state, [parent.key]: true, [exclude]: false, popverParams: params });
              //   // }
              // const newData = this.state.newData.map((el, i) => {
              //   if (key === el['key']) {
              //     return {...el, active: !el.active}
              //   }
              //   return {...el};
              // })

              // this.setState({newData: [...newData]})
                
            } catch (e) {
                // console.info(e);
            }
        // }
    }

    generateData(data) {
        let result = [];
        if (data && Array.isArray(data)) {
            result = data.map((item, i) => {
               return <div key={item.key} className={styles.item} style={ this.state[item.key] ? {background: 'linear-gradient(180deg, #8DD3FF, #2C52A6)'}: {background: 'linear-gradient(180deg, #5B78AA, #17367C)'}} onClick={item.children && !this.state[item.key] ? null : this.onClick.bind(this, item, {})}>
                    <div style={{color: 'white', fontSize: 28}}>{item.name}</div>
                </div>
            })
        }
        return result;
    }

    generateGroupItem(data, key) {
        let result = [];
        if(data && Array.isArray(data)) {
            result = data.map((item, i,v)=>{
                // const childFlag = this.state.popverParams[item.group].child
                // if (childFlag.length === 1) {
                //   return
                // }
                const {active = false} = item;
                return ( <div 
                  key={item.key} 
                  style = {{display: 'flex'}}
                  className={['tab_item_map', styles.popverItem,active?styles.popverItem_active:[]].join(" ")} onClick={() => this.handleClickItem(data, key, i)}>
                    <div title={item.name} style={{width: 215, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                      {item.name}
                    </div> 
                    {
                      item.count && (
                        <div>
                          {item.count}
                        </div>
                      )
                    }
                </div>)
            })
        }
        return result
    }

    popverBtnClick(name, mapData) {
        const params = JSON.parse(JSON.stringify(this.state.popverParams))
        params[name].visible = !params[name].visible
        const child = params[name].child
        this.setState({
            ...this.state,
            popverParams: {
                ...params
            }
        }, () => {
          if (child.length === 1) {
            this.onClick(0, mapData[name][0], {})
          }
        })
    }
    generateGroupData(list = []) {
        let result = [];
        // result = sort.map((name, index)=> {
        //     const obj = this.state.popverParams[name]
        //     // console.log(obj)
        //     return <div key={index} style={{position: 'relative'}}>
        //         <div ref={()=>this['groupItemPanel_'+index]} className={styles.btnsPopver} 
        //             style={{display: obj.visible?'':'none',position: 'absolute', left: '10px',width: '300px',top: -(mapData[name].length * 80)+'px' }}
        //         >
        //             {this.generateGroupItem(mapData[name])}
        //         </div>
        //         <div className={['tab_item_map', styles.item,(obj.visible || obj.active)?styles.itemActive:[]].join(' ')} onClick={()=>this.popverBtnClick(name, mapData)}>
                  
        //           {mapData[name].length > 1 ? name: mapData[name][0].name}
        //         </div>
        //     </div>
        // })
        // return result
      //   result = sort.map((name, index)=> {
      //     const obj = this.state.popverParams[name]
      //     // console.log(obj)
      //     return <div key={index} style={{position: 'relative'}}>
      //         <div ref={()=>this['groupItemPanel_'+index]} className={styles.btnsPopver} 
      //             style={{display: obj.visible?'':'none',position: 'absolute', left: '10px',width: '300px',top: -(mapData[name].length * 80)+'px' }}
      //         >
      //             {this.generateGroupItem(mapData[name])}
      //         </div>
      //         <div className={['tab_item_map', styles.item,(obj.visible || obj.active)?styles.itemActive:[]].join(' ')} onClick={()=>this.popverBtnClick(name, mapData)}>
                
      //           {mapData[name].length > 1 ? name: mapData[name][0].name}
      //         </div>
      //     </div>
      // })


      result = list.map((el ,i) => {
        const {name = '', child = [], open = false} = el || {};
        const scaleY = open? 1: 0;
        const isActivePanel = find(child, o => o.active);
        return (
          <div key={i} style={{position: 'relative', display: 'flex', justifyContent: 'center'}}>
            {
              child.length > 1 && (
                <div className={styles.btnsPopver} style = {{position: 'absolute', top: -child.length * 80, transform: `scaleY(${scaleY})`}}>
                {this.generateGroupItem(child, i)}
            </div>
              )
            }
            <div className={['tab_item_map', styles.item, isActivePanel? styles.itemActive: ''].join(' ')} style = {{color: 'white'}} onClick={()=> this.handleOpenPanel(i)}>
              {name}
            </div>
          </div>
        )
      })
      return result
    }

    handleOpenPanel = (id) => {

      // 只有一个元素的时候，直接触发第一个元素
      const l = this.state.list[id];
      const {child = []} = l || {}
      if (child.length <= 1) {

        this.handleClickItem([], id, 0);
        return;
      }


      const newList = this.state.list.map((el, i) => {
        if (i === id) {
          return {...el, open: !el.open}
        }
        return {...el};
      })
      this.setState({list: [...newList]});
    }

    render() {
        // const data = this.getDataProvider(this.props);
        // const data = [{"key":"9","name":"公园","exclude":"","group":"市政规划","action":"[{\"ActionName\":\"ShowData\",\"Parameters\":{\"name\":\"公园\",\"type\":\"layer\",\"data\":{\"layers\":{\"name\":\"公园\"}}}}]"},{"key":"10","name":"学校","exclude":"","group":"市政规划","action":"[{\"ActionName\":\"ShowData\",\"Parameters\":{\"name\":\"学校\",\"type\":\"layer\",\"data\":{\"layers\":{\"name\":\"学校\"}}}}]"},{"key":"11","name":"星级酒店","exclude":"","group":"市政规划","action":"[{\"ActionName\":\"ShowData\",\"Parameters\":{\"name\":\"星级酒店\",\"type\":\"layer\",\"data\":{\"layers\":{\"name\":\"星级酒店\"}}}}]"},{"key":"12","name":"公共厕所","exclude":"","group":"市政规划","action":"[{\"ActionName\":\"ShowData\",\"Parameters\":{\"name\":\"公共厕所\",\"type\":\"layer\",\"data\":{\"layers\":{\"name\":\"公共厕所\"}}}}]"},{"key":"13","name":"医院","exclude":"","group":"市政规划","action":"[{\"ActionName\":\"ShowData\",\"Parameters\":{\"name\":\"医院\",\"type\":\"layer\",\"data\":{\"layers\":{\"name\":\"医院\"}}}}]"},{"key":"14","name":"市区机关","exclude":"","group":"市政规划","action":"[{\"ActionName\":\"ShowData\",\"Parameters\":{\"name\":\"市区机关\",\"type\":\"layer\",\"data\":{\"layers\":{\"name\":\"市区机关\"}}}}]"},{"key":"15","name":"区级机关","exclude":"","group":"市政规划","action":"[{\"ActionName\":\"ShowData\",\"Parameters\":{\"name\":\"区级机关\",\"type\":\"layer\",\"data\":{\"layers\":{\"name\":\"区级机关\"}}}}]"},{"key":"16","name":"加油站","exclude":"","group":"市政规划","action":"[{\"ActionName\":\"ShowData\",\"Parameters\":{\"name\":\"加油站\",\"type\":\"layer\",\"data\":{\"layers\":{\"name\":\"加油站\"}}}}]"},{"key":"17","name":"市消防救援支队","exclude":"","group":"城市安全","action":"[{\"ActionName\":\"ShowData\",\"Parameters\":{\"name\":\"市消防救援支队\",\"type\":\"layer\",\"data\":{\"layers\":{\"name\":\"市消防救援支队\"}}}}]"}]
        
        const {newData = [], list} = this.state;

        // console.log('this.state: ',this.state)
        // let sort = []
        // let sortMap = {}
        // if(newData && Array.isArray(newData)){
        //   newData.forEach(item=>{
        //         const {group} = item
        //         if(!sortMap[group]) {
        //             sortMap[group] = [item]
        //             sort.push(group)
        //         }else{
        //             sortMap[group].push(item)
        //         }
        //     });
        //     // console.log('init: ',this.state.popverParams)
        //     if(!this.state.popverParams){
        //         // console.log('初始化')
        //         this.initState(sortMap, sort)
        //     }
        // }

        return (
            <div ref={this.ref} className={styles.ywtg_map_control_basic_wrapper}>
                {/* {this.generateGroupData(sortMap, sort)} */}
                {this.generateGroupData(list)}
            </div>
        );
    }
}