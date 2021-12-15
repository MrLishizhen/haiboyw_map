import React, { Fragment } from 'react';
import { isEqual } from 'lodash';
import moment from 'moment';
import styles from './index.less';

const dataList = [];

const dataHead = [
    { name: '内容', dataIndex: 'NAME' },
    { name: '当日预约服务量', dataIndex: 'RESERVATION_SIZE', unit: '人', defaultValue: 0 },
    { name: '人力资源配置', dataIndex: '' },
    { name: '登记人数', dataIndex: 'REGISTER_SIZE', unit: '人', defaultValue: 0 },
    { name: '接种人数', dataIndex: 'VACCINATION_SIZE', unit: '人', defaultValue: 0 },
    { name: '救护车辆', dataIndex: 'CAR_SIZE', unit: '辆', defaultValue: 0 },
    { name: '医护人员', dataIndex: 'DOCTOR_SIZE', unit: '人', defaultValue: 0 },
    { name: '志愿者数', dataIndex: 'VOLUNTEER_SIZE', unit: '人', defaultValue: 0 },
    { name: '管理人员', dataIndex: 'ENSURE_SIZE', unit: '人', defaultValue: 0 },
    { name: '公安人数', dataIndex: 'POLICE_SIZE', unit: '人', defaultValue: 0 },
    { name: '城管人数', dataIndex: 'CHENGGUAN_SIZE', unit: '人', defaultValue: 0 },
    { name: '其他岗位需求', dataIndex: 'OTHER_SIZR', defaultValue: '' },
    { name: '设施设备配置', dataIndex: '' },
    { name: '工位台', dataIndex: 'STATION', unit: '个', defaultValue: 0 },
    { name: '电脑设备', dataIndex: 'dnsb', unit: '套', defaultValue: 0 },
    { name: '冷藏冰箱', dataIndex: 'lcbx', unit: '台', defaultValue: 0 },
    { name: '留观椅', dataIndex: 'lgy', unit: '把', defaultValue: 0 },
    { name: '疫苗配送车', dataIndex: 'ympsc', unit: '部', defaultValue: 1 },
    { name: '人员转运车辆', dataIndex: 'ryyzcl', unit: '部', defaultValue: 1 },
    { name: '其他设备需求', dataIndex: 'OTHER_STATION', defaultValue: '' },
];

const BASIC_DATA = {
    'NAME': '标准配置',
    'RESERVATION_SIZE': '每2000人/天（10小时）',
    'REGISTER_SIZE': '5-6名预检登记人员',
    'VACCINATION_SIZE': '10-12名接种人员',
    'CAR_SIZE': '1部120救护车，2名急救人员',
    'DOCTOR_SIZE': '3名医疗救护人员（医护比1：2）',
    'VOLUNTEER_SIZE': '12人（等候排队队伍咨询、秩序维持4人；体温检测、健康码查看2人；咨询登记引导2人；接种引导2人；留观区2人）',
    'ENSURE_SIZE': '2-6人',
    'POLICE_SIZE': '2人',
    'CHENGGUAN_SIZE': '2人',
    'STATION': '10-12个',
    'dnsb': '10-12套',
    'lcbx': '10-12台',
    'lgy': '',
    'ympsc': '1部',
    'ryyzcl': '1部',
    flag: true
};

function calculate(list = [], item) {
    let cnt = 0;

    list.forEach(d => {
        let n = undefined;
        if (item && item.render) {
            n = parseFloat(item.render(d[item.dataIndex], d));
        } else {
            n = parseFloat(d[item.dataIndex]);
        }

        if (!isNaN(n)) {
            cnt += n;
        }
    });

    return `${cnt ? cnt : item.defaultValue}${item.unit ? item.unit : ''}`;
}

const TOTAL_DATA = {
    'NAME': '当日合计值',
    'RESERVATION_SIZE': calculate,
    'REGISTER_SIZE': calculate,
    'VACCINATION_SIZE': calculate,
    'CAR_SIZE': calculate,
    'DOCTOR_SIZE': calculate,
    'VOLUNTEER_SIZE': calculate,
    'ENSURE_SIZE': calculate,
    'POLICE_SIZE': calculate,
    'CHENGGUAN_SIZE': calculate,
    'STATION': calculate,
    'dnsb': calculate,
    'lcbx': calculate,
    'lgy': calculate,
    'ympsc': calculate,
    'ryyzcl': '1部',
    flag: true
};

