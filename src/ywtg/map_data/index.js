import React, { PureComponent } from 'react';
import { isEqual } from 'lodash';

const SHOWNSTATE = 'SHOWNSTATE';
const GRIDFLAG = 'GRIDFLAG';

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

                data.forEach(element => {
                    if (element) {
                        if (element.sbbh) {
                            if (!type[element.pinType]) {
                                type[element.pinType] = {
                                    pinType: element.pinType,
                                    popup: element.popup,
                                    icon: element.icon,
                                    points: []
                                }
                            }
                            type[element.pinType].points.push(element);
                        }
                    }
                });

                Object.keys(type).forEach(key => {
                    const value = type[key];

                    if (!this.active[key]) {
                        const { pinType, popup, icon, points } = value;

                        if (points && points.length > 0) {
                            this.postData({ pinType, popup, icon, flash: pinType === 'AIZY' }, points, true);
                            this.active[key] = { pinType, popup, icon, flash: pinType === 'AIZY', cnt: points.length };
                        }
                    } else {
                        const old = this.active[key];
                        const { pinType, popup, icon, points } = value;
                        const { cnt, ...extra } = old;

                        if (!isEqual(cnt, points)) {
                            if (!points || points.length === 0) {
                                this.postData({ ...extra }, [], false);
                            } else {
                                this.postData({ ...extra }, points, true);
                            }
                            this.active[key] = { ...extra, cnt: points };
                        }
                    }
                });

                Object.keys(this.active).forEach(key => {
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

    postData = ({ pinType, popup, icon, flash }, points = [], state) => {
        let posted = {
            type: SHOWNSTATE,
            flag: GRIDFLAG,
            pinType,
            points,
            params: { 'default': false, 'pinType': pinType, 'messageType': 'clear', icon, popup, flash }
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