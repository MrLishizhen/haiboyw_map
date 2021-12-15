import React, { PureComponent } from 'react';
import { Popover } from 'antd';
import { isEqual } from 'lodash';
import styles from './index.less';

// const CONST_ITEMS = [
//     { key: 'cnBorder', icon: 'cnBorder', style: { width: 47 * 2, height: 34 * 2 }, command: `{"type":"SHOWNSTATE","flag":"GRIDFLAG","pinType":"*","points":[],"params":{"default":false,"pinType":"*","messageType":"clear"},"state":#}` },
//     // { key: 'cnCountry', icon: 'xinjingzhen', style: { width: 47 * 2, height: 34 * 2 }, command: `{"type":"SHOWNSTATE","flag":"GRIDFLAG","pinType":"*","points":[],"params":{"default":false,"pinType":"*","messageType":"clear"},"state":#}` },
//     { key: 'road', icon: 'road', style: { width: 34, height: 64 }, command: `{"type":"SHOW_FEATURELAYER","flag":"GRIDFLAG","pinType":"*","points":[],"params":{"default":true,"pinType":"*","messageType":"clear"},"state":#}` },
//     { key: 'buildingFFF', icon: 'buildingFFF', exclude: 'buildingReal', style: { width: 68, height: 70 }, command: `{"type":"SHOWNSTATE","flag":"GRIDFLAG","pinType":"*","points":[],"params":{"default":false,"pinType":"*","messageType":"clear"},"state":#}` },
//     { key: 'buildingReal', icon: 'buildingReal', exclude: 'buildingFFF', style: { width: 64, height: 72 }, command: `{"type":"SHOWNSTATE","flag":"GRIDFLAG","pinType":"*","points":[],"params":{"default":false,"pinType":"*","messageType":"clear"},"state":#}` },
//     { key: 'cameraMaptile', icon: 'cameraMaptile', style: { width: 64, height: 64 }, command: `{"type":"SHOWNSTATE","flag":"GRIDFLAG","pinType":"*","points":[],"params":{"default":false,"pinType":"*","messageType":"clear"},"state":#}` },
//     { key: 'CAMERAROTATE', icon: 'CAMERAROTATE', style: { width: 68, height: 68 }, command: `{"type":"CAMERAROTATE","flag":"GRIDFLAG","data":#}` },
//     // { key: 'cnJuwei', icon: 'buildingFFF', style: { width: 64, height: 72 }, command: `{"type":"SHOWNSTATE","flag":"GRIDFLAG","pinType":"*","points":[],"params":{"default":false,"pinType":"*","messageType":"clear"},"state":#}` },
//     // { key: 'ST', icon: 'buildingReal', style: { width: 68, height: 70 }, command: `{"type":"SHOWNSTATE","flag":"GRIDFLAG","pinType":"*","points":[],"params":{"default":false,"pinType":"*","messageType":"clear"},"state":#}` },
// ];

// 健康管控
const CONST_ITEMS = [
    { key: 'YXGLD', icon: 'YXGLD', type: '医学隔离点', style: { width: '100%', height: '100%' }, float: 'left', command: `click`, exclude: ['XDDQ', 'FYLL', 'WYJCD'], children: [{ key: 'jjgl', name: '居家隔离' }, { key: 'jzgl', name: '集中隔离' }] },
    { key: 'XDDQ', icon: 'XDDQ', type: '消毒点位', style: { width: '100%', height: '100%' }, float: 'left', command: `click`, exclude: ['jjgl', 'jzgl', 'YXGLD', 'FYLL', 'WYJCD'] },
    { key: 'FYLL', icon: 'FYLL', type: '防疫力量', style: { width: '100%', height: '100%' }, float: 'right', command: `click`, exclude: ['jjgl', 'jzgl', 'YXGLD', 'XDDQ', 'WYJCD'] },
    { key: 'WYJCD', icon: 'WYJCD', type: '蚊蝇监测点', style: { width: '100%', height: '100%' }, float: 'right', command: `click`, exclude: ['jjgl', 'jzgl', 'YXGLD', 'XDDQ', 'FYLL'] },
];

// 河湖管理
// const CONST_ITEMS = [
//     { key: 'cnCountry', icon: 'xinjingzhen', style: { width: 47 * 2, height: 34 * 2 }, command: `{"type":"SHOWNSTATE","flag":"GRIDFLAG","pinType":"*","points":[],"params":{"default":false,"pinType":"*","messageType":"clear"},"state":#}` },
//     { key: 'cnJuwei', icon: 'juwei', style: { width: 64 * 0.8, height: 72 * 0.8 }, command: `{"type":"SHOWNSTATE","flag":"GRIDFLAG","pinType":"*","points":[],"params":{"default":false,"pinType":"*","messageType":"clear"},"state":#}` },
//     { key: 'ST', icon: 'hedao', style: { width: 80 * 0.8, height: 44 * 0.8 }, command: `{"type":"SHOWNSTATE","flag":"GRIDFLAG","pinType":"*","points":[],"params":{"default":false,"pinType":"*","messageType":"clear"},"state":#}` },
//     { key: 'people', icon: 'people', style: { width: 32 * 2, height: 32 * 2 }, command: `click` },
// ];

