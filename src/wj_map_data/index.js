import React, { PureComponent } from 'react';
import { isEqual } from 'lodash';

const SHOWNSTATE = 'SHOWNSTATE';
const GRIDFLAG = 'GRIDFLAG';

const CONST_MAP_ICON = {
    '集中空调': { popup: 'click3', icon: '/fastdfs/group1/M00/09/EC/wKgJx1__9ImAKH0xAAAXdAe8VPM488.png' },
    '二次供水': { popup: 'click3', icon: '/fastdfs/group1/M00/09/EC/wKgJx1__9JeALYMjAAARJOM6GbA609.png' },
    '现制现售水机': { popup: 'click3', icon: '/fastdfs/group1/M00/09/EC/wKgJx1__9KGAf1HsAAAQAW9OCpM856.png' },
    '管道分质供水': { popup: 'click3', icon: '/fastdfs/group1/M00/09/EC/wKgJx1__9KqAdn0pAAASk3Nnp5s769.png' },
    '医疗机构': { popup: 'click3', icon: '/fastdfs/group1/M00/09/E4/wKgJx1_ltxuAYGMNAAAQFRU_xss989.png' },
    '公共场所': { popup: 'click3', icon: '/fastdfs/group1/M00/09/E4/wKgJx1_lq8KAUiwLAAAXor1ZSnQ441.png' },
    '职业健康': { popup: 'click3', icon: '/fastdfs/group1/M00/09/E4/wKgJx1_pSPyAOlhjAAAYXXDHrjY666.png' },
    '学校': { popup: 'click3', icon: '/fastdfs/group1/M00/09/E4/wKgJx1_ltNeAUxnlAAAT1U31VNU926.png' },
    '幼托': { popup: 'click3', icon: '/fastdfs/group1/M00/09/E4/wKgJx1_ltL-AcJuoAAAU_iMvDbw098.png' }
};

const CONST_ITEM_EXTRA_FIELD = {
    '二次供水': ['检测单位', '采样日期', '色度', '浑浊度', '菌落总数', '总大肠菌群', '总氟', 'PH', '检测结果'],
    '一箱一档': ['清洗时间', '清洗单位', '总氯', '浑浊度', '快检结果'],
    '管道分质供水': ['检测结果'],
}

