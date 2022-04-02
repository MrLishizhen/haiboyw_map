import React, { PureComponent } from 'react';
import moment, { months } from 'moment';

/**
 * 310*150
 */
export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: moment(),
            style: {}
        };
    }

    componentDidMount() {
        try {
            const data = this.getDataProvider(this.props);
            this.setState({ style: data[0] });

            this.timer = setInterval(() => {
                this.setState({ value: moment() });
            }, 1000);
        } catch (e) {
            console.error(e);
        }
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = null;
    }

    getDataProvider = props => {
        const { dataProvider } = props;

        if (dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && dataProvider[0] !== '') {
            return [...dataProvider]
        } else {
            return [];
        }
    }

    getWeek() {
        let week = moment().day()
        switch (week) {
            case 1:
                return '周一'
            case 2:
                return '周二'
            case 3:
                return '周三'
            case 4:
                return '周四'
            case 5:
                return '周五'
            case 6:
                return '周六'
            case 0:
                return '周日'
        }
    }

    render() {
        const { value, style = {} } = this.state;
        const { dateStyle, weekStyle, timeStyle } = style;
        const time = value.format('YYYY-MM-DD');

        return (
            <div>
                <div>
                    
                    <div style={{ color: '#fff', fontSize: 22, lineHeight: '72px', verticalAlign: 'middle', marginRight: 20, ...dateStyle }}>
                        <span>{time}</span>
                        {/* <span style={weekStyle, { marginLeft: 40 }}>{this.getWeek()}</span> */}
                        &emsp;
                    {/* </div>
                    <div style={{ color: '#fff', fontSize: 24, lineHeight: '72px', display: 'inline-block', verticalAlign: 'middle', marginBottom: 20, ...timeStyle }}> */}
                        {value.format('HH:mm:ss')}
                    </div>
                </div>
            </div>
        );
    }
}