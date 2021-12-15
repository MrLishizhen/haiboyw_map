import React, { PureComponent } from 'react';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.css';
import styles from './index.less';
import { isEqual } from 'lodash';

const DEFAULT_SLIDE_SIZE = 6;

/**
 * 798*500
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
                mousewheelControl: true,
                observer: true
            };
            this.swiper = new Swiper(this.swiperRef.current, { ...swiperProps });
        }
    }

    generateSwiperSlide = (data) => {
        if (Array.isArray(data) && data.length > 0) {
            const { active = [], hover = '' } = this.state;
            const result = [];
            let current = 1;
            let cnt = 0;

            while (true) {
                const array = data.slice((current - 1) * DEFAULT_SLIDE_SIZE, current * DEFAULT_SLIDE_SIZE);

                if (array && array.length > 0) {
                    result.push(
                        <div key={`swiper-slide-${current}`} className='swiper-slide'>
                            {array.map((item, index) => {
                                return (
                                    <div
                                        key={`swiper-slide-item-${index}`}
                                        className={styles.ywtg_slide_item}
                                        style={{ marginRight: index % 3 !== 2 ? 32 : 0, marginBottom: index < DEFAULT_SLIDE_SIZE / 2 ? 42 : 0 }}
                                        onClick={this.onClick.bind(this, item)}
                                        onMouseEnter={this.onMouseEnter.bind(this, item)}
                                        onMouseLeave={this.onMouseLeave.bind(this, item)}
                                    >
                                        <div className={styles.icon} style={{ backgroundImage: `url(http://bigdata.cn.gov:8070${item.icon})` }}></div>
                                        <div className={styles.content} style={active.includes(item.pintype) ? { backgroundColor: `rgba(${item.color}, 0.2)`, borderColor: `rgba(${item.color}, 1)` } : hover === item.pintype ? { backgroundColor: `rgba(${item.color}, 0.2)` } : {}}>
                                            <div className={styles.name}>{item.name}</div>
                                            <div className={styles.value} style={item.color ? { color: `rgba(${item.color}, 1)` } : {}}>{item.value}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                    cnt += array.length;
                }
                current++;

                if (cnt >= data.length) {
                    return result;
                }
            }
        }

        return null;
    }

    onClick = (data) => {
        const { active = [] } = this.state;

        if (active.includes(data.pintype)) {
            this.setState({ active: active.filter(a => a !== data.pintype) });
        } else {
            this.setState({ active: [...active, data.pintype] });
        }
    }

    onMouseEnter = (data) => {
        const { hover = '' } = this.state;

        if (hover !== data.pintype) {
            this.setState({ hover: data.pintype });
        }
    }

    onMouseLeave = (data) => {
        const { hover = '' } = this.state;

        if (hover === data.pintype) {
            this.setState({ hover: '' });
        }
    }

    render() {
        const { data = [] } = this.state;

        return (
            <div style={{ position: 'relative' }}>
                <div className='swiper-container' ref={this.swiperRef}>
                    <div className='swiper-wrapper'>
                        {this.generateSwiperSlide(data)}
                    </div>
                </div>
            </div>
        );
    }
}