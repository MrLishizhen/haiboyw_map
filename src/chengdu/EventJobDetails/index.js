import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {getDataProvider} from '../../utils/DataUtils';
import bg from './assets/bg.png';
import headerbg from './assets/headerbg.png';
import zhihui from './assets/zhihui.png';
import ScrollText from './ScrollText';
import zImg from './assets/z.png'
import spanImg from './assets/spanbg.png'
import moment from 'moment';
import './styles/audioStyle.less'


 // _chengdu_eventView_jobDetails

let imagePreUrl = 'http://10.1.50.153:9527/itsmApp';

const VideoItem = props => {
  const {
      url = '',
      thumbnail = '',
      style = {},
      onClick,
      containerWidth = 284,
      containerHeight = 160
  } = props;
  return (
      <div style={{
          marginBottom: 10,
          background: '#12325F',
          paddingBottom: '50%',
          width: '100%',
          position: 'relative'
      }}>
        <video controls style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0}}>
          <source src = {url}/>
          您的浏览器不支持 HTML5 video 标签。
        </video>
      </div>
  )
}

const AudioItem = props => {
  const {
      url = '',
      thumbnail = '',
      style = {},
      onClick,
      containerWidth = 284,
      containerHeight = 160
  } = props;
  return (
      <div style={{
          marginBottom: 10,
          background: '#12325F00',
          // width: '100%',
          position: 'relative'
      }}>
        <audio controls style={{width: '100%'}}>
          <source src = {url}/>
          您的浏览器不支持该音频格式。
        </audio>
      </div>
  )
}

const FormItem = props => {
    const {
        title = '',
        value = '',
        style = {}
    } = props;
    const height = value !== ''? 'auto': 33.5;
    return (
        <div style={{display: 'flex', alignItems: 'center', width: '100%', height: '100%', fontSize: 24}}>
            <div style={{color: '#87D4FF', marginRight: 17}}>{title}</div>
            <div title={value} style={{
                width:props.width||'auto',
                height: height,
                flex: 1,
                borderRadius: 4,
                background: '#5EA0FF30',
                color: 'white',
                // lineHeight: '40px',
                padding: '5px 7px',
                // whiteSpace: 'nowrap',
                // textOverflow: 'ellipsis',
                // overflow: 'hidden',
                wordBreak: 'break-all'
            }}>{value}</div>
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
        questionTitle='',
        hadress = "",
        $class_1$ = "",
        $class_2$ = "",
        street = "",
        $urgency$ = "",
        jiedaodanwei = "",
        chuzhidanwei = "",
        desc = "",
        classD='',//要点信息
        flowNo = "",

        classTitle = '',//问题标题
        finishDate = '',//结案时间
        finishRemark=''//结案意见
    } = data || {};
    return (
        <>
            {/** reportDate*/}
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
                <div style={{width: '50%'}}>
                    <FormItem title={'事件来源'} value={flowSource}/>
                </div>
                <div style={{width: '50%',marginLeft:39}}>
                    <FormItem title={'发现时间'} value={reportDate}/>
                </div>

            </div>
            {/** */}
            <div style={{width: '100%', display: 'flex', marginTop: 22}}>
                <div style={{width: '100%'}}>
                    <FormItem title={'发生地址'} value={hadress}/>
                </div>
            </div>


            {/** */}
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-around', marginTop: 22}}>
                <div style={{width: '50%'}}>
                    <FormItem title={'事件归属'} value={$class_1$}/>
                </div>
                <div style={{width: '50%',marginLeft:39}}>
                    <FormItem title={'事件分类'} value={$class_2$}/>
                </div>
            </div>

            {/** 新增 */}
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-around', marginTop: 22}}>
                <div style={{width: '100%',}}>
                    <FormItem title={'事件名称'} value={questionTitle}/>
                </div>
            </div>
            {/** */}
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-around', marginTop: 22}}>
                <div style={{width: '50%'}}>
                    <FormItem title={'街镇园区'} value={street}/>
                </div>
                <div style={{width: '50%',marginLeft:39}}>
                    <FormItem title={'事件性质'} value={$urgency$}/>
                </div>
            </div>
            {/** */}
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-around', marginTop: 22}}>
                <div style={{width: '50%'}}>
                    <FormItem title={'受理单位'} value={jiedaodanwei}/>
                </div>
                <div style={{width: '50%',marginLeft:39}}>
                    <FormItem title={'处置单位'} value={chuzhidanwei}/>
                </div>
            </div>
            {/** 新增*/}
            <div style={{width: '100%', display: 'flex', marginTop: 22}}>
                <div style={{width: '100%',}}>
                    <FormItem title={'问题标题'} value={questionTitle}/>
                </div>
            </div>
            {/** */}
            <div style={{width: '100%', display: 'flex', marginTop: 22}}>
                <div style={{width: '100%', }}>
                    <FormItem title={'问题描述'} value={desc}/>
                </div>
            </div>
            {/** 新增 */}
            <div style={{width: '100%', display: 'flex', marginTop: 22}}>
                <div style={{width: '100%', }}>
                    <FormItem title={'结案时间'} value={finishDate}/>
                </div>
            </div>
            {/** 新增*/}
            <div style={{width: '100%', display: 'flex', marginTop: 22}}>
                <div style={{width: '100%', }}>
                    <FormItem title={'结案意见'} value={finishRemark}/>
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
        containerWidth = 284,
        containerHeight = 160
    } = props;
    return (
        <div style={{
            marginBottom: 10,
            background: '#12325F',
            width: containerWidth,
            height: containerHeight,
            display: 'inline-block',
            whiteSpace: 'nowrap', ...style
        }}>
            <img src={url} style={{height: '100%', cursor: 'pointer'}} onClick={() => onClick && onClick(url)}></img>
        </div>
    )
}

