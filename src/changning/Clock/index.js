import React from 'react';
import moment from 'moment';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: moment()
        };
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({ value: moment() });
        }, 1000);
    }

    componentWillUnmount() {
        this.timer = null;
    }

    getWeek() {
        let week = moment().day()
        switch (week) {
            case 1:
                return '星期一'
            case 2:
                return '星期二'
            case 3:
                return '星期三'
            case 4:
                return '星期四'
            case 5:
                return '星期五'
            case 6:
                return '星期六'
            case 0:
                return '星期日'
        }
    }

    render() {
        const { dataProvider = [] } = this.props;
        const { value } = this.state;
        const time = value.format('YYYY/MM/DD');

        return (
            <div>
                <div style={{ color: 'rgb(188, 213, 255)', fontSize: 56, lineHeight: '90px', display: 'inline-block', verticalAlign: 'middle', marginRight: 16, textAlign: 'left', width: dataProvider && dataProvider[0] ? `${dataProvider[0]}px` : 'auto' }}>
                    {this.getWeek()}
                </div>
                <div style={{ color: 'rgb(188, 213, 255)', fontSize: 56, lineHeight: '90px', display: 'inline-block', verticalAlign: 'middle', marginRight: 16, textAlign: 'left', width: dataProvider && dataProvider[1] ? `${dataProvider[1]}px` : 'auto' }}>
                    {time}
                </div>
                <div style={{ color: 'rgb(188, 213, 255)', fontSize: 56, lineHeight: '90px', display: 'inline-block', verticalAlign: 'middle', textAlign: 'left', width: dataProvider && dataProvider[2] ? `${dataProvider[2]}px` : 'auto' }}>
                    {value.format('HH:mm:ss')}
                </div>
            </div>
        );
    }
}