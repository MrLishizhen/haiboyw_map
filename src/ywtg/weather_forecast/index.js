import React, { PureComponent } from 'react';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.css';
import styles from './index.less';
import { isEqual } from 'lodash';

import image from './image';

const DEFAULT_SLIDE_SIZE = 4;

// const CONST_LEVEL = [
//     { name: '红色', value: '01' },
//     { name: '橙色', value: '02' },
//     { name: '黄色', value: '03' },
//     { name: '蓝色', value: '04' },
//     { name: '灰色', value: '00' }
// ];
const CONST_LEVEL = {
    '红色': '01', '橙色': '02', '黄色': '03', '蓝色': '04', '灰色': '00'
};

const CONST_TYPE = [
    { name: '暴雪', value: 'bx', list: ['01', '02', '03', '04'] },
    { name: '暴雨', value: 'by', list: ['00', '01', '02', '03', '04'] },
    { name: '低温', value: 'dwd', list: ['01', '02', '03', '04'] },
    { name: '高温', value: 'gwd', list: ['01', '02', '03'] },
    { name: '寒潮', value: 'hc', list: ['01', '02', '03', '04'] },
    { name: '大风', value: 'df', list: ['00', '01', '02', '03', '04'] },
    { name: '大雾', value: 'dw', list: ['01', '02', '03'] },
    { name: '雷电', value: 'ld', list: ['00', '01', '02', '03'] },
    { name: '雷雨大风', value: 'lydf', list: ['01', '02', '03', '04'] },
    { name: '沙尘暴', value: 'scb', list: ['01', '02', '03'] },
    { name: '台风', value: 'tf', list: ['00', '01', '02', '03', '04'] },
    { name: '冰雹', value: 'bb', list: ['01', '02'] },
    { name: '道路结冰', value: 'dljb', list: ['01', '02', '03'] },
    { name: '干旱', value: 'gh', list: ['01', '02'] },
    { name: '霾', value: 'm', list: ['01', '02', '03'] },
    { name: '霜冻', value: 'sd', list: ['02', '03', '04'] }
];

/**
 * 568*116
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
            this.generateSwiper();
        } catch (e) {
            console.error('componentDidMount', e);
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
                // autoplay: 3000,
                // loop: true,
                mousewheelControl: true,
                observer: true,
                slidesPerGroup: 1,
                slidesPerView: DEFAULT_SLIDE_SIZE
            };
            this.swiper = new Swiper(this.swiperRef.current, { ...swiperProps });
        }
    }

    generateSwiperItem = () => {
        const data = this.getDataProvider(this.props);
        const init = [];
        let result = [];
        let includes = '';

        if (data && data.length > 0) {
            CONST_TYPE.forEach(item => {
                const filter = data.filter(d => d && d.typeName === item.name);
                if (filter && filter[0]) {
                    result.push({
                        ...item,
                        url: `${item.value}${CONST_LEVEL[filter[0].level || filter[0].sz1]}Icon`
                    });
                    includes += item.name;
                }
            });
        }
        CONST_TYPE.forEach(item => {
            if (item.list && item.list.includes('00')) {
                init.push({ ...item, url: `${item.value}00Icon` });
            }
        });
        if (result.length < DEFAULT_SLIDE_SIZE) {
            const append = init.filter(item => {
                return includes.indexOf(item.name) === -1;
            });
            result = [...result, ...append.slice(0, DEFAULT_SLIDE_SIZE - result.length)];
        }
        // let exps = [];
        // CONST_TYPE.forEach(type => {
        //     type.list.forEach(item => {
        //         console.info(`import ${type.value}${item}Icon from './images/${type.value}${item}.png';`);
        //         exps.push(`${type.value}${item}Icon`);
        //     });
        // })
        // console.info(`export default { ${exps.join(', ')} };`);
        return result;
    }

    render() {
        const data = this.generateSwiperItem()

        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className='swiper-container' ref={this.swiperRef} style={{ height: '100%' }}>
                    <div className='swiper-wrapper'>
                        {data.map((item, index) => {
                            return (
                                <div key={index} className={['swiper-slide', styles.ywtg_weather_forecast_swiper_slide].join(' ')} >
                                    <div style={{ backgroundImage: `url(${image[item.url]})` }}></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div >
        );
    }
}