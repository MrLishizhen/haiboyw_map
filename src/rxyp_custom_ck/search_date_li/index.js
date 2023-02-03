import React, {Component} from 'react';
import styles from "./index.less";
import {DatePicker} from "antd";
import moment from "moment";
moment.locale('zh-cn');
const { RangePicker } = DatePicker;

export default class Jindu extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        this.state = {
            data: dataQuery,
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
    onChange(date, dateString){
        console.log(dateString)
        this.state.handlers.onClick && this.state.handlers.onClick({ start: dateString[0], end: dateString[1]});
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     const {dataProvider, style} = nextProps;
    //     console.info('bubble shouldComponentUpdate', nextProps, this.props);
    //     if (!isEqual(dataProvider, this.props.dataProvider)) {
    //         if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
    //             // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
    //         } else {
    //             const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
    //
    //             this.setState({data: dataQuery}, () => {
    //             });
    //         }
    //     }
    //
    //     return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    // }

    render() {
        return (
            <div className={styles.riqikuang}>
                <RangePicker
                    // defaultValue={[moment().subtract(7, 'days'),moment()]}
                    format="YYYY-MM-DD"
                    placeholder={['开始时间', '结束时间']}
                    onChange={this.onChange.bind(this)}
                    dropdownClassName={styles.date_picker}
                />
            </div>
        )
    }

}
// background:'url('+img+') no-repeat center center/100%',
