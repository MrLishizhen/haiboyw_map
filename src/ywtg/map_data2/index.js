import React, { PureComponent } from 'react';
import { isEqual, isEmpty } from 'lodash';

const SHOWNSTATE = 'SHOWNSTATE';
const GRIDFLAG = 'GRIDFLAG';

export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: {}
        };
    }

    componentDidMount() {
        try {
            const { style = {} } = this.props;
            const data = this.getDataProvider(this.props);
            const type = {};
            let show = false;
            let flash = false;

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
                    } else {
                        show = element.state === 'auto';
                        flash = element.type === 'flash';
                    }
                }
            });

            this.setState({ type }, () => {
                Object.keys(this.state.type).forEach(key => {
                    const value = type[key];
                    const { pinType, popup, icon, points } = value;

                    if ((show || style.show) && points && points.length > 0) {
                        this.postData({ pinType, popup, icon, flash }, points, true);
                    }
                });
            });
        } catch (e) {
            console.error('componentDidMount', e);
        }
    }

    componentWillReceiveProps(nextProps) {
        try {
            console.info('componentWillReceiveProps', nextProps, this.props);
            if (!isEqual(this.props, nextProps)) {
                const { style = {} } = nextProps;
                const data = this.getDataProvider(nextProps);
                const type = {};
                let show = false;
                let flash = false;

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
                        } else {
                            show = element.state === 'auto';
                            flash = element.type === 'flash';
                        }
                    }
                });

                if (isEmpty(type)) {
                    Object.keys(this.state.type).forEach(key => {
                        const value = this.state.type[key];
                        const { pinType, popup, icon } = value;

                        this.postData({ pinType, popup, icon, flash }, [], false);
                    });
                    this.setState({ type });
                } else {
                    this.setState({ type }, () => {
                        Object.keys(this.state.type).forEach(key => {
                            // const value = type[key];
                            // const { pinType, popup, icon, points } = value;

                            // if (style.type && style.type.length > 0) {
                            //     let postData = points.filter(item => style.type.includes(item.type));
                            //     if (postData && postData.length > 0) {
                            //         this.postData({ pinType, popup, icon }, postData, true);
                            //     } else {
                            //         this.postData({ pinType, popup, icon }, [], false);
                            //     }
                            // } else {
                            //     this.postData({ pinType, popup, icon }, [], false);
                            // }
                            const value = type[key];
                            const { pinType, popup, icon, points } = value;

                            if ((show || style.show)) {
                                if (points && points.length > 0) {
                                    this.postData({ pinType, popup, icon, flash }, points, true);
                                } else {
                                    this.postData({ pinType, popup, icon, flash }, [], false);
                                }
                            } else if (style.show === false) {
                                this.postData({ pinType, popup, icon, flash }, [], false);
                            }
                        });
                    });
                }
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