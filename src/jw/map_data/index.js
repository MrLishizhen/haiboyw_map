import React, { PureComponent } from 'react';
import { isEqual } from 'lodash';

const SHOWNSTATE = 'SHOWNSTATE';
const GRIDFLAG = 'GRIDFLAG';

const CONST_MAP_ICON = {
    '社区服务中心': { popup: 'click3', icon: '/fastdfs/group1/M00/09/DC/wKgJx1_O5g6ACmh2AAAHwm8lnVo242.png' }
};

export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.active = {}
    }

    componentDidMount() {
        try {
            console.info('componentWillReceiveProps', this.props);
            const data = this.getDataProvider(this.props);

            this.generateData(data);
        } catch (e) {
            console.error('componentDidMount', e)
        }
    }

    componentWillReceiveProps(nextProps) {
        try {
            if (!isEqual(this.props.dataProvider, nextProps.dataProvider)) {
                console.info('componentWillReceiveProps', nextProps);
                const data = this.getDataProvider(nextProps);

                this.generateData(data);
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

    generateData = (data) => {
        const type = {};
        let pointType = '';

        data.forEach(element => {
            if (element) {
                const { sbbh, ...extra } = element;
                if (sbbh) {
                    if (!type[element.type + '_' + pointType]) {
                        type[element.type + '_' + pointType] = {
                            pinType: element.type + '_' + pointType,
                            popup: CONST_MAP_ICON[element.type] ? CONST_MAP_ICON[element.type].popup : 'click3',
                            icon: CONST_MAP_ICON[element.type] ? CONST_MAP_ICON[element.type].icon : '',
                            points: []
                        }
                    }
                    type[element.type + '_' + pointType].points.push({ ...extra, sbbh: sbbh + '' });
                } else {
                    pointType = element.type;
                }
            }
        });

        Object.keys(type).forEach(key => {
            const value = type[key];

            // if (!this.active[key]) {
            const { pinType, popup, icon, points } = value;

            if (points && points.length > 0) {
                this.postData({ pinType, popup, icon }, points, true);
                // this.active[key] = { pinType, popup, icon, cnt: points.length };
            }
            // } else {
            //     const old = this.active[key];
            //     const { pinType, popup, icon, points } = value;
            //     const { cnt, ...extra } = old;

            //     if (cnt !== points.length) {
            //         this.postData({ ...extra }, [], false);
            //         this.postData({ ...extra }, points, true);
            //         this.active[key] = { ...extra, cnt: points.length };
            //     }
            // }
        });

        // Object.keys(this.active).forEach(key => {
        //     if (!type[key]) {
        //         const old = this.active[key];
        //         const { cnt, ...extra } = old;

        //         this.postData({ ...extra }, [], false);
        //         this.active[key] = { ...extra, cnt: 0 };
        //     }
        // });
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