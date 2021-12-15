import React from 'react'
import style from '../index.less';
import axios from 'axios';
import { isEmpty, isEqual } from 'lodash'

class SlideOne extends React.Component {
  state = {
    streetCaseNums: {},
    street: ''
  }
  pagedate = [];
  dataList = [
    ['新华路街道', '江苏路街道', '华阳路街道'],
    ['周家桥街道', '天山路街道', '仙霞新村街道'],
    ['虹桥街道', '程家桥街道', '北新泾街道'],
    ['新泾镇', '虹桥临空经济园区', '总计']]
  /* 
    接收左侧查询时间
  */
  componentWillReceiveProps(nextProps) {
    try {
      //屏幕左侧时间
      if (nextProps.style && !isEmpty(nextProps.style)) {
        const pagedate = nextProps.style.pagedate;
        if (pagedate && !isEqual(pagedate, this.props.style.pagedate)) {
          this.pagedate = pagedate;
          this.getStreetCaseNums()
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  componentDidMount() {
    const provider = this.getDataProvider(this.props);
    this.setState({
      street: provider
    })

    setInterval(this.getStreetCaseNums.bind(this), 60000 * 5)
  }
  // 校验dataProvider
  getDataProvider = props => {
    const { dataProvider } = props;
    if (dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && dataProvider[0] !== "") {
      return dataProvider[0];
    } else {
      return '';
    }
  }
  //获取街道事件数量
  getStreetCaseNums() {
    const params = new FormData();
    params.append('checkToken', 'no');
    params.append('gteDate', this.pagedate[0]);
    params.append('lteDate', this.pagedate[1]);
    params.append('type', 'street');
    axios.post('http://10.89.7.160:9527/itsmApp/visData/getCountVis', params)
      .then(({ data }) => {
        if (data.code === "0000") {
          this.setState({
            streetCaseNums: data.data
          })
        }
      })
  }
  render() {
    return (
      <div className="swiper-slide">
        {
          this.dataList.map(item => {
            return (
              <div className={style.swiper_slide_inside} key={JSON.stringify(item)}>
                {
                  item.map(val => {
                    return (
                      <div
                        className={style.swiper_slide_cell}
                        style={this.state.street === val ?
                          { backgroundImage: `url(${require('../assets/image/highlight.png')})` } :
                          { backgroundImage: `url(${require('../assets/image/nohighlight.png')})` }}
                        key={val}
                      >
                        <div className={style.table_title}>{val === "虹桥临空经济园区" ? "临空园区" : val}</div>
                        <div className={style.table_header}>
                          <div className={style.header_cell}>已处置</div>
                          <div className={style.header_cell}>处置中</div>
                        </div>
                        <div className={style.table_row}>
                          <div className={[style.row_cell, style.cell_color_one].join(' ')}>
                            {
                              this.state.streetCaseNums[val] ?
                                this.state.streetCaseNums[val].end : ''
                            }
                          </div>
                          <div className={[style.row_cell, style.cell_color_two].join(' ')}>
                            {
                              this.state.streetCaseNums[val] ?
                                this.state.streetCaseNums[val].doing : ''
                            }
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default SlideOne;