import React, {useState, useEffect, Fragment} from 'react';
// import bg from './assets/sd.png';
// import hy from './assets/hy_bg.png';
// import HostStatus from './haiboyw/Map/index';
// import Select from './ywtg/12345rexian';
// import Select from './huan_l_percentage';
// import Select from './weather_li';
// import Select from './Li_ui/map_gd/index_xy_sj';
// import Select from './Li_ui/columnarArea/index'
// import Select from './Li_ui/gdfb_li_new/index_chengdu_new'
import Select from './rxyp_custom_ck/heighthappenaxis/index'
// import Select from './Li_ui/columnarArea/index'
//轮播图
// import Select from './Li_ui/AutoScrollTable/index';Y
// import Select from './yq_cy/index';

// import Select from './gis-demo/index';
// import Select from './Li_ui/xinxixiangqing/index';
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
import zd from "./Li_ui/map_gd/img/zd.png";
import yc from "./Li_ui/map_gd/img/yc.png";
import gp from "./Li_ui/map_gd/img/gp.png";
import cs from "./Li_ui/map_gd/img/cs.png";

const datalist = [
    {
        "name": "学校",
        "value": "8",
        "pintype": "jk_xx",
        "type": "学校",
        "icon": "/fastdfs/group1/M00/00/19/wKgJx18pES-AW48DAAAGxlzNPs8493.png",
        "svg": "重点场所.svg"
    },
    {"name": "接种门诊", "value": "119", "pintype": "jk_jzmz", "type": "接种门诊", "svg": "医学隔离点.svg"},
    {"name": "发热门诊", "value": "26", "pintype": "jk_frmz", "type": "发热门诊", "svg": "医疗设施.svg"},
    {"name": "肠道门诊", "value": "39", "pintype": "jk_cdmz", "type": "肠道门诊", "svg": "疫情分布.svg"},
    {"name": "食品监测点", "value": "172", "pintype": "jk_spjcd", "type": "食品监测", "svg": "食品.svg"},
    {"name": "病媒生物监测", "value": "186", "pintype": "jk_bmsw", "type": "病媒微生物", "svg": "病媒生物监测.svg"},
];

const datalist2 = [{"ID": 1, "A": "1", "B": "上海虹桥枢纽已发现体温异常101人", "C": "439万", "D": "1"}, {
    "ID": 2,
    "A": "2",
    "B": "蒋超良 两天内检测完武汉所有疑似患者",
    "C": "357万",
    "D": "3"
}, {"ID": 3, "A": "3", "B": "5个废弃口罩换1块肥皂", "C": "270万", "D": "8"}, {
    "ID": 4,
    "A": "4",
    "B": "下一站是幸福",
    "C": "82万",
    "D": "13"
}, {"ID": 5, "A": "5", "B": "交警远程监控喊阿姨戴口罩", "C": "82万", "D": "23"}, {
    "ID": 6,
    "A": "6",
    "B": "假期有人找和没人找的心理",
    "C": "80万",
    "D": "20"
}];


