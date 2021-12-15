import React, { PureComponent } from 'react';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.css';
import styles from './index.less';

// const defaultDataQuery = [{ "diseasename": "腹泻", "cnt": 10 }, { "diseasename": "发热", "cnt": 8 }, { "diseasename": "水痘", "cnt": 3 }, { "diseasename": "手足口病", "cnt": 1 }, { "diseasename": "呕吐", "cnt": 1 }, { "diseasename": "结膜红肿", "cnt": 1 }];
const defaultDataQuery = [{ "diseasename": "-", "cnt": 0 }, { "diseasename": "-", "cnt": 0 }, { "diseasename": "-", "cnt": 0 }, { "diseasename": "-", "cnt": 0 }, { "diseasename": "-", "cnt": 0 }, { "diseasename": "-", "cnt": 0 }]
const DEFAULT_SLIDE_SIZE = 6;

export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            active: []
        };
        this.field = {
            'name': 'diseasename',
            'value': 'cnt'
        };
        this.swiperRef = React.createRef();
    }

    componentDidMount() {
        this.generateSwiper();
    }

    generateSwiper = () => {
        const swiperProps = {
            mousewheelControl: true,
            observer: true,
            slidesPerGroup: DEFAULT_SLIDE_SIZE,
            slidesPerView: DEFAULT_SLIDE_SIZE
        };
        this.swiper = new Swiper(this.swiperRef.current, { ...swiperProps });
    }

    render() {
        const { active = [] } = this.state;
        const { dataProvider = [] } = this.props;
        const dataQuery = dataProvider && dataProvider.length > 0 ? dataProvider : defaultDataQuery;

        return (
            <div>
                <div className='swiper-container' ref={this.swiperRef}>
                    <div className='swiper-wrapper'>
                        {dataQuery && dataQuery.length > 0 && dataQuery.map((item, index) => {

                            return (
                                <div key={index} className='swiper-slide'>
                                    <div className={styles.item_wrapper}>
                                        <div className={styles.label}>{item[this.field['name']]}</div>
                                        <div className={styles.value}>
                                            <div style={{ zIndex: 1 }}>{item[this.field['value']] || ''}</div>
                                            <div>
                                                <div className={styles.img} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}