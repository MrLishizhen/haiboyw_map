/* 
  _jiaohushuniu_street_wm
*/
import React from 'react'
import 'swiper/dist/css/swiper.min.css'
import style from './index.less';
import Swiper from 'swiper';
import SlideOne from './component/slideone'
import SlideTwo from './component/slidetwo'

class StreetSwiper extends React.Component {
  constructor(props) {
    super(props);
    this.streetRef = React.createRef();
  }

  componentDidMount() {
    try {
      this.swiper = new Swiper(this.streetRef.current, {
        mousewheelControl: true,
      });
      this.swiper.disableMousewheelControl()
    } catch (e) {
      console.error('componentDidMount', e);
    }
  }

  render() {
    try {
      return (
        <div className={style.my_swiper}
          onMouseEnter={() => {
            console.info('onMouseEnter');
            if (this.swiper) {
              this.swiper.enableMousewheelControl();
            }
          }}
          onMouseLeave={() => {
            console.info('onMouseLeave');
            if (this.swiper) {
              this.swiper.disableMousewheelControl();
            }
          }}
        >
          <div ref={this.streetRef} className="swiper-container">
            <div className="swiper-wrapper">
              <SlideOne
                dataProvider={this.props.dataProvider}
                style={this.props.style}></SlideOne>
              <SlideTwo
                dataProvider={this.props.dataProvider}
                style={this.props.style}></SlideTwo>
            </div>
          </div>
        </div >
      )
    } catch (e) {
      console.error('render', e);
    }
  }
}

export default StreetSwiper