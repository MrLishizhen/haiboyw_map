import React from 'react';
import styles from './index.less';
import { Collapse, Icon, Row, Col } from 'antd';
import { isEqual } from 'lodash';
import jvxing from './jvxing.png';
import zhixian from './zhixian.png';

const { Panel } = Collapse;

// 区指挥
// var dataList = [
//   {
//     name: "区应急管理局",
//     number: 1,
//     content: [
//       {
//         "姓名": "张海",
//         state: "离岗",
//         operate: "",
//       }
//     ]
//   },
//   {
//     name: "区建管委",
//     number: 4,
//     content: [
//       {
//         "姓名": "蒋志清",
//         state: "离岗",
//         operate: "",
//       },
//       {
//         "姓名": "詹茂福",
//         state: "离岗",
//         operate: "",
//       },
//       {
//         "姓名": "吴危",
//         state: "离岗",
//         operate: "",
//       },
//       {
//         "姓名": "萨本良",
//         state: "离岗",
//         operate: "",
//       }
//     ]
//   }
// ];

// 
var dataList = [{ "单位": "新华路街道办事处", "姓名": "沈建忠", "state": "离岗", "手机": 13333332222 }, { "单位": "新华路街道办事处", "姓名": "赵  鹏", "state": "离岗" }, { "单位": "新华路街道办事处", "姓名": "李旻", "state": "离岗" }, { "单位": "新华路街道办事处", "姓名": "杨顺益", "state": "在岗" }, { "单位": "江苏路街道办事处", "姓名": "沈  昕", "state": "离岗" }, { "单位": "江苏路街道办事处", "姓名": "杨竑杰", "state": "在岗" }, { "单位": "江苏路街道办事处", "姓名": "王剑峰", "state": "离岗" }, { "单位": "江苏路街道办事处", "姓名": "刘  勇", "state": "在岗" }, { "单位": "江苏路街道办事处", "姓名": "张哲人", "state": "在岗" }, { "单位": "华阳路街道办事处", "姓名": "林子岳", "state": "离岗" }, { "单位": "华阳路街道办事处", "姓名": "王骏宏", "state": "在岗" }, { "单位": "华阳路街道办事处", "姓名": "李明华", "state": "在岗" }, { "单位": "华阳路街道办事处", "姓名": "刘  阳", "state": "离岗" }, { "单位": "华阳路街道办事处", "姓名": "宿嘉诚", "state": "在岗" }, { "单位": "华阳路街道办事处", "姓名": "朱晓敏", "state": "离岗" }, { "单位": "华阳路街道办事处", "姓名": "朱晓敏", "state": "在岗" }, { "单位": "周家桥街道办事处", "姓名": "叶  斌", "state": "离岗" }, { "单位": "周家桥街道办事处", "姓名": "张  宁", "state": "离岗" }, { "单位": "周家桥街道办事处", "姓名": "何新华", "state": "离岗" }, { "单位": "周家桥街道办事处", "姓名": "陆孟飞", "state": "在岗" }, { "单位": "天山路街道办事处", "姓名": "余  双", "state": "离岗" }, { "单位": "天山路街道办事处", "姓名": "黄  伟", "state": "离岗" }, { "单位": "天山路街道办事处", "姓名": "赵文良", "state": "离岗" }, { "单位": "天山路街道办事处", "姓名": "张  帆", "state": "离岗" }, { "单位": "天山路街道办事处", "姓名": "赵丽霞", "state": "离岗" }, { "单位": "仙霞新村街道办事处", "姓名": "周  薇", "state": "离岗" }, { "单位": "仙霞新村街道办事处", "姓名": "邵晓峰", "state": "离岗" }, { "单位": "仙霞新村街道办事处", "姓名": "程万霆", "state": "离岗" }, { "单位": "仙霞新村街道办事处", "姓名": "朱翔宇", "state": "在岗" }, { "单位": "虹桥街道办事处", "姓名": "高  峥", "state": "离岗" }, { "单位": "虹桥街道办事处", "姓名": "王栋", "state": "离岗" }, { "单位": "虹桥街道办事处", "姓名": "黄以光", "state": "在岗" }, { "单位": "虹桥街道办事处", "姓名": "陈  诚", "state": "离岗" }, { "单位": "程家桥街道办事处", "姓名": "游  雁", "state": "离岗" }, { "单位": "程家桥街道办事处", "姓名": "王晔菲", "state": "离岗" }, { "单位": "程家桥街道办事处", "姓名": "王炎宁", "state": "离岗" }, { "单位": "程家桥街道办事处", "姓名": "张卫良", "state": "离岗" }, { "单位": "程家桥街道办事处", "姓名": "赖伟军", "state": "离岗" }, { "单位": "北新泾街道办事处", "姓名": "张生义", "state": "离岗" }, { "单位": "北新泾街道办事处", "姓名": "李志斌", "state": "离岗" }, { "单位": "北新泾街道办事处", "姓名": "付清华", "state": "在岗" }, { "单位": "北新泾街道办事处", "姓名": "蒋童晨", "state": "离岗" }, { "单位": "新泾镇", "姓名": "金卫峰", "state": "离岗" }, { "单位": "新泾镇", "姓名": "詹迪火", "state": "在岗" }, { "单位": "新泾镇", "姓名": "陈俊", "state": "离岗" }, { "单位": "新泾镇", "姓名": "马永生", "state": "离岗" }];
/**
 * 长宁 - 防台防汛 - 防汛力量 - 区指挥
 * 
 */
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: []
    };
  }

  componentDidMount() {
    try {
      const list = this.getDataProvider(this.props);
      let data = dataList;
      if (list && list.length) {
        data = list;
      }
      let units = [];
      data.forEach(element => {
        units.push(element.单位)
      });
      // 单位
      units = Array.from(new Set(units));

      let dataCl = [];
      let arr = [];
      units.forEach(item => {
        const filterData = data.filter(fitem => fitem.单位 == item);
        arr.push(filterData)
      });
      // console.log(arr);

      arr.forEach(ite => {
        dataCl.push({ name: ite[0].单位, number: ite.length, content: ite })
      })
      console.log(dataCl);

      const { buffEvent = [{ type: 'click' }] } = this.props;

      let eventValue = {};
      for (let i = 0; i < buffEvent.length; i++) {
        const eventObj = buffEvent[i];
        const { type, method, bindedComponents } = eventObj;
        if (type === 'click') {
          eventValue = {
            onClick: (record) => {
              method && method({ ...record }, bindedComponents)
            }
          }
        }
      }

      this.setState({ val: dataCl, handlers: Object.assign({}, eventValue) })
    }
    catch (e) {
      console.error('componentDidMount', e);
    }
  }

  // 校验dataProvider
  getDataProvider = props => {
    const { dataProvider } = props;
    if (dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && dataProvider[0] !== "") {
      return [...dataProvider]
    } else {
      return [];
    }
  }

  componentWillReceiveProps(nextProps) {
    try {
      if (!isEqual(this.props, nextProps)) {
        const nextPropsData = this.getDataProvider(nextProps);

        let units = [];
        nextPropsData.forEach(element => {
          units.push(element.单位)
        });
        // 单位
        units = Array.from(new Set(units));

        let dataCl = [];
        let arr = [];
        units.forEach(item => {
          const filterData = nextPropsData.filter(fitem => fitem.单位 == item);
          arr.push(filterData)
        });
        // console.log(arr);

        arr.forEach(ite => {
          dataCl.push({ name: ite[0].单位, number: ite.length, content: ite })
        })
        console.log(dataCl);

        this.setState({ val: dataCl })
      }
    }
    catch (e) {
      console.error('componentDidMount', e);
    }
  }

  callPerson(phone) {
    const { handlers } = this.state;
    handlers && handlers.onClick && handlers.onClick({ phone });
  }


  render() {
    const { val } = this.state;
    return (
      <div className={styles.divBorder}>
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => <img style={{ height: 12 }} src={jvxing}></img>}
        >
          {
            val && val.map((item, index) => {
              const { content } = item;
              return (
                <Panel header={item.name} key={index + 1} className={styles.customPanelStyle} extra={<div><span style={{ color: "#00CEFE" }}>人数: </span><span style={{ color: "#fff" }}>{item.number}</span></div>}>
                  <div className={styles.tableBJ}>
                    <Row style={{ marginBottom: 30 }}>
                      <Col span={8} className={styles.headCss}>姓名/编号</Col>
                      <Col span={8} className={styles.headCss}>状态</Col>
                      <Col span={8} className={styles.headCss}>电话</Col>
                      {/* <Col span={4}></Col> */}
                    </Row>
                    {
                      content && content.map((contentItems, index) => {
                        return (
                          <Row>
                            <Col span={8} className={styles.borderCss}>{`${contentItems.姓名}`}</Col>
                            <Col span={8} className={styles.borderCss} style={contentItems.state === '在岗' ? { color: '#00feb4' } : {}}>{contentItems.state}</Col>
                            <Col span={8} className={[styles.borderCss, styles.phone].join(' ')} onClick={this.callPerson.bind(this, contentItems.手机) || ""}>{contentItems.手机}</Col>
                            {/* <Col span={4} className={styles.phone} onClick={this.callPerson.bind(this, contentItems.手机) || ""}><Icon type="phone" /></Col> */}
                            <img style={{ width: "90%", marginLeft: "5%" }} src={zhixian}></img>
                          </Row>
                        )
                      })
                    }
                  </div>
                </Panel>
              )
            })
          }
        </Collapse>
      </div>
    )
  }
}

export default Index;
