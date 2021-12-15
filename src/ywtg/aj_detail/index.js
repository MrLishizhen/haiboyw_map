import React, { PureComponent, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { isEqual } from 'lodash';
import styles from './index.less';

import defaultImg from './images/default_img.png';

/**
 * 816*860
 */
export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        try {
            const data = this.getDataProvider(this.props);

            data.forEach(item => {
                if (item && item.type === 'style') {
                    this.setState({ style: { ...item } });
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

            this.setState({ handlers: Object.assign({}, eventValue) });
        } catch (e) {
            console.error('componentDidMount', e);
        }
    }

    componentWillReceiveProps(nextProps) {
        try {
            console.info('componentWillReceiveProps', this.props, nextProps);
            if (!isEqual(this.props.dataProvider, nextProps.dataProvider)) {
                const data = this.getDataProvider(nextProps);
                let style = {}, rows = [];

                data.forEach(item => {
                    if (item) {
                        if (item.type === 'style') {
                            this.setState({ style: { ...item } });
                            style = { ...item };
                        } else {
                            rows = [...item.rows];
                        }
                    }
                });

                this.setState({ style, rows });
            }
            if (nextProps.style && !isEqual(this.props.style, nextProps.style)) {
                const { info } = nextProps.style;

                this.setState({ info });
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
        //     transform: scale(${scale}) translate(-${50/scale}%, -${50/scale}%);
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

    closeBtnClick() {
        const { handlers } = this.state;

        handlers && handlers.onClick && handlers.onClick({ type: 'close' });
    }

    render() {
        const { style = {}, info = {}, rows = [] } = this.state;
        const { wrapper, subWrapper, main = {} } = style || {};
        const { width, height } = main;
        let { flowNo, upPicture, caseDonePhoto } = info;
        let images = [];
        if (typeof upPicture === 'string') {
            try {
                upPicture = JSON.parse(upPicture);
                if (Array.isArray(upPicture)) {
                    images = [...images, ...upPicture];
                }
            } catch (e) {
                upPicture = {};
                console.error(e);
            }
        }
        if (typeof caseDonePhoto === 'string') {
            try {
                caseDonePhoto = JSON.parse(caseDonePhoto);
                if (Array.isArray(caseDonePhoto)) {
                    images = [...images, ...caseDonePhoto];
                }
            } catch (e) {
                caseDonePhoto = {};
                console.error(e);
            }
        }

        return (
            <div className={styles.basic_wrapper} style={{ ...wrapper, width: '100%', overflow: 'hidden' }}>
                <div style={{ ...subWrapper }}>
                    <div style={{ ...main, position: 'relative' }}>
                        <div style={{ height, overflow: 'hidden' }}>
                            <div style={{ width: width + 20, height, overflowX: 'hidden', overflowY: 'auto' }}>
                                <div style={{ width }}>
                                    <div className={styles.close} onClick={this.closeBtnClick.bind(this)} />
                                    <div className={styles.code}>工单号：{flowNo}</div>
                                    <div className={styles.record_title_wrapper}>
                                        <div className={styles.record_square} />
                                        <div className={styles.record_title}>流转记录</div>
                                    </div>
                                    <div className={styles.event_list_wrapper}>
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
                                    <div className={styles.record_title_wrapper}>
                                        <div className={styles.record_square} />
                                        <div className={styles.record_title}>事件图片</div>
                                    </div>
                                    <div className={styles.img_list_wrapper}>
                                        {Array.isArray(images) && images.length > 0 ?
                                            images.map((pic, index) => {
                                                return (
                                                    <div key={index} style={{ cursor: 'pointer', width: 712, height: 400, position: 'relative', backgroundColor: '#07203A', marginTop: index !== 0 ? 16 : 0 }} onClick={this.imgClick.bind(this, images, index)}>
                                                        <img src={`http://10.89.7.160:9527/itsmApp${pic.downloadPath}`} height='400' style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} />
                                                    </div>
                                                );
                                            }) :
                                            <img src={defaultImg} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
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
                    <img className='img_item' src={`http://10.89.7.160:9527/itsmApp${data[current].downloadPath}`} style={{ maxWidth: '100%' }} onClick={this.onClick.bind(this)} />
                    {data && data.length > 1 && <div className={[styles.list_btn, styles.next].join(' ')} onClick={this.onChange.bind(this, 'next')} />}
                </div>
            </Fragment>
        );
    }
}