class App extends React.Component {
    state = {
        gis:[{"name":"北新泾街道蒲北居委","value":5307},{"name":"天山路街道仙霞居委","value":2397},{"name":"虹桥临空经济园区临空","value":2189},{"name":"天山路街道紫云居委","value":1252},{"name":"虹桥街道伊犁居委","value":1148},{"name":"虹桥街道荣华一期居委","value":1098},{"name":"虹桥街道荣华三期居委","value":1097},{"name":"新华路街道人民居委","value":932},{"name":"华阳路街道苏一居委","value":902},{"name":"新华路街道左家宅居委","value":891},{"name":"新泾镇平塘居委","value":823},{"name":"虹桥街道何家角居委","value":802},{"name":"江苏路街道北汪居委","value":798},{"name":"虹桥街道荣华二期居委","value":787},{"name":"新华路街道杨宅居委","value":775},{"name":"江苏路街道万村居委","value":771},{"name":"新泾镇刘三居委","value":767},{"name":"新华路街道西镇居委","value":761},{"name":"新华路街道东镇居委","value":723},{"name":"天山路街道中紫居委","value":718},{"name":"华阳路街道徐家宅居委","value":693},{"name":"华阳路街道西一居委","value":649},{"name":"虹桥街道中山居委","value":620},{"name":"江苏路街道利西居委","value":611},{"name":"程家桥街道南龚居委","value":600},{"name":"周家桥街道沈家郎居委","value":597},{"name":"华阳路街道潘西居委","value":592},{"name":"仙霞新村街道仙逸居委","value":584},{"name":"新泾镇新泾居委","value":579},{"name":"江苏路街道福世居委","value":576},{"name":"程家桥街道上航新村居委","value":571},{"name":"新华路街道张家宅居委","value":557},{"name":"江苏路街道江苏居委","value":541},{"name":"江苏路街道愚三居委","value":540},{"name":"新泾镇曙光居委","value":528},{"name":"仙霞新村街道水霞居委","value":527},{"name":"天山路街道茅台居委","value":525},{"name":"新泾镇淞三居委","value":524},{"name":"华阳路街道建宁居委","value":513},{"name":"新泾镇刘二居委","value":511},{"name":"新泾镇林泉居委","value":509},{"name":"新泾镇虹康居委","value":502},{"name":"新泾镇绿八居委","value":500},{"name":"新华路街道梅安居委","value":496},{"name":"北新泾街道新泾三村居委","value":495},{"name":"新泾镇程桥居委","value":493},{"name":"仙霞新村街道芙一居委","value":476},{"name":"仙霞新村街道五三居委","value":465},{"name":"虹桥街道虹欣居委","value":464},{"name":"新泾镇定威居委","value":463},{"name":"新华路街道番禺居委","value":461},{"name":"程家桥街道虹桥机场新村居委","value":460},{"name":"新泾镇绿十二居委","value":452},{"name":"华阳路街道长二居委","value":450},{"name":"新华路街道田度居委","value":448},{"name":"周家桥街道中五居委","value":445},{"name":"华阳路街道天诚居委","value":443},{"name":"华阳路街道长一居委","value":443},{"name":"天山路街道纺大居委","value":442},{"name":"新华路街道香花居委","value":442},{"name":"新泾镇北虹居委","value":438},{"name":"虹桥街道安东居委","value":435},{"name":"新华路街道红庄居委","value":426},{"name":"新泾镇双流居委","value":425},{"name":"周家桥街道天山华庭居委","value":420},{"name":"新华路街道幸福居委","value":416},{"name":"江苏路街道岐三居委","value":412},{"name":"新泾镇绿十一居委","value":411},{"name":"程家桥街道嘉利豪园居委","value":410},{"name":"新泾镇天山星城居委","value":408},{"name":"仙霞新村街道虹仙居委","value":405},{"name":"新华路街道陈家巷居委","value":404},{"name":"江苏路街道西浜居委","value":404},{"name":"虹桥街道爱建居委","value":401},{"name":"新泾镇绿一居委","value":398},{"name":"新泾镇刘一居委","value":397},{"name":"江苏路街道长新居委","value":395},{"name":"华阳路街道华五居委","value":390},{"name":"新泾镇新渔东路居委","value":389},{"name":"新泾镇淞四居委","value":389},{"name":"华阳路街道潘东居委","value":388},{"name":"华阳路街道华一居委","value":387},{"name":"天山路街道友谊居委","value":384},{"name":"新泾镇屈家桥居委","value":382},{"name":"华阳路街道华三居委","value":379},{"name":"北新泾街道新泾一村一居委","value":379},{"name":"天山路街道联建居委","value":377},{"name":"仙霞新村街道威宁居委","value":374},{"name":"虹桥街道虹东居委","value":373},{"name":"天山路街道延西居委","value":370},{"name":"华阳路街道陶家宅居委","value":370},{"name":"仙霞新村街道虹日居委","value":370},{"name":"周家桥街道大家源居委","value":369},{"name":"新泾镇华松居委","value":368},{"name":"周家桥街道周二居委","value":359},{"name":"虹桥街道虹桥居委","value":359},{"name":"新泾镇中泾居委","value":356},{"name":"周家桥街道中四居委","value":355},{"name":"新华路街道新华居委","value":355},{"name":"天山路街道四村居委","value":354},{"name":"江苏路街道东浜居委","value":353},{"name":"新泾镇福泉居委","value":347},{"name":"仙霞新村街道虹景居委","value":343},{"name":"天山路街道天义居委","value":342},{"name":"新泾镇绿五居委","value":339},{"name":"新泾镇淮阴居委","value":334},{"name":"周家桥街道武夷花园居委","value":330},{"name":"北新泾街道剑河居委","value":326},{"name":"新泾镇淞二居委","value":325},{"name":"新泾镇刘四居委","value":317},{"name":"华阳路街道姚家角居委","value":315},{"name":"周家桥街道周一居委","value":314},{"name":"仙霞新村街道虹古居委","value":313},{"name":"江苏路街道南汪居委","value":313},{"name":"华阳路街道秀水居委","value":312},{"name":"虹桥街道虹梅居委","value":306},{"name":"天山路街道三村居委","value":306},{"name":"程家桥街道王满居委","value":304},{"name":"北新泾街道北翟居委","value":302},{"name":"仙霞新村街道仙二居委","value":299},{"name":"天山路街道新光居委","value":297},{"name":"北新泾街道新泾五村居委","value":296},{"name":"北新泾街道新泾七村居委","value":290},{"name":"天山路街道遵义居委","value":288},{"name":"仙霞新村街道古宋居委","value":286},{"name":"华阳路街道潘中居委","value":284},{"name":"仙霞新村街道天原二村居委","value":282},{"name":"仙霞新村街道大金更居委","value":281},{"name":"天山路街道二村居委","value":281},{"name":"天山路街道玉屏居委","value":281},{"name":"新华路街道和平居委","value":275},{"name":"新泾镇怡景苑居委","value":275},{"name":"虹桥街道新顺居委","value":273},{"name":"新华路街道泰安居委","value":272},{"name":"周家桥街道范北居委","value":270},{"name":"天山路街道新风居委","value":268},{"name":"程家桥街道宝北居委","value":266},{"name":"北新泾街道新泾一村二居委","value":265},{"name":"北新泾街道新泾二村居委","value":264},{"name":"仙霞新村街道杜一居委","value":259},{"name":"新泾镇新泾北苑居委","value":257},{"name":"仙霞新村街道茅台花苑居委","value":254},{"name":"虹桥街道长顺居委","value":252},{"name":"新泾镇南洋新都居委","value":251},{"name":"周家桥街道锦屏居委","value":246},{"name":"新泾镇虹九居委","value":245},{"name":"新泾镇淞五居委","value":241},{"name":"程家桥街道程桥二村居委","value":238},{"name":"仙霞新村街道虹纺居委","value":237},{"name":"华阳路街道飞乐居委","value":234},{"name":"天山路街道天山居委","value":230},{"name":"北新泾街道新泾四村居委","value":228},{"name":"仙霞新村街道虹霞居委","value":227},{"name":"程家桥街道程桥一村居委","value":222},{"name":"周家桥街道古南居委","value":208},{"name":"虹桥街道虹储居委","value":205},{"name":"江苏路街道曹家堰居委","value":198},{"name":"周家桥街道天山河畔居委","value":196},{"name":"周家桥街道杨家宅居委","value":195},{"name":"周家桥街道上海花城居委","value":194},{"name":"周家桥街道春天花园居委","value":193},{"name":"虹桥街道虹许居委","value":190},{"name":"周家桥街道仁恒河滨居委","value":190},{"name":"仙霞新村街道安龙居委","value":188},{"name":"周家桥街道虹桥新城居委","value":186},{"name":"虹桥街道虹南居委","value":185},{"name":"仙霞新村街道茅台新苑居委","value":183},{"name":"虹桥街道长虹居委","value":174},{"name":"新华路街道牛桥居委","value":168},{"name":"仙霞新村街道五一居委","value":167},{"name":"北新泾街道新泾六村居委","value":166},{"name":"华阳路街道华四居委","value":162},{"name":"北新泾街道元丰居委","value":159},{"name":"周家桥街道长宁新城居委","value":158},{"name":"仙霞新村街道虹旭居委","value":151},{"name":"周家桥街道中山公寓居委","value":150},{"name":"周家桥街道虹桥万博居委","value":148},{"name":"仙霞新村街道锦苑居委","value":146},{"name":"江苏路街道华山居委","value":143},{"name":"华阳路街道长支二居委","value":135},{"name":"北新泾街道新泾八村居委","value":130},{"name":"仙霞新村街道芙二居委","value":125},{"name":"天山路街道天支居委","value":121},{"name":"华阳路街道华院居委","value":116},{"name":"北新泾街道金平居委","value":100},{"name":"华阳路街道华二居委","value":97},{"name":"北新泾街道哈密居委","value":90},{"name":"周家桥街道新天地居委","value":80}],
        dataProvider: [{
            "ID": 11009,
            "NAME": "",
            "VIDEOID": "42060100001310013078",
            "DATATIME": "",
            "BELONGSTREET": "",
            "LEVEL": "",
            "ISDAULT": "1",
            "type": "襄城区"
        }, {
            "ID": 11010,
            "NAME": "",
            "VIDEOID": "42060200001310002942",
            "DATATIME": "",
            "BELONGSTREET": "",
            "LEVEL": "",
            "ISDAULT": "1",
            "type": "襄城区"
        }, {
            "ID": 11011,
            "NAME": "",
            "VIDEOID": "42060100001310013066",
            "DATATIME": "",
            "BELONGSTREET": "",
            "LEVEL": "",
            "ISDAULT": "1",
            "type": "襄城区"
        }, {
            "ID": 11012,
            "NAME": "",
            "VIDEOID": "42060600001310002702",
            "DATATIME": "",
            "BELONGSTREET": "",
            "LEVEL": "",
            "ISDAULT": "1",
            "type": "襄城区"
        }],
        style: {},
        value: '{"type":"SHOWNSTATE","flag":"GRIDFLAG","pinType":"cnBorder","points":[],"params":{"default":true,"pinType":"cnBorder","messageType":"feature"},"state":true}'
    }

