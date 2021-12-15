import React, {Component} from 'react';
import {isEqual} from "lodash";

export default class HuanLPer extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [80];

        this.state = {
            data: dataQuery,
            color: "#00FF85"//默认
        }
    }

    //根据值改变颜色
    setColor = () => {
        const first = this.state.data[0];
        if (first === '00:00:00') {
            this.setState({color: '#999'})
        } else {
            this.setState({color: "#00FF85"})
        }
    }

    componentDidMount() {
        this.setColor();
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;
        // console.info('bubble shouldComponentUpdate', nextProps, this.props);
        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : defaultDataQuery;

                this.setState({data: dataQuery}, () => {
                    this.setColor();
                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    render() {
        return (
            <span style={{'color':this.state.color,fontSize:'24px'}}>{this.state.data[0]}</span>
        )
    }

}