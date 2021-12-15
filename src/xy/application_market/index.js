//襄城应用集市

import React, { PureComponent } from 'react';
import { isEqual } from 'lodash';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.css';
import styles from './index.less';
const md5 = require('md5');
import { v4 as uuidv4 } from 'uuid';

let DEFAULT_SLIDE_SIZE = 6;

// _ywtg_application_market
/**
 * 768*480
 */

/**
 * [
    {
        "id": 1, 
        "name": "智慧园区", 
        "desc": "点击可查看智慧园区", 
        "icon_style": "", 
        "icon": "/fastdfs/group1/M00/00/12/CgAAaWE5-5WAIpZeAAASh9A9Eqk328.png", 
        "active_icon": "/fastdfs/group1/M00/00/12/CgAAaWE5-5WAIpZeAAASh9A9Eqk328.png", 
        "url": "http://183.134.104.242:8222", 
        "seq": 1, 
        "popup": "open"
    }, 
    {
        "id": 2, 
        "name": "智慧党建", 
        "desc": "点击可查看智慧党建", 
        "icon_style": "", 
        "icon": "/fastdfs/group1/M00/00/12/CgAAaWE5-5WAIpZeAAASh9A9Eqk328.png", 
        "active_icon": "/fastdfs/group1/M00/00/12/CgAAaWE5-5WAIpZeAAASh9A9Eqk328.png", 
        "url": "", 
        "seq": 2, 
        "popup": "open"
    }, 
    {
        "id": 3, 
        "name": "智慧旅游", 
        "desc": "点击可查看智慧旅游", 
        "icon_style": "", 
        "icon": "/fastdfs/group1/M00/00/12/CgAAaWE5-5WAIpZeAAASh9A9Eqk328.png", 
        "active_icon": "/fastdfs/group1/M00/00/12/CgAAaWE5-5WAIpZeAAASh9A9Eqk328.png", 
        "url": "", 
        "seq": 3, 
        "popup": "open"
    }, 
    {
        "id": 4, 
        "name": "智慧菜场", 
        "desc": "点击可查看智慧菜场", 
        "icon_style": "", 
        "icon": "/fastdfs/group1/M00/00/12/CgAAaWE5-5WAIpZeAAASh9A9Eqk328.png", 
        "active_icon": "/fastdfs/group1/M00/00/12/CgAAaWE5-5WAIpZeAAASh9A9Eqk328.png", 
        "url": "", 
        "seq": 4, 
        "popup": "open"
    }
]
 */