const MAX_DATA = {
    'NAME': '区域最大量',
    'RESERVATION_SIZE': '4万人/日',
    'REGISTER_SIZE': '2301名经培训医护人员，可从事预检登记及疫苗接种',
    'VACCINATION_SIZE': '2301名经培训医护人员,可从事预检登记及疫苗接种',
    'CAR_SIZE': '9部120救护车',
    'DOCTOR_SIZE': '35名医疗救护人员',
    'VOLUNTEER_SIZE': '424名志愿者（文明办登记）',
    'ENSURE_SIZE': '',
    'POLICE_SIZE': '10个街道镇，每个街道镇2-5人',
    'CHENGGUAN_SIZE': '10个街道镇，每个街道镇2-5人',
    'STATION': '理论最高值336个（大型固定接种点及社区常设固定接种点）',
    'dnsb': '现有260套（大型固定接种点及社区常设固定接种点）',
    'lcbx': '151台小型冰箱，22台大型冰箱',
    'lgy': '',
    'ympsc': '1部区域内疫苗配送专用车辆（国药），14部疫苗配送车辆（10家社区，4个大型固定接种点）',
    'ryyzcl': '1部',
    flag: true
}

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        try {
            let data = [...dataList];
            const datalist = this.getDataProvider(this.props);
            if (datalist.length) {
                data = [...datalist];
            }

            const { buffEvent = [{ type: 'click' }], style = {} } = this.props;
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

            this.setState({ data, handlers: Object.assign({}, eventValue) });
        } catch (e) {
            console.error('componentDidMount error:', e);
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

    componentWillReceiveProps(nextProps) {
        console.info(nextProps);
        try {
            if (!isEqual(this.props, nextProps)) {
                let nextPropsData = this.getDataProvider(nextProps);

                this.setState({ data: [...nextPropsData] });
            }
        } catch (e) {
            console.error('componentWillReceiveProps error:', e);
        }
    }

    render() {
        const { data = [] } = this.state;
        const newData = [...data, TOTAL_DATA];
        const width = 98 / (newData.length + 1);

        return (
            <div ref={this.ref} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'auto' }} className={styles.table_layout_case}>
                <table style={{ width: '100%' }}>
                    <tbody>
                        {[...dataHead].slice(0, 1).map((head, i) => {
                            return (
                                <tr key={i} style={{ borderBottomColor: '#023a6a' }}>
                                    <td style={{ backgroundColor: 'rgba(5, 91, 169, 0.5)', color: '#00f0ff', fontWeight: 'bolder', width: 250 }}>
                                        {head.name}
                                    </td>
                                    {newData && newData.length > 0 ?
                                        newData.map((item, j) => {
                                            return (
                                                <td key={j} style={!head.dataIndex || head.dataIndex === 'NAME' ? { backgroundColor: 'rgba(5, 91, 169, 0.5)', color: '#00f0ff', fontWeight: 'bolder', width: 470 } : { width: 470 }}>
                                                    {head.dataIndex ?
                                                        item.flag ?
                                                            (typeof item[head.dataIndex] === 'function' ? item[head.dataIndex](data, head) : item[head.dataIndex]) :
                                                            `${(item[head.dataIndex] || head.defaultValue)}${head.unit ? head.unit : ''}` :
                                                        ''
                                                    }
                                                </td>
                                            );
                                        }) :
                                        null
                                    }
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className={styles.table_info_wrapper} style={{ marginTop: 3 }}>
                    <table style={{ width: '100%' }}>
                        <tbody>
                            {[...dataHead].slice(1, dataHead.length).map((head, i) => {
                                return (
                                    <tr key={i}>
                                        <td style={{ backgroundColor: 'rgba(5, 91, 169, 0.5)', color: '#00f0ff', fontWeight: 'bolder', width: 250 }}>
                                            {head.name}
                                        </td>
                                        {newData && newData.length > 0 ?
                                            newData.map((item, j) => {
                                                return (
                                                    <td key={j} style={!head.dataIndex || head.dataIndex === 'NAME' ? { backgroundColor: 'rgba(5, 91, 169, 0.5)', color: '#00f0ff', fontWeight: 'bolder', width: 470 } : { width: 470 }}>
                                                        {head.dataIndex ?
                                                            item.flag ?
                                                                (typeof item[head.dataIndex] === 'function' ? item[head.dataIndex](data, head) : item[head.dataIndex]) :
                                                                `${(item[head.dataIndex] || head.defaultValue)}${head.unit ? head.unit : ''}` :
                                                            ''
                                                        }
                                                    </td>
                                                );
                                            }) :
                                            null
                                        }
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}