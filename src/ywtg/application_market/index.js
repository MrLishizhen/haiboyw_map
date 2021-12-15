import React, { PureComponent } from 'react';
import { isEqual } from 'lodash';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.css';
import styles from './index.less';

const DEFAULT_SLIDE_SIZE = 6;

/**
 * 768*480
 */
export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.swiperRef = React.createRef();
    }

    componentDidMount() {
        try {
            const data = this.getDataProvider(this.props);
            const list = [];

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(item => {
                    if (item) {
                        list.push(item)
                    }
                });
            }

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

            this.setState({ data: list, handlers: Object.assign({}, eventValue) }, () => {
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
                const list = [];


                if (Array.isArray(data) && data.length > 0) {
                    data.forEach(item => {
                        if (item) {
                            list.push(item)
                        }
                    });
                }

                this.setState({ data: list }, () => {
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
            const { hover = '' } = this.state;
            const result = [];
            let current = 1;
            let cnt = 0;

            while (true) {
                const array = data.slice((current - 1) * DEFAULT_SLIDE_SIZE, current * DEFAULT_SLIDE_SIZE);

                if (array && array.length > 0) {
                    result.push(
                        <div key={`swiper-slide-${current}`} className='swiper-slide'>
                            {array.map((item, index) => {
                                let { icon_style = {} } = item;
                                try {
                                    if (icon_style && typeof icon_style === 'string') {
                                        icon_style = JSON.parse(icon_style);
                                    }
                                } catch (e) {
                                    icon_style = {}
                                }
                                return (
                                    <div
                                        key={`swiper-slide-item-${index}`}
                                        className={[styles.ywtg_application_market_slide_item, hover === item.id ? styles.hover : null].join(' ')}
                                        style={{ marginRight: index % 3 !== 2 ? 24 : 0, marginBottom: index < DEFAULT_SLIDE_SIZE / 2 ? 40 : 0 }}
                                        onClick={item.url ? this.onClick.bind(this, item) : undefined}
                                        onMouseEnter={item.url ? this.onMouseEnter.bind(this, item) : undefined}
                                        onMouseLeave={item.url ? this.onMouseLeave.bind(this, item) : undefined}
                                        title={item.url ? item.desc : undefined}
                                    >
                                        <div>
                                            <div className={styles.icon} style={{ backgroundImage: `url(http://bigdata.cn.gov:8070${hover === item.id ? item.active_icon : item.icon})`, ...icon_style }}>

                                            </div>
                                            <div className={styles.name}>
                                                {item.name}
                                            </div>
                                        </div>
                                        {!item.url &&
                                            <div className={styles.disabled} />
                                        }
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

    onClick = (record) => {
        const { handlers } = this.state;
        console.info(record)
        if (record.popup === 'open') {
            window.open(record.url);
        } else if (record.popup?.indexOf('szfg_') !== -1) {
            const array = record.popup.split('_');
            const baseUrl = 'http://10.207.189.121:8088/cnqfyMap/';
            var userNameList = [
                'jiangsulu',
                'xinhua',
                'hongqiao',
                'chengjiaqiao',
                'beixinjing',
                'xianxiaxincun',
                'xinjingzhen',
                'linkong',
                'huayanglu',
                'tianshanlu',
                'zhoujiaqiao',
                'quanqu'
            ];
            const index = userNameList.findIndex(item => item === array[1]);
            if (index !== -1) {
                const data = {
                    username: userNameList[index],
                    password: 'abc.123'
                };
                $.ajax({
                    type: 'POST',
                    url: baseUrl + 'User/api/User/OALogin',
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    data: JSON.stringify(data),
                    success: function (res) {
                        if (res.code === 20000 && res.data !== null) {
                            // window.open(baseUrl + '#/bigScreen?atoken=' + res.data)
                            handlers && handlers.onClick && handlers.onClick({ url: baseUrl + '#/bigScreen?atoken=' + res.data });
                        }
                    }
                });
            }
        } else {
            handlers && handlers.onClick && handlers.onClick({ ...record });
        }
    }

    onMouseEnter = (data) => {
        const { hover = '' } = this.state;

        if (hover !== data.id) {
            this.setState({ hover: data.id });
        }
    }

    onMouseLeave = (data) => {
        const { hover = '' } = this.state;

        if (hover === data.id) {
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