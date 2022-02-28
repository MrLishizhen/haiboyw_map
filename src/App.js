import React, {useState, useEffect, Fragment} from 'react';
// import bg from './assets/sd.png';
// import hy from './assets/hy_bg.png';
// import HostStatus from './haiboyw/Map/index';
// import Select from './ywtg/12345rexian';
// import Select from './huan_l_percentage';
// import Select from './weather_li';
import Select from './Li_ui/map_gd/index_xy_sj';
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
        gis: [''],
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
        // setTimeout(() => {
        // //     let datas = [];
        // //     let data =  [{
        // //         name: '襄阳市',
        // //         lng: '112.121743',
        // //         lat: '32.010161',
        // //         result: []
        // //     }
        // //     ]
        // // //     if (data && Array.isArray(data)) {
        // // //         const s = data[0] || '';
        // // //         const info = data[1] || {};
        // // //         const infolist = info.data || [];
        // // //
        // // //         const node = data[2] || {};
        // // //         const n1 = node.data || {};
        // // //         const n2 = n1.datas || {};
        // // //         const n3 = n2.rows || [];
        // // //
        // // //         datas = [s, infolist, n3]
        // // //     }
        //     this.setState({
        //         gis: [{
        //             gteDate:'2021-01-01 00:00:00',
        //             lteDate:'2021-12-30 23:59:59'
        //         }]// gis: data
        //     })
        // }, 1000)



        // setTimeout(()=>{
        //     this.setState({
        //         // gis: [{name:'东津新区',count: 12345,ycl:123,wcl:123,zb:58,},{name: '樊城区',count:12345,ycl: 123,wcl:123,zb: 58},{name: '高新技术产业开发区',count:12345,ycl:123,wcl:123,zb:58},{name:'襄城区',count: 12345,ycl: 123,wcl:123,zb:58},{name:'襄州区',count:12345,ycl:123,wcl:123,zb:58,},{name:'鱼梁洲经济开发区',count: 12345,ycl:123,wcl:123,zb:58,},{name:'保康县',count:12345,ycl:123,wcl:123,zb:58,},{name:'谷城县',count: 12345,ycl:123,wcl:123,zb:58,},{name:'老河口市',count:12345,ycl:123,wcl:123,zb:58}]
        //         gis: [{
        //             name: '襄阳市',
        //             lng: '112.121743',
        //             lat: '32.010161',
        //             result: [{
        //                 "exception": false, //工单是否异常
        //                 "isSlaOverTime": false, //工单是否超时
        //                 "classC": "独居老人关爱", //子类
        //                 "questionTitle": "独居老人关爱", //事件标题
        //                 "lng": "112.716", //经度
        //                 "city": "襄城区", //城区
        //                 "classA": "智能发现", //事件大类
        //                 "highUseClassC": true, //是否高频工单
        //                 "creatDate": "2021-12-21 08:27:41", //创建时间
        //                 "jiedaodanwei-end": 609,
        //                 "major": false, //是否重大工单
        //                 "flowSource": "独居老人关爱", //事件来源
        //                 "flowNo": "20211221090676", //工单号
        //                 "addr": "ab小区2栋403", //地址
        //                 "flowStatus": "100",
        //                 "nodeId": "node-200", //工单状态  end 表示处理完成  其他表示未处理
        //                 "lat": "32.410" //纬度
        //             },
        //                 {
        //                     "exception": false, //工单是否异常
        //                     "isSlaOverTime": false, //工单是否超时
        //                     "classC": "独居老人关爱", //子类
        //                     "questionTitle": "独居老人关爱", //事件标题
        //                     "lng": "112.716", //经度
        //                     "city": "襄城区", //城区
        //                     "classA": "智能发现", //事件大类
        //                     "highUseClassC": true, //是否高频工单
        //                     "creatDate": "2021-12-21 08:27:41", //创建时间
        //                     "jiedaodanwei-end": 609,
        //                     "major": false, //是否重大工单
        //                     "flowSource": "独居老人关爱", //事件来源
        //                     "flowNo": "20211221090675", //工单号
        //                     "addr": "XX小区2栋301", //地址
        //                     "flowStatus": "100",
        //                     "nodeId": "node-200", //工单状态  end 表示处理完成  其他表示未处理
        //                     "lat": "32.410" //纬度
        //                 },
        //                 {
        //                     "exception": false, //工单是否异常
        //                     "isSlaOverTime": false, //工单是否超时
        //                     "classC": "独居老人关爱", //子类
        //                     "questionTitle": "独居老人关爱", //事件标题
        //                     "lng": "112.716", //经度
        //                     "city": "襄城区", //城区
        //                     "classA": "智能发现", //事件大类
        //                     "highUseClassC": true, //是否高频工单
        //                     "creatDate": "2021-12-21 07:57:42", //创建时间
        //                     "jiedaodanwei-end": 609,
        //                     "major": false, //是否重大工单
        //                     "flowSource": "独居老人关爱", //事件来源
        //                     "flowNo": "20211220090674", //工单号
        //                     "addr": "ab小区2栋403", //地址
        //                     "flowStatus": "100",
        //                     "nodeId": "node-200", //工单状态  end 表示处理完成  其他表示未处理
        //                     "lat": "32.410" //纬度
        //                 },
        //                 {
        //                     "exception": false, //工单是否异常
        //                     "isSlaOverTime": false, //工单是否超时
        //                     "classC": "独居老人关爱", //子类
        //                     "questionTitle": "独居老人关爱", //事件标题
        //                     "lng": "112.716", //经度
        //                     "city": "襄城区", //城区
        //                     "classA": "智能发现", //事件大类
        //                     "highUseClassC": true, //是否高频工单
        //                     "creatDate": "2021-12-21 07:57:41", //创建时间
        //                     "jiedaodanwei-end": 609,
        //                     "major": false, //是否重大工单
        //                     "flowSource": "独居老人关爱", //事件来源
        //                     "flowNo": "20211220090673", //工单号
        //                     "addr": "XX小区2栋301", //地址
        //                     "flowStatus": "100",
        //                     "nodeId": "node-200", //工单状态  end 表示处理完成  其他表示未处理
        //                     "lat": "32.410" //纬度
        //                 },
        //                 {
        //                     "exception": false, //工单是否异常
        //                     "isSlaOverTime": false, //工单是否超时
        //                     "classC": "独居老人关爱", //子类
        //                     "questionTitle": "独居老人关爱", //事件标题
        //                     "lng": "112.716", //经度
        //                     "city": "襄城区", //城区
        //                     "classA": "智能发现", //事件大类
        //                     "highUseClassC": true, //是否高频工单
        //                     "creatDate": "2021-12-21 07:27:41", //创建时间
        //                     "jiedaodanwei-end": 609,
        //                     "major": false, //是否重大工单
        //                     "flowSource": "独居老人关爱", //事件来源
        //                     "flowNo": "20211220090671", //工单号
        //                     "addr": "XX小区2栋301", //地址
        //                     "flowStatus": "100",
        //                     "nodeId": "node-200", //工单状态  end 表示处理完成  其他表示未处理
        //                     "lat": "32.410" //纬度
        //                 },
        //                 {
        //                     "exception": false, //工单是否异常
        //                     "isSlaOverTime": false, //工单是否超时
        //                     "classC": "独居老人关爱", //子类
        //                     "questionTitle": "独居老人关爱", //事件标题
        //                     "lng": "112.716", //经度
        //                     "city": "襄城区", //城区
        //                     "classA": "智能发现", //事件大类
        //                     "highUseClassC": true, //是否高频工单
        //                     "creatDate": "2021-12-21 07:27:41", //创建时间
        //                     "jiedaodanwei-end": 609,
        //                     "major": false, //是否重大工单
        //                     "flowSource": "独居老人关爱", //事件来源
        //                     "flowNo": "20211220090672", //工单号
        //                     "addr": "ab小区2栋403", //地址
        //                     "flowStatus": "100",
        //                     "nodeId": "node-200", //工单状态  end 表示处理完成  其他表示未处理
        //                     "lat": "32.410" //纬度
        //                 },
        //                 {
        //                     "exception": false, //工单是否异常
        //                     "isSlaOverTime": false, //工单是否超时
        //                     "classC": "独居老人关爱", //子类
        //                     "questionTitle": "独居老人关爱", //事件标题
        //                     "lng": "112.716", //经度
        //                     "city": "襄城区", //城区
        //                     "classA": "智能发现", //事件大类
        //                     "highUseClassC": true, //是否高频工单
        //                     "creatDate": "2021-12-21 06:57:41", //创建时间
        //                     "jiedaodanwei-end": 609,
        //                     "major": false, //是否重大工单
        //                     "flowSource": "独居老人关爱", //事件来源
        //                     "flowNo": "20211220090669", //工单号
        //                     "addr": "XX小区2栋301", //地址
        //                     "flowStatus": "100",
        //                     "nodeId": "node-200", //工单状态  end 表示处理完成  其他表示未处理
        //                     "lat": "32.410" //纬度
        //                 },
        //                 {
        //                     "exception": false, //工单是否异常
        //                     "isSlaOverTime": false, //工单是否超时
        //                     "classC": "独居老人关爱", //子类
        //                     "questionTitle": "独居老人关爱", //事件标题
        //                     "lng": "112.716", //经度
        //                     "city": "襄城区", //城区
        //                     "classA": "智能发现", //事件大类
        //                     "highUseClassC": true, //是否高频工单
        //                     "creatDate": "2021-12-21 06:57:41", //创建时间
        //                     "jiedaodanwei-end": 609,
        //                     "major": false, //是否重大工单
        //                     "flowSource": "独居老人关爱", //事件来源
        //                     "flowNo": "20211220090670", //工单号
        //                     "addr": "ab小区2栋403", //地址
        //                     "flowStatus": "100",
        //                     "nodeId": "node-200", //工单状态  end 表示处理完成  其他表示未处理
        //                     "lat": "32.410" //纬度
        //                 },
        //                 {
        //                     "exception": false, //工单是否异常
        //                     "isSlaOverTime": false, //工单是否超时
        //                     "classC": "独居老人关爱", //子类
        //                     "questionTitle": "独居老人关爱", //事件标题
        //                     "lng": "112.716", //经度
        //                     "city": "襄城区", //城区
        //                     "classA": "智能发现", //事件大类
        //                     "highUseClassC": true, //是否高频工单
        //                     "creatDate": "2021-12-21 06:27:41", //创建时间
        //                     "jiedaodanwei-end": 609,
        //                     "major": false, //是否重大工单
        //                     "flowSource": "独居老人关爱", //事件来源
        //                     "flowNo": "20211220090667", //工单号
        //                     "addr": "XX小区2栋301", //地址
        //                     "flowStatus": "100",
        //                     "nodeId": "node-200", //工单状态  end 表示处理完成  其他表示未处理
        //                     "lat": "32.410" //纬度
        //                 },
        //                 {
        //                     "exception": false, //工单是否异常
        //                     "isSlaOverTime": false, //工单是否超时
        //                     "classC": "独居老人关爱", //子类
        //                     "questionTitle": "独居老人关爱", //事件标题
        //                     "lng": "112.716", //经度
        //                     "city": "襄城区", //城区
        //                     "classA": "智能发现", //事件大类
        //                     "highUseClassC": true, //是否高频工单
        //                     "creatDate": "2021-12-21 06:27:41", //创建时间
        //                     "jiedaodanwei-end": 609,
        //                     "major": false, //是否重大工单
        //                     "flowSource": "独居老人关爱", //事件来源
        //                     "flowNo": "20211220090668", //工单号
        //                     "addr": "ab小区2栋403", //地址
        //                     "flowStatus": "100",
        //                     "nodeId": "node-200", //工单状态  end 表示处理完成  其他表示未处理
        //                     "lat": "32.410" //纬度
        //                 },
        //                 {
        //                     "exception": false, //工单是否异常
        //                     "isSlaOverTime": false, //工单是否超时
        //                     "classC": "独居老人关爱", //子类
        //                     "questionTitle": "独居老人关爱", //事件标题
        //                     "lng": "112.716", //经度
        //                     "city": "襄城区", //城区
        //                     "classA": "智能发现", //事件大类
        //                     "highUseClassC": true, //是否高频工单
        //                     "creatDate": "2021-12-21 05:57:42", //创建时间
        //                     "jiedaodanwei-end": 609,
        //                     "major": false, //是否重大工单
        //                     "flowSource": "独居老人关爱", //事件来源
        //                     "flowNo": "20211220090666", //工单号
        //                     "addr": "ab小区2栋403", //地址
        //                     "flowStatus": "100",
        //                     "nodeId": "node-200", //工单状态  end 表示处理完成  其他表示未处理
        //                     "lat": "32.410" //纬度
        //                 },
        //                 {
        //                     "exception": false, //工单是否异常
        //                     "isSlaOverTime": false, //工单是否超时
        //                     "classC": "独居老人关爱", //子类
        //                     "questionTitle": "独居老人关爱", //事件标题
        //                     "lng": "112.716", //经度
        //                     "city": "襄城区", //城区
        //                     "classA": "智能发现", //事件大类
        //                     "highUseClassC": true, //是否高频工单
        //                     "creatDate": "2021-12-21 05:57:41", //创建时间
        //                     "jiedaodanwei-end": 609,
        //                     "major": false, //是否重大工单
        //                     "flowSource": "独居老人关爱", //事件来源
        //                     "flowNo": "20211220090665", //工单号
        //                     "addr": "XX小区2栋301", //地址
        //                     "flowStatus": "100",
        //                     "nodeId": "node-200", //工单状态  end 表示处理完成  其他表示未处理
        //                     "lat": "32.410" //纬度
        //                 },]
        //         }
        //         ]
        //     })
        // },6000)

        // setTimeout(()=>{
        //    //  let data = [{"planCount":4,"planType":"BASIC_PLAN","level":1,"deviceCount":38,"selfDeviceCount":0,"title":"应急专用","type":"CATALOG","createUser":"410526198411147730","id":"aa43b010fc174de6b3e481d0858b2ff5","levelOrder":9},{"planCount":3,"planType":"BASIC_PLAN","level":1,"deviceCount":94,"selfDeviceCount":0,"title":"襄城区旅游","type":"CATALOG","createUser":"410526198411147730","id":"1a2916e378a14b3898f64df7203857aa","levelOrder":10},{"planCount":5,"planType":"BASIC_PLAN","level":1,"deviceCount":648,"selfDeviceCount":0,"title":"襄城区三无小区","type":"CATALOG","createUser":"410526198411147730","id":"bcd42f3e9fc744a4ab5ed47ecc99e5a3","levelOrder":11},{"planCount":9,"planType":"BASIC_PLAN","level":1,"deviceCount":797,"selfDeviceCount":0,"title":"襄城区学校","type":"CATALOG","createUser":"410526198411147730","id":"e18a9b7e88bd4ca6af8c9786bdf57d4d","levelOrder":12},{"planCount":0,"planType":"BASIC_PLAN","level":1,"deviceCount":0,"selfDeviceCount":0,"title":"襄城区公交的士监控","type":"CATALOG","createUser":"410526198411147730","id":"eac45b2e86fb493cb3fa235902b0e1cb","levelOrder":13},{"planCount":0,"planType":"BASIC_PLAN","level":1,"deviceCount":0,"selfDeviceCount":0,"title":"襄城区燃气加油站","type":"CATALOG","createUser":"410526198411147730","id":"b12ac574437e4b7b952b949a7d134108","levelOrder":14},{"planCount":1,"planType":"BASIC_PLAN","level":1,"deviceCount":45,"selfDeviceCount":0,"title":"襄城区危化企业","type":"CATALOG","createUser":"410526198411147730","id":"7085888cdc37404e96dffa206442214b","levelOrder":15},{"planCount":0,"planType":"BASIC_PLAN","level":1,"deviceCount":0,"selfDeviceCount":0,"title":"襄城区重点路口","type":"CATALOG","createUser":"410526198411147730","id":"2339f3d7c1f04ef1a038f579a647b17d","levelOrder":16},{"planCount":0,"planType":"BASIC_PLAN","level":1,"deviceCount":0,"selfDeviceCount":0,"title":"襄城区汉江保护","type":"CATALOG","createUser":"410526198411147730","id":"79c7a5640f42481e8ca5f07333b8b8c8","levelOrder":17},{"planCount":0,"planType":"BASIC_PLAN","level":1,"deviceCount":0,"selfDeviceCount":0,"title":"政府部门","type":"CATALOG","createUser":"410526198411147730","id":"8e160bc7d9de4021ae2e3d2405452c54","levelOrder":18},{"planCount":0,"planType":"BASIC_PLAN","level":1,"deviceCount":0,"selfDeviceCount":0,"title":"襄城区城市商圈","type":"CATALOG","createUser":"410526198411147730","id":"a1ab7d30f90f4d5da3ac558774d7cdb5","levelOrder":19},{"planCount":1,"planType":"BASIC_PLAN","level":1,"deviceCount":52,"selfDeviceCount":0,"title":"襄城区密集区","type":"CATALOG","createUser":"410526198411147730","id":"959c7506b5bd4a10a3a261b0d3657ad8","levelOrder":20},{"planCount":0,"planType":"BASIC_PLAN","level":1,"deviceCount":0,"selfDeviceCount":0,"title":"襄城区疫情防控","type":"CATALOG","createUser":"410526198411147730","id":"ffee10d0cad14222b04d4118819fb3b0","levelOrder":21},{"planCount":0,"planType":"BASIC_PLAN","level":1,"deviceCount":0,"selfDeviceCount":0,"title":"襄城区高点","type":"CATALOG","createUser":"410526198411147730","id":"9661e37a57a6479cb6a95b8368db0bc2","levelOrder":22},{"planCount":0,"planType":"BASIC_PLAN","level":1,"deviceCount":0,"selfDeviceCount":0,"title":"襄城区内涝点位","type":"CATALOG","createUser":"410526198411147730","id":"261e5e9b5f104d6086aa6bafab7d51f0","levelOrder":23},{"planCount":0,"planType":"BASIC_PLAN","level":3,"deviceCount":0,"selfDeviceCount":0,"title":"襄城区社会资源医院","type":"CATALOG","parentId":"4f11fd52e0fd4be5a90d24abb4d667e0","createUser":"410526198411147730","id":"e93490b45bdb427fbbeff4f720d8146f","levelOrder":20},{"planCount":0,"planType":"BASIC_PLAN","level":2,"deviceCount":45,"selfDeviceCount":45,"title":"临时预案20220122144234945","type":"PLAN","parentId":"7085888cdc37404e96dffa206442214b","createUser":"410526198411147730","id":"eb580066857247aa927982c6fde805b0","levelOrder":1},{"planCount":0,"planType":"BASIC_PLAN","level":2,"deviceCount":28,"selfDeviceCount":28,"title":"习家池11","type":"PLAN","parentId":"aa43b010fc174de6b3e481d0858b2ff5","createUser":"410526198411147730","id":"399b485b3ed64b5a9baa4516c80c7d35","levelOrder":1},{"planCount":0,"planType":"BASIC_PLAN","level":2,"deviceCount":57,"selfDeviceCount":57,"title":"习氏宗祠","type":"PLAN","parentId":"1a2916e378a14b3898f64df7203857aa","createUser":"410526198411147730","id":"a2e12910777e42bba2c82b66b47fc0f3","levelOrder":1},{"planCount":0,"planType":"BASIC_PLAN","level":2,"deviceCount":4,"selfDeviceCount":4,"title":"公交站点11","type":"PLAN","parentId":"aa43b010fc174de6b3e481d0858b2ff5","createUser":"410526198411147730","id":"fa7e9871e63046cf86c8382bcb39b9c5","levelOrder":1},{"planCount":0,"planType":"BASIC_PLAN","level":2,"deviceCount":200,"selfDeviceCount":200,"title":"古城街道三无小区","type":"PLAN","parentId":"bcd42f3e9fc744a4ab5ed47ecc99e5a3","createUser":"410526198411147730","id":"31935bf964124cdc8308f400dc135eca","levelOrder":1},{"planCount":0,"planType":"BASIC_PLAN","level":2,"deviceCount":25,"selfDeviceCount":25,"title":"古城街道三无小区2","type":"PLAN","parentId":"bcd42f3e9fc744a4ab5ed47ecc99e5a3","createUser":"410526198411147730","id":"9cce4f7265cb4e1897320155232ad0c2","levelOrder":1},{"planCount":0,"planType":"BASIC_PLAN","level":2,"deviceCount":13,"selfDeviceCount":13,"title":"唐城","type":"PLAN","parentId":"1a2916e378a14b3898f64df7203857aa","createUser":"410526198411147730","id":"35c3df0c0a0b48319bea435e0ec9aa1c","levelOrder":1},{"planCount":0,"planType":"BASIC_PLAN","level":2,"deviceCount":4,"selfDeviceCount":4,"title":"客运站","type":"PLAN","parentId":"aa43b010fc174de6b3e481d0858b2ff5","createUser":"410526198411147730","id":"42dd5d9b7685443995df33ca8bf1aaf1","levelOrder":1},{"planCount":0,"planType":"BASIC_PLAN","level":2,"deviceCount":52,"selfDeviceCount":52,"title":"密集1","type":"PLAN","parentId":"959c7506b5bd4a10a3a261b0d3657ad8","createUser":"410526198411147730","id":"b4890fe0e2f04478a93a7bd0183746b8","levelOrder":1},{"planCount":0,"planType":"BASIC_PLAN","level":2,"deviceCount":32,"selfDeviceCount":32,"title":"尹集理工学院","type":"PLAN","parentId":"e18a9b7e88bd4ca6af8c9786bdf57d4d","createUser":"410526198411147730","id":"4a12e2120535469ca6d922d41347af49","levelOrder":1},{"planCount":0,"planType":"BASIC_PLAN","level":2,"deviceCount":200,"selfDeviceCount":200,"title":"庞公街道三无小区","type":"PLAN","parentId":"bcd42f3e9fc744a4ab5ed47ecc99e5a3","createUser":"410526198411147730","id":"87130cee010c48e09f02369ebc30a537","levelOrder":1},{"planCount":0,"planType":"BASIC_PLAN","level":2,"deviceCount":106,"selfDeviceCount":106,"title":"昭明五中实验中学","type":"PLAN","parentId":"e18a9b7e88bd4ca6af8c9786bdf57d4d","createUser":"410526198411147730","id":"c4292001fcc941e1bb1c6600322e6348","levelOrder":1},{"planCount":0,"planType":"BASIC_PLAN","level":2,"deviceCount":122,"selfDeviceCount":122,"title":"昭明第一实验小学","type":"PLAN","parentId":"e18a9b7e88bd4ca6af8c9786bdf57d4d","createUser":"410526198411147730","id":"97564bc0625d4e8ab65f5cf3db5d3758","levelOrder":1},{"planCount":0,"planType":"BASIC_PLAN","level":2,"deviceCount":130,"selfDeviceCount":130,"title":"檀溪街道三无小区","type":"PLAN","parentId":"bcd42f3e9fc744a4ab5ed47ecc99e5a3","createUser":"410526198411147730","id":"1d4c139d6bf444b2aa8b0cdffe339966","levelOrder":1},{"planCount":0,"planType":"BASIC_PLAN","level":2,"deviceCount":2,"selfDeviceCount":2,"title":"欧庙、卧龙河道","type":"PLAN","parentId":"aa43b010fc174de6b3e481d0858b2ff5","createUser":"410526198411147730","id":"4d4d7eaeafed4562bac435800cf8a5da","levelOrder":1},{"planCount":0,"planType":"BASIC_PLAN","level":2,"deviceCount":31,"selfDeviceCount":31,"title":"汇文高中监控","type":"PLAN","parentId":"e18a9b7e88bd4ca6af8c9786bdf57d4d","createUser":"410526198411147730","id":"9bacbdd73cce4f3986773daa3fab55e9","levelOrder":1},{"planCount":0,"planType":"BASIC_PLAN","level":2,"deviceCount":111,"selfDeviceCount":111,"title":"汽车职业技术学院监控","type":"PLAN","parentId":"e18a9b7e88bd4ca6af8c9786bdf57d4d","createUser":"410526198411147730","id":"490f72a1bdb34d0ea3a72694a94f1489","levelOrder":1},{"planCount":0,"planType":"BASIC_PLAN","level":2,"deviceCount":3,"selfDeviceCount":3,"title":"湖北省工业建筑学校监控","type":"PLAN","parentId":"e18a9b7e88bd4ca6af8c9786bdf57d4d","createUser":"410526198411147730","id":"69d42c4997fe482a94df7a3074c169cb","levelOrder":1},{"planCount":0,"planType":"BASIC_PLAN","level":2,"deviceCount":93,"selfDeviceCount":93,"title":"真武山无三小区","type":"PLAN","parentId":"bcd42f3e9fc744a4ab5ed47ecc99e5a3","createUser":"410526198411147730","id":"f983dd0ce4784d9c928a5d3a7aaee764","levelOrder":1},{"planCount":0,"planType":"BASIC_PLAN","level":2,"deviceCount":24,"selfDeviceCount":24,"title":"真武山道观上观","type":"PLAN","parentId":"1a2916e378a14b3898f64df7203857aa","createUser":"410526198411147730","id":"080f625423f543fdaee10838cdbeffd5","levelOrder":1},{"planCount":0,"planType":"BASIC_PLAN","level":2,"deviceCount":64,"selfDeviceCount":64,"title":"第二实验小学监控","type":"PLAN","parentId":"e18a9b7e88bd4ca6af8c9786bdf57d4d","createUser":"410526198411147730","id":"5597aa4a2ea4408685932e106a80d83c","levelOrder":1},{"planCount":0,"planType":"BASIC_PLAN","level":2,"deviceCount":200,"selfDeviceCount":200,"title":"职业技术学院","type":"PLAN","parentId":"e18a9b7e88bd4ca6af8c9786bdf57d4d","createUser":"410526198411147730","id":"7b2bd5680d9145d783a5477758cea236","levelOrder":1},{"planCount":0,"planType":"BASIC_PLAN","level":2,"deviceCount":128,"selfDeviceCount":128,"title":"襄阳文理学院","type":"PLAN","parentId":"e18a9b7e88bd4ca6af8c9786bdf57d4d","createUser":"410526198411147730","id":"7824066c011b4834bb94d5dc6d51a8e2","levelOrder":1}]
        //    // // let data = ['']
        //    //  let datas = []
        //    //  for(let i=0;i<data.length;i++){
        //    //      if(!data[i]){
        //    //          data.splice(i,i+1);
        //    //          --i;
        //    //      }else{
        //    //          let obj = {};
        //    //          obj.name = data[i].title;
        //    //          obj.id = data[i].id;
        //    //          obj.fid = data[i].parentId||0;
        //    //          obj.count = data[i].deviceCount;
        //    //          datas.push(obj)
        //    //      }
        //    //
        //    //  }
        //    //  let datas = [{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.115308","Y":"32.075164","state":"绿地三期（A、C、D三个地块项目）","sbbh":"3.0","address":"鄢文超\n胡慧斌（D地块）\n张邦学（C地块）","sz2":"","sz1":"王寨办事处\n\n林攀13135866788","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"绿地三期（A、C、D三个地块项目）"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.108768","Y":"32.066153","state":"衡庄还建房（筑梦园项目）","sbbh":"4.0","address":"郑勇\n甲方：郭越刚","sz2":"","sz1":"王寨办事处\n\n林攀13135866788","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"衡庄还建房（筑梦园项目）"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.125525571153","Y":"32.0426405464127","state":"恒大翡翠珑庭项目","sbbh":"5.0","address":"王寨办事处","sz2":"","sz1":"胡伟伟：18507270055","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"恒大翡翠珑庭项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.103859","Y":"32.070876","state":"欣悦城项目二期（四标段）","sbbh":"6.0","address":"周超","sz2":"","sz1":"王寨办事处\n\n林攀13135866788","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"欣悦城项目二期（四标段）"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.103859","Y":"32.070876","state":"欣悦城项目二期（二标段）","sbbh":"7.0","address":"甲：襄投置业\n乙：河北建设集团股份有限公司\n监理：武汉科达","sz2":"","sz1":"王寨办事处\n\n林攀13135866788","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"欣悦城项目二期（二标段）"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.119417","Y":"32.06875","state":"襄投·福欣园（樊城区棚改安置房项目）","sbbh":"8.0","address":"甲方：湖北襄投置业有限公司  邓阳\n乙方：浙江省建工集团有限责任公司  万亿成\n监理单位：湖北天慧工程咨询有限公司  张启穗\n","sz2":"","sz1":"王寨办事处\n\n林攀13135866788","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"襄投·福欣园（樊城区棚改安置房项目）"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.113596","Y":"32.07877","state":"襄阳府C地块","sbbh":"9.0","address":"刘世明","sz2":"","sz1":"王寨办事处\n\n林攀13135866788","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"襄阳府C地块"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.117782","Y":"32.078908","state":"襄阳府A地块","sbbh":"10.0","address":"甲方：湖北襄投置业有限公司陈治平\n乙方：中铁十一局集团有限公司王海锋\n监理：安徽省建设监理有限公司张明超","sz2":"","sz1":"王寨办事处\n\n林攀13135866788","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"襄阳府A地块"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.118842","Y":"32.071136","state":"襄阳院子","sbbh":"11.0","address":"甲：湖北襄投置业有限公司   王胜  \n乙：湖北省工业建筑集团有限公司  张安柱   \n监理：湖北清江工程管理咨询有限公司  张畅  ","sz2":"","sz1":"王寨办事处\n\n林攀13135866788","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"襄阳院子"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.114387","Y":"32.078954","state":"襄阳府D地块","sbbh":"12.0","address":"甲方：襄投置业付超\n乙方：中青建安集团李海峰\n监理：河南育兴建筑工程管理有限公司总监  惠诉患","sz2":"","sz1":"王寨办事处\n\n林攀13135866788","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"襄阳府D地块"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"","Y":"","state":"48中","sbbh":"13.0","address":"乙方：王焕臣","sz2":"","sz1":"王寨办事处\n\n林攀13135866788","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"48中"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.131823","Y":"32.06048","state":"24中艺术综合教学楼项目部","sbbh":"14.0","address":"监理：湖北公力工程咨询有限公司总代：夏茂胜\n乙方：湖北雅华建筑安装有限公司  邓保华","sz2":"","sz1":"王寨办事处\n\n林攀13135866788","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"24中艺术综合教学楼项目部"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.118637","Y":"32.05537","state":"45中教学楼项目","sbbh":"15.0","address":"监理方：赵磊\n施工方：翟迅","sz2":"","sz1":"王寨办事处\n\n林攀13135866788","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"45中教学楼项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.099566","Y":"32.059042","state":"樊城区健康食品产业园（一期）","sbbh":"16.0","address":"甲：襄阳味都健康食品有限责任公司\n乙：中铁七局\n监理：河南育兴建筑工程管理有限公司","sz2":"","sz1":"王寨办事处\n\n林攀13135866788","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"樊城区健康食品产业园（一期）"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.113596","Y":"32.07877","state":"襄阳府B地块","sbbh":"17.0","address":"甲：襄投置业、汉江国际\n乙：湖北省第六建筑工程有限公司  \n监理：中鼎景宏","sz2":"","sz1":"王寨办事处\n\n林攀13135866788","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"襄阳府B地块"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.136949","Y":"32.037044","state":"汉江一品项目（B/D）","sbbh":"18.0","address":"甲方：民发实业集团有限公司 郭聪\n乙方：民发现代建设工程集团有限公司 刘荣辉\n监理：湖北大正工程管理有限公司 陈勇","sz2":"","sz1":"汉江办事处\n郝国成13085288199","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"汉江一品项目（B/D）"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.132875","Y":"32.05697","state":"书香一品","sbbh":"19.0","address":"甲：中房集团襄阳房地产开发有限公司  胡涛\n乙：福建省五建建设集团有限公司  陈灿足\n监理：湖北大正工程管理有限公司  尹丹","sz2":"","sz1":"汉江办事处\n郝国成13085288199","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"书香一品"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.140524","Y":"32.036302","state":"百悦府项目","sbbh":"20.0","address":"甲方：襄阳市翔悦房地产开发有限公司 张锦\n乙方：湖北海厦建设有限公司  郑凯力\n监理：重庆建新建设工程监理咨询有限公司  吴险峰\n","sz2":"","sz1":"汉江办事处\n郝国成13085288199","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"百悦府项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"","Y":"","state":"昊天广场项目（含3号楼）","sbbh":"21.0","address":"涂鸿飞","sz2":"","sz1":"屏襄门办事处\n朱锋13677100878","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"昊天广场项目（含3号楼）"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.164927","Y":"32.05526","state":"","sbbh":"","address":"甲：襄阳锦绣长富房地产开发有限公司\n乙：湖北地金建设有限公司\n监理：湖北天慧监理工程","sz2":"","sz1":"屏襄门办事处\n朱锋13677100878","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":""},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.164927","Y":"32.05526","state":"昊天广场襄江苑项目","sbbh":"22.0","address":"甲：襄阳襄昊房地产开发有限公司\n乙：中国化学工程第六建设有限公司\n监理：湖北华振工程咨询有限公司","sz2":"","sz1":"屏襄门办事处\n朱锋13677100878","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"昊天广场襄江苑项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.157426","Y":"32.051197","state":"星火路菜场改造项目","sbbh":"27.0","address":"甲方：襄阳宏银房地产开发有限公司\n乙：湖北任远装饰建设工程有限公司\n监理：湖北普和监理工程有限公司","sz2":"","sz1":"屏襄门办事处\n朱锋13677100878","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"星火路菜场改造项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.097384","Y":"32.083797","state":"幸福家园项目（二期）","sbbh":"28.0","address":"甲：湖北志邦房地产开发有限公司余明\n乙：湖北智成建筑有限公司陈乔\n监理：武汉市青山建设工程监理有限责任人公司","sz2":"","sz1":"","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"幸福家园项目（二期）"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.094083","Y":"32.058415","state":"柿铺棚改项目","sbbh":"29.0","address":"甲方：襄阳市樊城区金振城镇化建设有限公司\n乙方：民航机场建设工程有限公司（原中交一航局四公司）\n监理：湖北天慧工程咨询有限公司\n","sz2":"","sz1":"","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"柿铺棚改项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.105173","Y":"32.083207","state":"北龙.中梁.五矿二期（韩洼）","sbbh":"30.0","address":"方立合","sz2":"","sz1":"","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"北龙.中梁.五矿二期（韩洼）"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.151938","Y":"32.04687","state":"碧桂园金碧学府项目","sbbh":"41.0","address":"甲方：金玉房地产开发有限公司  桂重\n乙方：湖北利达建设工程集团有限公司  李明平\n监理：湖北楚天工程建设咨询有限公司  李小平","sz2":"","sz1":"米公办事处\n张俊争","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"碧桂园金碧学府项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.068417","Y":"32.09495","state":"云牧广场","sbbh":"47.0","address":"李碧福\n施工：文佳琛","sz2":"","sz1":"牛首镇郭洪民13197196106","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"云牧广场"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.052404","Y":"32.103464","state":"襄阳国际商贸城中豪E3地块(多层区)\n高层区：黄惠昌  15951330029","sbbh":"51.0","address":"甲方：李龒\n乙方：崔正新\n监理：朱蒙召","sz2":"","sz1":"樊西新区\n徐鹏\n13995706687","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"襄阳国际商贸城中豪E3地块(多层区)\n高层区：黄惠昌  15951330029"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.062734","Y":"32.111141","state":"好领居物流二期项目 \n\n \n","sbbh":"52.0","address":"甲方：好邻居连锁超市有限公司  牛裕民\n乙方：湖北新南洋建筑工程有限公司  张军\n监理方：湖北公力工程咨询服务有限公司  罗文成","sz2":"","sz1":"樊西新区\n徐鹏\n13995706687","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"好领居物流二期项目 \n\n \n"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"","Y":"","state":"万洲电气节能科技园建设项目\n（光电二车间）","sbbh":"53.0","address":"甲方：万洲电气集团有限公司（亢勇）\n乙方：楚泰建设集团有限公司（项目经理：冯成功）\n监理单位：浙江虎跃建设有限公司襄阳分公司（总监代表：董长友）","sz2":"","sz1":"樊西新区\n徐鹏\n13995706687","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"万洲电气节能科技园建设项目\n（光电二车间）"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"","Y":"","state":"襄阳国际旅游茶城有限公司项目","sbbh":"54.0","address":"甲：襄阳国际旅游茶城有限公司（龚明强）\n乙：湖北有朋建设工程有限公司（李建）\n监理单位：湖北三峡建设项目管理股份有限公司（梁军）","sz2":"","sz1":"樊西新区\n徐鹏\n13995706687","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"襄阳国际旅游茶城有限公司项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.073649","Y":"32.109306","state":"关圣古镇","sbbh":"55.0","address":"\n甲方：襄阳伟光汇通旅游产业发展有限公司李二刚\n乙方：中建市政工程有限公司陈小渠\n监理方：天慧公司闻世军(监理方)","sz2":"","sz1":"樊西新区\n徐鹏\n13995706687","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"关圣古镇"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.073649","Y":"32.109306","state":"关胜古镇文化旅游综合体一标段的项目","sbbh":"56.0","address":"甲方：关胜古镇文化旅游综合体一标段的项目谢冰\n乙施工方：湖北省工业建筑集团有限公司（ 邬勇强）\n监理方：天慧公司（王俊）","sz2":"","sz1":"樊西新区\n徐鹏\n13995706687","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"关胜古镇文化旅游综合体一标段的项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.070195","Y":"32.104153","state":"樊西邓城新居二期项目\n一标段","sbbh":"57.0","address":"甲方：襄江国投 孙金龙18371091292\n乙：山河建设集团有限公司孙国军13201801396\n监理：武汉华胜建设科技有限公司李松18727043369","sz2":"","sz1":"樊西新区\n徐鹏\n13995706687","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"樊西邓城新居二期项目\n一标段"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.073465","Y":"32.088755","state":"三川众建诚智慧园项目\n","sbbh":"58.0","address":"甲：襄阳三川众创城智慧园有限公司（朱谊峰）\n乙：中国化学工程第六建设公司（李梦明）\n监理方：上海唯智工程项目管理公司（李红）","sz2":"","sz1":"樊西新区\n徐鹏\n13995706687","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"三川众建诚智慧园项目\n"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.064077","Y":"32.096724","state":"中豪行政公馆项目","sbbh":"59.0","address":"甲方：湖北中豪商业有限公司  张金林\n乙方:江苏启安  施海达\n监理:湖北中南华大建设项目管理有限公司  段武","sz2":"","sz1":"樊西新区\n徐鹏\n13995706687","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"中豪行政公馆项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.072737","Y":"32.087019","state":"襄阳楚商装备制造产业园项目","sbbh":"60.0","address":"甲：湖北楚商产业园有限公司\n乙：中冶华亚工程建设有限公司\n监理：湖北华泰工程建设监理有限公司","sz2":"","sz1":"樊西新区\n徐鹏\n13995706687","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"襄阳楚商装备制造产业园项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.152143380188","Y":"32.039866887803","state":"襄阳新天地项目","sbbh":"","address":"定中门办事处","sz2":"","sz1":"","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"襄阳新天地项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.063150594089","Y":"32.1221169367726","state":"襄阳伟光汇通关圣古镇文化旅游综合体项目","sbbh":"","address":"牛首镇","sz2":"","sz1":"张磊：18727017771","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"襄阳伟光汇通关圣古镇文化旅游综合体项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.128310525566","Y":"32.0356224750303","state":"翔悦百悦府（房地产）项目","sbbh":"","address":"汉江办事处","sz2":"","sz1":"张锦:18671949758","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"翔悦百悦府（房地产）项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.076709593504","Y":"32.0798235556962","state":"航宇救生装备有限公司被动救生产业升级及配套项目","sbbh":"","address":"柿铺办事处","sz2":"","sz1":"余高峰：13871675906","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"航宇救生装备有限公司被动救生产业升级及配套项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.076709593504","Y":"32.0798235556962","state":"昊天广场项目（含襄江苑）","sbbh":"","address":"屏襄门办事处","sz2":"","sz1":"安麒元：15807271838","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"昊天广场项目（含襄江苑）"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.076709593504","Y":"32.0798235556962","state":"屏襄门片区旧城改建项目（九街十八巷）","sbbh":"","address":"屏襄门办事处、王寨办事处","sz2":"","sz1":"刘虹：13986396333","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"屏襄门片区旧城改建项目（九街十八巷）"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.160500205138","Y":"32.0481111713398","state":"招商雍江国际项目","sbbh":"","address":"清河口办事处","sz2":"","sz1":"朱家帅：18071049201","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"招商雍江国际项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.160500205138","Y":"32.0481111713398","state":"正荣悦江府项目","sbbh":"","address":"清河口办事处","sz2":"","sz1":"孙云：18907279226","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"正荣悦江府项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.160500205138","Y":"32.0481111713398","state":"华润燃气鄂西区域生产调度中心项目","sbbh":"","address":"王寨办事处","sz2":"","sz1":"黄守武：13774174835","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"华润燃气鄂西区域生产调度中心项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.029501505952","Y":"32.0980332691769","state":"中豪商住二期项目","sbbh":"","address":"牛首镇","sz2":"","sz1":"朱总：18186763566","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"中豪商住二期项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.029501505952","Y":"32.0980332691769","state":"湖北航天化学技术研究所橡胶绝热层材料制备及应用项目","sbbh":"","address":"柿铺办事处","sz2":"","sz1":"蔡永华\n：18602779701","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"湖北航天化学技术研究所橡胶绝热层材料制备及应用项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.029501505952","Y":"32.0980332691769","state":"诺伯特军民融合二期项目","sbbh":"","address":"柿铺办事处","sz2":"","sz1":"郭文勇\n：13972230888","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"诺伯特军民融合二期项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.029501505952","Y":"32.0980332691769","state":"豪威尔微MEMS传感器生产项目","sbbh":"","address":"柿铺办事处","sz2":"","sz1":"温兴蒋：13738711777","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"豪威尔微MEMS传感器生产项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.029501505952","Y":"32.0980332691769","state":"百盛建筑节能材料生产加工基地项目","sbbh":"","address":"柿铺办事处","sz2":"","sz1":"张超： 13986395940","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"百盛建筑节能材料生产加工基地项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.029501505952","Y":"32.0980332691769","state":"云川光电新厂建设项目","sbbh":"","address":"柿铺办事处","sz2":"","sz1":"李宁： 13617200609","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"云川光电新厂建设项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.029501505952","Y":"32.0980332691769","state":"金牛假日农庄田园综合体项目","sbbh":"","address":"太平店镇","sz2":"","sz1":"夏杨婕：13886291855","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"金牛假日农庄田园综合体项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.029501505952","Y":"32.0980332691769","state":"黄龙堰田园综合体项目","sbbh":"","address":"牛首镇","sz2":"","sz1":"夏杨婕：13886291855","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"黄龙堰田园综合体项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.029501505952","Y":"32.0980332691769","state":"味都健康食品加工园项目","sbbh":"","address":"王寨办事处","sz2":"","sz1":"胡钰：18827521767","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"味都健康食品加工园项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.029501505952","Y":"32.0980332691769","state":"广友食品物流仓储及配送中心项目","sbbh":"","address":"牛首镇","sz2":"","sz1":"马方杰：13508666558","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"广友食品物流仓储及配送中心项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.029501505952","Y":"32.0980332691769","state":"襄阳竹叶山粮油、干调、土特产专业市场项目","sbbh":"","address":"牛首镇","sz2":"","sz1":"张然：18972097500","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"襄阳竹叶山粮油、干调、土特产专业市场项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.029501505952","Y":"32.0980332691769","state":"云南牧工商襄阳总部项目","sbbh":"","address":"牛首镇","sz2":"","sz1":"钟艳红：18671063377","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"云南牧工商襄阳总部项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.029501505952","Y":"32.0980332691769","state":"冢子湾水库备用水源地保护工程","sbbh":"","address":"牛首镇、太平店镇","sz2":"","sz1":"任东海\n：13972252269","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"冢子湾水库备用水源地保护工程"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.029501505952","Y":"32.0980332691769","state":"新集水电站项目","sbbh":"","address":"太平店镇","sz2":"","sz1":"刘意：18163108338","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"新集水电站项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.029501505952","Y":"32.0980332691769","state":"太平店供水管网三期建设项目","sbbh":"","address":"太平店镇","sz2":"","sz1":"胡发忠\n：18571179817","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"太平店供水管网三期建设项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.029501505952","Y":"32.0980332691769","state":"胥营水厂三期扩建项目","sbbh":"","address":"太平店镇","sz2":"","sz1":"胡发忠\n：18571179817","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"胥营水厂三期扩建项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"","Y":"","state":"亿创客小微产业园项目","sbbh":"","address":"柿铺办事处","sz2":"","sz1":"李万赋：18062239699","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"亿创客小微产业园项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.029501505952","Y":"32.0980332691769","state":"襄阳道国际文旅项目","sbbh":"","address":"米公办事处","sz2":"","sz1":"陆俊：13797699955","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"襄阳道国际文旅项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.029501505952","Y":"32.0980332691769","state":"湖北万安一诺节能灯生产线项目","sbbh":"","address":"柿铺办事处","sz2":"","sz1":"已竣工","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"湖北万安一诺节能灯生产线项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.049581309085","Y":"32.1078540387008","state":"好邻居二期物流仓储配送中心项目","sbbh":"","address":"牛首镇","sz2":"","sz1":"杨杰：13995756459","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"好邻居二期物流仓储配送中心项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.037170427351","Y":"32.0915204192953","state":"福泰·栖溪小镇项目","sbbh":"","address":"牛首镇","sz2":"","sz1":"谭清:13886209666","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"福泰·栖溪小镇项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.092190592598","Y":"32.0527579780467","state":"三川众创智慧产业园项目","sbbh":"","address":"柿铺办事处","sz2":"","sz1":"李敏鑫：18571209777","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"三川众创智慧产业园项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.064249370567","Y":"32.0861907952884","state":"楚商装备制造产业园项目","sbbh":"","address":"柿铺办事处","sz2":"","sz1":"王小华：13184385678","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"楚商装备制造产业园项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.05488888328","Y":"32.1013000837305","state":"襄阳国际旅游茶城项目","sbbh":"","address":"牛首镇","sz2":"","sz1":"吴永峰：13872515560","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"襄阳国际旅游茶城项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.081164237681","Y":"32.0897679488762","state":"航空航天工业园区8号路","sbbh":"","address":"樊西新区    柿铺办事处","sz2":"","sz1":"李有文：17396197605","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"航空航天工业园区8号路"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.089340063299","Y":"32.1153242899619","state":"廖家庄路（人民路-邓城大道）","sbbh":"","address":"王寨办事处  柿铺办事处","sz2":"","sz1":"李有文：17396197605","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"廖家庄路（人民路-邓城大道）"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.08586788425","Y":"32.0600261203939","state":"松鹤路西延伸段（中航大道-航空航天工业园8号路）","sbbh":"","address":"樊西新区   柿铺办事处","sz2":"","sz1":"李有文：17396197605","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"松鹤路西延伸段（中航大道-航空航天工业园8号路）"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.129811149937","Y":"32.1420620046602","state":"黑臭水体治理示范城市建设项目","sbbh":"","address":"王寨办事处","sz2":"","sz1":"刘飞：18872577699\n陈国伟：15629155257","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"黑臭水体治理示范城市建设项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.086989027738","Y":"32.0851914346282","state":"航宇幸福家园三期项目","sbbh":"","address":"柿铺办事处","sz2":"","sz1":"王道华：15327935218","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"航宇幸福家园三期项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.096895907996","Y":"32.0776295331205","state":"中梁紫悦首府二期项目","sbbh":"","address":"柿铺办事处","sz2":"","sz1":"李鲲鹏：13886251768","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"中梁紫悦首府二期项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.10328034601","Y":"32.068299771291","state":"襄阳绿地中央广场项目","sbbh":"","address":"王寨办事处","sz2":"","sz1":"龚重华：15570666620","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"襄阳绿地中央广场项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.121163167467","Y":"32.0528237398613","state":"长汉路书香一品项目","sbbh":"","address":"汉江办事处","sz2":"","sz1":"","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"长汉路书香一品项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.101035777783","Y":"32.074771151665","state":"国投襄阳府项目","sbbh":"","address":"王寨办事处","sz2":"","sz1":"王君恒：13797610101","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"国投襄阳府项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.108100259345","Y":"32.0659216332949","state":"国投襄阳院子项目","sbbh":"","address":"王寨办事处","sz2":"","sz1":"王胜：15172605991","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"国投襄阳院子项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.129208467113","Y":"32.0317424151733","state":"民发汉江一品项目","sbbh":"","address":"汉江办事处","sz2":"","sz1":"王光：13094131111","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"民发汉江一品项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.096206084779","Y":"32.0592383748223","state":"衡庄保障房建设项目","sbbh":"","address":"王寨办事处","sz2":"","sz1":"张扬：18271251033","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"衡庄保障房建设项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.057934743879","Y":"32.0839072394523","state":"互联网+创新创业产业园二期项目","sbbh":"","address":"柿铺办事处","sz2":"","sz1":"黄巾：18507106926","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"互联网+创新创业产业园二期项目"},{"infotype":"","szms9":"","szms6":"","szms5":"","szms8":"","szms7":"","icon":"http://10.203.2.88:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNr6AbLXBAAATDvS7T_k097.png","szms2":"","szms1":"办事处","szms4":"","szms11":"","szms3":"","szms10":"","type":"在建工地","X":"112.057304149974","Y":"32.098217539089","state":"樊西邓城新居项目","sbbh":"","address":"牛首镇","sz2":"","sz1":"孙金龙：18371091292","sz4":"","sz3":"","sz6":"","sz5":"","sz8":"","sz10":"","sz7":"","sz11":"","popup":"click2","pinType":"ZJGD","sz9":"","name":"樊西邓城新居项目"}]
        //     let datas = [{
        //         title: '基础数据——河湖长履职数据统计表',
        //         type: 2,
        //         yarnData:[
        //             {name:2022,value:2022},
        //             {name:2021,value:2021,hot:true},
        //             {name:2020,value:2020},
        //             {name:2019,value:2019},
        //             {name:2018,value:2018},
        //
        //         ],
        //         quarterData:[
        //             {name:'1',value:1},
        //             {name:'2',value:2,hot:true},
        //             {name:'3',value:3},
        //             {name:'4',value:4},
        //         ],
        //         data: [
        //             {
        //                 xzqh:'保康县',
        //                 zrhhz:'11',
        //                 qb:'24',
        //                 hhzs:'27',
        //                 hhzqzxccs_qx:'21',
        //                 hhzqzxccs_jb:'5',
        //                 hhzqzxccs_xj:'26',
        //                 hhzqzxcrs_qx:'11',
        //                 hhzqzxcrs_jb:'1',
        //                 hhzqzxcrs_xj:'11',
        //                 wtxccs_qx:'11',
        //                 wtxccs_jb:'22',
        //                 wtxccs_xj:'33',
        //                 xczcs_qx:'32',
        //                 xczcs_jb:'27',
        //                 xczcs_xj:'59',
        //                 wbxchh:0,
        //                 wqzxcrs:0,
        //                 wxcqwwtxcrs:0,
        //                 hhzlzl_ylz:11,
        //                 hhzlzl_wlz:0,
        //                 hhzlzl_lzl:100,
        //                 lxbmlzl_ylz:26,
        //                 lxbmlzl_wlz:0,
        //                 lxbmlzl_lzl:100,
        //                 jjwtgs:65,
        //             },
        //             {
        //                 xzqh:'保康县',
        //                 zrhhz:'11',
        //                 qb:'24',
        //                 hhzs:'27',
        //                 hhzqzxccs_qx:'21',
        //                 hhzqzxccs_jb:'5',
        //                 hhzqzxccs_xj:'26',
        //                 hhzqzxcrs_qx:'11',
        //                 hhzqzxcrs_jb:'1',
        //                 hhzqzxcrs_xj:'11',
        //                 wtxccs_qx:'11',
        //                 wtxccs_jb:'22',
        //                 wtxccs_xj:'33',
        //                 xczcs_qx:'32',
        //                 xczcs_jb:'27',
        //                 xczcs_xj:'59',
        //                 wbxchh:0,
        //                 wqzxcrs:0,
        //                 wxcqwwtxcrs:0,
        //                 hhzlzl_ylz:11,
        //                 hhzlzl_wlz:0,
        //                 hhzlzl_lzl:100,
        //                 lxbmlzl_ylz:26,
        //                 lxbmlzl_wlz:0,
        //                 lxbmlzl_lzl:100,
        //                 jjwtgs:65,
        //             },
        //             {
        //                 xzqh:'保康县',
        //                 zrhhz:'11',
        //                 qb:'24',
        //                 hhzs:'27',
        //                 hhzqzxccs_qx:'21',
        //                 hhzqzxccs_jb:'5',
        //                 hhzqzxccs_xj:'26',
        //                 hhzqzxcrs_qx:'11',
        //                 hhzqzxcrs_jb:'1',
        //                 hhzqzxcrs_xj:'11',
        //                 wtxccs_qx:'11',
        //                 wtxccs_jb:'22',
        //                 wtxccs_xj:'33',
        //                 xczcs_qx:'32',
        //                 xczcs_jb:'27',
        //                 xczcs_xj:'59',
        //                 wbxchh:0,
        //                 wqzxcrs:0,
        //                 wxcqwwtxcrs:0,
        //                 hhzlzl_ylz:11,
        //                 hhzlzl_wlz:0,
        //                 hhzlzl_lzl:100,
        //                 lxbmlzl_ylz:26,
        //                 lxbmlzl_wlz:0,
        //                 lxbmlzl_lzl:100,
        //                 jjwtgs:65,
        //             },
        //             {
        //                 xzqh:'保康县',
        //                 zrhhz:'11',
        //                 qb:'24',
        //                 hhzs:'27',
        //                 hhzqzxccs_qx:'21',
        //                 hhzqzxccs_jb:'5',
        //                 hhzqzxccs_xj:'26',
        //                 hhzqzxcrs_qx:'11',
        //                 hhzqzxcrs_jb:'1',
        //                 hhzqzxcrs_xj:'11',
        //                 wtxccs_qx:'11',
        //                 wtxccs_jb:'22',
        //                 wtxccs_xj:'33',
        //                 xczcs_qx:'32',
        //                 xczcs_jb:'27',
        //                 xczcs_xj:'59',
        //                 wbxchh:0,
        //                 wqzxcrs:0,
        //                 wxcqwwtxcrs:0,
        //                 hhzlzl_ylz:11,
        //                 hhzlzl_wlz:0,
        //                 hhzlzl_lzl:100,
        //                 lxbmlzl_ylz:26,
        //                 lxbmlzl_wlz:0,
        //                 lxbmlzl_lzl:100,
        //                 jjwtgs:65,
        //             },
        //             {
        //                 xzqh:'保康县',
        //                 zrhhz:'11',
        //                 qb:'24',
        //                 hhzs:'27',
        //                 hhzqzxccs_qx:'21',
        //                 hhzqzxccs_jb:'5',
        //                 hhzqzxccs_xj:'26',
        //                 hhzqzxcrs_qx:'11',
        //                 hhzqzxcrs_jb:'1',
        //                 hhzqzxcrs_xj:'11',
        //                 wtxccs_qx:'11',
        //                 wtxccs_jb:'22',
        //                 wtxccs_xj:'33',
        //                 xczcs_qx:'32',
        //                 xczcs_jb:'27',
        //                 xczcs_xj:'59',
        //                 wbxchh:0,
        //                 wqzxcrs:0,
        //                 wxcqwwtxcrs:0,
        //                 hhzlzl_ylz:11,
        //                 hhzlzl_wlz:0,
        //                 hhzlzl_lzl:100,
        //                 lxbmlzl_ylz:26,
        //                 lxbmlzl_wlz:0,
        //                 lxbmlzl_lzl:100,
        //                 jjwtgs:65,
        //             },
        //             {
        //                 xzqh:'保康县',
        //                 zrhhz:'11',
        //                 qb:'24',
        //                 hhzs:'27',
        //                 hhzqzxccs_qx:'21',
        //                 hhzqzxccs_jb:'5',
        //                 hhzqzxccs_xj:'26',
        //                 hhzqzxcrs_qx:'11',
        //                 hhzqzxcrs_jb:'1',
        //                 hhzqzxcrs_xj:'11',
        //                 wtxccs_qx:'11',
        //                 wtxccs_jb:'22',
        //                 wtxccs_xj:'33',
        //                 xczcs_qx:'32',
        //                 xczcs_jb:'27',
        //                 xczcs_xj:'59',
        //                 wbxchh:0,
        //                 wqzxcrs:0,
        //                 wxcqwwtxcrs:0,
        //                 hhzlzl_ylz:11,
        //                 hhzlzl_wlz:0,
        //                 hhzlzl_lzl:100,
        //                 lxbmlzl_ylz:26,
        //                 lxbmlzl_wlz:0,
        //                 lxbmlzl_lzl:100,
        //                 jjwtgs:65,
        //             },
        //             {
        //                 xzqh:'保康县',
        //                 zrhhz:'11',
        //                 qb:'24',
        //                 hhzs:'27',
        //                 hhzqzxccs_qx:'21',
        //                 hhzqzxccs_jb:'5',
        //                 hhzqzxccs_xj:'26',
        //                 hhzqzxcrs_qx:'11',
        //                 hhzqzxcrs_jb:'1',
        //                 hhzqzxcrs_xj:'11',
        //                 wtxccs_qx:'11',
        //                 wtxccs_jb:'22',
        //                 wtxccs_xj:'33',
        //                 xczcs_qx:'32',
        //                 xczcs_jb:'27',
        //                 xczcs_xj:'59',
        //                 wbxchh:0,
        //                 wqzxcrs:0,
        //                 wxcqwwtxcrs:0,
        //                 hhzlzl_ylz:11,
        //                 hhzlzl_wlz:0,
        //                 hhzlzl_lzl:100,
        //                 lxbmlzl_ylz:26,
        //                 lxbmlzl_wlz:0,
        //                 lxbmlzl_lzl:100,
        //                 jjwtgs:65,
        //             },
        //             {
        //                 xzqh:'保康县',
        //                 zrhhz:'11',
        //                 qb:'24',
        //                 hhzs:'27',
        //                 hhzqzxccs_qx:'21',
        //                 hhzqzxccs_jb:'5',
        //                 hhzqzxccs_xj:'26',
        //                 hhzqzxcrs_qx:'11',
        //                 hhzqzxcrs_jb:'1',
        //                 hhzqzxcrs_xj:'11',
        //                 wtxccs_qx:'11',
        //                 wtxccs_jb:'22',
        //                 wtxccs_xj:'33',
        //                 xczcs_qx:'32',
        //                 xczcs_jb:'27',
        //                 xczcs_xj:'59',
        //                 wbxchh:0,
        //                 wqzxcrs:0,
        //                 wxcqwwtxcrs:0,
        //                 hhzlzl_ylz:11,
        //                 hhzlzl_wlz:0,
        //                 hhzlzl_lzl:100,
        //                 lxbmlzl_ylz:26,
        //                 lxbmlzl_wlz:0,
        //                 lxbmlzl_lzl:100,
        //                 jjwtgs:65,
        //             },
        //             {
        //                 xzqh:'保康县',
        //                 zrhhz:'11',
        //                 qb:'24',
        //                 hhzs:'27',
        //                 hhzqzxccs_qx:'21',
        //                 hhzqzxccs_jb:'5',
        //                 hhzqzxccs_xj:'26',
        //                 hhzqzxcrs_qx:'11',
        //                 hhzqzxcrs_jb:'1',
        //                 hhzqzxcrs_xj:'11',
        //                 wtxccs_qx:'11',
        //                 wtxccs_jb:'22',
        //                 wtxccs_xj:'33',
        //                 xczcs_qx:'32',
        //                 xczcs_jb:'27',
        //                 xczcs_xj:'59',
        //                 wbxchh:0,
        //                 wqzxcrs:0,
        //                 wxcqwwtxcrs:0,
        //                 hhzlzl_ylz:11,
        //                 hhzlzl_wlz:0,
        //                 hhzlzl_lzl:100,
        //                 lxbmlzl_ylz:26,
        //                 lxbmlzl_wlz:0,
        //                 lxbmlzl_lzl:100,
        //                 jjwtgs:65,
        //             },
        //             {
        //                 xzqh:'保康县',
        //                 zrhhz:'11',
        //                 qb:'24',
        //                 hhzs:'27',
        //                 hhzqzxccs_qx:'21',
        //                 hhzqzxccs_jb:'5',
        //                 hhzqzxccs_xj:'26',
        //                 hhzqzxcrs_qx:'11',
        //                 hhzqzxcrs_jb:'1',
        //                 hhzqzxcrs_xj:'11',
        //                 wtxccs_qx:'11',
        //                 wtxccs_jb:'22',
        //                 wtxccs_xj:'33',
        //                 xczcs_qx:'32',
        //                 xczcs_jb:'27',
        //                 xczcs_xj:'59',
        //                 wbxchh:0,
        //                 wqzxcrs:0,
        //                 wxcqwwtxcrs:0,
        //                 hhzlzl_ylz:11,
        //                 hhzlzl_wlz:0,
        //                 hhzlzl_lzl:100,
        //                 lxbmlzl_ylz:26,
        //                 lxbmlzl_wlz:0,
        //                 lxbmlzl_lzl:100,
        //                 jjwtgs:65,
        //             },
        //             {
        //                 xzqh:'保康县',
        //                 zrhhz:'11',
        //                 qb:'24',
        //                 hhzs:'27',
        //                 hhzqzxccs_qx:'21',
        //                 hhzqzxccs_jb:'5',
        //                 hhzqzxccs_xj:'26',
        //                 hhzqzxcrs_qx:'11',
        //                 hhzqzxcrs_jb:'1',
        //                 hhzqzxcrs_xj:'11',
        //                 wtxccs_qx:'11',
        //                 wtxccs_jb:'22',
        //                 wtxccs_xj:'33',
        //                 xczcs_qx:'32',
        //                 xczcs_jb:'27',
        //                 xczcs_xj:'59',
        //                 wbxchh:0,
        //                 wqzxcrs:0,
        //                 wxcqwwtxcrs:0,
        //                 hhzlzl_ylz:11,
        //                 hhzlzl_wlz:0,
        //                 hhzlzl_lzl:100,
        //                 lxbmlzl_ylz:26,
        //                 lxbmlzl_wlz:0,
        //                 lxbmlzl_lzl:100,
        //                 jjwtgs:65,
        //             },
        //             {
        //                 xzqh:'保康县',
        //                 zrhhz:'11',
        //                 qb:'24',
        //                 hhzs:'27',
        //                 hhzqzxccs_qx:'21',
        //                 hhzqzxccs_jb:'5',
        //                 hhzqzxccs_xj:'26',
        //                 hhzqzxcrs_qx:'11',
        //                 hhzqzxcrs_jb:'1',
        //                 hhzqzxcrs_xj:'11',
        //                 wtxccs_qx:'11',
        //                 wtxccs_jb:'22',
        //                 wtxccs_xj:'33',
        //                 xczcs_qx:'32',
        //                 xczcs_jb:'27',
        //                 xczcs_xj:'59',
        //                 wbxchh:0,
        //                 wqzxcrs:0,
        //                 wxcqwwtxcrs:0,
        //                 hhzlzl_ylz:11,
        //                 hhzlzl_wlz:0,
        //                 hhzlzl_lzl:100,
        //                 lxbmlzl_ylz:26,
        //                 lxbmlzl_wlz:0,
        //                 lxbmlzl_lzl:100,
        //                 jjwtgs:65,
        //             },
        //             {
        //                 xzqh:'保康县',
        //                 zrhhz:'11',
        //                 qb:'24',
        //                 hhzs:'27',
        //                 hhzqzxccs_qx:'21',
        //                 hhzqzxccs_jb:'5',
        //                 hhzqzxccs_xj:'26',
        //                 hhzqzxcrs_qx:'11',
        //                 hhzqzxcrs_jb:'1',
        //                 hhzqzxcrs_xj:'11',
        //                 wtxccs_qx:'11',
        //                 wtxccs_jb:'22',
        //                 wtxccs_xj:'33',
        //                 xczcs_qx:'32',
        //                 xczcs_jb:'27',
        //                 xczcs_xj:'59',
        //                 wbxchh:0,
        //                 wqzxcrs:0,
        //                 wxcqwwtxcrs:0,
        //                 hhzlzl_ylz:11,
        //                 hhzlzl_wlz:0,
        //                 hhzlzl_lzl:100,
        //                 lxbmlzl_ylz:26,
        //                 lxbmlzl_wlz:0,
        //                 lxbmlzl_lzl:100,
        //                 jjwtgs:65,
        //             },
        //             {
        //                 xzqh:'保康县',
        //                 zrhhz:'11',
        //                 qb:'24',
        //                 hhzs:'27',
        //                 hhzqzxccs_qx:'21',
        //                 hhzqzxccs_jb:'5',
        //                 hhzqzxccs_xj:'26',
        //                 hhzqzxcrs_qx:'11',
        //                 hhzqzxcrs_jb:'1',
        //                 hhzqzxcrs_xj:'11',
        //                 wtxccs_qx:'11',
        //                 wtxccs_jb:'22',
        //                 wtxccs_xj:'33',
        //                 xczcs_qx:'32',
        //                 xczcs_jb:'27',
        //                 xczcs_xj:'59',
        //                 wbxchh:0,
        //                 wqzxcrs:0,
        //                 wxcqwwtxcrs:0,
        //                 hhzlzl_ylz:11,
        //                 hhzlzl_wlz:0,
        //                 hhzlzl_lzl:100,
        //                 lxbmlzl_ylz:26,
        //                 lxbmlzl_wlz:0,
        //                 lxbmlzl_lzl:100,
        //                 jjwtgs:65,
        //             },
        //
        //         ]
        //
        //     }]
        //     this.setState({
        //         gis:datas
        //     })
        //
        // },3000)

        // let data = ["-",{"code":"0000","data":[{"dataKey":"city","dataName":"襄城区","dataValue":"襄城区","flowNo":"20211224100895","isDel":false},{"dataKey":"wangge","dataName":"第三网格","dataValue":"第三网格","flowNo":"20211224100895","isDel":false},{"dataKey":"flowSource","dataName":"巡查上报","dataValue":"01","flowNo":"20211224100895","isDel":false},{"dataKey":"chuzhidanwei","dataName":"隆中综合执法中心","dataValue":"1037","flowNo":"20211224100895","isDel":false},{"dataKey":"states","dataName":"['超时','异常','高频','重大']","dataValue":['超时','异常','高频','重大'],"flowNo":"20211224100895","isDel":false},{"dataKey":"tel","dataName":"15971096669","dataValue":"15971096669","flowNo":"20211224100895","isDel":false},{"dataKey":"desc","dataName":"游商摊贩占道经营","dataValue":"游商摊贩占道经营","flowNo":"20211224100895","isDel":false},{"dataKey":"upPicture","dataName":"[{\"downloadPath\":\"/upload/2021-12/475e0d16ceceb7c0312791284c273311.jpg\",\"serverId\":\"1WOuVpwVHfQ6vkJWYsbjTmeL_5tLkTH52ulYLycqvIrdF3PlQMxYp0O9jo37TUnE7\",\"url\":\"http://122.188.25.232:89/itsmApp/upload/2021-12/475e0d16ceceb7c0312791284c273311.jpg\"}]","dataValue":"[{\"downloadPath\":\"/upload/2021-12/475e0d16ceceb7c0312791284c273311.jpg\",\"serverId\":\"1WOuVpwVHfQ6vkJWYsbjTmeL_5tLkTH52ulYLycqvIrdF3PlQMxYp0O9jo37TUnE7\",\"url\":\"http://122.188.25.232:89/itsmApp/upload/2021-12/475e0d16ceceb7c0312791284c273311.jpg\"}]","flowNo":"20211224100895","isDel":false},{"dataKey":"finishDate","dataName":"2021-12-24 09:29:36","dataValue":"2021-12-24 09:29:36","flowNo":"20211224100895","isDel":false},{"dataKey":"upPictureAfter","dataName":"[{\"downloadPath\":\"/upload/2021-12/c7cdef9d403ea301acff9a54f5f34692.jpg\",\"serverId\":\"1ECLAvr9Xl9MzUImQ2hErgoniVTk1-pmVmeS1tT9HRjPM-KvznEu1jKwtf3dfsBxr\",\"url\":\"http://122.188.25.232:89/itsmApp/upload/2021-12/c7cdef9d403ea301acff9a54f5f34692.jpg\"}]","dataValue":"[{\"downloadPath\":\"/upload/2021-12/c7cdef9d403ea301acff9a54f5f34692.jpg\",\"serverId\":\"1ECLAvr9Xl9MzUImQ2hErgoniVTk1-pmVmeS1tT9HRjPM-KvznEu1jKwtf3dfsBxr\",\"url\":\"http://122.188.25.232:89/itsmApp/upload/2021-12/c7cdef9d403ea301acff9a54f5f34692.jpg\"}]","flowNo":"20211224100895","isDel":false},{"dataKey":"deal_power","dataName":"街道综合执法中心","dataValue":"街道综合执法中心","flowNo":"20211224100895","isDel":false},{"dataKey":"banjieshijian","dataName":"30","dataValue":"30","flowNo":"20211224100895","isDel":false},{"dataKey":"lat","dataName":"32.00125693063097","dataValue":"32.00125693063097","flowNo":"20211224100895","isDel":false},{"dataKey":"zifazichu","dataName":"true","dataValue":"true","flowNo":"20211224100895","isDel":false},{"dataKey":"jiedaodanwei","dataName":"隆中综合执法中心","dataValue":"1037","flowNo":"20211224100895","isDel":false},{"dataKey":"classD","dataName":"游散摊贩，无固定经营场所的无照经营行为","dataValue":"游散摊贩，无固定经营场所的无照经营行为","flowNo":"20211224100895","isDel":false},{"dataKey":"emergency","dataName":"一般","dataValue":"6","flowNo":"20211224100895","isDel":false},{"dataKey":"street","dataName":"隆中街道办事处","dataValue":"隆中街道办事处","flowNo":"20211224100895","isDel":false},{"dataKey":"lng","dataName":"112.0338817408578","dataValue":"112.0338817408578","flowNo":"20211224100895","isDel":false},{"dataKey":"jieanchuliren","dataName":"徐丽","dataValue":"徐丽","flowNo":"20211224100895","isDel":false},{"dataKey":"jiedaorenyuan","dataName":"徐丽","dataValue":"6740","flowNo":"20211224100895","isDel":false},{"dataKey":"chuzhirenyuan","dataName":"徐丽","dataValue":"6740","flowNo":"20211224100895","isDel":false},{"dataKey":"reporter","dataName":"徐丽","dataValue":"徐丽","flowNo":"20211224100895","isDel":false},{"dataKey":"classA","dataName":"城市管理","dataValue":"城市管理","flowNo":"20211224100895","isDel":false},{"dataKey":"classB","dataName":"街面秩序","dataValue":"街面秩序","flowNo":"20211224100895","isDel":false},{"dataKey":"classC","dataName":"游散摊贩","dataValue":"游散摊贩","flowNo":"20211224100895","isDel":false},{"dataKey":"village","dataName":"隆中社区","dataValue":"隆中社区","flowNo":"20211224100895","isDel":false},{"dataKey":"addr","dataName":"襄城区 明志路 /隆中路文理学院大门旁","dataValue":"襄城区 明志路 /隆中路文理学院大门旁","flowNo":"20211224100895","isDel":false},{"dataKey":"questionTitle","dataName":"游散摊贩","dataValue":"游散摊贩","flowNo":"20211224100895","isDel":false},{"dataKey":"finishRemark","dataName":"已清理","dataValue":"已清理","flowNo":"20211224100895","isDel":false},{"dataKey":"chuzhishijian","dataName":"30","dataValue":"30","flowNo":"20211224100895","isDel":false},{"dataKey":"reportDate","dataName":"2021-12-24 09:00000029:36","dataValue":"2021-12-00000024 09:29:36","flowNo":"20211224100895","isDel":false}],"serviceTime":1640311681761},{"code":"0000","data":{"datas":{"page":1,"rows":[],"searchFilter":[],"size":9999,"total":0}},"serviceTime":1640311681778}]
        // if (data && Array.isArray(data)) {
        //     const s = data[0] || '';
        //     const info = data[1] || {};
        //     const infolist = info.data || [];
        //
        //     const node = data[2] || {};
        //     const n1 = node.data || {};
        //     const n2 = n1.datas || {};
        //     const n3 = n2.rows || [];
        //     this.setState({gis:[s, infolist, n3]})
        // }
        // console.info('devicePixelRatio', window.devicePixelRatio);
        // const ratio = window.devicePixelRatio;
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
                <div style={{
                    width: 2182, height:720,
                    backgroundColor: '#485C6D'
                    /*, position: 'relative', transform: 'scale(0.25)', transformOrigin: '0 0'*/
                }}>
                    <Select dataProvider={[
                        // ...this.state.gis
                    ]} style={this.state.style}/>
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
                <button style={{width: 240, height: 72}} onClick={() => {

                        this.setState({
                            gis: [{
                                gteDate:'2021-01-01 00:00:00',
                                lteDate:'2021-12-31 23:59:59'
                            }]// gis: data
                        })

                        console.log('好了')

                    this.setState({
                        // 导入数据
                        dataProvider: [],
                        // 更新组件样式
                        style: {
                            background: 'red',
                            asds
                        }
                    })
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
