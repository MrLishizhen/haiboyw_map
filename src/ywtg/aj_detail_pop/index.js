import React, { PureComponent, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Pagination } from 'antd';
import { isEqual } from 'lodash';
import styles from './index.less';

import defaultImg from './images/default_img.png';
import Video from './components/clearVideo';

/**
 * 1554*1210
 */
export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            active: {},
            current: 1
        };
    }

    componentDidMount() {
        try {
            const data = this.getDataProvider(this.props);

            if (Array.isArray(data) && data[0] && data[0].deviceId) {
                this.setState({ active: data[0], current: 1 });
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

            this.setState({ handlers: Object.assign({}, eventValue) });
        } catch (e) {
            console.error('componentDidMount', e);
        }
    }

    componentWillReceiveProps(nextProps) {
        try {
            console.info(nextProps, this.props);
            if (!isEqual(nextProps, this.props)) {
                const devices = this.getDataProvider(this.props).filter(dp => dp && dp.deviceId);
                const nextDevices = this.getDataProvider(nextProps).filter(dp => dp && dp.deviceId);

                if (!isEqual(nextDevices, devices)) {
                    if (Array.isArray(nextDevices) && nextDevices[0] && nextDevices[0].deviceId) {
                        this.setState({ active: nextDevices[0], current: 1 });
                    }
                }
            }
        } catch (e) {
            console.error('componentWillReceiveProps', e);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        try {
            if (!isEqual(nextState.active, this.state.active) || !isEqual(nextState.current, this.state.current)) {
                const { active, handlers } = nextState;
                let { upPicture, deviceName, deviceId } = active || {};

                if (upPicture) {
                    try {
                        upPicture = JSON.parse(upPicture);
                    } catch (e) {
                        upPicture = {};
                        console.error(e);
                    }
                }
                const orders = typeof upPicture === 'object' ? Object.keys(upPicture) : [];

                if (orders && orders.length > 0) {
                    console.info({ deviceName, flowNo: orders[nextState.current - 1] });
                    handlers && handlers.onClick && handlers.onClick({ deviceName, flowNo: orders[nextState.current - 1] });
                }
            }
        } catch (e) {
            console.error('shouldComponentUpdate', e);
        }

        return true;
    }

    getDataProvider = props => {
        const { dataProvider } = props;

        if (dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && dataProvider[0] !== '') {
            return [...dataProvider]
        } else {
            return [];
        }
    }

    imgClick(data, index) {
        let dom = document.createElement('div');
        const scale = 1 / window.devicePixelRatio;
        dom.style = `
            position: fixed;
            top:0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 9999;
            background-color: rgba(0,0,0,0.6);
            cursor: pointer;
        `;
        ReactDOM.render(<ImgItem current={index} data={data} scale={scale} />, dom);
        // let img = document.createElement('img');
        // img.src = `http://10.89.7.160:9527/itsmApp${data.downloadPath}`;
        // img.style = `
        //     position: absolute;
        //     top: 50%;
        //     left: 50%;
        //     transform: scale(${scale}) translate(-${50 / scale}%, -${50 / scale}%);
        //     cursor: pointer;
        // `;
        // dom.appendChild(img);
        dom.onclick = function (e) {
            if (e.target.className && (/*e.target.className === 'img_item' ||*/ e.target.className.indexOf('list_btn') !== -1)) {
                return;
            }
            ReactDOM.unmountComponentAtNode(dom);
            document.body.removeChild(dom);
        }
        document.body.appendChild(dom);
    }

    videoClick(data) {
        const dom = document.createElement('div');
        document.body.appendChild(dom);
        dom.id = 'video_wrapper';
        dom.style = 'cursor: pointer; position: fixed; top: 0; right: 0; bottom: 0; left: 0; background-color: rgba(0, 0, 0, 0.5);z-index: 999; width: 100vw; height: 100vh; display: flex;  justify-content: center; align-items: center;';
        dom.onclick = () => {
            document.body.removeChild(dom);
        };
        ReactDOM.render(<Video videoSrc={data.device} index={this.state.current} onClose={() => { const el = document.getElementById('video_wrapper'); if (el) { document.body.removeChild(el) } }} />, dom);
    }

    render() {
        try {
            const { active = {}, current = 1 } = this.state;
            let { upPicture, deviceId } = active || {};
            const { dataProvider = [] } = this.props;
            if (upPicture) {
                try {
                    upPicture = JSON.parse(upPicture);
                } catch (e) {
                    upPicture = {};
                    console.error(e);
                }
            }
            const orders = typeof upPicture === 'object' ? Object.keys(upPicture) : [];
            const record = dataProvider.filter(d => d && !d.deviceId)[0] || {};
            const { rows = [] } = record;

            return (
                <div className={styles.basic_wrapper}>
                    <div>
                        <div>
                            <div className={styles.device_list_wrapper}>
                                <div style={{ width: 1385, height: '100%', overflowX: 'hidden', overflowY: 'auto' }}>
                                    <div className={styles.list_wrapper} style={{ width: 1347 }}>
                                        {Array.isArray(dataProvider) && dataProvider.length > 0 &&
                                            dataProvider.map(dp => {
                                                if (dp && dp.deviceId) {
                                                    return (
                                                        <div key={dp.deviceId} onClick={() => this.setState({ active: dp, current: 1 })}>
                                                            <div className={[styles.icon, styles[`icon_${dp.icon}`]].join(' ')} />
                                                            <div>
                                                                {dp.NAME}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={styles.divider} />
                            <div className={styles.content_wrapper}>
                                {orders && orders.length > 0 ?
                                    <div className={styles.info_wrapper} style={orders.length > 1 ? { height: '686px' } : {}}>
                                        <div>
                                            <div style={{ width: '710px', height: orders.length > 1 ? '686px' : '748px', overflowX: 'hidden', overflowY: 'auto' }}>
                                                <div style={{ width: '673px' }}>
                                                    <div className={styles.record_title_wrapper}>
                                                        <div className={styles.record_square} />
                                                        <div className={styles.record_title}>流转记录</div>
                                                    </div>
                                                    {Array.isArray(rows) && rows.length > 0 &&
                                                        rows.map((row, index) => {
                                                            const { createDate, updateDate, operationType, nodeName, operationContent } = row;

                                                            return (
                                                                <div key={index} className={styles.event_list_item}>
                                                                    <div className={styles.date}>
                                                                        {createDate && createDate.substring(0, createDate.indexOf(' '))}
                                                                    </div>
                                                                    <div className={styles.content_wrapper}>
                                                                        <table className={styles.table}>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th width='33.3%'>操作名称</th>
                                                                                    <th width='33.3%'>当前节点</th>
                                                                                    <th width='33.3%'>提交时间</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>{operationType}</td>
                                                                                    <td>{nodeName}</td>
                                                                                    <td>{updateDate}</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <div className={styles.content}>
                                                                            {operationContent}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ paddingLeft: 30, width: '680px', height: orders.length > 1 ? '686px' : '748px', overflowX: 'hidden', overflowY: 'auto' }}>
                                                <div style={{ width: '643.5px' }}>
                                                    <div className={styles.record_title_wrapper}>
                                                        <div className={styles.record_square} />
                                                        <div className={styles.record_title}>事件图片</div>
                                                    </div>
                                                    {orders && orders[current - 1] ?
                                                        upPicture[orders[current - 1]]?.map((pic, index) => {
                                                            return (
                                                                <div key={index} style={{ cursor: 'pointer', width: 643.5, height: 361.5, position: 'relative', backgroundColor: '#07203A', marginTop: index !== 0 ? 16 : 0 }} onClick={this.imgClick.bind(this, upPicture[orders[current - 1]], index)}>
                                                                    <img src={`http://10.89.7.160:9527/itsmApp${pic.downloadPath}`} height='361.5' style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} />
                                                                </div>
                                                            );
                                                        }) :
                                                        <img src={defaultImg} height='361.5' />
                                                    }
                                                    <div className={styles.record_title_wrapper} style={{ marginTop: 28 }}>
                                                        <div className={styles.record_square} />
                                                        <div className={styles.record_title}>事件视频</div>
                                                    </div>
                                                    <div style={{ width: 643.5, height: 361.5, backgroundColor: '#002948' }} onClick={this.videoClick.bind(this, active)}>
                                                        <Video videoSrc={active?.device} index={current} style={{ width: 643.5, height: 361.5 }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> :
                                    <Fragment>
                                        <div className={styles.record_title_wrapper}>
                                            <div className={styles.record_square} />
                                            <div className={styles.record_title}>事件视频</div>
                                        </div>
                                        <div style={{ width: 1347, height: 682, backgroundColor: '#002948' }} onClick={this.videoClick.bind(this, active)}>
                                            <Video videoSrc={active?.device} index={current} style={{ width: 1347, height: 682 }} />
                                        </div>
                                    </Fragment>
                                }
                            </div>
                            {orders && orders.length > 1 &&
                                <div className={styles.pagination_wrapper}>
                                    <Pagination current={current} pageSize={1} total={orders.length} onChange={(current) => this.setState({ current })} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            );
        } catch (e) {
            console.error('render', e)
        }
    }
}

class ImgItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            current: this.props.current
        }
    }

    onClick = (e) => { }

    onChange(type, e) {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        const { current } = this.state;
        const { data = [] } = this.props;

        if (type === 'next') {
            if (current < data.length - 1) {
                this.setState({ current: current + 1 })
            }
        } else if (type === 'prev') {
            if (current > 0) {
                this.setState({ current: current - 1 })
            }
        }
    }

    render() {
        const { current } = this.state;
        const { data, scale } = this.props;
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `scale(${scale}) translate(-${50 / scale}%, -${50 / scale}%)`,
            cursor: 'pointer'
        };

        return (
            <Fragment>
                <div style={style}>
                    {data && data.length > 1 && <div className={[styles.list_btn, styles.prev].join(' ')} onClick={this.onChange.bind(this, 'prev')} />}
                    <img className='img_item' src={`http://10.89.7.160:9527/itsmApp${data[current].downloadPath}`} /*style={style}*/ onClick={this.onClick.bind(this)} />
                    {data && data.length > 1 && <div className={[styles.list_btn, styles.next].join(' ')} onClick={this.onChange.bind(this, 'next')} />}
                </div>
            </Fragment>
        );
    }
}