    componentDidMount() {
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
                <div style={{
                    width:1749, height: 560,
                    backgroundColor: '#485C6D'
                    /*, position: 'relative', transform: 'scale(0.25)', transformOrigin: '0 0'*/
                }}>
                    {/*["420606",3840,2160,18,112.1365989605144, 32.04559347308233]*/}
                    <Select dataProvider={[...this.state.gis]} style={this.state.style}/>
                </div>
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
                {/*<Select dataProvider={[]} style={this.state.style}/>*/}
                {/* <input style={{ width: 480, height: 72 }} onChange={(e) => this.setState({ value: e.target.value })} /> */}
                {/* <button style={{ width: 480, height: 72 }} onClick={() => this.setState({
          style: { info: { "type": "自发自处", "flowNo": "CNS20210802007922", "questionTitle": "新渔浦广友小区沿河晾晒已由居委处理", "creatDate": "2021-08-02 09:43:57", "addr": "长宁区 福泉路 129号/", "flowStatus": "结束", "upPicture": "[{\"downloadPath\":\"/upload/2021-08/5d5d634507f83c5fa1d5c8a11d6ffb2d.jpg\",\"serverId\":\"1reyqcyuQxqrU4IBijFzwUaCiKB3TD720Lu5OBG9O70oq2mh8ZINldenki0wwwMZB\",\"url\":\"http://220.196.244.98:9527/itsmApp/upload/2021-08/5d5d634507f83c5fa1d5c8a11d6ffb2d.jpg\"}]", "caseDonePhoto": "[{\"downloadPath\":\"/upload/2021-08/5d5d634507f83c5fa1d5c8a11d6ffb2d.jpg\",\"serverId\":\"1reyqcyuQxqrU4IBijFzwUaCiKB3TD720Lu5OBG9O70oq2mh8ZINldenki0wwwMZB\",\"url\":\"http://220.196.244.98:9527/itsmApp/upload/2021-08/5d5d634507f83c5fa1d5c8a11d6ffb2d.jpg\"}]" } },
          dataProvider: [{ "type": "style", "wrapper": { "width": 816, "height": 860 }, "subWrapper": { "height": 780 }, "main": { "width": 704, "height": 712, "padding": "34px 16px" } }, { "page": 1, "rows": [{ "createDate": "2021-07-27 15:20:04", "createUser": "嵇毅华", "flowNo": "20210727023630", "fromNodeId": "node-200", "isDel": false, "nodeName": "办结反馈", "operationContent": "用户【嵇毅华】执行操作【确认作废】，工单状态由【作废审核】改为【已取消】，操作意见为：【作废】", "operationType": "确认作废", "orderNodeId": "end", "redundancy": [], "updateDate": "2021-07-27 15:20:04", "useTimeMinute": "193.83333", "userId": 1015 }, { "createDate": "2021-07-27 15:19:53", "createUser": "嵇毅华", "flowNo": "20210727023630", "fromNodeId": "node-200", "isDel": false, "nodeName": "派单处置", "operationContent": "用户【嵇毅华】执行操作【作废】，工单状态由【待分派】改为【作废审核】，操作意见为：【未达立案标准】", "operationType": "作废", "orderNodeId": "node-200", "redundancy": [], "updateDate": "2021-07-27 15:19:53", "useTimeMinute": "193.65", "userId": 1015 }, { "createDate": "2021-07-27 12:06:14", "createUser": "物联感知平台", "flowNo": "20210727023630", "fromNodeId": "node-200", "isDel": false, "nodeName": "派单处置", "operationContent": "用户【物联感知平台】执行操作【系统自动派单】，工单状态由【系统自动开单】改为【待分派】", "operationType": "系统自动派单", "orderNodeId": "node-200", "redundancy": [], "updateDate": "2021-07-27 12:06:14", "useTimeMinute": "0", "userId": 3 }], "searchFilter": [], "size": 9999, "total": 3 }]
        })}>发送</button> */}
                <button style={{width: 240, height: 72,}} onClick={() => {


                    const list = [];
                    // for(let i = 0; i < data.length; i ++) {
                    //     const el = data[i];
                    //     // if (el && el.isSlaOverTime) {
                    //         list.push({
                    //             level: el.emergency,
                    //             title: el.classD,
                    //             time: el.creatDate,
                    //             type: el.classA,
                    //             no: el.flowNo,
                    //             flowStatus: el.flowStatus,
                    //             isOverTime: true,
                    //             lat: el.lat,
                    //             lng: el.lng,
                    //             defaultRowCount: 2
                    //         })
                    //     }
                    // // }


                    this.setState({
                        gis: ['唐太宗','李世民']
                        // gis: [{
                        //     time: '2022-01-05',
                        //     show: true
                        //
                        //     // gteDate:'2021-01-01 00:00:00',
                        //     // lteDate:'2021-12-31 23:59:59'
                        // }]// gis: data
                    },()=>{
                        console.log(123456)
                    })


                    // this.setState({
                    //     // 导入数据
                    //     dataProvider: [],
                    //     // 更新组件样式
                    //     style: {
                    //         background: 'red',
                    //         asds
                    //     }
                    // })
                }}>发送
                </button>
                {/* <button style={{ width: 240, height: 72 }} onClick={() => this.setState({ style: { active: 3 } })}>发送2</button> */}
                {/* <button style={{ width: 240, height: 72 }} onClick={() => this.setState({ style: { active: undefined } })}>发送3</button> */}
                {/* <button style={{ width: 240, height: 72 }} onClick={() => this.setState({ style: { query: { 'streetName': "阳" } } })}>发送2</button> */}
                {/* <button onClick={() => this.setState({ dataProvider: ["常规监测", "感染性腹泻", "手足口病"] })}>点击</button>
        {/* </div> */}
                {/* </div> */}
                {/* <div style={{ width: 800, height: 660, backgroundColor: 'rgba(216, 216, 216, 0.3)', display: 'inline-block' }}>
          <Select fixed={true} />
        </div> */}
            </Fragment>
        )
    }
}

export default App;
