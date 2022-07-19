import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { getDataProvider } from '../../utils/DataUtils';
import bg from './assets/bg.png';
import headerbg from './assets/headerbg.png';
import zhihui from './assets/zhihui.png';
import ScrollText from './ScrollText';
import moment from 'moment';
import {isEqual} from 'lodash';

// _xiangyang_jobDetails_view

let imagePreUrl = 'http://10.1.50.153:9527/itsmApp';

const FormItem = props => {
  const {
    title = '',
    value = '',
    style = {}
  } = props;
  return (
    <div style = {{display: 'flex', alignItems: 'center', fontSize: 48}}>
      <div style = {{color: '#87D4FF', marginRight: 32}}>{title}</div>
      <div title = {value} style = {{height: 80, flex: 1, borderRadius: 8, background: '#5EA0FF30', color: 'white', lineHeight: '80px', padding: '0 10px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', wordBreak: 'break-all', ...style}}>{value}</div>
    </div>
  )
}

const CustomForm = props => {
  const {
    data = {}
  } = props;
  const {
    flowSource = "",
    flowStatus = "",
    reportDate = "",
    hadress = "",
    $class_1$ = "",
    $class_2$ = "",
    street = "",
    $urgency$ = "",
    jiedaodanwei = "",
    chuzhidanwei = "",
    desc = "",
    flowNo = ""
  } = data || {};
  return (
    <>
     {/** */}
     <div style = {{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
          <div style = {{width: '40%'}}>
            <FormItem title = {'事件来源'} value = {flowSource}/>
          </div>
          <div style = {{width: '40%'}}>
            <FormItem title = {'处置状态'} value = {flowStatus} style = {flowStatus === '超时'? {color: 'red'}: {}}/>
          </div>
        </div>
         {/** */}
        <div style = {{width: '100%', display: 'flex', marginTop: 40}}>
          <div style = {{width: '90%', marginLeft: '5%'}}>
            <FormItem title = {'发现时间'} value = {reportDate}/>
          </div>
        </div>
         {/** */}
         <div style = {{width: '100%', display: 'flex', marginTop: 40}}>
          <div style = {{width: '90%', marginLeft: '5%'}}>
            <FormItem title = {'发生地址'} value = {hadress}/>
          </div>
        </div>
         {/** */}
         <div style = {{width: '100%', display: 'flex', justifyContent: 'space-around', marginTop: 40}}>
          <div style = {{width: '40%'}}>
            <FormItem title = {'事件归属'} value = {$class_1$}/>
          </div>
          <div style = {{width: '40%'}}>
            <FormItem title = {'事件分类'} value = {$class_2$}/>
          </div>
        </div>
         {/** */}
         <div style = {{width: '100%', display: 'flex', justifyContent: 'space-around', marginTop: 40}}>
          <div style = {{width: '40%'}}>
            <FormItem title = {'街镇园区'} value = {street}/>
          </div>
          <div style = {{width: '40%'}}>
            <FormItem title = {'事件等级'} value = {$urgency$}/>
          </div>
        </div>
        {/** */}
        <div style = {{width: '100%', display: 'flex', marginTop: 40}}>
          <div style = {{width: '90%', marginLeft: '5%'}}>
            <FormItem title = {'受理单位'} value = {jiedaodanwei}/>
          </div>
        </div>
        <div style = {{width: '100%', display: 'flex', marginTop: 40}}>
          <div style = {{width: '90%', marginLeft: '5%'}}>
            <FormItem title = {'处置单位'} value = {jiedaodanwei}/>
          </div>
        </div>
         {/** */}
         <div style = {{width: '100%', display: 'flex', marginTop: 40}}>
          <div style = {{width: '90%', marginLeft: '5%'}}>
            <FormItem title = {'问题描述'} value = {desc}/>
          </div>
        </div>
    </>
  )
}

const PicItem = props => {
  const {
    url = '',
    style = {},
    onClick,
    containerWidth = 568,
    containerHeight = 320
  } = props;
  return (
    <div style = {{background: '#12325F', width: containerWidth, height: containerHeight, display: 'inline-block', whiteSpace: 'nowrap', ...style}}>
      <img src = {url} style = {{height: '100%', cursor: 'pointer'}} onClick = {() => onClick && onClick(url)}></img>
    </div>
  )
}

const PopImagePanel = props => {
  const {
    url,
    onClose
  } = props;

  return (
    <div onClick = {onClose} style = {{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: '#00000050', textAlign: 'center'}}>
      <img src = {url} style = {{height: '100%'}}></img>
    </div>
  )
}

const NodeItem = props => {
  const {
    date = '',
    nodeName = '',
    eventStatus = '',
    content = ''
  } = props
  return (
    <div style = {{color: 'white', display: 'flex', marginTop: 20}}>
      <div style = {{fontSize: 48, marginRight: 34}}>{moment(date, 'YYYY-MM-DD HH:mm:ss').format('MM月DD日')}</div>
      <div style = {{width: 1202, background: '#28508A', borderLeft: '8px solid #72BDFF'}}>
        <div style = {{display: 'flex', padding: 10, justifyContent: 'space-between'}}>
          <div style = {{color: '#23E9E5', fontSize: 40, width: '20%'}}>
            <div>事件状态</div>
            <div style = {{color: 'white', marginTop: 5}}>{eventStatus}</div>
          </div>
          <div style = {{color: '#23E9E5', fontSize: 40, width: '30%'}}>
            <div>阶段名称</div>
            <div style = {{color: 'white', marginTop: 5}}>{nodeName}</div>
          </div>
          <div style = {{color: '#23E9E5', fontSize: 40, width: '40%'}}>
            <div>提交时间</div>
            <div style = {{color: 'white', marginTop: 5}}>{date}</div>
          </div>
        </div>
        <div style = {{fontSize: 40, whiteSpace: 'normal', padding: '20px 20px', textAlign: 'left'}}>{content}</div>
      </div>
    </div>
  )
}

class index extends Component {

  state = {
    showPic: false,
    url: '',
    handlers: {},
    posX: 0,
    images: [],
    details: {}
  }

  componentDidMount() {

    this.images = {};
    this.details = {};

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

    const details = this.parseData(this.props);

    this.setState({
      handlers: Object.assign({}, eventValue),
      details: Object.assign({}, details),
      images: [].concat(details.images)
    });
  }

  getPics = (el = {}) => {
    let list = [];
    try {
      const piclist = el['dataName'] ? JSON.parse(el['dataName']) : [];
      if (piclist && Array.isArray(piclist)) {
        list = piclist.map(el => `${imagePreUrl}${el.downloadPath}`)
      } 
    } catch (error) {
      console.log("图片转换异常", error);
    }
    return list;
  }

  imgClick(url , index = 1) {
    let dom = document.createElement('div');
    
    ReactDOM.render(<PopImagePanel url = {url} />, dom);
    dom.onclick = function (e) {
      ReactDOM.unmountComponentAtNode(dom);
      document.body.removeChild(dom);
    }
    document.body.appendChild(dom);
  }

  componentWillReceiveProps(nextProps) {
      if (!isEqual(this.props, nextProps)) {
        const details = this.parseData(nextProps);
        this.setState({details: Object.assign({}, details), images: [].concat(details.images)});
      }
  }

  parseData = props => {
    // const d = ['已结案', dataInfo, dataliuchuan];
    const d = getDataProvider(props);
    if (d[3]) {
      imagePreUrl = d[3];
    }

    const {style = {}} = props;
    const {tempStatus = ''} = style;

    const jobNodeArr = d[1] || {};
    const details = {
      flowSource: "",
      flowStatus: "",
      reportDate: "",
      hadress: "",
      $class_1$: "",
      $class_2$: "",
      street: "",
      $urgency$: "",
      jiedaodanwei: "",
      chuzhidanwei: "",
      desc: "",
      questionTitle: "",
      flowNo: "",
      images: [],
      afterImages: [],
      nodelist: []
    }

    try {
      if (jobNodeArr) {
        for (const key in jobNodeArr) {
          if (Object.hasOwnProperty.call(jobNodeArr, key)) {
            const el = jobNodeArr[key];
            details['flowNo'] =  el['flowNo'];
            if (details.hasOwnProperty(key)) {
              details[key] = el['dataName'] || '';
            }

            if (key === 'upPicture') { 
              details.images = this.getPics(el);
              this.images['images'] = details.images;
            }

            if (key === 'upPictureAfter') { 
              details.afterImages = this.getPics(el);
              this.images['afterImages'] = details.afterImages;
            }
            
          }
        }
      }
    } catch (error) {
      
    }

    if (!details.flowStatus) {
      details.flowStatus = tempStatus + '';
    }

    details.nodelist = d[2] || [];

    return {...details};
  }

  render() {

    const details = this.state.details;

    return (
      <div style = {{background: `url(${bg})`, width: 1538, height: 2160, position: 'relative'}}>
        <div style = {{position: 'relative'}}>
          <div style = {{ position: 'absolute', background: `url(${headerbg}) no-repeat`, width: 916, height: 120, top: 52, left: 80}}>
            <div style = {{height: '100%', width: 820, marginLeft: 60}}>
              <ScrollText content = {details.questionTitle} style = {{fontSize: 48}}/>
            </div>
          </div>
          <div 
            onClick = {() => this.state.handlers.onClick && this.state.handlers.onClick(details.flowNo)}
            style = {{background: `url(${zhihui})`, width: 324, height: 106, position: 'absolute', right: 70, top: 52, cursor: 'pointer'}}></div>
        </div>
        <div style={{position: 'absolute', top: 252, width: '100%', height: 1882}}>
          <div style={{overflowX: 'hidden', overflowY: 'scroll', height: '100%', position: 'relative'}}>
            <div style = {{position: 'absolute', top: 0, width: '100%'}}>
              <CustomForm data = {details}/>
            </div>
            <div style = {{position: 'absolute', top: 964, left: 80, width : '100%'}}>
              <div style = {{display: 'flex', alignItems: 'flex-end', flexDirection: 'row', position: 'relative'}}>
                <div style={{display: 'flex',alignItems: 'center' }}>
                    <div style = {{width: 20, height: 20, background: '#00F3FF'}}></div>
                    <span style = {{fontSize: 48, color: '#00F3FF', display: 'block', marginLeft: 30}}>事件图片</span>
                </div>
                <div style={{display: 'flex', width: 260, fontSize: 36, color: 'white', position: 'relative', marginLeft: 20, marginBottom: 10}}>
                    <div style={{display: 'flex', width: 260, fontSize: 36, color: 'white', marginLeft: 20}}>
                        <div style={{position: 'absolut', top: 0, cursor: 'pointer'}} onClick = {() => this.setState({posX: 0, images: this.images.images || []})}>处置前</div>
                        <div style={{position: 'absolut', top: 0, marginLeft: 20, cursor: 'pointer'}} onClick = {() => this.setState({posX: 126, images: this.images.afterImages || []})}>处置后</div>
                    </div>
                    <div style={{position: 'absolute', transition: 'all 0.3s', width: 112, height: 6, background: 'linear-gradient(45deg, #40BFD4, #1E5EA9)', bottom: -10, left: 20, transform: `translateX(${this.state.posX}px)`}}></div>
                </div>
              </div>
              <div style = {{ width: '90%', overflowX: 'scroll', overflowY: 'hidden', textAlign: 'center',whiteSpace: 'nowrap',justifyContent: 'space-between', marginTop: 48}}>
                {this.state.images.map((el, i) => {
                  return <PicItem url = {el} style = {i === 0? {marginLeft: 0} : {marginLeft: 48}} onClick = {url => {
                    // this.setState({showPic: true, url: url})}
                    this.imgClick(url, 0)
                  }}/>
                })}
              </div>
            </div>
            <div style = {{position: 'absolute', top: 1462, left: 80, width : '100%'}}>
              <div style = {{display: 'flex', alignItems: 'center'}}>
                <div style = {{width: 20, height: 20, background: '#00F3FF'}}></div>
                <span style = {{fontSize: 48, color: '#00F3FF', display: 'block', marginLeft: 30}}>流转记录</span>
              </div>
              <div style = {{ width: '90%', height: 300, textAlign: 'center', whiteSpace: 'nowrap', justifyContent: 'space-between', marginTop: 48}}>
                {
                  details.nodelist && Array.isArray(details.nodelist) && details.nodelist.map(el => {
                    const {createDate = '', nodeName = '', nowNodeName = '', operationContent = ''} = el;
                    return <NodeItem date = {createDate} nodeName = {nodeName} eventStatus = {nowNodeName} content = {operationContent}/>
                  })
                }
              </div>
            </div>
          </div>
        </div>
        
        
        {/* {
          this.state.showPic && <PopImagePanel url = {this.state.url} onClose = {() => this.setState({showPic: false})}/>
        } */}
      </div>
    )
  }
}

export default index;
