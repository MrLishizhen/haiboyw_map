import React, { PureComponent } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { isEqual } from 'lodash';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.css';
import styles from './index.less';

// import jk_xx from './images/重点场所@2x.png';
// import jk_jzbm from './images/医学隔离点@2x.png';
// import jk_frmz from './images/医疗设施@2x.png';
// import jk_cdmz from './images/疫情分布@2x.png';
// import jk_spjcd from './images/食品@2x.png';
// import jk_bmsw from './images/病媒生物监测@2x.png';

// const datalist = [
//     { 'name': '学校', 'value': '8', 'pintype': 'jk_xx', 'type': '学校', 'icon': '/fastdfs/group1/M00/00/19/wKgJx18pES-AW48DAAAGxlzNPs8493.png' },
//     { 'name': '接种部门', 'value': '119', 'pintype': 'jk_jzbm', 'type': '接种部门' },
//     { 'name': '发热门诊', 'value': '26', 'pintype': 'jk_frmz', 'type': '发热门诊' },
//     { 'name': '肠道门诊', 'value': '39', 'pintype': 'jk_cdmz', 'type': '肠道门诊' },
//     { 'name': '食品监测点', 'value': '172', 'pintype': 'jk_spjcd', 'type': '食品监测点' },
//     { 'name': '病媒生物监测', 'value': '186', 'pintype': 'jk_bmsw', 'type': '病媒生物监测' }
// ];
const SHOWNSTATE = 'SHOWNSTATE';
const GRIDFLAG = 'GRIDFLAG';
const DEFAULT_SLIDE_SIZE = 6;
// const DEFAULT_IMAGES = { jk_xx, jk_jzbm, jk_frmz, jk_cdmz, jk_spjcd, jk_bmsw };

/**
 * jkzx_map_ponit
 * 2190*136
 */
