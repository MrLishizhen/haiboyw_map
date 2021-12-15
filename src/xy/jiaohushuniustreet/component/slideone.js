import React from 'react'
import style from '../index.less';
import axios from 'axios';
import { isEmpty, isEqual } from 'lodash'

class SlideOne extends React.Component {
  state = {
    streetCaseNums: {},
    street: '',
    datalist: []
  }
  pagedate = [];
  dataList = []
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
    const provider = this.props.dataProvider;
    const list = provider[2]? JSON.parse(provider[2]): [];
    this.city = provider[0] || '';
    this.setState({
      street: provider[1],
      datalist: list
    })
    this.getStreetCaseNums();
    setInterval(this.getStreetCaseNums.bind(this), 10000)
  }
  // 校验dataProvider
  getDataProvider = props => {
    const { dataProvider } = props;
    if (dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && dataProvider[0] !== "") {
      return dataProvider;
    } else {
      return '';
    }
  }
  //获取街道事件数量
  getStreetCaseNums() {
    const params = new FormData();
    params.append('checkToken', 'no');
    params.append('gteDate', this.pagedate[0] || "no");
    params.append('lteDate', this.pagedate[1] || "no");
    params.append('type', 'street');
    params.append('city', this.city);
    
    const querys = `checkToken=no&gteDate=${this.pagedate[0] || 'no'}&lteDate=${this.pagedate[1] || 'no'}&city=${this.city}&street=no&type=street`;

    // axios.post('http://10.89.7.160:9527/itsmApp/visData/getCountVis', params)
    axios.post(`http://10.7.52.21:9527/itsmApp/visData/getCountVis?${querys}`)
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
          this.state.datalist.map(item => {
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