export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.swiperRef = React.createRef();
    }

    vadUrl = () => {
        const apikey = 'fanchengjiaoyuju',
            timestamp = new Date().getTime(),
            nonce = uuidv4(),
            secret = 'sb0tf8fwkf5kvwuk3hsseps7i9dhik3s',
            plat = 'pc',
            orgcode = '47600910210',
            usercode = '47601344611',
            username = '贾主任',
            role = '1'


        const sig = md5(`apikey=${apikey}&timestamp=${timestamp}&nonce=${nonce}&usercode=${usercode}&orgcode=${orgcode}&secret=${secret}`);
        const url = 'https://www.ss360.org/webh5/auth/' + apikey + '/' + plat + '?timestamp=' + timestamp + '&nonce=' + nonce + '&orgcode=' + orgcode + '&usercode=' + usercode + '&username=' + username + '&role=' + role + '&sig=' + sig;
        return url;
    }

    vadXiangChengUrl = () => {
        const apikey = 'xiangchengqujiaoyuju',
            timestamp = new Date().getTime(),
            nonce = uuidv4(),
            secret = 'l3iwq8go81knhythinhe1sxdtexkpth8',
            plat = 'h5',
            orgcode = '4008050000',
            usercode = '47601472275',
            username = 'User',
            role = '1'

        //https://www.ss360.org/bigScreenGatherHomePage.action?mid=8a9eb5675fb45fea015fbd2e19df09da
        // redirect_url=https://www.ss360.org/sso/redirect.html?url=https://www.ss360.org/bigScreenGatherHomePage.action?mid=8a9eb5675fb45fea015fbd2e19df09da
        const sig = md5(`apikey=${apikey}&timestamp=${timestamp}&nonce=${nonce}&usercode=${usercode}&orgcode=${orgcode}&secret=${secret}`);
        const url = 'https://www.ss360.org/webh5/auth/' + apikey + '/' + plat + '?timestamp=' + timestamp + '&nonce=' + nonce + '&orgcode=' + orgcode + '&usercode=' + usercode + '&username=' + username + '&role=' + role + '&sig=' + sig + '&redirect_url=https://www.ss360.org/sso/redirect.html?url=https://www.ss360.org/bigScreenGatherHomePage.action?mid=8a9eb5675fb45fea015fbd2e19df09da';
        console.log(url)
        return url;
    }

    componentDidMount() {
        try {
            // const data = this.getDataProvider(this.props);
            const data =[{"id":1,"name":"智慧园区","desc":"点击可查看智慧园区","unit":"襄城经济开发区","icon_style":"","icon":"/fastdfs/group1/M00/00/2F/CgAAaWFdclCAC6qOAAASDyyfw0E372.png","active_icon":"/fastdfs/group1/M00/00/2F/CgAAaWFdclCAC6qOAAASDyyfw0E372.png","url":"http://10.203.32.2:8080/Home","seq":1,"popup":"open","slideSize":6,"area":"襄城区"},{"id":3,"name":"智慧党建","desc":"点击可查看智慧党建","unit":"区委组织部","icon_style":"","icon":"/fastdfs/group1/M00/00/2F/CgAAaWFdcmaARrzpAAARJgACjsw405.png","active_icon":"/fastdfs/group1/M00/00/2F/CgAAaWFdcmaARrzpAAARJgACjsw405.png","url":"http://183.134.104.242:8188/party/1/1","seq":3,"popup":"open","slideSize":6,"area":"襄城区"},{"id":4,"name":"智慧旅游","desc":"点击可查看智慧旅游","unit":"区文旅局","icon_style":"","icon":"/fastdfs/group1/M00/00/2F/CgAAaWFdcnqAdN9nAAAQGPvNaNc742.png","active_icon":"/fastdfs/group1/M00/00/2F/CgAAaWFdcnqAdN9nAAAQGPvNaNc742.png","url":"http://183.134.104.242:8120/","seq":4,"popup":"open","slideSize":6,"area":"襄城区"},{"id":5,"name":"智慧菜场","desc":"点击可查看智慧菜场","unit":"区商务局","icon_style":"","icon":"/fastdfs/group1/M00/00/2F/CgAAaWFdco6AVaMbAAAPelsrY_8830.png","active_icon":"/fastdfs/group1/M00/00/2F/CgAAaWFdco6AVaMbAAAPelsrY_8830.png","url":"http://183.134.104.242:8121/city-level","seq":5,"popup":"open","slideSize":6,"area":"襄城区"},{"id":7,"name":"乡村振兴","desc":"点击可查看数字乡村","unit":"乡村振兴局","icon_style":"","icon":"/fastdfs/group1/M00/00/2F/CgAAaWFdco6AVaMbAAAPelsrY_8830.png","active_icon":"/fastdfs/group1/M00/00/2F/CgAAaWFdco6AVaMbAAAPelsrY_8830.png","url":"http://183.134.104.242:9002/country","seq":7,"popup":"open","slideSize":6,"area":"襄城区"},{"id":6,"name":"智慧尹集","desc":"点击可查看智慧尹集","unit":"尹集乡","icon_style":"","icon":"/fastdfs/group1/M00/00/2F/CgAAaWFdcqGASmgiAAAO_zCqyb8823.png","active_icon":"/fastdfs/group1/M00/00/2F/CgAAaWFdcqGASmgiAAAO_zCqyb8823.png","url":"http://192.167.17.50:60003/loginFree/login?secretKey=Qi5ISYzPbqRrMKiqBZcaI7n3tLpd7xIF","seq":6,"popup":"open","slideSize":6,"area":"襄城区"},{"id":2,"name":"","desc":"点击可查看","unit":"","icon_style":"","icon":"/fastdfs/group1/M00/00/12/CgAAaWE5-5WAIpZeAAASh9A9Eqk328.png","active_icon":"/fastdfs/group1/M00/00/12/CgAAaWE5-5WAIpZeAAASh9A9Eqk328.png","url":"","seq":2,"popup":"open","slideSize":6,"area":"襄城区"}]

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
            const { slideSize = 6 } = data[0] || {};
            DEFAULT_SLIDE_SIZE = slideSize;

            while (true) {
                const array = data.slice((current - 1) * DEFAULT_SLIDE_SIZE, current * DEFAULT_SLIDE_SIZE);

                if (array && array.length > 0) {
                    result.push(
                        <div key={`swiper-slide-${current}`} className='swiper-slide'>
                            <div style={{ display: 'flex', width: '100%', height: '100%', flexWrap: 'wrap', justifyContent: 'space-between' }}>
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
                                            style={{}}
                                            onClick={item.url ? this.onClick.bind(this, item) : undefined}
                                            onMouseEnter={item.url ? this.onMouseEnter.bind(this, item) : undefined}
                                            onMouseLeave={item.url ? this.onMouseLeave.bind(this, item) : undefined}
                                            title={item.url ? item.desc : undefined}
                                        >
                                            <div>
                                                <div className={styles.icon} style={{ backgroundImage: `url(http://10.203.2.88:8090${hover === item.id ? item.active_icon : item.icon})`, ...icon_style }}>

                                                </div>
                                                <div className={styles.name}>
                                                    {item.name}
                                                </div>
                                                <div className={styles.unit}>
                                                    {item.unit}
                                                </div>
                                            </div>
                                            {!item.url &&
                                                <div className={styles.disabled} />
                                            }
                                        </div>
                                    );
                                })}
                            </div>

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

        if (record.popup === 'open') {
            let url = record.url;
            if (record.name === '智慧校园' && record.area === '樊城区') {
                url = this.vadUrl();
            } else if (record.name === '智慧校园' && record.area === '襄城区') {
                url = this.vadXiangChengUrl();
            }
            window.open(url);
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
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <div className='swiper-container' ref={this.swiperRef} style={{ width: '100%', height: '100%' }}>
                    <div className='swiper-wrapper' style={{ width: '100%', height: '100%' }}>
                        {this.generateSwiperSlide(data)}
                    </div>
                </div>
            </div>
        );
    }
}