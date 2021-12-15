import React from "react";
import PieChart from "./chart";
import Model_Clip from './Model_Clip';
import geo_pic from "./img/geo.png";
import green_icon from "./img/green_icon.svg";
import yellow_1_icon from "./img/yellow_1_icon.svg";
import yellow_2_icon from "./img/yellow_2_icon.svg";
import red_icon from "./img/red_icon.svg";

import { isEqual } from 'lodash';
import styles from "./index.css";

// 任务类型 ['吞吐量', '船舶监控', '机械监控', '外集卡', '堆存量'];
// workType['W_TTL', 'W_CB', 'W_JX', 'W_WJK', 'W_DCL']; 

// 在对应的数据集中，传入的数据应该加一个workType类型，表明是哪种业务的数据; eg: {name: 'xxx',type: 'JZX', workType: 'tuntuliang', ...};
// 外部切换码头类型：通过参数传递到数据集，获得对应码头的信息, 默认的都是集装箱码头

// 告警级别level[0: 红色告警, 1: 橙色, 2: 暗黄, 3: 青色]
// level也作机械监控（状态只有0，3）中的低于/高于平均值状态

// workType = '' 显示总览的地图全貌
const posMap = [
    { name: '宜东', top: '44.2%', left: '33.8%'},
    { name: '振东', top: '30%', left: '41.3%' },
    { name: '浦东', top: '36.7%', left: '47.6%' },
    { name: '沪东', top: '44.9%', left: '51.8%' },
    { name: '明东', top: '51.4%', left: '56.5%' },
    { name: '盛东', top: '71.3%', left: '78.8%' },
    { name: '尚东', top: '69.9%', left: '85.2%' },
    { name: '冠东', top: '79.8%', left: '89.7%' },
    { name: '罗泾', top: '21.2%', left: '29.8%'},
    { name: '罗矿', top: '23.2%', left: '34.3%' },
    { name: '罗煤', top: '26.7%', left: '38.6%' },
    { name: '张华浜', top: '38.9%', left: '28.8%' },
    { name: '共青', top: '40.4%', left: '40.5%' },
    { name: '浦远', top: '43.3%', left: '45.7%' },
    { name: '海通', top: '54.9%', left: '58.2%' },
    { name: '龙吴', top: '55.8%', left: '39.7%' },
    { name: '洋油', top: '80%', left: '93.3%' }
  ];
  // 吞吐量
const ttlMap = [
  { name: '宜东', top: '31.2%', left: '34.8%'},
  { name: '振东', top: '17%', left: '41.3%' },
  { name: '浦东', top: '22.7%', left: '46.6%' },
  { name: '沪东', top: '33.9%', left: '51.8%' },
  { name: '明东', top: '39.4%', left: '56.5%' },
  { name: '盛东', top: '58.3%', left: '78.8%' },
  { name: '尚东', top: '55.9%', left: '85.2%' },
  { name: '冠东', top: '65.8%', left: '90.7%' },
  { name: '罗泾', top: '7.2%', left: '29.8%'},
  { name: '罗矿', top: '9.2%', left: '34.3%' },
  { name: '罗煤', top: '11.7%', left: '37.9%' },
  { name: '张华浜', top: '22.9%', left: '29.8%' },
  { name: '共青', top: '24.4%', left: '39.5%' },
  { name: '浦远', top: '28.3%', left: '44.7%' },
  { name: '海通', top: '38.9%', left: '57.2%' },
  { name: '龙吴', top: '35.8%', left: '39.7%' },
  { name: '洋油', top: '66%', left: '93.3%' }
]
// 船舶、外集卡、对存量
const cwdMap = [
  { name: '宜东', top: '21.2%', left: '34.8%'},
  { name: '振东', top: '7%', left: '41.3%' },
  { name: '浦东', top: '12.7%', left: '46.6%' },
  { name: '沪东', top: '23.9%', left: '51.8%' },
  { name: '明东', top: '29.4%', left: '56.5%' },
  { name: '盛东', top: '48.3%', left: '78.8%' },
  { name: '尚东', top: '45.9%', left: '85.2%' },
  { name: '冠东', top: '55.8%', left: '90.7%' },
  { name: '罗泾', top: '1%', left: '29.8%'},
  { name: '罗矿', top: '1.2%', left: '34.3%' },
  { name: '罗煤', top: '3.7%', left: '37.9%' },
  { name: '张华浜', top: '14.9%', left: '29.8%' },
  { name: '共青', top: '16.4%', left: '39.5%' },
  { name: '浦远', top: '20.3%', left: '44.7%' },
  { name: '海通', top: '30.9%', left: '57.2%' },
  { name: '龙吴', top: '27.8%', left: '39.7%' },
  { name: '洋油', top: '56%', left: '93.3%' }
]
// 机械
const jxMap = [
  { name: '宜东', top: '44.2%', left: '11.8%'},
  { name: '振东', top: '30%', left: '18.3%' },
  { name: '浦东', top: '34.7%', left: '23.6%' },
  { name: '沪东', top: '41.9%', left: '27.8%' },
  { name: '明东', top: '52.4%', left: '33.5%' },
  { name: '盛东', top: '72.3%', left: '56.8%' },
  { name: '尚东', top: '69.9%', left: '62.2%' },
  { name: '冠东', top: '79.8%', left: '69.7%' },
  { name: '罗泾', top: '21.2%', left: '6.8%'},
  { name: '罗矿', top: '23.2%', left: '12.3%' },
  { name: '罗煤', top: '26.7%', left: '15.6%' },
  { name: '张华浜', top: '36.9%', left: '3.8%' },
  { name: '共青', top: '41.4%', left: '15.5%' },
  { name: '浦远', top: '43.3%', left: '20.7%' },
  { name: '海通', top: '54.9%', left: '33.2%' },
  { name: '龙吴', top: '55.8%', left: '14.7%' },
  { name: '洋油', top: '82%', left: '72.3%' }
];