export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.active = {}
    }

    componentWillReceiveProps(nextProps) {
        try {
            if (!isEqual(this.props.dataProvider, nextProps.dataProvider)) {
                console.info('componentWillReceiveProps', nextProps);
                const data = this.getDataProvider(nextProps);
                const type = {};
                let pointType = '';

                data.forEach(element => {
                    if (element) {
                        // if (element.type !== 'all' && element.type.indexOf('street') === -1) {
                        if (element.sbbh) {
                            if (!type[element.type + '_' + pointType]) {
                                type[element.type + '_' + pointType] = {
                                    pinType: element.type + '_' + pointType,
                                    popup: CONST_MAP_ICON[element.type] ? CONST_MAP_ICON[element.type].popup : 'click3',
                                    icon: element.icon ? element.icon : CONST_MAP_ICON[element.type] ? CONST_MAP_ICON[element.type].icon : '',
                                    points: []
                                }
                            }
                            type[element.type + '_' + pointType].points.push(element);
                        } else {
                            pointType = element.type;
                        }
                    }
                });

                Object.keys(type).forEach(key => {
                    if (key && key.indexOf('集中空调') != -1) {
                        const { points: parents = [] } = type[key] || {};

                        parents.forEach(parent => {
                            parent.list = JSON.stringify([
                                { info: [{ name: '检测位置', value: '检测点1' }, { name: '风速', value: '' }, { name: '可吸入颗粒物', value: '' }, { name: '积尘', value: '' }, { name: '细菌总数', value: '' }, { name: '真菌总数', value: '' }] },
                                { info: [{ name: '检测位置', value: '检测点2' }, { name: '风速', value: '' }, { name: '可吸入颗粒物', value: '' }, { name: '积尘', value: '' }, { name: '细菌总数', value: '' }, { name: '真菌总数', value: '' }] },
                                { info: [{ name: '检测位置', value: '检测点3' }, { name: '风速', value: '' }, { name: '可吸入颗粒物', value: '' }, { name: '积尘', value: '' }, { name: '细菌总数', value: '' }, { name: '真菌总数', value: '' }] },
                                { info: [{ name: '检测位置', value: '检测点4' }, { name: '风速', value: '' }, { name: '可吸入颗粒物', value: '' }, { name: '积尘', value: '' }, { name: '细菌总数', value: '' }, { name: '真菌总数', value: '' }] },
                                { info: [{ name: '检测位置', value: '检测点5' }, { name: '风速', value: '' }, { name: '可吸入颗粒物', value: '' }, { name: '积尘', value: '' }, { name: '细菌总数', value: '' }, { name: '真菌总数', value: '' }] },
                                { info: [{ name: '检测位置', value: '冷凝水排放口' }, { name: '嗜肺军团菌', value: '' }] }
                            ])
                        });
                    } else if (key && key.indexOf('二次供水') != -1) {
                        const { points: parents = [] } = type[key] || {};
                        const list = {};

                        if (type['一箱一档' + '_' + pointType]) {
                            const { points: children = [] } = type['一箱一档' + '_' + pointType] || {};

                            children.forEach(child => {
                                if (!list[child.name]) {
                                    list[child.name] = [child];
                                } else {
                                    list[child.name] = [...list[child.name], child];
                                }
                            });
                        }

                        parents.forEach(parent => {
                            const length = Object.keys(parent).length;
                            const extra = [];

                            for (let i = 1; i < length; i++) {
                                if (parent['szms' + i]) {
                                    if (CONST_ITEM_EXTRA_FIELD['二次供水'].includes(parent['szms' + i])) {
                                        extra.push({ name: parent['szms' + i], value: parent['sz' + i] });
                                        parent['szms' + i] = '';
                                        parent['sz' + i] = '';
                                    }
                                }
                            }
                            parent.extra = JSON.stringify(extra);

                            if (list[parent.sbbh]) {
                                const children = list[parent.sbbh];
                                const newList = [];

                                children.forEach(child => {
                                    if (child) {
                                        const length = Object.keys(child).length;
                                        const info = []
                                        const extra = [];

                                        for (let i = 1; i < length; i++) {
                                            if (child['szms' + i]) {
                                                if (CONST_ITEM_EXTRA_FIELD['一箱一档'].includes(child['szms' + i])) {
                                                    extra.push({ name: child['szms' + i], value: child['sz' + i] });
                                                } else {
                                                    info.push({ name: child['szms' + i], value: child['sz' + i] });
                                                }
                                            }
                                        }
                                        newList.push({ info, extra });
                                    }
                                });

                                if (newList && newList.length > 0) {
                                    parent.list = JSON.stringify(newList);
                                }
                            }
                        });
                        type['一箱一档' + '_' + pointType] = undefined;
                    } else if (key && key.indexOf('管道分质供水') != -1) {
                        const { points: parents = [] } = type[key] || {};

                        parents.forEach(parent => {
                            const length = Object.keys(parent).length;
                            const extra = [];

                            for (let i = 1; i < length; i++) {
                                if (parent['szms' + i]) {
                                    if (CONST_ITEM_EXTRA_FIELD['管道分质供水'].includes(parent['szms' + i])) {
                                        extra.push({ name: parent['szms' + i], value: parent['sz' + i] });
                                        parent['szms' + i] = '';
                                        parent['sz' + i] = '';
                                    }
                                }
                            }
                            parent.extra = JSON.stringify(extra);
                        });
                    }
                });

                if (this.pointType !== pointType) {
                    this.pointType = pointType;
                    console.log('POST', JSON.stringify({ 'type': 'CHANGE_CENTER', 'flag': 'GRIDFLAG', 'road': pointType !== '-1' ? pointType : 'all' }));
                    window.postMessage({ 'type': 'CHANGE_CENTER', 'flag': 'GRIDFLAG', 'road': pointType !== '-1' ? pointType : 'all' }, '*')
                }

                Object.keys(type).forEach(key => {
                    const value = type[key];

                    if (value) {
                        if (!this.active[key]) {
                            const { pinType, popup, icon, points } = value;

                            if (points && points.length > 0) {
                                this.postData({ pinType, popup, icon }, points, true);
                                this.active[key] = { pinType, popup, icon, cnt: points };
                            }
                        } else {
                            const old = this.active[key];
                            const { pinType, popup, icon, points } = value;
                            const { cnt, ...extra } = old;

                            if (!isEqual(cnt, points)) {
                                this.postData({ ...extra }, points, true);
                                this.active[key] = { ...extra, cnt: points };
                            }
                        }
                    }
                });

                Object.keys(this.active).forEach(key => {
                    // const array = key.split('_');

                    // if (!type[array[0]] && array[1] === pointType) {
                    if (!type[key]) {
                        const old = this.active[key];
                        const { cnt, ...extra } = old;

                        this.postData({ ...extra }, [], false);
                        this.active[key] = { ...extra, cnt: [] };
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

    postData = ({ pinType, popup, icon }, points = [], state) => {
        let posted = {
            type: SHOWNSTATE,
            flag: GRIDFLAG,
            pinType,
            points,
            params: { 'default': false, 'pinType': pinType, 'messageType': 'clear', icon, popup }
        };
        // if (state) {
        posted.state = state;
        // }
        try {
            console.log('POST', JSON.stringify(posted));
            window.postMessage(posted, '*');
        } catch (e) {
            console.error(e)
        }
    }

    render() {
        return (
            <div></div>
        );
    }
}