import React, { PureComponent } from 'react';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.css';
import styles from './index.less';
import moment from 'moment';
import { isEqual } from 'lodash';

const DEFAULT_SLIDE_SIZE = 5;

/**
 * 850*480
 */
export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            active: [],
            hover: ''
        };
        this.swiperRef = React.createRef();
    }

    componentDidMount() {
        try {
            const data = this.getDataProvider(this.props);
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

            this.setState({ data, active: [], handlers: Object.assign({}, eventValue) }, () => {
                if (data.length > 0) {
                    this.generateSwiper();
                }
            });
        } catch (e) {
            console.error('componentDidMount', e);
        }
    }

    componentWillReceiveProps(nextProps) {
        try {
            if (!isEqual(this.props, nextProps)) {
                const data = this.getDataProvider(nextProps);

                this.setState({ data, active: [] }, () => {
                    if (data.length > 0) {
                        this.generateSwiper();
                    }
                });
            }
        } catch (e) {
            console.error('componentWillReceiveProps', e);
        }
    }

    getDataProvider = props => {
        const { dataProvider } = props;

        if (dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && dataProvider[0] !== '') {
            return [...dataProvider]
        } else {
            return [];
        }
    }

    generateSwiper = () => {
        if (this.swiperRef.current) {
            const swiperProps = {
                autoplay: 3000,
                centeredSlides: true,
                direction: 'vertical',
                loop: true,
                mousewheelControl: true,
                observer: true,
                slidesPerGroup: 1,
                slidesPerView: DEFAULT_SLIDE_SIZE,
                onClick: (swiper) => {
                    try {
                        const { data = [] } = this.state;
                        const index = swiper.clickedSlide.getAttribute('data-swiper-slide-index');
                        this.onClick(data[parseInt(index)]);
                    } catch (e) {
                        console.error(e);
                    }
                }
            };
            this.swiper = new Swiper(this.swiperRef.current, { ...swiperProps });
        }
    }


    onClick = (record) => {
        const { handlers } = this.state;

        if (record.desc) {
            handlers && handlers.onClick && handlers.onClick({ ...record });
        }
    }

    onMouseEnter = () => {
        if (this.swiper && typeof this.swiper.stopAutoplay === 'function') {
            this.swiper.stopAutoplay();
        }
    }

    onMouseLeave = () => {
        if (this.swiper && typeof this.swiper.startAutoplay === 'function') {
            this.swiper.startAutoplay();
        }
    }

    render() {
        const { data = [] } = this.state;

        return (
            <div style={{ position: 'relative' }}>
                <div className={styles.ywtg_data_board_year}>
                    <div>
                        {moment().format('yyyy')}
                    </div>
                </div>
                <div
                    className={styles.ywtg_list}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                >
                    <div className='swiper-container' ref={this.swiperRef} style={{ height: '100%' }}>
                        <div className='swiper-wrapper'>
                            {data.map((item, index) => {
                                if (item) {
                                    return (
                                        <div key={index} className='swiper-slide ywtg_data_board_swiper_slide' title={item.desc ? `点击可查看${item.name}` : undefined}>
                                            <div className={styles.ywtg_data_board_swiper_item}>
                                                <span>{item.name}</span>
                                                <span className={styles.value}>{item.value}</span>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}