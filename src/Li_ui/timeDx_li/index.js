import React, {Component} from "react";
import {isEqual} from "lodash";
import {DatePicker} from 'antd';
import moment from "moment";
import styles from './index.less'
const {RangePicker } = DatePicker
import locale from 'antd/es/date-picker/locale/zh_CN';

export default class TimeDx extends Component {

    constructor(props) {
        super(props);

        const data = this.getDataProvider(props);
        const {time, show,endTime} = data[0] || {};
        this.state = {
            time: time ? moment(time, 'YYYY-MM-DD HH:mm:ss') : undefined,
            endTime: endTime ? moment(endTime, 'YYYY-MM-DD HH:mm:ss') : undefined,
            show: show || false
        }
    }

    getDataProvider = props => {
        const {dataProvider} = props;
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

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', this.props.dataProvider, nextProps.dataProvider);
        if (!isEqual(this.props.dataProvider, nextProps.dataProvider)) {
            const data = this.getDataProvider(nextProps);
            const {time, show,endTime} = data[0] || {};

            this.setState({
                time: time ? moment(time, 'YYYY-MM-DD HH:mm:ss') : undefined,
                endTime: endTime ? moment(endTime, 'YYYY-MM-DD HH:mm:ss') : undefined,
                show: show || false
            });
        }
    }

    timeIconClick = () => {
        let {show} = this.state;
        this.setState({
            show: !show
        })

    }

    // onChange = (date, dateString) => {
    //
    //     this.setState({
    //         time: dateString ? moment(dateString, 'YYYY-MM-DD HH:mm:ss') : undefined
    //     });
    //     this.state.handlers.onClick && this.state.handlers.onClick({time: dateString});
    // }
    onChange = (a,b)=>{
        const [start,end] = b;
        this.setState({
            time: start ? moment(start, 'YYYY-MM-DD HH:mm:ss')  : null,
            endTime: end ? moment(end, 'YYYY-MM-DD HH:mm:ss') : null,
        })
        console.log(start,end)
        this.state.handlers.onClick && this.state.handlers.onClick({ start: start, end: end});
    }
    render() {

        const {time,endTime, show} = this.state;
        let defaultValue = [time,endTime]
        return (
            <div className={styles.time_box} style={{width:48}}>
                <span className={styles.i_cont} onClick={this.timeIconClick}></span>
                <div className={styles.time_tc} style={{zIndex:show?12:-1}}>
                    <div className={styles.time} style={{width:200,display:show?'block':'none'}}>
                        {/*<DatePicker locale={locale} value={time} bordered={false} allowClear={false}*/}
                        {/*            // onChange={this.onChange} className={styles.timeColor} ></DatePicker>*/}
                        <RangePicker locale={locale} bordered={false}  allowClear={false} value={defaultValue} className={styles.timeColor} onChange={this.onChange}></RangePicker>
                    </div>

                    <span className={styles.i_cont}
                          onClick={this.timeIconClick}></span>
                </div>
            </div>
        )
    }
}