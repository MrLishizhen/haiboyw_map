import React, {Component} from "react";
import {isEqual} from "lodash";

export default class Index extends Component {
    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        this.id = `visdata_map_${new Date().valueOf()}`
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : []

        this.state = {
            data: dataQuery,
            result:[
                '梅园路改造 100％','梅园路改造 100％','梅园路改造 100％',
            ]
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;
        console.info('bubble shouldComponentUpdate', nextProps, this.props);
        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [80];

                this.setState({data: dataQuery}, () => {
                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }
    render() {
        return (
            <div style={{width:'740px',height:"100px"}}>

            </div>
        )
    }
}