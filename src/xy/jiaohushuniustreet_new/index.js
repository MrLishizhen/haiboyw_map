import React, { PureComponent } from 'react';
import axios from 'axios';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.css';
import _ from 'lodash';
import styles from './index.less';

const DEFAULT_DATA_PROVIDER = [
    // 9,
    // {
    //     '真武山街道办事处': { '已处理': '35', '未处理': '12', '占比': '35%' },
    //     '古城街道办事处': { '已处理': '35', '未处理': '12', '占比': '35%' },
    //     '庞公街道办事处': { '已处理': '35', '未处理': '12', '占比': '35%' },
    //     '檀溪街道办事处': { '已处理': '35', '未处理': '12', '占比': '35%' },
    //     '隆中街道办事处': { '已处理': '35', '未处理': '12', '占比': '35%' },
    //     '余家湖街道办事处': { '已处理': '35', '未处理': '12', '占比': '35%' },
    //     '欧庙镇': { '已处理': '35', '未处理': '12', '占比': '35%' },
    //     '卧龙镇': { '已处理': '35', '未处理': '12', '占比': '35%' },
    //     '尹集乡': { '已处理': '35', '未处理': '12', '占比': '35%' }
    // }
];
const DEFAULT_SLIDE_SIZE = 9;
const eventTypeUrl =
    // window.origin === 'http://localhost:8080' ?
    // 'http://119.3.53.170:9527/cmdbApp/api/cidata/getMultiLevelData' :
    'http://10.7.52.21:9527/cmdbApp/api/cidata/getMultiLevelData';

