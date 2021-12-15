import React from 'react'
import style from '../index.less';
import axios from 'axios';
import { isEmpty, isEqual } from 'lodash'

class SlideTwo extends React.Component {
  state = {
    streetOtherInfo: {},
    street: '',
    datalist: []
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
          this.getStreetOtherInfo();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  componentDidMount() {
    const provider = this.props.dataProvider;
    const list = provider[1]? JSON.parse(provider[1]): [];
    this.setState({
      street: provider[0],
      datalist: list
    })

    setInterval(this.getStreetOtherInfo.bind(this), 10000)
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
  //获取街道其他数据
  getStreetOtherInfo() {
    const params = new FormData();
    params.append('gteDate', this.pagedate[0] || 'no');
    params.append('lteDate', this.pagedate[1] || 'no');
    // axios.post('http://10.89.7.160:9527/itsmApp/visData/getFlowEfficiency', params)
    axios.post('http://10.7.52.21:9527/itsmApp/visData/getFlowEfficiency', params)
      .then(({ data }) => {
        if (data.code === "0000") {
          this.setState({
            streetOtherInfo: data.data
          })
        }
      })
  }
  render() {
    return (
      <div className="swiper-slide">
        {
          this.state.datalist.map(item => {
            return (
              <div className={[style.swiper_slide_inside, style.swiper_slidetwo].join(' ')} key={JSON.stringify(item)}>
                {
                  item.map(val => {
                    return (
                      <div
                        className={style.swiper_slide_cell}
                        style={this.state.street === val ?
                          { backgroundImage: `url(${require('../assets/image/highlight.png')})` } :
                          { backgroundImage: `url(${require('../assets/image/nohighlight.png')})` }
                        }
                        key={val}
                      >
                        <div className={style.table_title}>
                          {
                            val === "虹桥临空经济园区" ? "临空园区" : val === "总计" ? "全区" : val
                          }
                        </div>
                        <div className={style.table_header}>
                          <div className={style.header_cell}>处置用时</div>
                          <div className={style.header_cell}>同比缩减</div>
                        </div>
                        <div className={style.table_row}>
                          <div className={[style.row_cell, style.cell_color_one].join(' ')}>
                            {
                              this.state.streetOtherInfo[val] ?
                                this.state.streetOtherInfo[val]['处置用时'] : ''
                            }
                          </div>
                          <div className={[style.row_cell, style.cell_color_two].join(' ')}>
                            {
                              this.state.streetOtherInfo[val] ?
                                this.state.streetOtherInfo[val]['同比缩减'] : ''
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

export default SlideTwo;