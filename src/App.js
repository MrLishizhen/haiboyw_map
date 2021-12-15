import React, { useState, useEffect, Fragment } from 'react';
// import bg from './assets/sd.png';
// import hy from './assets/hy_bg.png';
// import HostStatus from './haiboyw/Map/index';
// import Select from './ywtg/12345rexian';
// import Select from './huan_l_percentage';
// import Select from './weather_li';
// import Select from './Li_ui/map_gd/index';
import Select from './gis-demo/index';
// import Select from './xy/application_market/index';
// import Select from './ywtg/weather_forecast';
// import Select from './Tab';
// import Select from './Login';
// import Select from './Calendar';
// import Time from './jiutaons/Search/Calendar';
// import Select from './Iframe';
import Index from './taibao';
import Detail from './AppButtonSlider_AutoPlay';
import moment from 'moment';

import data from './ywtg/aj_detail_pop/data';
import data1 from './wj_map_data/data1';
import data2 from './wj_map_data/data2';
import data3 from './wj_map_data/data3';

const datalist = [
  { "name": "学校", "value": "8", "pintype": "jk_xx", "type": "学校", "icon": "/fastdfs/group1/M00/00/19/wKgJx18pES-AW48DAAAGxlzNPs8493.png", "svg": "重点场所.svg" },
  { "name": "接种门诊", "value": "119", "pintype": "jk_jzmz", "type": "接种门诊", "svg": "医学隔离点.svg" },
  { "name": "发热门诊", "value": "26", "pintype": "jk_frmz", "type": "发热门诊", "svg": "医疗设施.svg" },
  { "name": "肠道门诊", "value": "39", "pintype": "jk_cdmz", "type": "肠道门诊", "svg": "疫情分布.svg" },
  { "name": "食品监测点", "value": "172", "pintype": "jk_spjcd", "type": "食品监测", "svg": "食品.svg" },
  { "name": "病媒生物监测", "value": "186", "pintype": "jk_bmsw", "type": "病媒微生物", "svg": "病媒生物监测.svg" },
];

const datalist2 = [{ "ID": 1, "A": "1", "B": "上海虹桥枢纽已发现体温异常101人", "C": "439万", "D": "1" }, { "ID": 2, "A": "2", "B": "蒋超良 两天内检测完武汉所有疑似患者", "C": "357万", "D": "3" }, { "ID": 3, "A": "3", "B": "5个废弃口罩换1块肥皂", "C": "270万", "D": "8" }, { "ID": 4, "A": "4", "B": "下一站是幸福", "C": "82万", "D": "13" }, { "ID": 5, "A": "5", "B": "交警远程监控喊阿姨戴口罩", "C": "82万", "D": "23" }, { "ID": 6, "A": "6", "B": "假期有人找和没人找的心理", "C": "80万", "D": "20" }];

// const dataSample = [
//   {
//     name: '明东',
//     shanggangwuliu: 22,
//     shehuicheliang: 44
//   },  {
//     name: '尚东',
//     shanggangwuliu: 33,
//     shehuicheliang: 65
//   }, {
//     name: '冠东',
//     shanggangwuliu: 37,
//     shehuicheliang: 12
//   }, {
//     name: '盛东',
//     shanggangwuliu: 87,
//     shehuicheliang: 44
//   }, {
//     name: '浦东',
//     shanggangwuliu: 66,
//     shehuicheliang: 22
//   }, {
//     name: '浦东',
//     shanggangwuliu: 66,
//     shehuicheliang: 22
//   }, {
//     name: '浦东',
//     shanggangwuliu: 66,
//     shehuicheliang: 22
//   }, {
//     name: '浦东',
//     shanggangwuliu: 66,
//     shehuicheliang: 22
//   }
// ]

// const data = [{
//   name: "罗泾",
//   value: 23,
//   level: 0,
//   workType: 'W_CB',
//   stopWarning: 1,
//   progressWarning: 21,
//   regionalWarning: 1,
//   stopLevel: 0,
//   progressLevel: 1,
//   regionalLevel:2
// },
// {
//   name: "罗矿",
//   value: 84,
//   level: 0,
//   workType: 'W_CB',
//   stopWarning: 2,
//   progressWarning: 1,
//   regionalWarning: 2,
//   stopLevel: 0,
//   progressLevel: 1,
//   regionalLevel:2
// },
// {
//   name: "罗煤",
//   value: 67,
//   level: 0,
//   workType: 'W_CB',
//   stopWarning: 14,
//   progressWarning: 21,
//   regionalWarning: 2,
//   stopLevel: 0,
//   progressLevel: 1,
//   regionalLevel:2
// },
// {
//   name: "张华浜",
//   value: 84,
//   level: 0,
//   workType: 'W_CB',
//   stopWarning: 14,
//   progressWarning: 21,
//   regionalWarning: 0
// },
// {
//   name: "共青",
//   value: 12,
//   level: 0,
//   workType: 'W_CB',
//   stopWarning: 14,
//   progressWarning: 21,
//   regionalWarning: 12,
//   stopLevel: 0,
//   progressLevel: 1,
//   regionalLevel:2
// },
// {
//   name: "浦远",
//   value: 77,
//   level: 0,
//   workType: 'W_CB',
//   stopWarning: 14,
//   progressWarning: 21,
//   regionalWarning: 0,
//   stopLevel: 0,
//   progressLevel: 1,
//   regionalLevel:2
// },
// {
//   name: "海通",
//   value: 64,
//   level: 0,
//   workType: 'W_CB',
//   stopWarning: 14,
//   progressWarning: 21,
//   regionalWarning: 0,
//   stopLevel: 0,
//   progressLevel: 1,
//   regionalLevel:2
// },
// {
//   name: "龙吴",
//   value: 90,
//   level: 0,
//   workType: 'W_CB',
//   stopWarning: 14,
//   progressWarning: 21,
//   regionalWarning: 0,
//   stopLevel: 0,
//   progressLevel: 1,
//   regionalLevel:2
// },
// {
//   name: "洋油",
//   value: 90,
//   level: 0,
//   workType: 'W_CB',
//   stopWarning: 14,
//   progressWarning: 21,
//   regionalWarning: 2,
//   stopLevel: 0,
//   progressLevel: 1,
//   regionalLevel:2
// }]