// 告警值value
const dataList = [
    {
      name: "宜东",
      value: 23,
      level: 2,
      workType: 'W_TTL',
      stopWarning: 1,
      progressWarning: 21,
      regionalWarning: 1,
      stopLevel: 0,
      progressLevel: 1,
      regionalLevel:2
    },
    {
      name: "振东",
      value: 84,
      level: 0,
      workType: 'W_TTL',
      stopWarning: 3,
      progressWarning: 1,
      regionalWarning: 2,
      stopLevel: 0,
      progressLevel: 1,
      regionalLevel:2
    },
    {
      name: "浦东",
      value: 67,
      level: 3,
      workType: 'W_TTL',
      stopWarning: 14,
      progressWarning: 21,
      regionalWarning: 2,
      stopLevel: 0,
      progressLevel: 1,
      regionalLevel:2
    },
    {
      name: "沪东",
      value: 84,
      level: 1,
      workType: 'W_TTL',
      stopWarning: 14,
      progressWarning: 21,
      regionalWarning: 0,
      stopLevel: 0,
      progressLevel: 1,
      regionalLevel:2,
      stopLevel: 0,
      progressLevel: 1,
      regionalLevel:2
    },
    {
      name: "明东",
      value: 12,
      level: 3,
      workType: 'W_CB',
      stopWarning: 14,
      progressWarning: 21,
      regionalWarning: 12,
      stopLevel: 0,
      progressLevel: 1,
      regionalLevel:2,
      stopLevel: 0,
      progressLevel: 1,
      regionalLevel:2
    },
    {
      name: "盛东",
      value: 77,
      level: 2,
      workType: 'W_TTL',
      stopWarning: 14,
      progressWarning: 21,
      regionalWarning: 0,
      stopLevel: 0,
      progressLevel: 1,
      regionalLevel:2
    },
    {
      name: "尚东",
      value: 64,
      level: 3,
      workType: 'W_TTL',
      stopWarning: 14,
      progressWarning: 21,
      regionalWarning: 0,
      stopLevel: 0,
      progressLevel: 1,
      regionalLevel:2
    },
    {
      name: "冠东",
      value: 90,
      level: 0,
      workType: 'W_TTL',
      stopWarning: 14,
      progressWarning: 21,
      regionalWarning: 0,
      stopLevel: 0,
      progressLevel: 1,
      regionalLevel:2
    }
  ]