export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.region = this.getQueryVariable('region') || '襄阳市';
        this.state = {
            slideSize: DEFAULT_SLIDE_SIZE,
            streetOptions: [],
        };
        this.swiperRef = React.createRef();
    }

    componentDidMount() {
        try {
            if (this.region === '襄阳市') {
                this.getCity();
            } else {
                this.getStreet(this.region);
            }

            let data = DEFAULT_DATA_PROVIDER;
            if (this.getDataProvider(this.props).length > 0) {
                data = this.getDataProvider(this.props);
            }
            let slideSize = this.state.slideSize, list = [];

            data.forEach(item => {
                if (typeof item === 'number' && item > 0) {
                    slideSize = item;
                } else if (typeof item === 'object') {
                    Object.keys(item).forEach(name => {
                        list.push({
                            name, ...item[name]
                        })
                    });
                }
            });

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

            this.setState({ slideSize, list, handlers: Object.assign({}, eventValue) }, () => {
                this.generateSwiper();
            });
        } catch (e) {
            console.error(e);
        }
    }

    getQueryVariable(variable) {
        try {
            // let query = window.location.search.substring(1);
            let query = window.location.href.substr(window.location.href.indexOf('?') + 1)
            if (query) {
                const vars = decodeURIComponent(query).split('&');
                for (let i = 0; i < vars.length; i++) {
                    const pair = vars[i].split('=');
                    if (pair[0] == variable) { return pair[1]; }
                }
                return (false);
            }
        } catch (e) {
            console.error(e)
        }
    }

    // 获取城区
    getCity() {
        const params = {
            'otherColumns': ['CITY_NAME'],
            'selectColumn': 'CITY_NAME',
            'ciId': 1306
        }
        axios.post(eventTypeUrl, params, {
            headers: {
                checkToken: 'no'
            }
        }).then(({ data: res }) => {
            const { data } = res;
            if (data && data.length) {
                this.setState({
                    streetOptions: data
                })
            }
        });
    }

    // 获取街道
    getStreet(value) {
        const params = {
            'otherColumns': ['STREET_NAME'],
            'selectColumn': 'STREET_NAME',
            'params': { 'CITY_NAME': value },
            'ciId': 1306
        }
        axios.post(eventTypeUrl, params, {
            headers: {
                checkToken: 'no'
            }
        }).then(({ data: res }) => {
            const { data } = res;
            if (data && data.length) {
                this.setState({
                    streetOptions: data
                })
            }
        });
    }

    componentWillReceiveProps(nextPros) {
        try {
            if (!_.isEqual(this.props.dataProvider, nextPros.dataProvider)) {

            }
            const data = this.getDataProvider(nextPros);
            let slideSize = this.state.slideSize, list = [];

            data.forEach(item => {
                if (typeof item === 'number' && item > 0) {
                    slideSize = item;
                } else if (typeof item === 'object') {
                    Object.keys(item).forEach(name => {
                        list.push({
                            name, ...item[name]
                        })
                    });
                }
            });

            this.setState({ slideSize, list });
        } catch (e) {
            console.error(e);
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
        const swiperProps = {
            mousewheelControl: true,
            observer: true,
            // slidesPerGroup: DEFAULT_SLIDE_SIZE,
            // slidesPerView: DEFAULT_SLIDE_SIZE
        };
        this.swiper = new Swiper(this.swiperRef.current, { ...swiperProps });
    }

    generateSlideItem = (list) => {
        const { slideSize, active } = this.state;
        const result = [];
        let tmp = [], cnt = 1;

        list.forEach((item, index) => {
            if (item) {
                if (tmp.length === slideSize) {
                    result.push(
                        <div key={cnt} className='swiper-slide' style={{ width: '100%', height: '100%' }}>
                            {[...tmp]}
                        </div>
                    );
                    tmp = [];
                    cnt++;
                }
                tmp.push(
                    <div className={[styles.slide_item, active === item.name ? styles.active : null].join(' ')} style={{
                        marginLeft: index % 3 === 1 || index % 3 === 2 ? '3.28%' : '0',
                        marginTop: index > 2 ? '1.15%' : '0',
                        width: '31.14%', height: '32.56%'
                    }} onClick={this.onClick.bind(this, item)}>
                        <div>
                            <div className={styles.name}>{item.name}</div>
                            <div className={styles.value}>
                                <div>
                                    <div className={styles.label}>已处理</div>
                                    <div className={styles.value_1}>{item['已处理']}</div>
                                </div>
                                <div className={styles.divider} />
                                <div>
                                    <div className={styles.label}>未处理</div>
                                    <div className={styles.value_2}>{item['未处理']}</div>
                                </div>
                                <div>
                                    <div className={styles.label}>占比</div>
                                    <div className={styles.value_3}>{item['占比']}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        });

        if (tmp.length > 0) {
            result.push(
                <div key={cnt} className='swiper-slide' style={{ width: '100%', height: '100%' }}>
                    {[...tmp]}
                </div>
            );
            tmp = [];
            cnt++;
        }

        return result;
    }

    onClick = (record) => {
        const { handlers } = this.state;

        if (this.state.active === record.name) {
            this.setState({ active: null });
            handlers && handlers.onClick && handlers.onClick({});
        } else {
            this.setState({ active: record.name });
            handlers && handlers.onClick && handlers.onClick(record);
        }
    }

    generateData(street, list) {
        let result = [];

        if (street && list) {
            result = street.map(item => {
                let name = item[this.region === '襄阳市' ? 'CITY_NAME' : 'STREET_NAME'];
                const filter = list.filter(l => l && l.name === name)[0];

                if (filter) {
                    const number = Math.round(filter['未处理'] / (filter['未处理'] + filter['已处理']) * 10000) / 100;
                    return { ...filter, 占比: isNaN(number) ? 0 : number + '%' }
                } else {
                    return { name, '未处理': 0, '已处理': 0, '占比': 0 }
                }
            });
        }

        return result;
    }

    render() {
        const { list = [], streetOptions = [] } = this.state;

        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className='swiper-container' style={{ width: '100%', height: '100%' }} ref={this.swiperRef}>
                    <div className='swiper-wrapper' style={{ width: '100%', height: '100%' }}>
                        {this.generateSlideItem(this.generateData(streetOptions, list))}
                    </div>
                </div>
            </div>
        );
    }
}