// const weather = "大雨";

class App extends React.Component {
  state = {
    gis:[],
    dataProvider: [{ "ID": 11009, "NAME": "", "VIDEOID": "42060100001310013078", "DATATIME": "", "BELONGSTREET": "", "LEVEL": "", "ISDAULT": "1", "type": "襄城区" }, { "ID": 11010, "NAME": "", "VIDEOID": "42060200001310002942", "DATATIME": "", "BELONGSTREET": "", "LEVEL": "", "ISDAULT": "1", "type": "襄城区" }, { "ID": 11011, "NAME": "", "VIDEOID": "42060100001310013066", "DATATIME": "", "BELONGSTREET": "", "LEVEL": "", "ISDAULT": "1", "type": "襄城区" }, { "ID": 11012, "NAME": "", "VIDEOID": "42060600001310002702", "DATATIME": "", "BELONGSTREET": "", "LEVEL": "", "ISDAULT": "1", "type": "襄城区" }],
    style: {},
    value: '{"type":"SHOWNSTATE","flag":"GRIDFLAG","pinType":"cnBorder","points":[],"params":{"default":true,"pinType":"cnBorder","messageType":"feature"},"state":true}'
  }

  componentDidMount() {

    console.info('devicePixelRatio', window.devicePixelRatio);
    const ratio = window.devicePixelRatio;
    // console.info(-0.6 * ratio + 1.55);
    // if (ratio != 1) {   // 如果进行了缩放，也就是不是1
    //   document.body.style.zoom = 2;   // 就去修改页面的缩放比例，这个公式我自己算的，不准确，勉强。
    // }
  }

  // componentDidMount() {
  //   window.addEventListener('message', (event) => {
  //     let msg = {};
  //     console.info(window.location.href, event.data);
  //     if (typeof event.data === 'string') {
  //       try {
  //         msg = JSON.parse(event.data)
  //       } catch (e) {

  //       }
  //       if (msg.type === 'visdata') {
  //         this.setState({ msg: [...this.state.msg, moment().format("YYYY-MM-DD HH:mm:ss") + "：" + msg.msg] });
  //         // event.source.postMessage(JSON.stringify({ type: 'visdata', msg: `back: ` }))
  //       }
  //       if (!this.origin) {
  //         this.source = event.source;
  //         this.origin = event.origin;
  //       }
  //     }
  //   });
  // }

  // onClick = () => {
  //   var value = document.getElementById('text').value;

  //   //  父级
  //   if (window.location.href.indexOf('type=child') === -1) {
  //     var iframe = document.getElementById('myiframe').contentWindow;
  //     iframe.postMessage(JSON.stringify({ type: 'visdata', msg: `msg: ${value}` }), 'http://localhost:7002')
  //   } else {
  //     if (this.source) {
  //       this.source.postMessage(JSON.stringify({ type: 'visdata', msg: `back: ${value}` }), this.origin)
  //     }
  //     // window.parent.document.postMessage(JSON.stringify({ type: 'visdata', msg: `back: ` }))
  //   }
  // }

  onClick = (value) => {
    window.postMessage(this.state.value, '*');
  }

  calculate(data, list) {
    let result = 0;

    list.forEach(i => {
      result += data[i - 1];
    });

    return result;
  }

