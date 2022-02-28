//散点图
//事件来源工单数

import React, {Component} from 'react';
import * as echarts from 'echarts';
import {isEqual} from "lodash";

// export default class Scatter extends Component {
export default class Scatter extends Component {
    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            data: dataQuery,
            // data:['100%','100%','100%','100%','100%','90%','85%','80%',]
            // data: [{type: 0,widthString: '100px',text:'50%',fontSize:'15px',amplitude:2,}]
        }
    }

    componentDidMount() {

    }



    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {dataProvider, style} = nextProps;

        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

                this.setState({data: dataQuery}, () => {

                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    render() {
        let {data} = this.state;
        return (
            <div ref={node => this.node = node} style={{width: '100%', height: '100%',display:'flex',flexDirection:"column",alignItems:'center',justifyContent:'center'}}>
                {data.map((item,i)=>{
                    return <div key={i} style={{flex:1,textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center',color:'rgba(51, 255, 160, 1)',fontSize:16,fontWeight:600}}>
                        <span>{item}</span>
                    </div>
                })}
            </div>
        );
    }
}