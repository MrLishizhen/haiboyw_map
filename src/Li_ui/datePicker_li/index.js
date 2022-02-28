//两城四区所用的echarts图
import React, {Component} from 'react';
import { DatePicker} from 'antd';
import moment from 'moment';
const {RangePicker } = DatePicker
import locale from 'antd/es/date-picker/locale/zh_CN';
import style from './index.less'
import {isEqual} from "lodash";
export default class Jindu extends Component {
    constructor(props) {
        super(props);
        const data = this.getDataProvider(props);

        const { gteDate, lteDate,allowClear } = data[0] || {};

        this.state = {
            allowClear:allowClear||false,
            start: gteDate ? moment(gteDate, 'YYYY-MM-DD HH:mm:ss')  : undefined,
            end: lteDate ? moment(lteDate, 'YYYY-MM-DD HH:mm:ss')  : undefined,
            handlers: {},
        }
        // this.state = {
        //     data: dataQuery,
        //
        // }
    }


    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', this.props.dataProvider, nextProps.dataProvider);
        if (!isEqual(this.props.dataProvider, nextProps.dataProvider)) {
            const data = this.getDataProvider(nextProps);
            const { gteDate, lteDate,allowClear } = data[0] || {};

            this.setState({
                allowClear:allowClear||false,
                start: gteDate ? moment(gteDate, 'YYYY-MM-DD HH:mm:ss')  : null,
                end: lteDate ? moment(lteDate, 'YYYY-MM-DD HH:mm:ss') : null,
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
    componentDidMount() {
        const {buffEvent = [{type: 'click'}]} = this.props;
        let eventValue = {};
        for (let i = 0; i < buffEvent.length; i++) {
            const eventObj = buffEvent[i];
            const {type, method, bindedComponents} = eventObj;
            if (type === 'click') {
                eventValue = {
                    onClick: (data) => {
                        method && method({...data}, bindedComponents)
                    }
                }
            }
        }
        this.setState({
            handlers: Object.assign({}, eventValue)
        })

    }

    onChange = (a,b)=>{
        const [start,end] = b;
        this.setState({
            start: start ? moment(start, 'YYYY-MM-DD HH:mm:ss')  : null,
            end: end ? moment(end, 'YYYY-MM-DD HH:mm:ss') : null,
        })
        this.state.handlers.onClick && this.state.handlers.onClick({ start: start, end: end});
    }
// .format('YYYY-MM-DD')
    render() {
        let {start,end,allowClear=false} = this.state;

        let defaultValue = [start,end]
        return (
            <div ref={node => this.node = node} className={style.DatePickerbox} style={{width:423,height:48}}>
                <RangePicker locale={locale}  allowClear={allowClear} value={defaultValue} onChange={this.onChange}></RangePicker>
            </div>
        )
    }

}
