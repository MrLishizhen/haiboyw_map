import React, { Component } from 'react'
import Swiper from 'react-id-swiper';

import styles from './styes.less';

const Slider = props => {
  const {
    id = 1,
    title = "",
    activeId = 1
  } = props;

  const activeClass_left = activeId === id ? `${styles.font_active} ${styles.font_left}` : "";
  const activeClass_right = activeId === id ? `${styles.font_active} ${styles.font_right}` : ` ${styles.font_right}`;
  return (
    <div className={styles['swiper-content']}>
      <div className={activeClass_left} style={{ width: 265, borderRight: '1px solid rgba(216, 216, 216, 0.5)' }}>{`No.${id}`}</div>
      <div className={activeClass_right}>{title}</div>
    </div>
  )
}


export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeId: 1,
      list: [],
      params: {
        slidesPerView: 3,
        direction: 'vertical',
        spaceBetween: 60,
        centeredSlides: true,
        mousewheel: true,
        loop: true,
        // autoplay: {
        //   delay: 2500,
        //   disableOnInteraction: false
        // },
        shouldSwiperUpdate: true,
        rebuildOnUpdate: true,
        slideToClickedSlide: true,
        // onClick: swiper => {
        //   this.setState({
        //     activeId: (swiper.activeIndex % this.props.data.length + 1)
        //   })
        // }
      }
    }
    this.root = React.createRef();
  }

  // 点击当前
  onClickSlide = (id) => {
    this.setState({
      activeId: id
    })
  }

  componentDidMount() {
    var bannerItems = document.getElementsByClassName('swiper-slide');
    const { data = [] } = this.props;
    const { activeId } = this.state;
    const _this = this;
    for (let i = 0, length = bannerItems.length; i < length; i++) {
      bannerItems[i].onclick = e => {
        e.stopPropagation();
        e.preventDefault();
        _this.onClickSlide(i + 1)
      }
      bannerItems[i].childNodes = <Slider id={i + 1} title={data[i % data.length + 1].sysname} activeId={activeId} />
    }
  }

  render() {
    const { data = [] } = this.props;
    const { activeId = 0, params = {} } = this.state;

    return (
      <div ref={this.root} className={`swiper-container`}>
        {
          data.length > 0 ? (
            <div className="swiper-wrapper" style={{ width: '100%' }}>
              <Swiper {...params}>
                {/* {data.map((item, index) => {
              return (
                <div key={index} className={`swiper-slide`}
                  data-i={index}
                  onClick={this.onClickSlide.bind(this, index + 1)}
                >
                  <Slider id={index + 1} title={item.sysname} activeId={activeId}/>
                </div>
              );
            })} */}
                <div className={`swiper-slide`}><div style={{ backgroundColor: 'red' }}>1</div></div>
                <div className={`swiper-slide`}><div style={{ backgroundColor: 'red' }}>2</div></div>
                <div className={`swiper-slide`}><div style={{ backgroundColor: 'red' }}>3</div></div>
                <div className={`swiper-slide`}><div style={{ backgroundColor: 'red' }}>4</div></div>
                <div className={`swiper-slide`}><div style={{ backgroundColor: 'red' }}>5</div></div>
                <div className={`swiper-slide`}><div style={{ backgroundColor: 'red' }}>6</div></div>
                <div className={`swiper-slide`}><div style={{ backgroundColor: 'red' }}>7</div></div>
              </Swiper>
            </div>) : null
        }
      </div>
    )
  }
}