const PopImagePanel = props => {
    const {
        url,
        onClose
    } = props;

    return (
        <div onClick={onClose} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#00000050',
            textAlign: 'center'
        }}>
            <img src={url} style={{height: '100%'}}></img>
        </div>
    )
}

const NodeItem = props => {
    const {
        date = '',
        nodeName = '',
        eventStatus = '',
        content = '',
        dataLength = 0,
    } = props
    return (
        <div style={{color: 'white', display: 'flex', marginTop: 20}}>
            <div style={{fontSize: 24,minWidth:100, marginRight: 17,flexShrink: 0,display:'flex',flexDirection: 'column',alignItems: 'center'}}>
                <span style={{flexShrink: 0}}>{moment(date, 'YYYY-MM-DD HH:mm:ss').format('MM月DD日')}</span>

                {dataLength>1 ?<span style={{borderLeft:'2px dashed #00FFB2',flexGrow: 1}}></span>:'' }
            </div>
            <div style={{ background: '#28508A',flexGrow: 1, borderLeft: '8px solid #72BDFF'}}>
                <div style={{display: 'flex', padding: 10, justifyContent: 'space-between'}}>
                    <div style={{color: '#23E9E5', fontSize: 20, }}>
                        <div>操作名称</div>
                        <div style={{color: 'white', marginTop: 5}}>{eventStatus}</div>
                    </div>
                    <div style={{color: '#23E9E5', fontSize: 20,}}>
                        <div>当前节点</div>
                        <div style={{color: 'white', marginTop: 5}}>{nodeName}</div>
                    </div>
                    <div style={{color: '#23E9E5', fontSize: 20, }}>
                        <div>提交时间</div>
                        <div style={{color: 'white', marginTop: 5}}>{date}</div>
                    </div>
                </div>
                <div style={{
                    fontSize: 20,
                    whiteSpace: 'normal',
                    padding: '20px 20px',
                    textAlign: 'left'
                }}>{content}</div>
            </div>
        </div>
    )
}

class index extends Component {

    state = {
        showPic: false,
        url: '',
        handlers: {}
    }

