import React, {Component} from 'react';

import {isEqual} from "lodash";
import styles from './index.less'
import hqw from './img/hqw.png'
export default class Jindu extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            data: dataQuery,
            opacity:false,


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
    handleChange=(value)=> {

        this.state.handlers.onClick && this.state.handlers.onClick({value});
    }
    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;
        console.info('bubble shouldComponentUpdate', nextProps, this.props);
        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
                this.selectHot(dataQuery);
                this.setState({data: dataQuery}, () => {

                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }
    clickFunc=()=>{
        let {opacity} = this.state;
        this.setState({
            opacity:!opacity
        },()=>{
            // console.log(this.state)
            this.state.handlers.onClick && this.state.handlers.onClick({hot:!opacity});
        })

    }
    render() {
        let {opacity} = this.state;
        return (
            <div onClick={this.clickFunc} className={styles.btn_box} style={{opacity:opacity?1:0.7,width:120,height:44,background:`url(${hqw}) no-repeat center center/100% 100%`}}>

            </div>
        )
    }

}