  render() {
    return (
      // <div style = {{ height: 1080, width: 1440, background: `url(${hy}) no-repeat` }}>
      //   {/* <HostStatus dataProvider={dataSample}/> */}
      //   <HostStatus dataProvider = {[""]} />
      // </div>
      <Fragment>
        {/* <div style={{ width: 1920, height: 660, backgroundColor: 'white', display: 'inline-block' }}> */}
        {/* <div>
            {window.location.href.indexOf('type=child') === -1 && <iframe id='myiframe' src='http://localhost:7002?type=child' width={400} height={300} style={{ backgroundColor: 'red' }} />}
          </div>
          <div>
            <input id='text' />
            <button onClick={this.onClick}>发送</button>
            {this.state.msg.map((item, index) => {
              return (<div key={index}>{item}</div>)
            })}
          </div> */}
        {/* <div style={{ height: 740 }}> */}
        {/* <Index /> */}
        {/*width: 1200, height: 800,*/}

          {/*区域编码，宽，高，放大倍数，中心店*/}
          <Select dataProvider={[]} style={this.state.style}/>
        {/* <input style={{ width: 480, height: 72 }} onChange={(e) => this.setState({ value: e.target.value })} /> */}
        {/* <button style={{ width: 480, height: 72 }} onClick={() => this.setState({
          style: { info: { "type": "自发自处", "flowNo": "CNS20210802007922", "questionTitle": "新渔浦广友小区沿河晾晒已由居委处理", "creatDate": "2021-08-02 09:43:57", "addr": "长宁区 福泉路 129号/", "flowStatus": "结束", "upPicture": "[{\"downloadPath\":\"/upload/2021-08/5d5d634507f83c5fa1d5c8a11d6ffb2d.jpg\",\"serverId\":\"1reyqcyuQxqrU4IBijFzwUaCiKB3TD720Lu5OBG9O70oq2mh8ZINldenki0wwwMZB\",\"url\":\"http://220.196.244.98:9527/itsmApp/upload/2021-08/5d5d634507f83c5fa1d5c8a11d6ffb2d.jpg\"}]", "caseDonePhoto": "[{\"downloadPath\":\"/upload/2021-08/5d5d634507f83c5fa1d5c8a11d6ffb2d.jpg\",\"serverId\":\"1reyqcyuQxqrU4IBijFzwUaCiKB3TD720Lu5OBG9O70oq2mh8ZINldenki0wwwMZB\",\"url\":\"http://220.196.244.98:9527/itsmApp/upload/2021-08/5d5d634507f83c5fa1d5c8a11d6ffb2d.jpg\"}]" } },
          dataProvider: [{ "type": "style", "wrapper": { "width": 816, "height": 860 }, "subWrapper": { "height": 780 }, "main": { "width": 704, "height": 712, "padding": "34px 16px" } }, { "page": 1, "rows": [{ "createDate": "2021-07-27 15:20:04", "createUser": "嵇毅华", "flowNo": "20210727023630", "fromNodeId": "node-200", "isDel": false, "nodeName": "办结反馈", "operationContent": "用户【嵇毅华】执行操作【确认作废】，工单状态由【作废审核】改为【已取消】，操作意见为：【作废】", "operationType": "确认作废", "orderNodeId": "end", "redundancy": [], "updateDate": "2021-07-27 15:20:04", "useTimeMinute": "193.83333", "userId": 1015 }, { "createDate": "2021-07-27 15:19:53", "createUser": "嵇毅华", "flowNo": "20210727023630", "fromNodeId": "node-200", "isDel": false, "nodeName": "派单处置", "operationContent": "用户【嵇毅华】执行操作【作废】，工单状态由【待分派】改为【作废审核】，操作意见为：【未达立案标准】", "operationType": "作废", "orderNodeId": "node-200", "redundancy": [], "updateDate": "2021-07-27 15:19:53", "useTimeMinute": "193.65", "userId": 1015 }, { "createDate": "2021-07-27 12:06:14", "createUser": "物联感知平台", "flowNo": "20210727023630", "fromNodeId": "node-200", "isDel": false, "nodeName": "派单处置", "operationContent": "用户【物联感知平台】执行操作【系统自动派单】，工单状态由【系统自动开单】改为【待分派】", "operationType": "系统自动派单", "orderNodeId": "node-200", "redundancy": [], "updateDate": "2021-07-27 12:06:14", "useTimeMinute": "0", "userId": 3 }], "searchFilter": [], "size": 9999, "total": 3 }]
        })}>发送</button> */}
        <button style={{ width: 240, height: 72 }} onClick={() => {
          this.setState({
            // 导入数据
            dataProvider: [],
            // 更新组件样式
            style: {
              background: 'red',
              asds
            }
          })
        }}>发送</button>
        {/* <button style={{ width: 240, height: 72 }} onClick={() => this.setState({ style: { active: 3 } })}>发送2</button> */}
        {/* <button style={{ width: 240, height: 72 }} onClick={() => this.setState({ style: { active: undefined } })}>发送3</button> */}
        {/* <button style={{ width: 240, height: 72 }} onClick={() => this.setState({ style: { query: { 'streetName': "阳" } } })}>发送2</button> */}
        {/* <button onClick={() => this.setState({ dataProvider: ["常规监测", "感染性腹泻", "手足口病"] })}>点击</button>
        {/* </div> */}
        {/* </div> */}
        {/* <div style={{ width: 800, height: 660, backgroundColor: 'rgba(216, 216, 216, 0.3)', display: 'inline-block' }}>
          <Select fixed={true} />
        </div> */}
      </Fragment >
    )
  }
}

export default App;
