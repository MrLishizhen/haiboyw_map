import React from 'react';
import { isEqual } from 'lodash';
import VDCollapse from '../common/VDCollapse';
import Content from './Content';
import Header from './Header';

const datalist = [
  // { streetname: '', commander: '王广辉', duty: '沙志斌', c_phone: '18516021622', d_phone: '18516722388', link: 'http://10.81.71.38/chengyun/chengyun-fe/page1.html#/?code=BxTUtI2uGLhTiK0c_vG8Ju-o9iGCBQv5' },
  { streetname: '新华路街道', commander: '沈建忠', duty: '赵鹏', c_phone: '17634222386', d_phone: '18320323883', link: 'http://10.81.71.38/chengyun/chengyun_town/page1.html#/?code=edlmx5IGszVDtUKLoNKTgKf4R1nRxcHG' },
  { streetname: '江苏路街道', commander: '沈昕', duty: '曹加明', c_phone: '13489039012', d_phone: '18455670946', link: 'http://10.81.71.38/chengyun/chengyun_town/page1.html#/?code=NrC4kzKjdJu4sBO1g6iXUVRsAJSIaOqm' },
  { streetname: '华阳路街道', commander: '林子岳', duty: '王俊宏', c_phone: '15720348909', d_phone: '18620342099', link: 'http://10.81.71.38/chengyun/chengyun_town/page1.html#/?code=wcih7vzI4llyuJbiiENnsVJxNtz9N2-c' },
  { streetname: '周家桥街道', commander: '赵冬兵', duty: '王洁华', c_phone: '18490342393', d_phone: '18690342733', link: 'http://10.81.71.38/chengyun/chengyun_town/page1.html#/?code=FlY81F7g3SSvaALs-rZLe913KRoxUo7o' },
  { streetname: '天山路街道', commander: '余双', duty: '黄伟', c_phone: '18340342373', d_phone: '18890342993', link: 'http://10.81.71.38/chengyun/chengyun_town/page1.html#/?code=IIxPfPwVPNO0iM5n8HQbd-shdDS4ZvM2' },
  { streetname: '仙霞新村街道', commander: '周薇', duty: '邵晓峰', c_phone: '18690382953', d_phone: '18834332488', link: 'http://10.81.71.38/chengyun/chengyun_town/page1.html#/?code=BffULyTzD0uz0JjvogMOiHNFsj37J9b4' },
  { streetname: '虹桥街道', commander: '郭凯', duty: '徐俊', c_phone: '18890342393', d_phone: '1880322399', link: 'http://10.81.71.38/chengyun/chengyun_town/page1.html#/?code=_wcGblYDn_0LpQ9o7E0rRucVhnEmW39x' },
  { streetname: '程家桥街道', commander: '游雁', duty: '周玉祥', c_phone: '18390243835', d_phone: '17621435636', link: 'http://10.81.71.38/chengyun/chengyun_town/page1.html#/?code=G39yshDJJSo2l4_b0ZmcJ3El-6z4rgwS' },
  { streetname: '北新泾街道', commander: '董海峰', duty: '李志斌', c_phone: '18340853466', d_phone: '15290770207', link: 'http://10.81.71.38/chengyun/chengyun_town/page1.html#/?code=i2JmTjuLxl14FOOvjDd2y7BCdvSNz4E0' },
  { streetname: '新泾镇', commander: '金卫峰', duty: '侯学军', c_phone: '13909123455', d_phone: '17609890067', link: 'http://10.81.71.38/chengyun/chengyun_town/page1.html#/?code=Fs0EPotSRUJbj4Pf6vnulYggubnNejIL' },
  { streetname: '虹桥临空园区', commander: '孙毅', duty: '王伟东', c_phone: '18450342355', d_phone: '18490342388', link: 'http://10.81.71.38/chengyun/chengyun_town/page1.html#/?code=sRYaC0bRmm_As8dvTQqx6p2flCDYTySp' }
]

/**
 * 街道网格化管理-street_manage
 * _cnyw_street_manage
 * 802*1056
 *
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      handlers: ''
    }
  }

  componentDidMount() {
    let list = [...datalist];
    const data = this.getDataProvider(this.props);
    if (data.length) {
      list = [...data];
    }
    // 绑定事件
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
    this.setState({
      data: list,
      handlers: Object.assign({}, eventValue)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      const data = this.getDataProvider(nextProps);
      this.setState({
        data
      })
    }
  }

  // 校验数据集
  getDataProvider = props => {
    const { dataProvider } = props;
    if (dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && dataProvider[0] !== "") {
      return [...dataProvider]
    } else {
      return [];
    }
  }

  // 点击电话/搜索
  onClickHandlers = (record, type) => {
    const { handlers } = this.state;

    if (type === "phone" && record.name === "区政府") {
      handlers.onClick && handlers.onClick(record, type);
    }
    if (type === "search") {
      handlers.onClick && handlers.onClick(record, type);
    }
  }

  render() {
    const { data = [] } = this.state;

    return (
      <div style={{ height: '100%', width: '100%' }}>
        <VDCollapse
          data={data}
          header={record => <Header data={record} onClick={(ele, type) => this.onClickHandlers.bind(this, ele, type)()} />}
          content={record => <Content data={record} />}
        // lineStyle={'2px dashed #5394D5'}
        />
      </div>
    )
  }
}

export default Index;
