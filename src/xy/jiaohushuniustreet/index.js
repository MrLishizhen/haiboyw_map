/* 
  _jiaohushuniu_street_wm

  dataProvider
  ["","", ""]
   区，街道、[["xx","xx"], ['xx','xxx']]
*/
import React from 'react'
import 'swiper/dist/css/swiper.min.css'
import style from './index.less';
import Swiper from 'swiper';
import SlideOne from './component/slideone'
import SlideTwo from './component/slidetwo'
import {getDataProvider} from '../../utils/DataUtils'

class StreetSwiper extends React.Component {
  streetRef = React.createRef();
  
  componentDidMount() {
    new Swiper(".swiper-container", {
      mousewheelControl : true,
    });
  }
  render() {
    const dataProvider = getDataProvider(this.props);
    const p1 = dataProvider[2] || "";
    return (
      <div className={style.my_swiper}>
        <div className="swiper-container">
          <div className="swiper-wrapper">
            <SlideOne 
              dataProvider={[dataProvider[0], dataProvider[1], p1]} 
              style={this.props.style}></SlideOne>   
              {/* {
                <SlideTwo 
                dataProvider={[dataProvider[0], dataProvider[1], p1]} 
                style={this.props.style}></SlideTwo>
              }     */}
            
          </div>
        </div>
      </div>
    )
  }
}

export default StreetSwiper