    componentDidMount() {

        let eventValue = {};

        const {buffEvent = [{type: 'click'}]} = this.props;
        for (let i = 0; i < buffEvent.length; i++) {
            const eventObj = buffEvent[i];
            const {type, method, bindedComponents} = eventObj;
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

    getVideos = (el = {}) => {
      let list = [];
        try {
            const piclist = el['dataName'] ? JSON.parse(el['dataName']) : [];
            if (piclist && Array.isArray(piclist)) {
                list = piclist.map(el => {
                  return {
                    url: `${imagePreUrl}${el.downloadPath}`,
                    thumbnail: ''
                  }
                })
            }
        } catch (error) {
            console.log("视频转换异常", error);
        }
        return list;
    }

    getAudios = (el = {}) => {
      let list = [];
        try {
            const piclist = el['dataName'] ? JSON.parse(el['dataName']) : [];
            if (piclist && Array.isArray(piclist)) {
                list = piclist.map(el => {
                  return {
                    url: `${imagePreUrl}${el.downloadPath}`
                  }
                })
            }
        } catch (error) {
            console.log("音频转换异常", error);
        }
        return list;
    }

    imgClick(url, index = 1) {
        let dom = document.createElement('div');

        ReactDOM.render(<PopImagePanel url={url}/>, dom);
        dom.onclick = function (e) {
            ReactDOM.unmountComponentAtNode(dom);
            document.body.removeChild(dom);
        }
        document.body.appendChild(dom);
    }

    render() {

        // const d = ['已结案', dataInfo, dataliuchuan];
        // const d = getDataProvider(this.props);

        // const {style = {}} = this.props;
        // const {tempStatus = ''} = style;

        // const jobNodeArr = d[1] || [];
        // const details = {
        //     flowSource: "",
        //     flowStatus: "",
        //     reportDate: "",
        //     addr: "",
        //     classA: "",
        //     classB: "",
        //     street: "",
        //     emergency: "",
        //     jiedaodanwei: "",
        //     chuzhidanwei: "",
        //     desc: "",
        //     questionTitle: "",
        //     flowNo: "",
        //     images: [],
        //     afterImages: [],
        //     nodelist: [],
        //     classD:'',//要点信息
        //     classTitle : '',//问题标题
        //     finishDate : '',//结案时间
        //     finishRemark:'',//结案意见
        //     states:[],
        // }
        // console.log(details.states,159)
        // if (jobNodeArr && Array.isArray(jobNodeArr)) {
        //     for (let i = 0; i < jobNodeArr.length; i++) {
        //         const el = jobNodeArr[i];
        //         const key = el['dataKey'];
        //         const flowNo = el['flowNo'];
        //         details['flowNo'] = flowNo;
        //         if (details.hasOwnProperty(key)) {
        //             details[key] = el['dataName'] || '';
        //         }

        //         if (key === 'upPicture') {
        //             details.images = this.getPics(el);
        //         }

        //         if (key === 'upPictureAfter') {
        //             details.afterImages = this.getPics(el);
        //         }
        //     }
        // }

        // if (!details.flowStatus) {
        //     details.flowStatus = tempStatus + '';
        // }

        // details.nodelist = d[2] || [];


        // const d = ['已结案', dataInfo, dataliuchuan];
    const d = getDataProvider(this.props);
    if (d[3]) {
      imagePreUrl = d[3];
    }

    const {style = {}} = this.props;
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
      upMovie: [],
      upVoice: [],
      nodelist: [],
      finishDate: '',
      finishRemark: ''
    }

    try {
      if (jobNodeArr) {
        for (const key in jobNodeArr) {
          if (Object.hasOwnProperty.call(jobNodeArr, key)) {
            const el = jobNodeArr[key];
            details['flowNo'] =  el['flowNo'];
            if (details.hasOwnProperty(key)) {
              details[key] = el['dataName'] || '';
              // details[key] = el['dataValue'] || '';
            }

            if (key === 'upPicture') { 
              details.images = this.getPics(el);
            }

            if (key === 'upPictureAfter') { 
              details.afterImages = this.getPics(el);
            }

            if (key === 'upMovie') {
              details.upMovie = this.getVideos(el);
            }
            
            if (key === 'upVoice') {
              details.upVoice = this.getAudios(el);
            }
          }
        }
      }
    } catch (error) {
      
    }
    // if (jobNodeArr && Array.isArray(jobNodeArr)) {
    //   for (let i = 0; i < jobNodeArr.length; i++) {
    //     const el = jobNodeArr[i];
    //     const key = el['dataKey'];
    //     const flowNo = el['flowNo'];
    //     details['flowNo'] = flowNo;
    //     if (details.hasOwnProperty(key)) {
    //       details[key] = el['dataName'] || '';
    //     }

    //     if (key === 'upPicture') { 
    //       details.images = this.getPics(el);
    //     }

    //     if (key === 'upPictureAfter') { 
    //       details.afterImages = this.getPics(el);
    //     }
    //   }
    // }

    if (!details.flowStatus) {
      details.flowStatus = tempStatus + '';
    }

    details.nodelist = d[2] || [];

    const detailImages = [].concat(details.images, details.afterImages)


        return (
            <div style={{
                background: `url(${bg}) no-repeat center center/100% 100%`,
                width: 1800,
                height: 780,
                position: 'relative'
            }}>
                <div style={{position: 'relative'}}>
                    <div style={{
                        height: 45,
                        position: 'absolute',
                        left: '50%',
                        textAlign: 'center',
                        top: 31,
                        fontSize: 32,
                        fontWeight: 500,
                        color: "#fff",
                        transform: 'transLateX(-50%)'
                    }}>{`工单号：${details.flowNo}`}
                    </div>
                    {/*  <div style = {{ position: 'absolute', background: `url(${headerbg}) no-repeat`, width: 916, height: 120, top: 52, left: 80}}>*/}
                    {/*    <div style = {{height: '100%', width: 820, marginLeft: 60}}>*/}
                    {/*      <ScrollText content = {details.questionTitle} style = {{fontSize: 48}}/>*/}
                    {/*    </div>*/}
                    {/*  </div>*/}
                    {/*  <div*/}
                    {/*    onClick = {() => this.state.handlers.onClick && this.state.handlers.onClick(details.flowNo)}*/}
                    {/*    style = {{background: `url(${zhihui})`, width: 324, height: 106, position: 'absolute', right: 70, top: 52, cursor: 'pointer'}}></div>*/}
                </div>
                <div style={{position: 'absolute', top: 126,left:27, width: 833, height: 600, overflowY: 'scroll'}}>
                    <CustomForm data={details}/>
                </div>

                <span className={''} style={{position:'absolute',top:126,left:885,width:2,height:625,background:'url('+zImg+') no-repeat center center/100% 100%'}}></span>
                <div style={{position: 'absolute', top: 126, left: 1490, width: '290px'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{width: 10, height: 10, background: '#00F3FF'}}></div>
                        <span style={{fontSize: 24, color: '#00F3FF', display: 'block', marginLeft: 15}}>事件图片、音视频</span>
                    </div>
                    <div style={{
                        width: '100%',
                        overflowX: 'hidden',
                        height: 538,
                        overflowY: 'scroll',
                        textAlign: 'center',
                        // whiteSpace: 'nowrap',
                        justifyContent: 'space-between',
                        marginTop: 24
                    }}>
                      {details.upVoice.map((el, i) => {
                        return (
                          <AudioItem url = {el.url} />
                        )
                      })}

                      {details.upMovie.map((el, i) => {
                        return (
                          <VideoItem url = {el.url} thumbnail = {el.thumbnail}/>
                        )
                      })}

                      {detailImages.map((el, i) => {
                          return <PicItem url={el}
                                          onClick={url => {
                                              // this.setState({showPic: true, url: url})}
                                              this.imgClick(url, 0)
                                          }}/>
                      })}
                    </div>
                </div>
                <span className={''} style={{position:'absolute',top:126,left:1463,width:2,height:625,background:'url('+zImg+') no-repeat center center/100% 100%'}}></span>
                <div style={{position: 'absolute', top: 126, left: 912, width: '540px'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{width: 10, height: 10, background: '#00F3FF'}}></div>
                        <span style={{fontSize: 24, color: '#00F3FF', display: 'block', marginLeft: 15}}>流转记录</span>
                    </div>
                    <div style={{
                        width: '100%',
                        height: 538,
                        overflowX: 'hidden',
                        overflowY: 'scroll',
                        textAlign: 'center',
                        // whiteSpace: 'nowrap',
                        justifyContent: 'space-between',
                        marginTop: 24
                    }}>
                        {
                            details.nodelist && Array.isArray(details.nodelist) && details.nodelist.map((el,i,data) => {
                                const {createDate = '', nodeName = '', nowNodeName = '', operationContent = ''} = el;
                                return <NodeItem dataLength={data.length} date={createDate} nodeName={nodeName} eventStatus={nowNodeName}
                                                 content={operationContent}/>
                            })
                        }
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