export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            active: []
        };
        this.field = {
            'name': 'name',
            'value': 'value'
        };
        this.swiperRef = React.createRef();
        this.ref = React.createRef();
    }

    componentDidMount() {
        try {
            this.generateSwiper();

            const data = this.getDataProvider(this.props);
            const items = [];
            const list = [];

            data.forEach(item => {
                if (item) {
                    if (item.pintype) {
                        if (item.parentId) {
                            const filter = items.filter(e => e && e.id === item.parentId);

                            if (filter && filter[0]) {
                                if (!filter[0].children) {
                                    filter[0].children = [];
                                }
                                const { children, ...extra } = filter[0];
                                filter[0].children.push({ ...item, parent: { ...extra } });
                            }
                        } else {
                            items.push(item);
                        }
                    } else {
                        list.push(item);
                    }
                }
            });

            this.setState({
                data: items,
                list,
                active: []
            });
        } catch (e) {
            console.error('componentDidMount', e);
        }
    }

    componentWillReceiveProps(nextProps) {
        try {
            if (!isEqual(this.props, nextProps)) {
                const data = this.getDataProvider(nextProps);
                const items = [];
                const list = [];

                data.forEach(item => {
                    if (item) {
                        if (item.pintype) {
                            if (item.parentId) {
                                const filter = items.filter(e => e && e.id === item.parentId);

                                if (filter && filter[0]) {
                                    if (!filter[0].children) {
                                        filter[0].children = [];
                                    }
                                    const { children, ...extra } = filter[0];
                                    filter[0].children.push({ ...item, parent: { ...extra } });
                                }
                            } else {
                                items.push(item);
                            }
                        } else {
                            list.push(item);
                        }
                    }
                });

                this.setState({
                    data: items,
                    list
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
        const swiperProps = {
            mousewheelControl: true,
            observer: true,
            slidesPerGroup: DEFAULT_SLIDE_SIZE,
            slidesPerView: DEFAULT_SLIDE_SIZE
        };
        this.swiper = new Swiper(this.swiperRef.current, { ...swiperProps });
    }

    itemClick = (record, active, e) => {
        if (e) {
            e.stopPropagation();
        }
        let activeValue = [...this.state.active];
        const { pintype: pinType, popup, icon, iconRed, iconGreen, levels } = record;
        let excludes = [];
        let includes = [];

        if (!activeValue.includes(pinType)) {
            const { list = [] } = this.state;
            let points = [];

            if (record.parentId) {
                const { parent = {} } = record;
                const { pintype: ppinType, ...extra } = parent;

                if (activeValue.includes(ppinType)) {
                    activeValue = activeValue.filter(i => i !== ppinType);
                    this.postData({ pinType: ppinType, ...extra }, [], false);
                } else {
                    activeValue.push(pinType);
                    points = list.filter(item => item.infotype === record.type);
                    this.postData({ pinType, popup, icon, iconRed, iconGreen, levels }, points, true);
                }
            } else {
                if (record && record.children && record.children.length > 0) {
                    // record.children.forEach(child => {
                    //     const { pintype: cppinType, ...extra } = child;

                    //     if (activeValue.includes(cppinType)) {
                    //         activeValue = activeValue.filter(i => i !== cppinType);
                    //         this.postData({ pinType: cppinType, ...extra }, [], false);
                    //     } else {
                    //         activeValue.push(cppinType);
                    //     }
                    // });
                    record.children.forEach(child => {
                        const { pintype: cppinType, ...extra } = child;

                        if (activeValue.includes(cppinType)) {
                            includes.push(child);
                        } else {
                            excludes.push(child);
                        }
                    });
                    if (excludes && excludes.length > 0) {
                        excludes.forEach(eItem => {
                            const { pintype: cppinType, ...extra } = eItem;

                            activeValue.push(cppinType);
                            points = list.filter(item => item.infotype === extra.type);
                            this.postData({ pinType: cppinType, ...extra }, points, true);
                        });
                    } else {
                        let pinTypes = [];
                        includes.forEach(eItem => {
                            const { pintype: cppinType, ...extra } = eItem;

                            pinTypes.push(cppinType);
                            this.postData({ pinType: cppinType, ...extra }, [], false);
                        });
                        activeValue = activeValue.filter(i => !pinTypes.includes(i));
                    }
                } else {
                    activeValue.push(pinType);
                    points = list.filter(item => item.type === record.type);
                    this.postData({ pinType, popup, icon, iconRed, iconGreen, levels }, points, true);
                }
            }
            // this.setState({ active: [...activeValue, pinType] });
        } else {
            this.postData({ pinType, popup, icon, iconRed, iconGreen, levels }, [], false);
            // let includes = [];
            // if (record.parentId) {

            // } else {
            //     includes.push()
            // }
            activeValue = activeValue.filter(i => i !== pinType);
            // this.setState({ active: activeValue.filter(item => item !== pinType) });
        }
        console.info(activeValue);
        this.setState({ active: activeValue });
    }

    postData = (params, points = [], state) => {
        let posted = {
            type: SHOWNSTATE,
            flag: GRIDFLAG,
            pinType: params.pinType,
            points,
            params: { 'default': false, 'messageType': 'clear', 'graphicType': 'featurelayer', ...params }
        };
        if (state) {
            posted.state = state;
        }
        try {
            console.log('POST', JSON.stringify(posted));
            window.postMessage(posted, '*');
        } catch (e) {
            console.error(e)
        }
    }

    generateDropdown = (data) => {
        const { active = [] } = this.state;

        return (
            <Menu>
                {data.map(child => {
                    const { parent, ...extra } = child;

                    return (
                        <Menu.Item key={extra.pintype}>
                            <div className={[styles.jkzx_swiper_item, active.includes(extra.pintype) ? styles.jkzx_swiper_active : null].join(' ')}>
                                <div style={{ padding: '20px 24px' }} onClick={this.itemClick.bind(this, child, null)}>
                                    {/* <div>
                                        <div className={[styles.img, styles[parent.pintype]].join(' ')} />
                                    </div> */}
                                    <div className={styles.content} style={{ width: '280px', lineHeight: '108px' }}>
                                        <div style={{ width: '50%', float: 'left', textAlign: 'left', fontSize: 48 }}>
                                            {extra.name}
                                        </div>
                                        <div style={{ width: '50%', float: 'right', textAlign: 'right' }}>
                                            {extra.value}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Menu.Item>
                    );
                })}
            </Menu>
        );
    }

    render() {
        const { active = [], data = [] } = this.state;

        return (
            <div ref={this.ref} style={{ position: 'relative' }}>
                <div className='swiper-container' ref={this.swiperRef}>
                    <div className='swiper-wrapper'>
                        {data && data.length > 0 && data.map((item, index) => {
                            let cnt = 0;
                            const { children = [] } = item;
                            const childIds = children.map(item => item.pintype);
                            for (let childId of childIds) {
                                if (active.includes(childId)) {
                                    cnt += 1;
                                    // break;
                                }
                            }

                            return (
                                item.children && item.children.length > 0 ?
                                    // <div key={index} className={`swiper-slide ${styles.jkzx_swiper_item} ${active.includes(item.pintype) || cnt > 0 ? styles.jkzx_swiper_active : null}`}>
                                    //     <Dropdown
                                    //         overlay={this.generateDropdown(item.children)}
                                    //         overlayClassName={[styles.drop_down_wrapper, styles[`drop_down_${index % DEFAULT_SLIDE_SIZE}`]].join(' ')}
                                    //         overlayStyle={{ top: 20, left: 20 }}
                                    //         placement='bottomLeft'
                                    //         trigger={['click']}
                                    //         getPopupContainer={() => { if (this.ref.current) return this.ref.current; return document.body; }}
                                    //     >
                                    //         <div onClick={item.children && item.children.length > 0 ? null : this.itemClick.bind(this, item, index)}>
                                    //             <div>
                                    //                 <div className={[styles.img, styles[item.pintype]].join(' ')} />
                                    //             </div>
                                    //             <div className={styles.content}>
                                    //                 <div>
                                    //                     {item.name}
                                    //                 </div>
                                    //                 <div>
                                    //                     {item.value}
                                    //                 </div>
                                    //             </div>
                                    //             <div className={styles.arrow} onClick={(e) => e.stopPropagation()}>
                                    //                 <Icon type='caret-down' />
                                    //             </div>
                                    //         </div>
                                    //     </Dropdown>
                                    // </div> :
                                    <div key={index} className={`swiper-slide ${styles.jkzx_swiper_item} ${/*active.includes(item.pintype) ||*/ cnt === children.length ? styles.jkzx_swiper_active : null}`}>
                                        <div onClick={/*item.children && item.children.length > 0 ? null :*/ this.itemClick.bind(this, item, index)}>
                                            <div>
                                                <div className={[styles.img, styles[item.pintype]].join(' ')} />
                                            </div>
                                            <div className={styles.content}>
                                                <div>
                                                    {item.name}
                                                </div>
                                                <div>
                                                    {item.value}
                                                </div>
                                            </div>
                                            {item.children && item.children.length > 0 &&
                                                <Dropdown
                                                    overlay={this.generateDropdown(item.children)}
                                                    overlayClassName={[styles.drop_down_wrapper, styles[`drop_down_${index % DEFAULT_SLIDE_SIZE}`]].join(' ')}
                                                    overlayStyle={{ top: 20, left: 20 }}
                                                    placement='bottomLeft'
                                                    trigger={['click']}
                                                    getPopupContainer={() => { if (this.ref.current) return this.ref.current; return document.body; }}
                                                >
                                                    <div className={styles.arrow} onClick={(e) => e.stopPropagation()}>
                                                        <Icon type='caret-down' />
                                                    </div>
                                                </Dropdown>
                                            }
                                        </div>
                                    </div> :
                                    <div key={index} className={`swiper-slide ${styles.jkzx_swiper_item} ${active.includes(item.pintype) || cnt > 0 ? styles.jkzx_swiper_active : null}`}>
                                        <div onClick={item.children && item.children.length > 0 ? null : this.itemClick.bind(this, item, index)}>
                                            <div>
                                                <div className={[styles.img, styles[item.pintype]].join(' ')} />
                                            </div>
                                            <div className={styles.content}>
                                                <div>
                                                    {item.name}
                                                </div>
                                                <div>
                                                    {item.value}
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