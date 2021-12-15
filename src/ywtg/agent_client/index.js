import React, { PureComponent, Fragment } from 'react';
import { Input, Button } from 'antd';
import _ from 'lodash';

function printEvent(handler, event) {
    try {
        console.info(handler + ': ' + JSON.stringify(event, null, 4) + '\n\n');
    } catch (e) {
        console.error('printEvent error：', e);
    }
}

const CONST_CODE = {
    '1': {
        label: '坐席事件', status: {
            0: '座席初始化状态',
            1: '签入',
            2: '置忙',
            3: '置闲',
            4: '锁定',
            5: '工作，包含振铃、通话等话路事件',
            6: '事后整理',
            7: '其他工作'
        }
    },
    '2': {
        label: '话路事件', status: {
            20: '设备初始化状态',
            21: '空闲',
            22: '摘机',
            23: '振铃',
            24: '被咨询振铃',
            25: '外拨振铃',
            26: '咨询摘机',
            27: '咨询振铃',
            28: '双方通话',
            29: '保持',
            30: '被保持',
            31: '咨询通话',
            32: '被咨询通话',
            33: '会议',
            34: '被会议',
            35: '监听',
            36: '强插',
        }
    },
    '3': {
        label: '系统事件', status: {
            50: '连接上线',
            51: '连接断开',
            52: 'CTILINK 连接',
            53: 'CTILINK 断开'
        }
    }
}

export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            online: false
        };
    }

    componentDidMount() {
        try {
            const data = this.getDataProvider(this.props);

            if (data && data.length > 0) {
                if (data[0]) {
                    this.setState({ prefix: data[0].prefix });
                }
                this.agentClient = new AgentClient({
                    ...data[0]
                });

                this.agentClient.onOnline = function (event) {
                    printEvent('onOnline', event);
                };

                this.agentClient.onOffline = function (event) {
                    printEvent('onOffline', event);
                };

                this.agentClient.onStatusChanged = (event) => {
                    const { eventType, currStatus } = event || {};
                    const { label, status = {} } = CONST_CODE[eventType] || {};
                    console.info('事件类型：', label, eventType, '，当前状态：', status[currStatus], currStatus);

                    if (event && event.eventType === 3 && event.currStatus === 50) {
                        this.setState({ online: true });
                    }
                };

                this.agentClient.onDialing = function (event) {
                    printEvent('onDialing', event);
                };

                this.agentClient.onOffering = function (event) {
                    printEvent('onOffering', event);
                };

                this.agentClient.onConnected = function (event) {
                    printEvent('onConnected', event);
                };

                this.agentClient.onReleased = function (event) {
                    printEvent('onReleased', event);
                    console.info(event);
                };

                this.agentClient.onRecordEnd = function (event) {
                    printEvent('onRecordEnd', event);
                };

                this.agentClient.onError = function (event) {
                    printEvent('onError', event);
                };

                this.agentClient.start();
            }
        } catch (e) {
            console.error('componentDidMount', e);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps, this.props)) {
            const { style = {} } = nextProps;
            const { phone } = style;

            this.setState({ value: phone }, () => {
                this.btnCall();
            });
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

    btnCall = () => {
        const { online, value } = this.state;

        if (online && value && this.agentClient) {
            console.info(`${this.state.prefix}${value}`);
            this.agentClient.makeCall(1, `${this.state.prefix}${value}`);
        }
    }

    btnHangup = () => {
        this.agentClient.hangupCall();
    }

    render() {
        const { online } = this.state;

        return (
            <div>
                {/* <Input placeholder='请输入电话号码' style={{ width: 160 }} onChange={(e) => this.setState({ value: e.target.value })} />
                {online &&
                    <Fragment>
                        <Button type='primary' onClick={this.btnCall}>呼叫</Button>
                        <Button onClick={this.btnHangup}>挂机</Button>
                    </Fragment>
                } */}
            </div>
        );
    }
}