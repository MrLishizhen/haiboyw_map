import React, { PureComponent } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { isEqual } from 'lodash';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.css';
import styles from './index.less';

const SHOWNSTATE = 'SHOWNSTATE';
const GRIDFLAG = 'GRIDFLAG';
const DEFAULT_SLIDE_SIZE = 4;

// const defaultData = [{ "id": 10, "parentId": "", "name": "集中式空调", "value": "", "pintype": "jk_xx", "type": "集中式空调", "popup": "click2", "icon": "/fastdfs/group1/M00/00/16/wKgJx18iq7WAOLclAAAHSpStIHc914.png", "iconGreen": "", "iconRed": "", "levels": "", "svg": "" }, { "id": 20, "parentId": "", "name": "二次供水", "value": "", "pintype": "jk_jzbm", "type": "二次供水", "popup": "click2", "icon": "/fastdfs/group1/M00/00/16/wKgJx18irBWAWbDVAAALgfingTw140.png", "iconGreen": "", "iconRed": "", "levels": "", "svg": "" }, { "id": 30, "parentId": "", "name": "一箱一档", "value": "", "pintype": "jk_frmz", "type": "一箱一档", "popup": "click2", "icon": "/fastdfs/group1/M00/00/16/wKgJx18iq4KAVR4vAAAK9M96SHE549.png", "iconGreen": "", "iconRed": "", "levels": "", "svg": "" }, { "id": 40, "parentId": "", "name": "自动售水机", "value": "", "pintype": "jk_cdmz", "type": "自动售水机", "popup": "click2", "icon": "/fastdfs/group1/M00/00/16/wKgJx18iq_GATiX9AAAK5VUriJ8188.png", "iconGreen": "", "iconRed": "", "levels": "", "svg": "" }, { "type": "集中式空调", "sbbh": "1041936", "name": "  上海龙之梦购物中心管理有限公司", "state": "华阳街道", "address": "上海市长宁区长宁路1018号", "lng": "121.41602", "lant": "31.215679", "X": "-5314.950360520653", "Y": "-1986.7327007998567" }];
const defaultData = [];