// 智慧司法行政
// const CONST_ITEMS = [
//     { key: 'cnBorder', icon: 'cnBorder', style: { width: 47 * 2, height: 34 * 2 }, command: `{"type":"SHOWNSTATE","flag":"GRIDFLAG","pinType":"*","points":[],"params":{"default":false,"pinType":"*","messageType":"clear"},"state":#}` },
//     { key: 'cnCountry', icon: 'buildingReal', style: { width: 47 * 2, height: 34 * 2 }, command: `{"type":"SHOWNSTATE","flag":"GRIDFLAG","pinType":"*","points":[],"params":{"default":false,"pinType":"*","messageType":"clear"},"state":#}` },
//     { key: 'sfs', icon: 'buildingFFF', style: { width: 64, height: 64 }, command: `{"type":"SHOWNSTATE","flag":"GRIDFLAG","pinType":"*","points":[],"params":{"default":false,"pinType":"*","messageType":"clear"},"state":#}` }
// ];

/**
 * 1128*148
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
            const list = [];
            let state = undefined;

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

            data.forEach((item, index) => {
                if (item && item.type !== 'style') {
                    if (index === 0) {
                        state = { ...item };
                    } else {
                        list.push(item);
                    }
                }
            });

            const init = {};

            CONST_ITEMS.forEach(item => {
                init[item.key] = false;
                if (item.children) {
                    item.children.forEach(child => {
                        init[child.key] = false;
                    })
                }
            });

            this.setState({ ...state, ...init, list, handlers: Object.assign({}, eventValue) });
        } catch (e) {
            console.error('componentDidMount', e)
        }
    }

    componentWillReceiveProps(nextProps) {
        try {
            if (!_.isEqual(nextProps, this.props)) {
                const data = this.getDataProvider(nextProps);
                const list = [];
                let state = undefined;

                data.forEach((item, index) => {
                    if (item && item.type !== 'style') {
                        if (index === 0) {
                            state = { ...item };
                        } else {
                            list.push(item);
                        }
                    }
                });

                this.setState({ ...state, list });
            }
        } catch (e) {
            console.error('componentDidMount', e)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        try {
            const { list: nl, handlers: nh, ...nextra } = this.state;
            const { list = [], handlers, ...extra } = nextState;

            if (!_.isEqual(nextra, extra)) {
                console.info({ ...extra });
                handlers && handlers.onClick && handlers.onClick({ ...extra });
            }
            // if (!_.isEqual(nextProps, this.props) || !_.isEqual(nextra, extra)) {
            //     CONST_ITEMS.forEach(item => {
            //         try {
            //             if (item.command === 'click') {
            //                 if (nextState[item.key] !== this.state[item.key]) {
            //                     handlers && handlers.onClick && handlers.onClick({ [item.key]: nextState[item.key] });
            //                 }
            //             } else {
            //                 // if (nextState[item.key] !== this.state[item.key]) {
            //                 let command = item.command.replace(/\*/g, item.key).replace(/#/g, nextState[item.key]);
            //                 const posted = { ...JSON.parse(command), points: nextState[item.key] ? list.filter(l => l.pintype === item.key || l.pinType === item.key) : [] };

            //                 setTimeout(() => {
            //                     console.log('POST', JSON.stringify(posted));
            //                     window.postMessage(posted, '*');
            //                 }, 1000);
            //                 // }
            //             }
            //         } catch (e) {
            //             console.error(e);
            //         }
            //     });
            // }
        } catch (e) {
            console.error('shouldComponentUpdate', e)
        }

        return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);
    }

    getDataProvider = props => {
        const { dataProvider } = props;

        if (dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && dataProvider[0] !== '') {
            return [...dataProvider]
        } else {
            return [];
        }
    }

    onClick = (item, parent, e) => {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        const { key } = item;
        const filter = CONST_ITEMS.filter(item => item.key === key || item.key === parent.key);

        if (filter[0]) {
            const state = this.state[key];

            try {
                if (Array.isArray(filter[0].exclude)) {
                    const exclude = {};

                    filter[0].exclude.forEach(value => {
                        exclude[value] = false;
                    });
                    if (Array.isArray(filter[0].children)) {
                        filter[0].children.forEach(value => {
                            exclude[value.key] = false;
                        });
                    }

                    this.setState({ ...this.state, ...exclude, [key]: !state, [parent.key]: true });
                } else {
                    this.setState({ ...this.state, [key]: !state, [parent.key]: true, [filter[0].exclude]: false });
                }
            } catch (e) {
                console.info(e);
            }
        }
    }

    render() {
        const { hidden = "" } = this.state;
        const length = CONST_ITEMS.filter(item => !hidden || hidden.indexOf(item.key) === -1).length;
        const { dataProvider = [] } = this.props;
        const style = dataProvider.filter(dp => dp && dp.type === 'style')[0] || {};

        return (
            <div className={styles.ywtg_map_control_basic_wrapper} style={{ width: 148 * length + 48 * (length - 1), ...style.style }}>
                {CONST_ITEMS.map(item => {
                    if (!hidden || hidden.indexOf(item.key) === -1) {
                        const { children = [] } = item;

                        return (
                            <div key={item.key} className={this.state[item.key] ? styles.active : null} style={item.float ? { float: item.float } : {}} onClick={item.children && !this.state[item.key] ? null : this.onClick.bind(this, item, {})}>
                                {children && children.length > 0 ?
                                    <Popover overlayClassName={styles.overlay_wrapper} content={
                                        <div>
                                            {children.map(child => {
                                                return <div className={[styles.pop_item, this.state[child.key] ? styles.active : undefined].join(' ')} key={child.key} onClick={this.onClick.bind(this, child, item)}> {child.name}</div>
                                            })}
                                        </div>
                                    }>
                                        <div className={[styles.icon, styles[`icon_${item.icon}`]].join(' ')} style={{ ...item.style }}></div>
                                    </Popover> :
                                    <div className={[styles.icon, styles[`icon_${item.icon}`]].join(' ')} style={{ ...item.style }}></div>
                                }
                            </div>
                        );
                    }
                })}
            </div >
        );
    }
}