/**
 * 上海港-地图
 *
 * @class SHMap
 * @extends {React.Component}
 */
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: '',
      data: [],
      id: -1,
      handlers: {},
      currPos: [],
      workType: '',
      mapType: 'all'
    };
  }

  componentWillMount() {
    let currWharfName = '', currWorkType = '';
    const { dataProvider } = this.props;
    if (dataProvider && Array.isArray(dataProvider) && dataProvider[0]) {
      let { name = '', workType = '' } = dataProvider[0] || {};
      currWharfName = name;
      currWorkType = workType;
    }
    this.initialState(currWharfName, currWorkType, this.props);
  }

  componentDidMount() {
    const { buffEvent = [{type: 'click'}] } = this.props;
    let eventValue = {};

    for (let i = 0; i < buffEvent.length; i++) {
      const eventObj = buffEvent[i];
      const { type, method, bindedComponents } = eventObj;
      if (type === 'click') {
        eventValue = {
          onClick: (name) => {
            method && method({type: this.state.type, value: name || ''}, bindedComponents)
          }
        }
      }
    }

    this.setState({
      handlers: Object.assign({}, eventValue)
    })
  }

  initialState = (wharfName, workType, props) => {
    // {type: 'JZX/SZH', name: 'xxx', workType}
    const dataProvider = this.getDataProvider(props);
    let state = {};
    let list = [...dataList];
    const dataValue = dataProvider[0];
    if (dataValue) {
      list = [...dataProvider];
    }
    let map = posMap;
    const cwdList = ['W_CB', 'W_WJK', 'W_DCL'];
    let mapType = 'all';
    if (list.length && list[0].workType) {
      if (list[0].workType === 'W_TTL') {
        map = ttlMap;
        mapType = 'ttl';
      } else if (cwdList.indexOf(list[0].workType) !== -1) {
        map = cwdMap;
        mapType = 'cwd';
      } else if (list[0].workType === 'W_JX') {
        map = jxMap;
        mapType = 'jx';
      }
    } 

    const data = list.filter(item => {
      const count = map.filter(ele => ele.name === item.name);
      return count && count.length;
    })
    if (data && data.length)  {
      state = {
        data: [...data],
        currPos: [].concat(map || []),
        scale: wharfName || data[0].name,
        workType: workType || data[0].workType || 'W_TTL',
        mapType
      };
    }
    this.setState({...state});
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      const prePropsData = this.getDataProvider(this.props)[0] || {};
      const nextPropsData = this.getDataProvider(nextProps)[0] || {};
      const newStateData = Object.assign({}, prePropsData, nextPropsData);
      this.initialState(newStateData['name'], newStateData['workType'], nextProps);
    }
  }

  getDataProvider = props => {
    const { dataProvider } = props;
    if (dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && dataProvider[0] !== "") {
      return [...dataProvider]
    } else {
      return [];
    }
  }

  // 获取颜色值
  getColor = num => {
    const colorList = ["#FF4413", "#FFAB00", "#B19802"];
    return colorList[num] || '#7CFFE6';
  }

  // 机械监控只有两个状态
  getJXColor = num => {
    if (num) {
      return '#7CFFE6';
    }
    return '#FF4413';
  }

  // 获取图标
  getPic = num => {
    if (num === 0) {
      return red_icon;
    } else if (num === 1) {
      return yellow_2_icon;
    } else if (num === 2) {
      return yellow_1_icon;
    }
    return green_icon;
  }

  // 获取机械图标
  getJXPic = num => {
    if (num === 0) {
      return red_icon;
    }
    return green_icon;
  }

  // 点击缩放
  onClickBlock = record => {
    this.setState({
      scale: record
    })
  }

  // 散杂货-船舶图形位置
  getCBPostion = name => {
    const list = [
      { name: '罗泾', top: -23, left: -127 },
      { name: '张华浜', top: 46, left: -146 },
      { name: '罗矿', top: -33, left: 129 },
      { name: '罗煤', top: -47, left: 202 },
      { name: '共青', top: 18, left: -106 },
      { name: '浦远', top: -14 },
      { name: '龙吴', top: 19 },
      { name: '洋油', top: -210, left: -26 },
      { name: '共青', top: -70 },
    ]
    const obj = list.find(item => item.name === name) || { name: '' };
    delete obj.name;
    return { ...obj }
  }

  // 获取散杂货位置
  getSZHPosition = (item, workType) => {
    const name = item.name || '';
    const isZhb = name === "张华浜";
    const isLeft = (name === "罗泾" || name === "共青");
    let leftx = isLeft ? -90 : null;
    leftx = name === "罗泾" && workType === 'W_JX' ? -66 : leftx;
    const flexd = isZhb ? { position: 'absolute', left: 76 } : null;
    const blockStyle = isZhb ? '' : styles['fi_block'];
    const iconStyle = isZhb ? '' : styles['icon_block'];
    const icon_blockS = isZhb ? { position: 'absolute', width: 170 } : null;
    const scale_circle = isZhb ? styles["Zhb_circle"] : styles["scale_circle"];
    const middle_scale = isZhb ? styles["middleZhb_circle"] : styles["middle_scale"];
    const min_scale = isZhb ? styles["minZhb_circle"] : styles["min_scale"];
    const minn_scale = isZhb ? styles["minnZhb_circle"] : styles["minn_scale"];
    let yd_pie_p = isZhb ? { top: -31, left: -96, transformOrigin: 'center' } : {};
    yd_pie_p = isZhb && workType === 'W_JX' ? { top: 42, left: -8 } : yd_pie_p;
    const gq_pie_p = name === "共青" ? { top: 41 } : null;
    let lk_pie_p = name === "罗矿" ? { top: -24, left: 183 } : null;
    lk_pie_p = name === "罗矿" && workType === 'W_JX' ? { top: -111, left: 50 } : lk_pie_p;
    lk_pie_p = name === "罗矿" && workType === 'W_TTL' ? { top: -76, left: 80 } : lk_pie_p;
    lk_pie_p = name === "罗矿" && workType === 'W_WJK' ? { top: -17, left: 206 } : lk_pie_p;
    const font_style = isZhb ? { position: 'absolute', left: -18 } : null;
    let pie_block = workType === 'W_CB' ? styles.pie_block_right : styles.pie_block;
    let yy_pie_p = (name === '洋油') ? { top: -129, left: -6 } : {};
    yy_pie_p = (name === '洋油' && workType === 'W_TTL') ? { top: -125, left: -17 } : yy_pie_p; 
    return { isLeft, leftx, flexd, blockStyle, iconStyle, icon_blockS, scale_circle, middle_scale, min_scale, 
      minn_scale, yd_pie_p, gq_pie_p, lk_pie_p, font_style, pie_block, yy_pie_p }
  }

  // 集装箱位置
  getJZXPosition = (item, workType) => {
    const name = item.name || '';
    const isYD = name === "宜东";
    const isLeft = (name === "盛东" || name === "振东" || name === "沪东");
    const leftx = isLeft ? -90 : null;

    const flexd = isYD ? { position: 'absolute', left: 63 } : null;
    const blockStyle = isYD ? '' : styles['fi_block'];
    const iconStyle = isYD ? '' : styles['icon_block'];
    const icon_blockS = isYD ? { position: 'absolute', width: 170 } : null;
    const scale_circle = isYD ? styles["yidong_circle"] : styles["scale_circle"];
    const middle_scale = isYD ? styles["middleYd_circle"] : styles["middle_scale"];
    const min_scale = isYD ? styles["minYd_circle"] : styles["min_scale"];
    const minn_scale = isYD ? styles["minnYd_circle"] : styles["minn_scale"];
    const yd_pie_p = isYD ? { top: 20, left: 0, transformOrigin: 'center top' } : null;
    let pie_block = workType === 'W_CB' ? styles.pie_block_right : styles.pie_block;
    pie_block = name === '浦东' || name === '尚东' ? styles.pie_block_cb : pie_block;
    pie_block = (name === '浦东' && (workType === 'W_WJK' || workType === 'W_DCL')) ? styles.pie_block_cb_pd_wjk : pie_block;
    pie_block = name === '振东' ? styles.pie_block_cb_zd : pie_block;
    pie_block = (name === '振东' && (workType === 'W_WJK' || workType === 'W_DCL')) ? styles.pie_block_cb_zd_wjk : pie_block;
    pie_block = name === '明东' ? styles.pie_block_md : pie_block;
    pie_block = (name === '冠东' && workType === 'W_CB') ? styles.pie_block_right_gd : pie_block;
    pie_block = (name === '冠东' && workType === 'W_TTL') ? styles.pie_block_right_gd_ttl : pie_block;
    pie_block = (name === '冠东' && (workType === 'W_WJK' || workType === 'W_DCL')) ? styles.pie_block_right_gd_wjk : pie_block;
    return { isLeft, leftx, flexd, blockStyle, iconStyle, icon_blockS, scale_circle,
      middle_scale, min_scale, minn_scale, yd_pie_p, pie_block }
  }

  // 渲染
  render () {
    const { data = [], currPos = [], workType = '', mapType = '' } = this.state;
    const that = this;
    let imgStyle = {};
    if (mapType === 'ttl') {
      imgStyle = { position: 'absolute', top: -105 };
    } else if (mapType === 'cwd') {
      imgStyle = { position: 'absolute', top: -185 };
    } else if (mapType === 'jx') {
      imgStyle = { position: 'absolute', left: -354 };
    }
    const isJZX = data.filter(item => (item.name && item.name.indexOf('东')) !== -1);
    return <div style={{ width: '100%', height: "100%", position: 'relative', display: 'flex', overflow: 'hidden' }}>
      <img style={{ width: '100%', height: '100%', ...imgStyle }} src={geo_pic} />
      {
        data.map((item, index) => {
          const Pos = isJZX && isJZX.length ? that.getJZXPosition(item, workType) : that.getSZHPosition(item, workType);
          const { level = 4, value = 0, name } = item;
          const f_color = workType !== 'W_JX' ? this.getColor(level) : this.getJXColor(level);
          const icon_p = workType !== 'W_JX' ? this.getPic(level) : this.getJXPic(level);
          const isScale = this.state.scale === item.name;
          const scaleOrigin = Pos.isLeft ? '70px bottom' : 'left';
          const absoluteObj = currPos.find(k => k.name === item.name);
          const pie_block_obj = workType === 'W_CB' ? this.getCBPostion(item.name) : {};
          const shipWarning = { stop: item.stopWarning, progress: item.progressWarning, regional: item.regionalWarning };

          return <div
              className={Pos.iconStyle} key={index}
              style={{ top: (absoluteObj && absoluteObj.top) || 0, left: (absoluteObj && absoluteObj.left) || 0, ...Pos.icon_blockS }}
              onClick={ () => {
                this.onClickBlock(name);
                this.state.handlers.onClick && this.state.handlers.onClick(name);
              }}
            >
            {/* 文字和图标 */}
            <div className={Pos.blockStyle} 
              style={{
                transition: 'all 500ms',
                transform: isScale ? "scale(1.2)" : "scale(1)",
                transformOrigin: (item.name === "宜东") || (item.name === "张华浜") ? '100px bottom' : '0px bottom',
                position: 'relative'
              }}>
              <span style={{ color: (f_color === '#B19802' ? '#FDD835' : f_color), fontSize: 30, ...Pos.font_style}} className={styles["font_block"]}>{item.name}</span>
              <img src={icon_p} className= {styles["img_blcok"]} style={{ height: 37, ...Pos.flexd }}/>
              {
                isScale ? <span>
                    <span className={Pos.scale_circle} style={{  backgroundColor: f_color }}></span>
                    <span className={Pos.middle_scale} style={{ backgroundColor: f_color }}></span>
                    <span className={Pos.min_scale} style={{ backgroundColor: f_color }}></span>
                    <span className={Pos.minn_scale} style={{ backgroundColor: f_color }}></span>
                  </span> : null
              }
            </div>
            {/* 吞吐量-饼图 */}
            <div className={Pos.pie_block}
              style={{
                transition: 'all 500ms',
                left: Pos.leftx || "auto",
                transform: isScale ? "scale(1.4)" : "scale(1)",
                transformOrigin: scaleOrigin,
                ...Pos.yd_pie_p,
                ...Pos.gq_pie_p,
                ...Pos.lk_pie_p,
                ...Pos.yy_pie_p,
                ...pie_block_obj
              }}>
              <Model_Clip
                level={item.level}
                width={90}
                stopLevel={item.stopLevel}
                progressLevel={item.progressLevel}
                regionalLevel={item.regionalLevel}
                pie_color={f_color}
                value={Number(value)}
                shipWarning={shipWarning}
                total={100}
                workType={workType}
              />
            </div>
          </div>
        })
      }
    </div>
  }
}

export default Map;
