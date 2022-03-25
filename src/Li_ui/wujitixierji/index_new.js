import React, {Component} from "react";
import {isEqual} from "lodash";
import styles from './index.less'
import ry from './img/ry.png'
import xz from './img/xz.png'
export default class index extends Component {
    constructor(props) {
        super(props);
        const {dataProvider = []} = props;

        let dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        // {name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1},{name:'城管委',id:1}
        dataQuery=this.checkArr(dataQuery);
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



    componentWillUnmount() {

    }
    checkArr(data){
        const list  = [];
        for(let i = 0;i<data.length;i++){
            if(data[i]){
                list.push(data[i])
            }
        }
        return list;
    }
    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;

        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                let dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

                dataQuery=this.checkArr(dataQuery);
                this.setState({
                    data: dataQuery
                }, () => {

                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    itemLiClick(v) {
        this.state.handlers.onClick && this.state.handlers.onClick({...v});
    }

    render() {
        let {data=[]} = this.state;
        return (
            <div className={styles.wujitixierji_box}>
                {
                    data.map((v,i)=>{
                        return <div className={styles.wujitixierji_li} key={i}>
                            <div className={styles.wujitixierji_item}>
                                <span title={v.name} className={styles.wujitixierji_name}>{v.name}</span>
                                <span className={styles.wujitixierji_icons}>
                                    <i  onClick={()=>this.itemLiClick({_type:0,...v})} title={'查看人员'} style={{width:24,height:25,background:'url('+ry+') no-repeat center center/100% 100%'}}></i>
                                    <i  onClick={()=>this.itemLiClick({_type:1,...v})} title={'查看部门'} style={{width:24,height:25,background:'url('+xz+') no-repeat center center/100% 100%'}}></i>
                                </span>

                            </div>
                        </div>
                    })
                }
            </div>

        )
    }

}
