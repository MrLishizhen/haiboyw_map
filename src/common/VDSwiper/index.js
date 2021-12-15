import React from 'react';
import { isEqual } from 'lodash';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.css'

/**
 * 公用轮播组件
 *
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        direction: 'horizontal',
        loop: true, // 是否循环
        watchOverflow: true, // 当只有一个slide，swiper无效
        observer: true,  // 更新数据
        grabCursor: true, // cursor
        pagination: '.swiper-pagination', // 是否含有分页
        prevButton: '.swiper-button-prev', // 是否有prevButton
        nextButton: '.swiper-button-next', // 是否有nextButton
        // loopAdditionalSlides: 2
      },
      onSlideChangeEnd: swiper => {
        console.log('-----', swiper)
      },
      activeIndex: 1,
    }
    this.swiper = React.createRef();
  }

  componentDidMount() {
    const { options = {} } = this.state;

    setTimeout(() => {
      this.swiper = new Swiper(this.swiperRef, { ...options, ...this.props.options });
    }, 1000)
  }

  componentWillReceiveProps(nextProps) {
    // const { options = {} } = this.state;
    // if (!isEqual(this.props, nextProps)) {
    //   this.swiper = new Swiper(this.swiperRef, {
    //     ...options,
    //     ...nextProps.options
    //   })
    // }
  }

  // 上一页
  onPrev = () => {
    // this.swiper.slidePrev();
  }

  // 下一页
  onNext = () => {

  }

  render() {
    const { data = [], pagination = true, navigation = true, content, style = {} } = this.props;
    const prevImg = navigation?.prevImg ? { backgroundImage: `url(${navigation.prevImg})` } : {}
    const nextImg = navigation?.nextImg ? { backgroundImage: `url(${navigation.nextImg})` } : {}
    const { activeIndex = 1 } = this.state;

    return <div className='swiper-container' ref={node => this.swiperRef = node} style={style}>
      <div className='swiper-wrapper'>
        {
          data.map((item, index) => {
            const currActive = activeIndex === index ? 'swiper-slide swiper-slide-active' : 'swiper-slide';
            // className={currActive}
            return (
              <div key={index} className={'swiper-slide'} data-id={index}>
                {content(item)}
              </div>
            )
          })
        }
        {/* <div class='swiper-slide'>slider1</div>
        <div class='swiper-slide'>slider2</div>
        <div class='swiper-slide'>slider3</div> */}
      </div>
      {/* <!-- 如果需要分页器 --> */}
      {
        pagination ? <div className='swiper-pagination' /> : null
      }
      {/* <!-- 如果需要导航按钮 --> */}
      {
        navigation ? <div className='swiper-button-prev' style={prevImg} onClick={e => this.onPrev()} /> : null
      }
      {
        navigation ? <div className='swiper-button-next' style={nextImg} onClick={e => this.onNext()} /> : null
      }
      {/* <!-- 如果需要滚动条 --> */}
      {/* <div className='swiper-scrollbar'></div> */}
    </div>
  }
}

export default Index;