/**
 * 1800*106
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
            // this.generateSwiper();

            const data = this.getDataProvider(this.props);
            const items = [];
            const list = [];

            data.forEach((item, index) => {
                if (item) {
                    if (!item.parent) {
                        items.push({
                            id: index,
                            name: item.type,
                            pintype: item.type
                        });
                    } else {
                        if (!items[items.length - 1].children) {
                            items[items.length - 1].children = [];
                        }
                        items[items.length - 1].children.push({
                            id: index,
                            name: item.type,
                            pintype: item.type
                        });
                    }
                }
            });

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

            this.setState({
                data: items,
                list,
                active: [],
                handlers: Object.assign({}, eventValue)
            }, () => {
                if (items.length > 0) {
                    this.generateSwiper();
                }
            });
        } catch (e) {
            console.error('componentDidMount', e);
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

    getDataProvider = props => {
        const { dataProvider } = props;
        if (dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && dataProvider[0] !== '') {
            return [...dataProvider]
        } else {
            return defaultData;
        }
    }

    componentWillReceiveProps(nextProps) {
        console.info('componentWillReceiveProps', nextProps, this.props);
        try {
            if (!isEqual(this.props, nextProps)) {
                const { style = {} } = nextProps;
                const { style: oldStyle = {} } = this.props;
                const data = this.getDataProvider(nextProps);
                const items = [];
                // const list = [];

                data.forEach((item, index) => {
                    if (item) {
                        if (!item.parent) {
                            items.push({
                                id: index,
                                name: item.type,
                                pintype: item.type
                            });
                        } else {
                            if (!items[items.length - 1].children) {
                                items[items.length - 1].children = [];
                            }
                            items[items.length - 1].children.push({
                                id: index,
                                name: item.type,
                                pintype: item.type
                            });
                        }
                    }
                });

                this.setState({
                    data: items,
                    active: style.show !== oldStyle.show ? [] : this.state.active
                    // list
                }, () => {
                    this.generateSwiper();
                });
            }
        } catch (e) {
            console.error('componentWillReceiveProps', e);
        }
    }

    itemClick(record, pintype, e) {
        if (e) {
            e.stopPropagation();
        }
        const { active = [], data = [], list = [], handlers } = this.state;
        let newActive = [];

        if (record.children) {
            const pintypes = [record.pintype, ...record.children.map(child => child.pintype)];
            const excludes = pintypes.filter(item => !active.includes(item));

            if (excludes.length > 0) {
                newActive = [...active, ...excludes];
            } else {
                newActive = active.filter(item => !pintypes.includes(item));
            }
        } else {
            if (active.includes(record.pintype)) {
                newActive = active.filter(item => item !== record.pintype);
            } else {
                newActive = [...active, record.pintype];
            }
        }
        // const name = active.find(item => item === pintype);
        // const points = list.filter(item => item.type === record.type);
        // let newActive = [];

        // if (name) {
        //     this.postData({ pinType: record.pintype, icon: record.icon, popup: record.popup }, [], false);
        //     newActive = active.filter(item => item !== pintype);
        // } else {
        //     this.postData({ pinType: record.pintype, icon: record.icon, popup: record.popup }, points, true);
        //     newActive = [...active, pintype];
        // }
        console.info(newActive);
        this.setState({
            active: newActive
        });
        handlers.onClick && handlers.onClick(newActive);
    }

    postData = ({ pinType, popup, icon }, points = [], state) => {
        // let posted = {
        //     type: SHOWNSTATE,
        //     flag: GRIDFLAG,
        //     pinType,
        //     points,
        //     params: { 'default': false, 'pinType': pinType, 'messageType': 'clear', icon, popup }
        // };
        // if (state) {
        //     posted.state = state;
        // }
        // try {
        //     console.log('POST', JSON.stringify(posted));
        //     window.postMessage(posted, '*');
        // } catch (e) {
        //     console.error(e)
        // }
    }

    generateDropdown = (data) => {
        const { active = [] } = this.state;

        return (
            <div style={{ maxHeight: 350, overflow: 'hidden' }}>
                <div style={{ maxHeight: 350, width: 470, overflowY: 'scroll' }}>
                    <div style={{ width: 450 }}>
                        <Menu>
                            {data.map(child => {
                                const { parent, ...extra } = child;

                                return (
                                    <Menu.Item key={extra.pintype}>
                                        <div className={[styles.wj_swiper_menu_item, active.includes(extra.pintype) ? styles.wj_swiper_active : null].join(' ')}>
                                            <div onClick={this.itemClick.bind(this, child, child.pintype)}>
                                                <div>
                                                    <div className={[styles.img, styles[child.pintype]].join(' ')} />
                                                </div>
                                                <div className={styles.content}>
                                                    <div>
                                                        {child.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Menu.Item>
                                );
                            })}
                        </Menu>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { active = [], data = [] } = this.state;

        return (
            <div ref={this.ref} style={{ position: 'relative' }}>
                <div className='swiper-container' ref={this.swiperRef}>
                    <div className='swiper-wrapper'>
                        {Array.isArray(data) && data.map((item, index) => {
                            const { children = [] } = item;
                            const pintypes = children.map(item => item.pintype);
                            const actives = active.filter(item => pintypes.includes(item)).length;

                            return (
                                item.children && item.children.length > 0 ?
                                    <div key={index} className={`swiper-slide ${styles.wj_swiper_item} ${actives > 0 ? styles.wj_swiper_active : null}`}>
                                        <div onClick={this.itemClick.bind(this, item, item.pintype)}>
                                            <div>
                                                <div className={[styles.img, styles[item.pintype]].join(' ')} />
                                            </div>
                                            <div className={styles.content}>
                                                <div>
                                                    {item.name}{actives > 0 ? `(${actives})` : ''}
                                                </div>
                                            </div>
                                            {item.children && item.children.length > 0 &&
                                                <Dropdown
                                                    overlay={this.generateDropdown(item.children)}
                                                    overlayClassName={[styles.wj_drop_down_wrapper, styles[`wj_drop_down_${index % DEFAULT_SLIDE_SIZE}`]].join(' ')}
                                                    overlayStyle={{ top: 20, left: 20 }}
                                                    placement='bottomLeft'
                                                    trigger={['click']}
                                                    getPopupContainer={() => { if (this.ref.current) return this.ref.current; return document.body; }}
                                                >
                                                    <div className={styles.arrow} onClick={(e) => e.stopPropagation()}>
                                                        <Icon type='caret-down' style={{ color: '#fff' }} />
                                                    </div>
                                                </Dropdown>
                                            }
                                        </div>
                                    </div> :
                                    <div key={index} className={`swiper-slide ${styles.wj_swiper_item} ${active.includes(item.pintype) ? styles.wj_swiper_active : null}`}>
                                        <div onClick={this.itemClick.bind(this, item, item.pintype)}>
                                            <div>
                                                <div className={[styles.img, styles[item.pintype]].join(' ')} />
                                            </div>
                                            <div className={styles.content}>
                                                <div>
                                                    {item.name}
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